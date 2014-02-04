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

function Demo(program)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.program=program;
    this.demoNumber = 0;
    this.addDyn = 0;
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="deleteAll">
Demo.prototype.deleteAll = function()
{
    this.program.scene.removeAll();
    this.program.TextsY   = null;
    this.program.series  = null;
    this.program.chart   = null;
    this.program.series_area=null;
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="restart">
Demo.prototype.restart = function(data,t)
{
    this.program.series  = new Array();
    this.program.chart   = new Chart(data,this.program);
    if(t)
        this.program.chart.firstStep = 2.4;
    
    this.program.chart.addSeries();
    this.program.TextsY = new Array();
    this.program.chart.addSeriesVert(); 
    this.program.picker.setSeries(this.program.series);
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setText">
Demo.prototype.setText = function()
{
    for(var i=0; i<6; i++)
    {
        this.program.scene.loadObject('models/text.json', i+'textY');
        this.program.TextsY.push(new Text(3+3*i+".0",this.program.gl,this.program.fillText,this.program.fontSize,this.program.font,this.program.lineWidth));
    }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setLines">
Demo.prototype.setLines = function(max)
{
    for(var i=0; i<max; i++)
        this.program.scene.loadObject('models/line.json', 'line_ver'+i);
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="showNextDemo">
Demo.prototype.next = function()
{
    this.program.interactor.tmp=true;
    this.program.interactor.count=0;
    this.deleteAll();
    
    this.demoNumber++;
    if(this.demoNumber==14)
        this.demoNumber=0;
        
    switch(this.demoNumber)
    {
        //  <editor-fold defaultstate="collapsed" desc="demo 0">
       case 0:
        {
            this.program.type=0;
            this.program.scene.diffCol = true;
            this.program.drawTex=false;
            var d = [[5],[8],[10],[12],[15],[21],[18],[7],[12],[15]];
            data = [];
            data.push(d);           
            this.restart(data);
            
            this.setText();
            this.program.TextsY=this.program.chart.changeTextY(this.program.TextsY);
            this.setLines(this.program.findMaxSerie())
            break;
        }
         //  </editor-fold>
         
        //  <editor-fold defaultstate="collapsed" desc="demo 1">
        case 1:
        {       
            this.program.type=1;
            
            var data = [[15],[3],[11],[3],[8],[15],[1],[12],[2],[9],[1]];
            this.setLines(data.length);
            
            var that= this;
            setTimeout(function() { that.demo1(data); }, 200);
            
         
            break;
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="demo 2">
        case 2:
        {       
            this.program.type=0;
            this.program.showMarks=false;
            this.program.anim=1;
            this.program.scene.diffCol=false;
            this.program.scene.colors = [[0.313,0.364,0.552,1],[1,1,1,1]];
            this.program.alpha=1;
            this.program.scene.type=0;
            var d = [[3],[5],[10],[16],[4],[7],[11],[9]];
            data = [];
            data.push(d);
            this.restart(data);
            this.setText();
            
            this.setLines(this.program.findMaxSerie())
            
            break;
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="demo 3">
        case 3:
        {
            this.program.scene.type=0;
            this.program.shape=0;
            this.program.scene.colors = [[1,0,0,1],[1,1,1,1]];
            var d = [[1],[5],[7],[13],[16],[14],[11],[6],[2]];
            this.program.showMarks=true;
            data = [];
            data.push(d);
            this.restart(data);
            this.setText();
            this.setLines(this.program.findMaxSerie())
            break;
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="demo 4">
        case 4:
        {
            this.program.type=0;
            this.program.showMarks=false;
            this.program.shape=1;
            this.program.anim=1;
            this.program.drawTex=false;
            this.program.scene.type=0;
            this.program.scene.colors = [[0.44,0.03,0.42,1],[1,1,1,1]];
            var d = [[4],[2],[12],[5],[17],[8],[15],[4],[13],[2],[11]];
            data = [];
            data.push(d);
            this.restart(data);
            this.setText();
            this.setLines(this.program.findMaxSerie())
            break;
         }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="demo 5">
        case 5:
        {
            this.program.type=0;
            this.program.scene.type=0;
            this.program.showMarks = true;
            this.program.drawTex=true;
            this.program.shape=1;
            var d = [[9],[15],[7],[17],[15],[12],[6],[13],[14],[12]];
            data = [];
            data.push(d);
            this.restart(data);
            this.setText();
            this.setLines(this.program.findMaxSerie());
            this.program.scene.setSeriesType(0,this.program.series);
            break;
         }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="demo 6">
        case 6:
        {
            this.program.type=0;
            this.program.showMarks= false;
            this.program.drawTex=false;
            this.program.anim=1;
            this.program.scene.type=0;
            this.program.shape=0;
            var d = [[3,5,1,3,1,1],[8,9,3,1,1,1],[3,1,4,5,7,2],[5,7,7,1,5,2],
                     [3,5,4,1,1,3],[8,9,7,3,1,3],[3,5,4,1,1,3],[1,5,1,8,4,4],[8,1,3,1,11,1],[2,11,4,6,1,9]];
            
            this.program.scene.colors = [[0.26,0.2,0.2,1],[0.86,0,0,1],[1,0.46,0,1],[1,1,0.93,1],[0.2,0.53,0.73,1],
                                      [0.26,0.2,0.2,1],[0.86,0,0,1],[1,0.46,0,1],[1,1,0.93,1],[0.2,0.53,0.73,1]];
            data = [];
            data.push(d);
            this.restart(data);
            this.setText();
            this.program.TextsY=this.program.chart.changeTextY(this.program.TextsY);
            this.setLines(this.program.findMaxSerie())
            break;
         }
        //  </editor-fold>
       
        //  <editor-fold defaultstate="collapsed" desc="demo 7">
        case 7:
        {
            this.program.anim=0;
            var d = [[15,3,1,8,3],[5,1,2,1,1],[12,6,2,2,1],[5,9,1,7,9],[1,5,2,7,4],[8,3,5,1,2],[6,11,3,4,8]]; 
            
            this.program.scene.colors = [[0.53,0.2,0,1],[1,0.4,0,2],[0.93,0.73,0.4,1],[1,0.93,0.93,1],[0.4,0.6,0.06,1],
                                     [0.53,0.2,0,1],[1,0.4,0,2],[0.93,0.73,0.4,1],[1,0.93,0.93,1],[0.4,0.6,0.06,1]];
            data = [];
            data.push(d);
            this.restart(data);
         
            this.setText();
            this.program.TextsY=this.program.chart.changeTextY(this.program.TextsY);
            this.setLines(this.program.findMaxSerie())
            break;
         }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="demo 8">
        case 8:
        {
            this.program.shape=0;
            this.program.scene.twoCol= false;
            this.program.anim=1;
            this.program.scene.colors = [[0.26,0.2,0.13,1],[0.73,0.33,0.13,1],[0.86,0.6,0.26,1],[0.73,0.86,0.8,1],[0.33,0.53,0.73,1],
                                     [0.26,0.2,0.13,1],[0.73,0.33,0.13,1],[0.86,0.6,0.26,1],[0.73,0.86,0.8,1],[0.33,0.53,0.73,1]];

            var d = [[15,3,1,8,3,3],[5,1,2,1,1,1],[12,6,2,2,1,6],[5,9,1,7,9,3],[1,5,2,7,4,8],[8,3,5,1,2,3],[6,11,3,4,8,5]]; 
            var dd = [[5,2,1],[5,6,1],[1,3,2],[7,3,7]]; 
            var ddd  = [[15,3,1,8,3],[5,1,2,1,1],[12,6,2,2,1],[11,9,1,3,1],[1,2,3,4,5]]; 
            data = [];
            data.push(dd);
            data.push(ddd);
            data.push(d);
            this.restart(data);
            for(var i=0; i<this.program.series.length;i++)
                this.program.series[i].Zoffset+=5;
            
            this.setText();
            this.program.TextsY=this.program.chart.changeTextY(this.program.TextsY);
            this.setLines(this.program.findMaxSerie())
            break;
         }
        //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="demo 9">
        case 9:
        {
            this.program.shape=2;
            this.program.scene.twoCol= true;
            this.program.scene.twoColorsPalette =[[1,0,0,1],[0,1,0,1]];

            var d  = [[15],[9],[12],[11],[16],[18],[9],[12],[7],[13]]; 
            data = [];
            data.push(d);
            this.restart(data);
            
            this.setText();
            this.setLines(this.program.findMaxSerie())
            break;
         }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="demo 10">
        case 10:
        {
            this.program.type=0;
            this.program.diffType=false;
            
            this.program.animation=false;
            this.program.scene.twoCol=false;
            
            var d  = [[13],[9],[11],[10],[16],[18],[9],[12],[7],[13]]; 
            var dd = [[14],[9],[13],[17],[21],[17],[15],[5],[12],[17]];
            data = [];
            data.push(d);
            data.push(dd);
            this.restart(data);

            var that= this;
            setTimeout(function() { that.demo10(); }, 800);
            
            this.setText();
            this.program.TextsY=this.program.chart.changeTextY(this.program.TextsY);
            this.setLines(this.program.findMaxSerie());
            break;
         }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="demo 11">
        case 11:
        {
            this.program.type=1;
            this.program.shape=0;
            
            this.program.scene.colors = [[0,1,0,1],[1,1,0,1]];
           
            var data = [[11],[7],[9],[8],[13],[15],[7],[10],[6],[11],[12],[7],[11],[14],[18],[14],[12],[4],[10],[14]]; 
            this.setLines(data.length);

            var that= this;
            setTimeout(function() { that.demo11(data); }, 200);
            
            break;
         }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="demo 12">
        case 12:
        {
            this.program.diffType = false;
            this.program.drawTex = false;
            this.program.scene.diffCol = false;
            this.program.scene.colors = [[0.44,0.03,0.42,1]];
            var d  = [[13],[9],[11],[10],[14],[18],[9]]; 
            var dd = [[14],[9],[13],[17],[15],[17],[15]];
            data = [];
            data.push(d);
            data.push(dd);
            this.restart(data,true);
            for(var i=0; i<this.program.series.length;i++)
                this.program.series[i].Zoffset+=2;

            var that=this;
            setTimeout(function() { that.demo12(); }, 2500);
           
            this.setText();
            this.setLines(this.program.findMaxSerie());
            break;
         }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="demo 13">
        case 13:
        {
            this.program.drawTex = true;
            var d  = [[13],[9],[11],[2],[5]]; 
            data = [];
            data.push(d);
            this.restart(data);
            this.addDyn = 8;

            var that=this;
            setTimeout(function() { that.demo13(); }, 2500);
           
            this.setText();
            this.setLines(this.program.findMaxSerie());
            break;
         }
        //  </editor-fold>
    }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="demo 1">
Demo.prototype.demo1 = function(data)
{
    this.program.scene.colors = [[1,0.0,0.0,1],[1,1,1,1]];
    this.program.series_area = new Series_area(this.program.gl,this.program.scene,data,this.program.speed,
    false,this.program.anim,this.program.fillText,this.program.fontSize,this.program.font,this.program.lineWidth,0.9);
    this.program.scene.setSeriesType(1,this.program.series_area);
    this.program.picker.setSeriesArea(this.program.series_area);
    this.program.interactor.type=1;
    this.program.TextsY = new Array();
    this.setText();

};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="demo 13">
Demo.prototype.demo13 = function()
{
    if(this.demoNumber==13 && this.addDyn>0)
    {
        var that=this;
        setTimeout(function() { that.demo13(); }, 3000);
            this.addDyn-=1;
        this.program.series[0].addDyn=8;
        var ran = Math.floor((Math.random()*16)+3)+""; 
        this.program.chart.addData(0,ran);
    } 

};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="demo 12">
Demo.prototype.demo12 = function()
{
    if(this.demoNumber==12)
    {
        var that=this;
        setTimeout(function() { that.demo12(); }, 2500);
        
        this.program.chart.showS();
        this.program.TextsY=this.program.chart.changeTextY(this.program.TextsY);
    } 
  
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="demo 11">
Demo.prototype.demo11 = function(data)
{
    this.program.series_area = new Series_area(this.program.gl,this.program.scene,data,this.program.speed,
    false,this.program.anim,this.program.fillText,this.program.fontSize,this.program.font,this.program.lineWidth,0.7);

    this.program.scene.setSeriesType(1,this.program.series_area);
    this.program.picker.setSeriesArea(this.program.series_area);
    this.program.series_area.Zoffset =5;
    this.program.series_area.width_Z_start =-5;
    this.program.series_area.numSeries=2;


    this.program.diffType=true;
    this.program.interactor.setDiffType(true);
            
    this.program.type=0;
    this.program.scene.type=0;

    var d = [[3],[7],[6],[6],[4],[11],[14],[9]];
    var data = [];
    data.push(d);
    this.restart(data);

    for(var i=0; i< this.program.series.length;i++)
        this.program.series[i].colorNumber =1;

    this.program.TextsY = new Array();
    this.setText();
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="demo 10">
Demo.prototype.demo10= function()
{
    this.program.series[0].colorNumber =1;
    this.program.scene.colors =[[0.66,0.75,0.69,1],[0.46,0.4,0,1]];
    for(var i=0; i<this.program.series.length;i++)
    {
        this.program.scene.removeShapes(i);
        if(this.program.series[i].numberBaseSeries==0)
        {
             this.program.series[i].shape=2;
             for(var j=0; j<this.program.series[i].data.length; j++)
                 this.program.scene.loadObject('models/cone.json', i+'cone'+j);  
        }
        else
        {
            this.program.series[i].shape=0;
            for(var j=0; j<this.program.series[i].data.length; j++)
                this.program.scene.loadObject('models/cylinder_shape.json', i+'cylinder'+j);  
        }
    }
    this.program.animation= true;
}
//  </editor-fold>

