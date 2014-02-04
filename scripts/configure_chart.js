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

function Chart(dane, program)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.firstStep = 1.6;
    this.program = program;
    this.scene = program.scene;
    this.series = program.series;
    this.shape=program.shape;
    this.speed = program.speed;
    this.ShowMarks = program.showMarks;
    this.anim=program.anim;
    this.dane     = dane;  
    this.sumArray = [];   
    this.showSum   = false;
    this.number_SeriesArray = [];
    this.texture = program.texturePath;
    this.textured= program.drawTex;
    this.max = 0;
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="changeText">
Chart.prototype.changeTextY = function(TextsY)
{
    var len   = TextsY.length;
    TextsY     = [];
    var scale = (-this.max)/len;

    for(var i=0; i<len; i++)
    {
        var text = new Text((scale + scale*i).toFixed(1),this.scene.gl,this.program.fillText,this.program.fontSize,this.program.font,this.program.lineWidth);
        text.setText(this.max);
        TextsY.push(text);
    }
    return TextsY;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="addSeries">
Chart.prototype.addSeries = function()
{
    //  <editor-fold defaultstate="collapsed" desc="set zero element for lower series">
    for(var i=0; i<this.dane.length;i++)
    {
        var count = 0;
        for(var j=0;j<this.dane[i].length;j++)
        {
            if(count< this.dane[i][j].length)
                count = this.dane[i][j].length;
        }
        for(var j=0;j<this.dane[i].length;j++)
        {
            if(this.dane[i][j].length < count)
                this.dane[i][j].push(0);
        }
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="add data">
    for(var j=0; j < this.dane.length; j++)
    {
        var s   = new Series(this.scene,this.shape,this.speed,this.ShowMarks,this.anim,this.textured,this.program.alpha);
        s.data2 = this.dane[j];
        s.posZ  = j*(-6);
        s.init();
        this.series.push(s);
        s.firstStep=this.firstStep;
        
        for(var i=0; i<s.data2.length; i++)
        {
             s.data.push(s.data2[i][0]);
             s.data_p.push(s.data_p2[i][0]);
             s.info_data.push(s.data_p2[i][0]);
        }
        
        if(this.series[0].textured)
        {
            var T = new Texture(this.texture,this.scene.gl);
            s.texture = T.tex;
        }

        s.initSeries();  
        this.number_SeriesArray.push(this.series.length-1);
        for(var i=0; i<s.data2[0].length-1; i++)
            this.series.push(new Series(this.scene,this.shape,this.speed,this.ShowMarks,this.anim,this.textured,this.program.alpha));
    }
   
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="set steps">
    var min_step    = 8;
    var series_base = this.series[0];
    for(var i=this.number_SeriesArray[0], x=0; x< this.number_SeriesArray.length; x++)
    {
        if(this.series[i].step < min_step)
        {
            min_step    = this.series[i].step;
            series_base = this.series[i];
        }
        i=this.number_SeriesArray[x+1];
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="set posX for base series">
    for(var j=0; j< this.series.length; j++)
    {
        for(var i=0; i< series_base.posX.length; i++)
        {
            this.series[j].posX[i]     = series_base.posX[i];
            this.series[j].posX_old[i] = series_base.posX_old[i];
        }
        this.series[j].step   = min_step;
        this.series[j].scaleX = series_base.scaleX;
        this.series[j].initSeries();
    }
    //  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="addSeriesVert">
Chart.prototype.addSeriesVert = function()
{
    var series = this.series;
    this.scene.setSeriesType(0,this.series);
    
    //  <editor-fold defaultstate="collapsed" desc="set series parameters">
    for(var k=this.number_SeriesArray[0], x=0; x<this.number_SeriesArray.length; x++)
    {
        //  <editor-fold defaultstate="collapsed" desc="add shape">
        this.scene.addShapes(k, 0, series[k].data.length);
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set parameters">
        series[k].colorNumber      = 0;
        series[k].number_series    = k;
        series[k].numberBaseSeries = k;
        series[k].data_length      = k + series[k].data2[0].length-1;
        
        
       // if(this.series[k].anim==0)
            this.series[k].initAnim0();
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="add data">
        for(var j=k+1; j<k+ series[k].data2[0].length; j++)
        {
            //  <editor-fold defaultstate="collapsed" desc="set data">
            series[j].data   = [];
            series[j].data_p = [];

            for(var i=0; i<series[k].data2.length; i++)
            {
                series[j].data.push(series[k].data2[i][j-k]);
                series[j].data_p.push(series[k].data_p2[i][j-k]);
                series[j].info_data.push(series[k].data_p2[i][j-k]);
            }
            for(var i=0; i<series[k].data2.length; i++)
            {
                series[j].data[i]   += series[j-1].data_p[i];
                series[j].data_p[i] += series[j-1].data_p[i];
            }
            //  </editor-fold>

            //  <editor-fold defaultstate="collapsed" desc="set parameters">
            series[j].start = series[k].start;
            series[j].colorNumber      = j-k;
            series[j].number_series    = j;
            series[j].numberBaseSeries = k;
            series[j].data_length      = k + series[k].data2[0].length-1;
            series[j].posZ             = series[k].posZ;
            
            if(this.series[0].textured)
            {
                var T = new Texture(this.texture,this.scene.gl);
                series[j].texture = T.tex;
            }
            
           // if(series[j].anim==0)
                series[j].initAnim0();

            series[j].initSeries(); 
            //  </editor-fold>

            //  <editor-fold defaultstate="collapsed" desc="add shape">
            this.scene.addShapes(j, 0, series[j].data.length);
            //  </editor-fold>
        }
        //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="set marks">
       // alert(this.series[0].showMarks)
        if(this.series[0].showMarks)
        {
            var suma = 0;
            for(var i=0; i<this.series[k].data_p.length; i++)
            {
                for(var j=0; j<this.series[k].data_p2[0].length; j++)
                   suma += this.series[k].data_p2[i][j];

                this.series[k].addTabs(suma,i,this.program.fillText,this.program.fontSize,this.program.font,this.program.lineWidth);
                suma = 0;
            }
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set sum">
        if(this.showSum)
        {
            var suma=0;
            for (var i=0; i<series[k].data2.length; i++)
                for(var j=0; j<series[k].data2[i].length; j++)
                    suma += series[k].data2[i][j];

            this.sumArray.push(suma);
        }
        //  </editor-fold>
        
        k=this.number_SeriesArray[x+1];
        
        //  <editor-fold defaultstate="collapsed" desc="change scale all">
        for(var i=0; i<this.series.length; i++)
        { 
            //if(this.series[i].max>-10)
             {
            this.series[i].max = this.setMaxValue();
         this.series[i].changeScaleAll(true);
             }
        }
        //  </editor-fold>
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="change scale all">
     for(var i=0; i<this.series.length; i++)
     { 
         this.series[i].max = this.setMaxValue();
         this.series[i].changeScaleAll(true);
     }
     //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="set marks/posZ">
    var step  = this.series[0].changeScaleZ(this.number_SeriesArray.length)[0];
    var scale = this.series[0].changeScaleZ(this.number_SeriesArray.length)[1];
    for(var k=this.number_SeriesArray[0], x=0; x<this.number_SeriesArray.length; x++)
    {
        //  <editor-fold defaultstate="collapsed" desc="set marks position">
        if(this.series[0].showMarks)
        for(var i=0; i<this.series[k].data2.length; i++)
        {
            if(this.series[k].anim==1)
                this.series[k].marks_pos[i] = this.series[k+this.series[k].data2[0].length-1].min_h[i]+(this.series[k+this.series[k].data2[0].length-1].max - this.series[k+this.series[k].data2[0].length-1].data[i]);
            else
                this.series[k].marks_pos[i] = this.series[k+this.series[k].data2[0].length-1].min_h[i];
        }
        //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="set position Z">
        for(var j=k; j<k+this.series[k].data2[0].length; j++)
        {
           this.series[j].scaleX   = scale-0.008*j;
           this.series[j].posZ_new = (this.number_SeriesArray.length-x-1.5)*step-(5*(1-scale));
           this.series[j].animZ    = true;
        }
        //  </editor-fold>

        k = this.number_SeriesArray[x+1];
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="set min_h">
    for(var i=0; i< series.length;i++)
    for(var j=0;j<series[i].min_h.length;j++)
    {
        series[i].min_h[j]=-22;
        series[i].marks_pos[j]=-22;
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="change fonSize-tabMarks">
    if(series[0].max<=-9999 && this.series[0].showMarks)
    for(var i=0; i<this.number_SeriesArray.length;i++)
        for(var j=0; j<series[0].TextsTab.length;j++)
        {
            series[0].TextsTab[j].fontSize -=25;
            series[0].TextsTab[j].init();
        }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="set zero element">
   for(var k=0; k<series.length;k++)
   for(var i =0 ; i< series[k].data2.length;i++)
       for(var j=0; j< series[k].data2[i].length; j++)
        {
            if(series[k].data2[i][j]==0)
            {
               series[k+j].data[i]-=0.01;
               series[k].min_h[i]+=0.2;
            }    
        }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="change text">
   this.max = series[0].max;
    //  </editor-fold>
   
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setMaxValue">
Chart.prototype.setMaxValue = function()
{
    var lista = [];
    var suma  = 0;
    
    for(var k=0; k<this.series.length; k++)
    for(var i=0; i<this.series[k].data_p2.length; i++)
    {
        for(var j=0; j<this.series[k].data_p2[0].length; j++)
           suma += this.series[k].data_p2[i][j];

        lista.push(suma);
        suma = 0;
    }

    var max = 0;
    for(var i=0; i<lista.length; i++)
        if(-lista[i]<max)
            max = -lista[i];
    
    return max;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="show sum">
Chart.prototype.showS = function()
{
     var sum = true;
     var s   = this.dane.length;
     var sl  = this.series.length-1;
     for(var i=0; i<s; i++)
         if(this.series[sl-i].data[0]!=this.series[sl-i].min_h[0])
             sum = false; 
     
    if(sum)
        this.addSum = true;
    
    if(this.addSum)
    {
        this.showSum = (this.showSum) ? false : true;
        (this.showSum) ? this.setSeriesSum() : this.hideSumAnim();
        this.addSum  = false;
    }
    
    this.max = this.series[0].max;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="hide sumAnim">
Chart.prototype.hideSumAnim = function()
{
     var series = this.series;
     var s  = this.dane.length;
     var sl = series.length-1;
     for(var i=0; i<s; i++)
     {
        series[sl-i].data[0]     = -22+series[sl-i].min_h[0];
        series[sl-i].increase[0] = -1;
        series[sl-i].animDelete  = true;
     }

    var max = this.setMaxValue();
    for(var i=0; i< series.length-s; i++)
    { 
        series[i].max = max;
        series[i].changeScaleAll(true);
        
        if(series[i].anim==0)
            series[i].initAnim0();
    }
    for(var k=this.number_SeriesArray[0], x=0; x<this.number_SeriesArray.length; x++)
    {
        for(var i=0; i<series[k].data2.length; i++)
            if(series[k].anim==0)
                series[k].marks_pos[i] = series[k+series[k].data2[0].length-1].data[i];

        k = this.number_SeriesArray[x+1];
    }
    this.max = series[0].max;
};
//  </editor-fold>
  
//  <editor-fold defaultstate="collapsed" desc="hideSum">
Chart.prototype.hideSum = function()
{
     var s  = this.dane.length;
     var sl = this.series.length-1;
     for(var i=0; i<s; i++)
     {
         this.scene.removeShapes(sl-i);
         this.scene.removeObject(sl-i+'top_marks0');
         this.scene.removeObject(sl-i+'bottom_marks0');
         this.series.splice(sl-i, 1);
     }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set series sum">
Chart.prototype.setSeriesSum = function()
{
    var lista = [];
    var series= this.series;
    
    //  <editor-fold defaultstate="collapsed" desc="set series sum">
    for(var k=this.number_SeriesArray[0], x=0; x<this.number_SeriesArray.length; x++)
    {
        //  <editor-fold defaultstate="collapsed" desc="set data">
        var s    = new Series(this.scene,this.shape,this.speed,this.ShowMarks,this.anim,this.textured,this.program.alpha);
        var suma = 0;
        for (var i=0; i<series[k].data2.length; i++)
            for(var j=0; j<series[k].data2[i].length; j++)
                suma += series[k].data2[i][j];
        
        lista.push(-suma);
        s.data   = [[suma]];
        s.data_p = [[suma]];
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="init series">
        s.init();
        s.initSeries();
        series.push(s);
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="init anim parameters/marks_pos">
        if(s.anim==0)
            s.initAnim0();

        if(s.anim==1)
            s.marks_pos[0] = s.min_h[0];
        else
            s.marks_pos[0] = 0;
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set series parameters">
        s.posZ = (this.number_SeriesArray.length>1) ? series[k].posZ_new : series[k].posZ;

        s.scaleX    = series[0].scaleX;
        s.posX[0]   = series[k].posX;
        s.shape     = series[k].shape;
        s.showMarks = series[0].showMarks;
        s.anim      = series[0].anim;
        
        s.number_series    = series.length-1;       
        s.sumSeries        = true;
        s.info_data        = s.data_p;
        s.numberBaseSeries = k;
         
        s.marks_pos[0] -= s.min_h[0];
        
        if(this.series[0].textured)
        {
            var T = new Texture(this.texture,this.scene.gl);
            s.texture = T.tex;
        }

        if(s.anim==0)
            s.alpha[0]=0;
         if(s.anim==1)
            s.alpha[0]=1;
        
        s.addTabs(s.data_p[0],0,this.program.fillText,this.program.fontSize,this.program.font,this.program.lineWidth);
     //  </editor-fold>
     
        //  <editor-fold defaultstate="collapsed" desc="add shape">
        this.scene.addShapes(series.length-1, 0, 1);
        //  </editor-fold>
        
        k = this.number_SeriesArray[x+1];
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="change max value">
    lista.push(this.setMaxValue());
    var new_max = 0;
    for(var i=0; i<lista.length; i++)
        if(lista[i]<new_max)
            new_max = lista[i];
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="change scale all">
     for(var i=0; i< series.length; i++)
     { 
         series[i].max = new_max;
         series[i].changeScaleAll(true);
     }
     //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="set increase">
     var s  = this.dane.length;
     var sl = series.length-1;
     for(var i=0; i<s; i++)
     {
        series[sl-i].min_h[0]    = -20;
        series[sl-i].increase[0] = 1;
     }
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="change all marks_pos">
     for(var i=series.length-lista.length+1; i<series.length; i++)
     {
        series[i].posX_old[0] = series[i].scaleX *5;
        if(series[i].anim==1)
           series[i].marks_pos[0] = series[i].min_h[0];
       else
           series[i].marks_pos[0] = series[i].data[0];
     }
     //  </editor-fold>
     
    //  <editor-fold defaultstate="collapsed" desc="set marks_pos for anim0">
    if(this.series.showMarks)
    for(var k=this.number_SeriesArray[0], x=0; x<this.number_SeriesArray.length; x++)
    {
        for(var i=0; i<series[k].data2.length; i++)
        {
            if(series[k].anim==0)
                series[k].marks_pos[i] = series[k+series[k].data2[0].length-1].data[i];
        }
        k = this.number_SeriesArray[x+1];
    }
     //  </editor-fold>
    
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="addData">
Chart.prototype.addData = function(numberSer,val)
{    
    //  <editor-fold defaultstate="collapsed" desc="set value">
    var series = this.series;
    var combo_serie = numberSer;
    var countSeries = series[combo_serie].data2[0].length;
    var value = val;
    var str = value;
    var valueArray=str.split(","); 
   
    var diff=countSeries - valueArray.length;
    if(valueArray.length<countSeries)
        for(var i=0;i<diff;i++)
            valueArray.push(0);
    
    valueArray.length=countSeries;
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="add new line ver">
    this.program.findMaxSerie();
    if(series[combo_serie]==this.program.ser_max)
        this.scene.loadObject('models/line.json', 'line_ver'+series[0].data.length);
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="init data">
    series[combo_serie].data2.push([parseInt(valueArray[0])]);
    series[combo_serie].data_p2.push([parseInt(valueArray[0])]);
    for(var i=0;i<valueArray.length;i++)
    {
        series[combo_serie].data2[series[combo_serie].data2.length-1][i]= (parseInt(valueArray[i]));
        series[combo_serie].data_p2[series[combo_serie].data_p2.length-1][i] = (parseInt(valueArray[i]));
        series[combo_serie+i].info_data.push(parseInt(valueArray[i]));
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="add data">
    for(var i=0; i<valueArray.length;i++)
    {
        this.scene.addShapes(combo_serie+i,series[combo_serie+i].data.length, series[combo_serie+i].data.length+1);
        this.series[combo_serie+i].alpha.push(series[combo_serie+i].alphaDoc)
        if(i>=1)
        {
            var suma=0;
            for(var j=0; j<=i;j++)
                suma+=parseInt(valueArray[j]);
            
            series[combo_serie+i].addData(suma);
        }
        else
            series[combo_serie+i].addData(parseInt(valueArray[i]));
    }
     //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="add tabs">
    var suma=0;
    for(var i=0; i< valueArray.length;i++)
        suma+=parseInt(valueArray[i]);
    
   // series[combo_serie].addTabs(suma);  
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="change scale">
     for(var i=0; i<series.length; i++)
     { 
         series[i].max = this.setMaxValue();
         series[i].changeScaleAll(false);
     }  
     for(var i=0; i<series[combo_serie].data2[0].length; i++)
        series[combo_serie+i].min_h[series[combo_serie].data.length-1] = -25;
      //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="init marks_pos">
    if(this.series[0].showMarks)
    {
        for(var i=0; i<series[combo_serie].data2.length; i++)
           if(series[0].anim==1)
               series[combo_serie].marks_pos[i] = series[combo_serie+valueArray.length-1].min_h[i]-0.4;

        for(var k=this.number_SeriesArray[0], x=0; x<this.number_SeriesArray.length; x++)
        {
            for(var i=0; i<series[k].data2.length; i++)
                if(series[k].anim==0)
                    series[k].marks_pos[i] = series[k+series[k].data2[0].length-1].data[i];

            k = this.number_SeriesArray[x+1];
        }
    }
    //  </editor-fold>
   
    //  <editor-fold defaultstate="collapsed" desc="set last element (ver)">
   for(var k=0; k<series.length;k++)
   for(var i =0 ; i< series[k].data2.length;i++)
       for(var j=0; j< series[k].data2[i].length; j++)
        {
            if(series[k].data2[i][j]==0)
            {
               series[k+j].data[i]-=0.01;
               series[k].min_h[i]+=0.2;
            }    
        }
   //  </editor-fold>
   
   this.max = series[0].max;
};
//  </editor-fold>