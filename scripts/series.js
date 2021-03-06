/******************************************************************************
Name:    incharts3d
Author:  Inlabs sp. z o.o. (Maciej Pleśnar, Ewelina Bendlin, Kamil Daszkowski)
Version: 1.2 (January 2014)
Support: http://incharts3d.com

Licence:
incharts3d is licensed under a Creative Commons Attribution-NonCommercial 3.0
License (http://creativecommons.org/licenses/by-nc/3.0/).
Noncommercial. You may not use this work for commercial purposes.
******************************************************************************/

function Series(scene,shape,speed,showMarks,anim,textured,alphaDoc)
{  
    // <editor-fold defaultstate="collapsed" desc="variables">
    this.gl =scene.gl;
    this.scene= scene;
    /**
     * @member speed
     * @type Number
     * @desc Change animation speed.
     */
    this.speed     = speed;
    /**
     * @member shape
     * @type Number
     * @desc Change model shape (0 - cylinder, 1 - cube, 2 - cone).
     */
    this.shape     = shape;
    /**
     * @member showMarks
     * @type Boolean
     * @desc Switch on/off labels.
     */
    this.showMarks = showMarks;
    /**
     * @member anim
     * @type Number
     * @desc Change type of animation (0 - opacity, 1 - slideUp).
     */
    this.anim      = anim;
     /**
     * @member alphaDoc
     * @type Number
     * @desc Change alpha.
     */
    this.alphaDoc = alphaDoc;
    
    this.finishAnim = false;
    this.sumAnim   = true;
    this.addAnim   = true;

    this.data_p2     = [];
    this.data2       = [];
    this.data        = []; 
    this.data_p      = [];
    this.info_data   = [];
    this.TextsTab    = new Array();
    this.sumSeries   = false;
    this.pickerColor = [];
    this.min_h       = [];
    this.min_h_pier  = [];
    
    this.texture          = null;
    this.textured = textured;
    this.number_series    = 0;
    this.data_length      = 0;
    this.numberBaseSeries = 0;
    this.colorNumber      = 0;
    this.animDelete       = false;
    
    this.max_H     = 18;
    this.step      = 8;
    this.firstStep = 1.6;
    this.start     = 0;
    this.scaleX    = 1;
    this.scaleY    = 1;
    this.posZ      = 0;
    this.Zoffset   = 0;
    this.max       = 0;
    this.picker    = true;
    
    this.posX       = [];
    this.posX_old   = [];
    this.addNewItem = false;
    
    this.addNewMarks   = false; 
    this.numTab_bottom = 0;
    this.numTab        = 0;
    this.marks_pos     = [];
    
    this.firstShowItem = false;
    this.increase      = [];
    
    this.alpha  = [];
    this.addDyn = 0;
    this.init();
    this.initAnim0();
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="init anim">
Series.prototype.initAnim0 = function()
{
    if(this.anim==0)
    for(var j=0; j<this.data.length; j++)
        this.alpha[j] = 0;
    
    if(this.anim==1)
    for(var j=0; j<this.data.length; j++)
        this.alpha[j] = this.alphaDoc;
};

Series.prototype.initAnim1 = function()
{
    this.min_h = [];
    for(var i=0; i<this.data.length; i++)
        {
        this.min_h[i] = this.max;
        this.alpha[i] = this.alphaDoc;
        }
    
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="init series">
Series.prototype.init = function()
{
    for(var i=0; i<this.data2.length;i++)
        this.data_p2[i]=this.data2[i];
};

Series.prototype.initSeries = function()
{
    this.SetMax();
    this.setNewData();
    this.initH(); 
    this.calculateHeights();
    this.changeScaleX(true);
    this.posDiff = this.data[this.data.length-1] - this.min_h[this.data.length-1];
};

Series.prototype.SetMax = function()
{
    this.max = -this.data[0];
    for (var i=1; i<this.data.length; i++)
        if(-this.data[i]<this.max)
           this.max = -this.data[i];
};

Series.prototype.setNewData = function()
{
    var x =1;

    if(-this.max>this.max_H)
        x = (-this.max)/this.max_H;
    
    for(var i=0; i<this.data.length; i++)
        if(this.data[i] != -this.max)
        {
            this.data[i] /= x;
            if(this.data[i]<0.5)
                this.data[i]=0.2;
        }
};

Series.prototype.initH = function()
{
    this.min_h = [];
    for(var i=0; i<this.data.length; i++)
    {
      if(this.max_H - this.data[i]<0)
          this.min_h.push(this.max);
      else
          this.min_h.push(-this.max_H*this.scaleY);    
    }
};

Series.prototype.calculateHeights = function()
{
    for(var i=0; i<this.data.length; i++)
        this.data[i] =- ((-this.min_h[i])-this.data[i]);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="animate">
 Series.prototype.animateX = function(elapsed_s,index)
{
    if(this.posX[index] < this.posX_old[index])
        this.posX_old[index] -= (this.speed*elapsed_s); 
    else 
        this.posX_old[index] = this.posX[index];
    
    for(var j=0; j<this.data.length; j++)
    {
        if( this.posX[j] != this.posX_old[j])
            return false;
    }
    return true;
};

Series.prototype.animate0 = function(elapsed_s,chart)
{
    for(var a=0; a<this.alpha.length; a++)
        if(this.alpha[a]<this.alphaDoc)
            this.alpha[a] += this.speed/500;

    for(var i=0; i<this.data.length; i++)
    {
        if(this.animateX(elapsed_s,i))
        {           
            if(this.min_h[i]<this.data[i] - (this.speed*elapsed_s) && this.increase[i]==1)
                this.alpha[this.data.length-1]=0;

            this.min_h[i] = this.data[i]
            if(this.animDelete)
            {
                this.animDelete = false;
                chart.hideSum();
            }
        }
    }
};

Series.prototype.animate1 = function(elapsed_s,series,chart)
{
    for(var i=0; i<this.data.length; i++)
    {
        if(this.animateX(elapsed_s,i))
        {
            if(this.min_h[i]<this.data[i] - (this.speed*elapsed_s))
            {
                this.min_h[i] += (this.speed*elapsed_s);
                if(this.number_series==this.data_length)
                    series[this.numberBaseSeries].marks_pos[i] += (this.speed*elapsed_s);
                if(this.sumSeries)
                    this.marks_pos[i] += (this.speed*elapsed_s);
            }
            else if (this.min_h[i]>this.data[i] + (this.speed*elapsed_s)&& this.increase[i]!=1)
            {
                this.min_h[i] -= (this.speed*elapsed_s);
                if(this.number_series==this.data_length)
                    series[this.numberBaseSeries].marks_pos[i] -= (this.speed*elapsed_s);
                if(this.sumSeries)
                    this.marks_pos[i] -= (this.speed*elapsed_s);
            }
            else
            {
                this.min_h[i] = this.data[i];

                if(i==this.data.length-1)
                    this.addAnim=true;

                if(this.animDelete)
                {
                    this.animDelete = false;
                    chart.hideSum();
                }
            }
        } 
    }
};

Series.prototype.animate = function(elapsed_s,series, chart)
{
  //  if(this.animZ)
      //  this.animateZ();
    
    if(this.anim == 0)
        this.animate0(elapsed_s,chart);
    else if(this.anim == 1)
        this.animate1(elapsed_s, series,chart);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="change scale">
Series.prototype.changeScaleX = function(t)
{
    var s_potrze = this.data.length*6*(this.scaleX-0.35) + (this.data.length-1)*this.step- this.start+this.addDyn;
    while(s_potrze > 50)
    {
        s_potrze = this.data.length*6*(this.scaleX-0.35) + (this.data.length-1)*this.step- this.start+this.addDyn;

        if(this.step <= 6*this.scaleX+0.8)
            this.scaleX = this.scaleX-0.001;
        else
            this.step -= 0.05;
    }  

    this.start = this.firstStep *this.step;

    if(t) this.initH();
    this.setPosition();
}; 

Series.prototype.changeScaleZ = function(number)
{
    var step     = 6;
    var s_potrze = number*this.scaleX*6 + (number-1)*step ;

    while(s_potrze > 20)
    {
        s_potrze = number*this.scaleX*6 + (number-1)*step ;
        
        if(step <= 6*this.scaleX+1)
            this.scaleX = this.scaleX-0.001;
        else
            step -= 0.2;
    }
    return [step,this.scaleX];
};

Series.prototype.changeScaleAll = function(t)
{
    this.firstShowItem = true;
    this.min_h_pier    = [];
    
    for(var i=0; i<this.data.length; i++)
        this.min_h_pier[i] = this.data[i];
    
    this.data = []; 
    for(var i=0; i<this.data_p.length; i++)
        this.data[i] = this.data_p[i];
  
    this.setNewData();
    this.initH(); 
    this.calculateHeights();
    if(t)
    this.changeScaleX(true);
    
    for(var i=0; i<this.data.length; i++)
    {
        this.increase[i] = (this.min_h[i] < this.min_h_pier[i]) ? -1 : 1;
        this.min_h[i]    = this.min_h_pier[i];
    }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="add marks">
Series.prototype.addTabs = function(suma,j,fillText,fontSize,font,lineWidth)
{
    var tex;
    var tmp=false;
    var s = suma+"";
    for(var i=0; i<s.length;i++)
        if(s[i]==".")
            tmp=true;
 
    tex = (tmp) ? new Text(suma,this.gl,fillText,fontSize,font,lineWidth) : new Text(suma+".0",this.gl,fillText,fontSize,font,lineWidth);

    this.scene.loadObject('models/cube_marks.json', this.number_series+'top_marks'+j);
    this.scene.loadObject('models/cylinder.json', this.number_series+'bottom_marks'+j);

    tex.fillAlpha ="rgba("+this.scene.marksTopColor[0]*255+","+this.scene.marksTopColor[1]*255+","+this.scene.marksTopColor[2]*255+",255)";
    tex.fontSize  = 80;
    tex.init();
    this.TextsTab.push(tex);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set position x">
Series.prototype.setPosition = function()
{
    this.posX = [];
    for(var j=this.start; j<=(this.step * (this.data.length-1))+this.data.length*6*this.scaleX+ this.start; j+=this.step)
        this.posX.push(j);
           
    if(this.addNewItem)
    {
        this.posX_old[this.data.length-1] = this.start+ (this.data.length)* this.step - this.step;
        this.posX[this.data.length-1]     = this.start+ (this.data.length)* this.step - this.step;
    }

    if(this.firstShowItem)
        this.posX_old = this.posX;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="add data">
Series.prototype.addData = function(value)
{
    this.firstShowItem = false;
    this.addNewItem = true;
    
    if(this.anim==0)
        this.alpha[this.data.length]=0

    if(this.data[0]<=0)
    {
        this.min_h_pier = [];
        for(var i=0; i<this.data.length;i++)
            this.min_h_pier[i]=this.data[i];
    }

    this.data_p.push(parseInt(value));
    this.data =[]; 
    for(var i=0; i<this.data_p.length;i++)
        this.data[i]=this.data_p[i];

    this.setNewData();
    this.initH(); 
    this.calculateHeights();
    this.changeScaleX(true);

    for(var i=0; i<this.data.length-1;i++)
    {
        this.increase[i] = (this.min_h[i] < this.min_h_pier[i]) ? -1 : 1;
        this.min_h[i] = this.min_h_pier[i];
    }
    this.increase[this.data.length-1] = 1;
};
//  </editor-fold>
