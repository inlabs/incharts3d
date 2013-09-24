function Series()
{  
    // <editor-fold defaultstate="collapsed" desc="variables">
    this.speed     = 15;
    this.shape     = 0;
    this.showMarks = false;
    this.anim      = 1;
    this.finishAnim = false;
    this.sumAnim   = false;
    this.addAnim   = false;

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
    this.posZ      = 4;
    this.posZ_new  = 0;
    this.animZ     = false;
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
    
    this.alpha        = [];
    this.addDyn       = 0;
    
    this.init();
    this.initAnim0();
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="init anim">
Series.prototype.initAnim0 = function()
{
    for(var j=0; j<this.data.length; j++)
        this.alpha[j] = 0;
};

Series.prototype.initAnim1 = function()
{
    this.min_h = [];
    for(var i=0; i<this.data.length; i++)
        this.min_h[i] = this.max;
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
            this.data[i] /= x;
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
 Series.prototype.animateX = function(index)
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

Series.prototype.animateZ = function()
{
    if(this.posZ_new >= this.posZ)
        this.posZ += 0.2;
    else
    {
        if(this.number_series==this.numberBaseSeries)
            posZ.push(this.posZ+10*this.scaleX)
        this.animZ = false;
    }
};

Series.prototype.animate0 = function()
{
    for(var a=0; a<this.alpha.length; a++)
        this.alpha[a] += this.speed/300;

    for(var i=0; i<this.data.length; i++)
    {
        if(this.animateX(i))
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

Series.prototype.animate1 = function()
{
    for(var i=0; i<this.data.length; i++)
    {
        if(this.animateX(i))
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

Series.prototype.animate = function()
{
    if(this.animZ)
        this.animateZ();
    
    if(this.anim == 0)
        this.animate0();
    else if(this.anim == 1)
        this.animate1();
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
Series.prototype.addTabs = function(suma)
{
    Scene.loadObject('models/cube_marks.json', this.number_series+'top_marks'+(this.data.length-1));
    Scene.loadObject('models/cylinder.json', this.number_series+'bottom_marks'+(this.data.length-1));

    var tex = new Text(suma+".0");
    var color = "rgba("+Scene.marksTopColor[0]*255+","+Scene.marksTopColor[1]*255+","+Scene.marksTopColor[2]*255+",255)";
    tex.fillAlpha = color;
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
