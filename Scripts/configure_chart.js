function Chart(d)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.addSum    = true;
    this.showSum   = false;
    this.firstStep = 1.6;
    
    this.dane     = d;
    this.sumArray = [];    
    this.number_SeriesArray = [];
    
    /**
     * @member texture
     * @type String
     * @desc Set path to image for columns.
     */
    this.texture  = "images/texture1.png";
    /**
     * @member legendX
     * @type {Array}
     * @desc Set descriptions on x-axis.
     */
    this.legendX = ["Suma","Drojma","Nowakowski","Wojnowski","Kot","Rabarbar","Kozlowski","Animator","Kozakiewicz","Maslowski","Brojge","Antonowicz","Filaj","Zaporowski","Muzyk","Waja"];
    /**
     * @member legendZ
     * @type {Array}
     * @desc Set descriptions on z-axis.
     */
    this.legendZ = ["Administracja","Finanse","Bankowosc"];
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="initText">
Chart.prototype.initText = function()
{
    TextsX = this.changeTextXZ(this.legendX,TextsX,23,false);
    TextsZ = this.changeTextXZ(this.legendZ,TextsZ,33,true);
    
    if(series[0].max < -18)
        this.changeTextY(series[0].max);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="addSeries">
Chart.prototype.addSeries = function()
{
    //  <editor-fold defaultstate="collapsed" desc="set zero element">
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
        var s   = new Series();
        s.data2 = this.dane[j];
        s.posZ  = j*(-6);
        s.init();
        series.push(s);
        s.firstStep=this.firstStep;
        
        for(var i=0; i<s.data2.length; i++)
        {
             s.data.push(s.data2[i][0]);
             s.data_p.push(s.data_p2[i][0]);
             s.info_data.push(s.data_p2[i][0]);
        }
        
        var T = new Texture(this.texture);
            s.texture = T.tex;
    
        s.initSeries();  
        this.number_SeriesArray.push(series.length-1);
        for(var i=0; i<s.data2[0].length-1; i++)
            series.push(new Series());
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="set steps">
    var min_step    = 8;
    var series_base = series[0];
    for(var i=this.number_SeriesArray[0], x=0; x< this.number_SeriesArray.length; x++)
    {
        if(series[i].step < min_step)
        {
            min_step    = series[i].step;
            series_base = series[i];
        }
        i=this.number_SeriesArray[x+1];
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="set posX">
    for(var j=0; j< series.length; j++)
    {
        for(var i=0; i< series_base.posX.length; i++)
        {
            series[j].posX[i]     = series_base.posX[i];
            series[j].posX_old[i] = series_base.posX_old[i];
        }
        series[j].step   = min_step;
        series[j].scaleX = series_base.scaleX;
        series[j].initSeries();
    }
    //  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="addSeriesVert">
Chart.prototype.addSeriesVert = function()
{
    //  <editor-fold defaultstate="collapsed" desc="set series parameters">
    for(var k=this.number_SeriesArray[0], x=0; x<this.number_SeriesArray.length; x++)
    {
        //  <editor-fold defaultstate="collapsed" desc="add shape">
        Scene.addShapes(k, 0, series[k].data.length);
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set parameters">
        series[k].colorNumber      = 0;
        series[k].number_series    = k;
        series[k].numberBaseSeries = k;
        series[k].data_length      = k + series[k].data2[0].length-1;
        
        if(series[k].anim==0)
            series[k].initAnim0();
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
            
            var T = new Texture(this.texture);
            series[j].texture = T.tex;
            
            if(series[j].anim==0)
                series[j].initAnim0();

            series[j].initSeries(); 
            //  </editor-fold>

            //  <editor-fold defaultstate="collapsed" desc="add shape">
            Scene.addShapes(j, 0, series[j].data.length);
            //  </editor-fold>
        }
        //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="set marks">
        var suma = 0;
        for(var i=0; i<series[k].data_p.length; i++)
        {
            for(var j=0; j<series[k].data_p2[0].length; j++)
               suma += series[k].data_p2[i][j];

            series[k].addTabs(suma);
            suma = 0;
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set sum">
        var suma=0;
        for (var i=0; i<series[k].data2.length; i++)
            for(var j=0; j<series[k].data2[i].length; j++)
                suma += series[k].data2[i][j];
        
        this.sumArray.push(suma);
        //  </editor-fold>
        
        k=this.number_SeriesArray[x+1];
        
        //  <editor-fold defaultstate="collapsed" desc="change scale all">
        for(var i=0; i<series.length; i++)
        { 
            series[i].max = this.setMaxValue();
            series[i].changeScaleAll(true);
        }
        //  </editor-fold>
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="change scale all">
     for(var i=0; i<series.length; i++)
     { 
         series[i].max = this.setMaxValue();
         series[i].changeScaleAll(true);
     }
     //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="set marks/posZ">
    var step  = series[0].changeScaleZ(this.number_SeriesArray.length)[0];
    var scale = series[0].changeScaleZ(this.number_SeriesArray.length)[1];
    for(var k=this.number_SeriesArray[0], x=0; x<this.number_SeriesArray.length; x++)
    {
        //  <editor-fold defaultstate="collapsed" desc="set marks position">
        for(var i=0; i<series[k].data2.length; i++)
        {
            if(series[k].anim==1)
                series[k].marks_pos[i] = series[k+series[k].data2[0].length-1].min_h[i]+(series[k+series[k].data2[0].length-1].max - series[k+series[k].data2[0].length-1].data[i]);
            else
                series[k].marks_pos[i] = series[k+series[k].data2[0].length-1].min_h[i];
        }
        //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="set position Z">
        for(var j=k; j<k+series[k].data2[0].length; j++)
        {
           series[j].scaleX   = scale-0.008*j;
           series[j].posZ_new = (this.number_SeriesArray.length-x-1.5)*step-(5*(1-scale));
           series[j].animZ    = true;
        }
        //  </editor-fold>

        k = this.number_SeriesArray[x+1];
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="set anim parameters">
    if(series[0].anim==1)
        for(var i=0; i<series.length; i++)
            series[i].initAnim1();
    //  </editor-fold>
                
    //  <editor-fold defaultstate="collapsed" desc="set zeros element">
    this.setZeroElement();
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
    if(series[0].max<=-9999)
    for(var i=0; i<this.number_SeriesArray.length;i++)
        for(var j=0; j<series[0].TextsTab.length;j++)
        {
            series[0].TextsTab[j].fontSize -=25;
            series[0].TextsTab[j].init();
        }
        //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="set zero element">
   this.setZeroElement();
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
    if(series[0].max < -18)
        this.changeTextY(series[0].max);
    //  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set zeros element">
Chart.prototype.setZeroElement = function()
{
    for(var k=this.number_SeriesArray[0], x=0; x<this.number_SeriesArray.length; x++)
    {
        for(var j=k+1; j<k+series[k].data2[0].length; j++)
            for(var i=0; i<series[k].data2.length; i++)
                if(series[j].data_p[i]==series[k+series[k].data2[0].length-1].data_p[i])
                    {
                        series[j].min_h[i] += 0.4;
                    }

        k=this.number_SeriesArray[x+1];
    }
    
    
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="changeText">
Chart.prototype.changeTextY = function(max)
{
    var len   = Texts.length;
    Texts     = [];
    var scale = (-max)/len;
    
    for(var i=0; i<len; i++)
    {
        var text = new Text((scale + scale*i).toFixed(1));
        text.setText(max);
        Texts.push(text);
    }
};

Chart.prototype.changeTextXZ = function(legend,T,size,Z)
{
    var len = T.length;
    T = [];
    
    for(var i=0; i<len; i++)
    {
        var dl   = legend[i];
        var text = new Text(legend[i]);
        text.setTextXZ(dl,len,size,Z);
        T.push(text);
    }
    return T;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setMaxValue">
Chart.prototype.setMaxValue = function()
{
    var lista = [];
    var suma  = 0;
    
    for(var k=0; k<series.length; k++)
    for(var i=0; i<series[k].data_p2.length; i++)
    {
        for(var j=0; j<series[k].data_p2[0].length; j++)
           suma += series[k].data_p2[i][j];

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
     var sl  = series.length-1;
     for(var i=0; i<s; i++)
         if(series[sl-i].data[0]!=series[sl-i].min_h[0])
             sum = false; 
     
    if(sum)
        this.addSum = true;
    
    if(this.addSum)
    {
        this.showSum = (this.showSum) ? false : true;
        (this.showSum) ? this.setSeriesSum() : this.hideSumAnim();
        this.addSum  = false;
    }
    
    //  <editor-fold defaultstate="collapsed" desc="change text">
    if(series[0].max < -18)
        this.changeTextY(series[0].max);
    else
        this.changeTextY(-18);
    //  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="hide sumAnim">
Chart.prototype.hideSumAnim = function()
{
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
    
    this.initPosX();

    //  <editor-fold defaultstate="collapsed" desc="change text">
    if(series[0].max < -18)
        this.changeTextY(series[0].max);
    //  </editor-fold>
};
//  </editor-fold>
  
//  <editor-fold defaultstate="collapsed" desc="hideSum">
Chart.prototype.hideSum = function()
{
    //  <editor-fold defaultstate="collapsed" desc="remove elements">
     var s  = this.dane.length;
     var sl = series.length-1;
     for(var i=0; i<s; i++)
     {
         Scene.removeShapes(sl-i);
         Scene.removeObject(sl-i+'top_marks0');
         Scene.removeObject(sl-i+'bottom_marks0');
         series.splice(sl-i, 1);
     }
//  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set series sum">
Chart.prototype.setSeriesSum = function()
{
    var lista = [];
    
    //  <editor-fold defaultstate="collapsed" desc="set series sum">
    for(var k=this.number_SeriesArray[0], x=0; x<this.number_SeriesArray.length; x++)
    {
        //  <editor-fold defaultstate="collapsed" desc="set data">
        var s    = new Series();
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
        
        var T = new Texture(this.texture);
        s.texture = T.tex;

        if(s.anim==0)
            s.alpha[0]=0;
        
        s.addTabs(s.data_p[0]);
     //  </editor-fold>
     
        //  <editor-fold defaultstate="collapsed" desc="add shape">
        Scene.addShapes(series.length-1, 0, 1);
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
    for(var k=chart.number_SeriesArray[0], x=0; x<chart.number_SeriesArray.length; x++)
    {
        for(var i=0; i<series[k].data2.length; i++)
        {
            if(series[k].anim==0)
                series[k].marks_pos[i] = series[k+series[k].data2[0].length-1].data[i];
        }
        k = chart.number_SeriesArray[x+1];
    }
     //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="change text">
    if(series[0].max < -18)
        this.changeTextY(series[0].max);
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="init posX">
   this.initPosX(); 
   //  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="change shape">
Chart.prototype.changeShape = function(number)
{
    for(var i=0; i< series.length; i++)
    {
        series[i].shape = number;
        Scene.removeShapes(i);
        for(var j=0; j< series[i].data.length; j++)
        {
            if(series[i].sumSeries)
                series[i].min_h[j] = -23;
            
            if(series[i].anim==0)
                series[i].initAnim0();
        }
       Scene.addShapes(i, 0, series[i].data.length);
    }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set marks_pos">
Chart.prototype.setMarksPos = function()
{
    //  <editor-fold defaultstate="collapsed" desc="set sum marks_pos">
    var s  = chart.dane.length;
    var sl = series.length-1;
    for(var i=0; i<s; i++)
    {
        if(series[sl-i].anim==1)
            series[sl-i].marks_pos[0] = series[sl-i].min_h[0];
        else if(series[sl-i].anim==0)
            series[sl-i].marks_pos[0] = series[sl-i].data[0];         
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="set series marks_pos">
    for(var k=chart.number_SeriesArray[0], x=0; x<chart.number_SeriesArray.length; x++)
    {
        for(var i=0; i<series[k].data2.length; i++)
        {
            if(series[k].anim==1)
                series[k].marks_pos[i] = series[k].min_h[i];
            else
                series[k].marks_pos[i] = series[k+series[k].data2[0].length-1].data[i];
        }
        k = chart.number_SeriesArray[x+1];
    }
    //  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="init posX">
Chart.prototype.initPosX = function()
{
    for(var k=this.number_SeriesArray[0], x=0; x<this.number_SeriesArray.length; x++)
    {
        for(var j=k+1; j<k+ series[k].data2[0].length; j++)
        {
            series[j].scaleX = series[j-1].scaleX-0.008; 
            for(var i=0; i< series[k].posX.length; i++)
            {
                series[j].posX[i]     = series[k].posX[i];
                series[j].posX_old[i] = series[k].posX_old[i];
            }
        }
        k = this.number_SeriesArray[x+1];
    }
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="addData">
Chart.prototype.addData = function(numberSer,val)
{    
    //  <editor-fold defaultstate="collapsed" desc="set value">
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
    app.findMaxSerie();
    if(series[combo_serie]==ser_max)
        Scene.loadObject('models/line.json', 'line_ver'+series[0].data.length);
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
        Scene.addShapes(combo_serie+i,series[combo_serie+i].data.length, series[combo_serie+i].data.length+1);
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
    
    series[combo_serie].addTabs(suma);  
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
    //  </editor-fold>
   
    //  <editor-fold defaultstate="collapsed" desc="init posX">
   this.initPosX(); 
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
   
    //  <editor-fold defaultstate="collapsed" desc="change text">
   if(series[0].max < -18)
       this.changeTextY(series[0].max);
   //  </editor-fold>
};
//  </editor-fold>