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

function Series_area(gl,scene,data,speed,showMarks,anim,fillText,fontSize,font,lineWidth,alphaDoc)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    
     /**
     * @member showMarks
     * @type Boolean
     * @desc Switch on/off labels.
     */
    this.showMarks =showMarks;
     /**
     * @member width_Z
     * @type Number
     * @desc Change width.
     */
    this.width_Z = 3;
     /**
     * @member width_Z_start
     * @type Number
     * @desc Change start position on Z axis.
     */
    this.width_Z_start = 0;
     /**
     * @member anim
     * @type Number
     * @desc Change type of animation (0 - opacity, 1 - slideUp).
     */
    this.anim=anim;
    
    /**
     * @member speed
     * @type Number
     * @desc Change animation speed.
     */
    this.speed =speed/500;
     
    /**
     * @member alphaDoc
     * @type Number
     * @desc Change alpha value.
     */
    this.alphaDoc = alphaDoc;
     
    this.gl=gl; 
    this.scene= scene;
    this.data_pier = data;
    this.data = [];
    this.lineVer_pos = [];
    this.step = 5;
    this.max=0;
    this.max_H = 18;
    this.TextsTab    = new Array();
    this.numTab    = 0;
    this.numTab_bottom = 0;
    this.label_pos_Z = 0;
    this.posY = -13;
    this.alpha = 0.2;
    this.pickerColor = [];
    this.picker    = true;
    this.picker_line_posX =-10;
    this.picker_line_posY =-10;
    this.numSeries = 1;
    this.Zoffset =0;
    
    this.fillText= fillText;
    this.fontSize= fontSize;
    this.font= font;
    this.lineWidth = lineWidth;
    
    this.setData();
    this.initStep();
    if(this.showMarks)
        this.addLabels();
    this.setMax();
    this.setNewData();
    this.initData();
    this.setLabelPosZ();
    var that=this;
    setTimeout(function() { that.setPickerShapes(); }, 300);
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="setAlpha">
Series_area.prototype.setAlpha = function()
{
    if(this.alpha<this.alphaDoc)
        this.alpha+=0.01;
},
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setPositionY">
Series_area.prototype.setPositionY = function()
{
    if(this.posY<-0.5)
        this.posY+=this.speed;
},
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setLabelPosZ">
Series_area.prototype.setLabelPosZ = function()
{
    this.label_pos_Z = this.width_Z_start-this.width_Z/2;
},
//  </editor-fold>     

//  <editor-fold defaultstate="collapsed" desc="setData">
Series_area.prototype.setData = function()
{
    for(var i=0; i<this.data_pier.length;i++)
        for(var j=0; j<this.data_pier[i].length;j++)
            this.data.push(this.data_pier[i][j]);
},
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setMax">
Series_area.prototype.setMax = function()
{
    this.max = -this.data[0];
    for (var i=1; i<this.data.length; i++)
        if(-this.data[i]<this.max)
           this.max = -this.data[i];
   
   this.max = - this.max;
},
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setNewData">
Series_area.prototype.setNewData = function()
{
    var x = 1;

    if(this.max>this.max_H)
        x = (this.max)/this.max_H;
    
    for(var i=0; i<this.data.length; i++)
        this.data[i] /= x;
},
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="initStep">
Series_area.prototype.initStep = function()
{
    var platformSize=50;
    var daneSize = this.data.length*this.step;
    
    while(daneSize > platformSize)
    {
        daneSize = this.data.length*this.step;
        this.step-=0.1;
    }
},
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="initData">
Series_area.prototype.initData = function()
{
    var v= [];
    var x=1;
    this.lineVer_pos.push(x);
    
    //  <editor-fold defaultstate="collapsed" desc="front">
    for(var i=0; i<this.data.length-1;i++)
    {
        //przednia
        v.push(x); v.push(0.0); v.push(this.width_Z_start);
        v.push(x); v.push(this.data[i]); v.push(this.width_Z_start);
        v.push(x+this.step); v.push(this.data[i+1]); v.push(this.width_Z_start);
        v.push(x+this.step); v.push(0.0); v.push(this.width_Z_start);
        
        x+=this.step;
        this.lineVer_pos.push(x);
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="top">
    x=1;
    for(var i=0; i<this.data.length-1;i++)
    {
       //gora
        v.push(x); v.push(this.data[i]); v.push(this.width_Z_start-this.width_Z);
        v.push(x); v.push(this.data[i]); v.push(this.width_Z_start);
        v.push(x+this.step); v.push(this.data[i+1]); v.push(this.width_Z_start);
        v.push(x+this.step); v.push(this.data[i+1]); v.push(this.width_Z_start-this.width_Z);
        
        v.push(x); v.push(this.data[i]); v.push(this.width_Z_start-this.width_Z);
        v.push(x); v.push(this.data[i]); v.push(this.width_Z_start);
        v.push(x+this.step); v.push(this.data[i+1]); v.push(this.width_Z_start);
        v.push(x+this.step); v.push(this.data[i+1]); v.push(this.width_Z_start-this.width_Z);
        
         x+=this.step;
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="other">
    x=1;
    for(var i=0; i<this.data.length;i++)
    {
         //lewo
        v.push(x); v.push(0.0); v.push(this.width_Z_start-this.width_Z);
        v.push(x); v.push(0.0); v.push(this.width_Z_start);
        v.push(x); v.push(this.data[i]); v.push(this.width_Z_start);
        v.push(x); v.push(this.data[i]); v.push(this.width_Z_start-this.width_Z);
        
        //prawo
        v.push(x+this.step); v.push(0.0); v.push(this.width_Z_start-this.width_Z);
        v.push(x+this.step); v.push(this.data[i+1]); v.push(this.width_Z_start-this.width_Z);
        v.push(x+this.step); v.push(this.data[i+1]); v.push(this.width_Z_start);
        v.push(x+this.step); v.push(0.0); v.push(this.width_Z_start);

        //tylnia   
        v.push(x); v.push(0.0); v.push(this.width_Z_start-this.width_Z);
        v.push(x); v.push(this.data[i]); v.push(this.width_Z_start-this.width_Z);
        v.push(x+this.step); v.push(this.data[i+1]); v.push(this.width_Z_start-this.width_Z);
        v.push(x+this.step); v.push(0.0); v.push(this.width_Z_start-this.width_Z);

        //dol  
        v.push(x); v.push(0.0); v.push(this.width_Z_start-this.width_Z);
        v.push(x+this.step); v.push(0.0); v.push(this.width_Z_start-this.width_Z);
        v.push(x+this.step); v.push(0.0); v.push(this.width_Z_start);
        v.push(x); v.push(0.0); v.push(this.width_Z_start);

        x+=this.step;
    }
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="init indices">
    var i=[];
    for(var ii=0;ii<(this.data.length-1)*28;ii+=4 )
    {
        i.push(ii);
        i.push(ii+1);
        i.push(ii+2);

        i.push(ii);
        i.push(ii+2);
        i.push(ii+3); 
    } 
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="add shapes">
    this.scene.loadObject('models/area.json', 'series_area',v,i);
    this.scene.loadObject('models/cylinder.json', 'picker_line');
    //  </editor-fold>
},
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setPickerShapes">
Series_area.prototype.setPickerShapes = function()
{
    //  <editor-fold defaultstate="collapsed" desc="variable">
    var ind=[];
    var a =0.8;
    var x=1-a/2;
    var c=0;
    var vi =[];
    
    var ods=0.2;
    var odsy=-1;
    //  </editor-fold>
    
    for(var j=0;j<this.data.length;j++)
    {
        //  <editor-fold defaultstate="collapsed" desc="vertices">
        if(j==0)
            x=1+a/2;
        else if(j==this.data.length-1)
            x=(this.data.length-1)*this.step+a;
            
       vi= [
       x, this.data[j]-odsy,  this.width_Z_start+ods,
       x+a, this.data[j]-odsy,  this.width_Z_start+ods,
       x+a, 0, this.width_Z_start+ods,
       x, 0, this.width_Z_start+ods,

   
       x, this.data[j]-odsy, this.width_Z_start-this.width_Z,
       x,  0, this.width_Z_start-this.width_Z,
       x+a,  0, this.width_Z_start-this.width_Z,
       x+a, this.data[j]-odsy, this.width_Z_start-this.width_Z,

      
       x,  0, this.width_Z_start-this.width_Z,
       x, 0,  this.width_Z_start+ods,
       x+a,  0,  this.width_Z_start+ods,
       x+a,  0, this.width_Z_start-this.width_Z,

      
       x, this.data[j]-odsy, this.width_Z_start-this.width_Z,
       x+a, this.data[j]-odsy, this.width_Z_start-this.width_Z,
       x+a, this.data[j]-odsy,  this.width_Z_start+ods,
       x, this.data[j]-odsy,  this.width_Z_start+ods,

   
       x+a, this.data[j]-odsy, this.width_Z_start-this.width_Z,
       x+a,  0, this.width_Z_start-this.width_Z,
       x+a,  0,  this.width_Z_start+ods,
       x+a, this.data[j]-odsy,  this.width_Z_start+ods,
       
       x, this.data[j]-odsy, this.width_Z_start-this.width_Z,
       x, this.data[j]-odsy,  this.width_Z_start+ods,
       x,  0,  this.width_Z_start+ods,
       x,  0, this.width_Z_start-this.width_Z  
   ];
   //  </editor-fold>
   
        //  <editor-fold defaultstate="collapsed" desc="indices">     
  ind = [
        0, 1, 2,      0, 2, 3,    
        4, 5, 6,      4, 6, 7,    
        8, 9,10,     10, 11, 8,  
        12, 13, 14,   12, 14, 15, 
        16, 17, 18,   16, 18, 19, 
        20, 21, 22,   20, 22, 23  
   ];
   //  </editor-fold>
   
        //  <editor-fold defaultstate="collapsed" desc="add shape">
       this.scene.loadObject('models/area.json', 'cube'+c,vi,ind);
        c++;
        if(j==0)
            x=1-a/2;
        x+=this.step;
         //  </editor-fold>
    }  
},
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="addLabels">
Series_area.prototype.addLabels = function()
{
    var tex;
    for(var j=0; j< this.data.length;j++)
    {
        var tmp=false;
        var s = this.data[j]+"";
        for(var i=0; i<s.length;i++)
            if(s[i]==".")
                tmp=true;

        tex = (tmp) ? new Text(this.data[j],this.gl,this.fillText,this.fontSize,this.font,this.lineWidth) : new Text(this.data[j]+".0",this.gl,this.fillText,this.fontSize,this.font,this.lineWidth);

        this.scene.loadObject('models/cube_marks.json', this.max+'top_marks'+(this.data.length-1));
        this.scene.loadObject('models/cylinder.json', this.max+'bottom_marks'+(this.data.length-1));

        tex.fillAlpha = "rgba("+this.scene.marksTopColor[0]*255+","+this.scene.marksTopColor[1]*255+","+this.scene.marksTopColor[2]*255+",255)";
        tex.fontSize  = 80;
        tex.init();
        this.TextsTab.push(tex);
    }
},
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="changeTextY">
Series_area.prototype.changeTextY = function(Texts)
{
    if(this.max>18)
    {
        var len   = Texts.length;
        Texts     = [];
        var scale = (this.max)/len;

        for(var i=0; i<len; i++)
        {
            var text = new Text((scale + scale*i).toFixed(1),this.gl,this.fillText,this.fontSize,this.font,this.lineWidth);
            text.setText(-this.max);
            Texts.push(text);
        }
    }
    return Texts;
};
//  </editor-fold>