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

var program = null;

//  <editor-fold defaultstate="collapsed" desc="program start">
(function( $ ) 
{
    $.fn.Incharts3dStart = function(jsonData) 
    {
        var canvas = this.attr("id");
        program = new Program(canvas);

        //  <editor-fold defaultstate="collapsed" desc="get info from JSON">
        for(var obj in jsonData)
        {
            if(jsonData.hasOwnProperty(obj))
            {
                for(var prop in jsonData[obj])
                { // prop = chart, tytul
                    if(jsonData[obj].hasOwnProperty(prop))
                    {
                        //  <editor-fold defaultstate="collapsed" desc="chart">
                        if(prop=="chart")
                        {
                            for(var prop2 in jsonData[obj][prop])
                            { // prop2 = shape, age
                                switch(prop2)
                                {
                                    case 'type': program.type=parseInt(jsonData[obj][prop][prop2]); break;
                                    case 'shape': program.shape=parseInt(jsonData[obj][prop][prop2]); break;
                                    case 'speed': program.speed=parseInt(jsonData[obj][prop][prop2]); break;
                                    case 'showMarks': program.showMarks=program.stringToBoolean(jsonData[obj][prop][prop2]); break;
                                    case 'animation': program.anim=parseInt(jsonData[obj][prop][prop2]); break;
                                    case 'texturePath': program.texturePath=jsonData[obj][prop][prop2]; break;
                                    case 'data': 
                                    {
                                        program.data=jsonData[obj][prop][prop2] 

                                        if(program.type==1) 
                                        {
                                            for(var i=0; i<program.data.length;i++)
                                            for(var j=program.data[i].length; j>=0;j--)
                                                if(j!=0)
                                                    program.data[i].splice(1, 1);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                         //  </editor-fold>

                        //  <editor-fold defaultstate="collapsed" desc="axisX"> 
                        else if(prop=="axisX")
                        {
                            program.legendX=[];
                            for(var prop2 in jsonData[obj][prop])
                            { 
                                for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                    program.legendX.push(jsonData[obj][prop][prop2][i])
                            }
                        }
                         //  </editor-fold>

                        //  <editor-fold defaultstate="collapsed" desc="axisZ">
                        else if(prop=="axisZ")
                        {
                            program.legendZ=[];
                            for(var prop2 in jsonData[obj][prop])
                            { 
                                for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                    program.legendZ.push(jsonData[obj][prop][prop2][i])
                            }
                        }
                        //  </editor-fold>

                        //  <editor-fold defaultstate="collapsed" desc="platform">
                        else if(prop=="platform")
                        {
                            for(var prop2 in jsonData[obj][prop])
                            { 
                                if(prop2=="backgroundColor")
                                {
                                    program.backgroundColor = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                        program.backgroundColor.push(jsonData[obj][prop][prop2][i]);
                                }
                                else
                                {
                                    var tmp= program.stringToBoolean(jsonData[obj][prop][prop2]);
                                    switch(prop2)
                                    {
                                        case 'ShowWall': program.ShowWall=tmp; break;
                                        case 'ShowWallBack': program.ShowWallBack=tmp; break;
                                        case 'ShowLine': program.ShowLine=tmp; break;
                                        case 'ShowTextY': program.ShowTextY=tmp; break;
                                        case 'ShowTextXZ': program.ShowTextXZ=tmp; break;
                                        case 'drawTex': program.drawTex=tmp; break;
                                    }
                                }
                            }
                        }
                         //  </editor-fold>

                        //  <editor-fold defaultstate="collapsed" desc="light">
                        else if(prop=="light")
                        {
                            for(var prop2 in jsonData[obj][prop])
                            { 
                                switch(prop2)
                                {
                                    case 'lightPosition' : 
                                        program.lightPosition = [];
                                        for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                            program.lightPosition.push(jsonData[obj][prop][prop2][i]); break;
                                    case 'ambient' : 
                                        program.ambient = [];
                                        for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                            program.ambient.push(jsonData[obj][prop][prop2][i]); break;
                                    case 'diffuse' : 
                                        program.diffuse = [];
                                        for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                            program.diffuse.push(jsonData[obj][prop][prop2][i]); break;
                                    case 'lightSpecular' : 
                                        program.lightSpecular = [];
                                        for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                            program.lightSpecular.push(jsonData[obj][prop][prop2][i]); break;
                                    case 'Shininess': program.Shininess=jsonData[obj][prop][prop2]; break;
                                }

                            }
                        }
                         //  </editor-fold>

                        //  <editor-fold defaultstate="collapsed" desc="text">
                        else if(prop=="text")
                        {
                            for(var prop2 in jsonData[obj][prop])
                            { 
                                switch(prop2)
                                {
                                    case 'fillText': program.fillText =jsonData[obj][prop][prop2]+""; break;
                                    case 'fontSize': program.fontSize=parseInt(jsonData[obj][prop][prop2]); break;
                                    case 'font': program.font=jsonData[obj][prop][prop2]+""; break;
                                    case 'lineWidth': program.lineWidth=parseInt(jsonData[obj][prop][prop2]); break;
                                }
                            }
                        }
                         //  </editor-fold>

                        //  <editor-fold defaultstate="collapsed" desc="colors">
                        else if(prop=="colors")
                        {
                            for(var prop2 in jsonData[obj][prop])
                            { 
                                switch(prop2)
                                {
                                    case 'lineColor' : 
                                        program.lineColor = [];
                                        for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                            program.lineColor.push(jsonData[obj][prop][prop2][i]); break;
                                    case 'wallColor' : 
                                         program.wallColor = [];
                                        for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                             program.wallColor.push(jsonData[obj][prop][prop2][i]); break;
                                    case 'marksBottomColor' : 
                                        program.marksBottomColor = [];
                                        for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                            program.marksBottomColor.push(jsonData[obj][prop][prop2][i]); break;
                                    case 'marksTopColor' : 
                                        program.marksTopColor = [];
                                        for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                            program.marksTopColor.push(jsonData[obj][prop][prop2][i]); break;
                                    case 'twoColorsPalette' : 
                                        program.twoColorsPalette = [];
                                        for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                            program.twoColorsPalette.push(jsonData[obj][prop][prop2][i]); break;
                                    case 'twoCol': program.twoCol=program.stringToBoolean(jsonData[obj][prop][prop2]); break;
                                    case 'diffColorsPalette' : 
                                        program.diffColorsPalette = [];
                                        for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                            program.diffColorsPalette.push(jsonData[obj][prop][prop2][i]);  break;
                                    case 'diffCol': program.diffCol=program.stringToBoolean(jsonData[obj][prop][prop2]); break;
                                    case 'colors' : 
                                        program.colors = [];
                                        for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                            program.colors.push(jsonData[obj][prop][prop2][i]); break;
                                    case 'alpha' :
                                        program.alpha=jsonData[obj][prop][prop2]; break;                                    
                                }
                            }
                        }
                         //  </editor-fold>
                    }
                }
            }
        }
        //  </editor-fold>

        program.start();
    };
}( jQuery ));
//  </editor-fold>

function Program(canvas)
{
    //  <editor-fold defaultstate="collapsed" desc="objects">
    this.gl = null;
    this.canvas = canvas; 
    this.scene=null;
    this.series= [];
    this.series_area = null;
    this.chart = null;
    this.shaders = null;
    this.camera = null;
    this.transforms = null;
    this.interactor = null;
    this.picker = null;
    this.demo= null;
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="properties">
    this.type = 0;
    this.shape = 0;
    this.speed = 15;
    this.showMarks = true;
    this.anim =1;
    /**
     * @member texturePath
     * @type String
     * @desc Set path to image for columns.
     */
    this.texturePath = "images/texture1.png"
    /** 
     * @member drawTex
     * @type {Boolean}
     * @desc Switch on/off texturing.
     */
    this.drawTex = false;
    this.data = [[30,5,1,3,1,3],[8,9,3,1,1,1],[3,1,4,5,7],[5,7,7,1,5,2]];
    
    this.light = null;
    this.lightPosition  = [0, -5, 50];
    this.ambient        = [0.1,0.1,0.1,0.1];
    this.diffuse        = [0.8,0.8,0.8,1];
    this.lightSpecular  = [1,1,1,1];
    this.Shininess      = 100.0;
    
    this.fillText= 'black';
    this.fontSize= 70;
    this.font= "Arial";
    this.lineWidth = 4;
    
    /**
     * @member legendX
     * @type {Array}
     * @desc Set descriptions on x-axis.
     */
    this.legendX = ["Poland", "Japan", "Germany", "Slovakia"];
    /**
     * @member legendZ
     * @type {Array}
     * @desc Set descriptions on z-axis.
     */
    this.legendZ = ["services", "industry", "agriculture"];
    /** 
     * @member ShowTextY 
     * @type {Boolean}
     * @desc Switch on/off text on y-axis.
     */
    this.ShowTextY = true;
    /** 
     * @member ShowTextXZ 
     * @type {Boolean}
     * @desc Switch on/off text on x-axis and z-axis.
     */
    this.ShowTextXZ =false;
    /** 
     * @member ShowWall
     * @type {Boolean}
     * @desc Switch on/off all walls.
     */
    this.ShowWall        =  true;
    /** 
     * @member ShowWallBack
     * @type {Boolean}
     * @desc Switch on/off left and back walls.
     */
    this.ShowWallBack    = true;
    /** 
     * @member ShowLine
     * @type {Boolean}
     * @desc Switch on/off lines on walls.
     */
    this.ShowLine        = true;
    
    /** 
     * @member backgroundColor
     * @type {Array}
     * @desc Change background color of canvas.
     */
    this.backgroundColor = [0.9019607843137255, 0.9019607843137255, 0.9019607843137255, 1.0];
    this.lineColor = [255,255,255,255];
    this.wallColor = [0.8,0.8,0.8,0.8];
    this.marksBottomColor = [0.4,0.5,0.6,0];
    this.marksTopColor = [1,1,1,0];
    this.twoColorsPalette = [[0,1,1,1],[1,1,0,1]];
    this.diffColorsPalette = [[0,0.5,0,1],[0,1,0,1],[1,1,0,1],[1,0.58,0.15,1],[0.7,0.3,0.2,1],[1,0,0,1],[1,0,0.5,1],[0.44,0.03,0.42,1],[0,0,1,1],[0,1,1,1]];
    this.diffCol = true;
    this.twoCol = false;
    this.colors = [[1,1,1,1],[1,1,1,1]];
    this.alpha =1;
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="other">
    this.ser_max = null;
    this.max_data= null;
    
    this.lastTime  = 0;
    this.elapsed   = 0;
    this.elapsed_s = 0;
    
    this.TextsY = new Array();
    this.TextsX = new Array();
    this.TextsZ = new Array();
    this.PosTextsZ = new Array();

    this.offsetX =2.5;
    this.offsetY =6;
    
    this.animation = true;
    this.diffType = false;
    //  </editor-fold>
};

//  <editor-fold defaultstate="collapsed" desc="start">
Program.prototype.start = function()
{
    this.load();
    this.load_div();
    this.add_objects(); 

    var that = this;
    setInterval(function() {that.run();} , 15);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="stringToBoolean">
Program.prototype.stringToBoolean = function(string)
{
    switch(string.toLowerCase())
    {
        case "true":  return true;
        case "false":  return false;
    }
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="load">
Program.prototype.load = function()
{
    this.canvas = document.getElementById(this.canvas);
    
    this.shaders = new Shaders(this.canvas,this.gl); 
    this.gl=this.shaders.getGL();
    
    this.light   = new Light(this.shaders.getShaderProgram(),this.gl,this.lightPosition,this.ambient,this.diffuse,this.lightSpecular,this.Shininess );
    this.camera = new Camera();
    this.scene = new Scene(this.lineColor,this.wallColor,this.marksBottomColor,this.marksTopColor,this.twoColorsPalette,this.twoCol,this.diffColorsPalette,this.diffCol,this.colors);
    this.scene.setType(this.type);
    this.picker = new Picker(this,this.shaders.getShaderProgram());
    this.demo= new Demo(this);
    
    this.configure();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="changeTextXZ">
Program.prototype.changeTextXZ = function(legend,T,size,Z)
{
    var len = T.length;
    T = [];
    
    for(var i=0; i<len; i++)
    {
        var dl   = legend[i];
        var text = new Text(legend[i],this.gl,this.fillText,this.fontSize,this.font,this.lineWidth);
        text.setTextXZ(dl,len,size,Z);
        T.push(text);
    }
    return T;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="load_div">
Program.prototype.load_div = function()
{
    var legendDiv = document.createElement('div');
    legendDiv.id = 'legend';
    legendDiv.style.position = "absolute";
    legendDiv.style.width = "20px";
    legendDiv.style.height = "20px";
    legendDiv.style.background = "#000";
    
    css = {
      position: 'absolute',
      width: 'auto',
      height: 'auto',
      background: '#fff',
      padding: 10 + 'px',
      zIndex: 2,
      'mozBorderRadius': '3px',
      'webkitBorderRadius': '3px',
      'khtmlBorderRadius': '3px',
      'borderRadius': '3px'
    }; 
    
    for(var i in css){
        legendDiv.style[i] = css[i];
    }
    
    document.getElementsByTagName('body')[0].appendChild(legendDiv);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="show">
pokaz = function()
{
    if(program.type==0)
    {
        program.chart.showS();
        program.TextsY=program.chart.changeTextY(program.TextsY);
    }
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="next">
next = function()
{
    program.demo.next();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setAxisY">
Program.prototype.setAxisY = function()
{
    if(this.ShowTextY)
    for(var i=0; i<6; i++)
    {
        this.scene.loadObject('models/text.json', i+'textY');
        this.TextsY.push(new Text(3+3*i+".0",this.gl,this.fillText,this.fontSize,this.font,this.lineWidth));
    }
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="add_shapes">
Program.prototype.add_shapes = function()
{
    switch(this.type)
    {
        case 0:
            this.series  = new Array();
            this.chart = new Chart(this.setDefault(),this);
            this.chart.addSeries();
            this.chart.addSeriesVert();
            this.picker.setSeries(this.series);
            this.max_data = this.findMaxSerie();
            if(this.series[0].max<-18)
                this.TextsY=this.chart.changeTextY(this.TextsY);
            if(this.ShowTextXZ)
            for(var i=0; i<this.series.length;i++)
            {
                if(this.series[i].number_series==this.series[i].numberBaseSeries)
                    this.PosTextsZ.push(this.series[i].posZ+12*this.series[0].scaleX);
            }
            break;
        case 1:
            this.series_area = new Series_area(this.gl,this.scene,this.data,this.speed,this.showMarks,this.anim,this.fillText,this.fontSize,this.font,this.lineWidth,this.alpha);
            this.max_data = this.series_area.data_pier.length;
            this.scene.setSeriesType(this.type,this.series_area);
            this.picker.setSeriesArea(this.series_area);
            this.TextsY=this.series_area.changeTextY(this.TextsY);
            if(this.ShowTextXZ)
                this.PosTextsZ.push(this.series_area.width_Z_start);
            break;
    }
    
    //  <editor-fold defaultstate="collapsed" desc="add_lines">
    if(this.ShowLine)
    {
        for(var i=0; i<6; i++)
        {
            this.scene.loadObject('models/line.json', 'line_back'+i);
            this.scene.loadObject('models/line.json', 'line_left'+i);
        }
        for(var i=0; i<this.max_data; i++)
            this.scene.loadObject('models/line.json', 'line_ver'+i);
    }
    //  </editor-fold>
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="add_object">
Program.prototype.add_objects = function()
{
    this.scene.setGL(this.gl);
    this.scene.loadObject('models/floor.json', 'floor'); 

    //  <editor-fold defaultstate="collapsed" desc="add_walls">
    if(this.ShowWall)
    {
        this.scene.loadObject('models/wall_back.json', 'wall_bottom');
        if(this.ShowWallBack)
        {
            this.scene.loadObject('models/wall_back.json', 'wall_back');
            this.scene.loadObject('models/wall_back.json', 'wall_left');
        }
    }
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="add_textsY">
    var that = this;
    setTimeout(function() { that.setAxisY(); }, 300);
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="add_shapes">
     var that = this;
    setTimeout(function() { that.add_shapes(); }, 300);
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="add_textsXZ">
    if(this.ShowTextXZ)
    {
        for(var i=0; i<this.max_data; i++)
        {
            this.scene.loadObject('models/text.json', i+'textX');
            this.TextsX.push(new Text(this.legendX[i],this.gl,this.fillText,this.fontSize,this.font,this.lineWidth));
        }
        switch(this.type)
        {
            case 0:
                for(var i=0; i<this.chart.number_SeriesArray.length; i++)
                {
                    this.scene.loadObject('models/text.json', i+'textZ');
                    this.TextsZ.push(new Text(this.legendZ[i],this.gl,this.fillText,this.fontSize,this.font,this.lineWidth));
                }
                break;
            case 1:
                this.scene.loadObject('models/text.json', '0textZ');
                this.TextsZ.push(new Text(this.legendZ[0],this.gl,this.fillText,this.fontSize,this.font,this.lineWidth));
                break;
                
        }
    }
    if(this.ShowTextXZ)
    {
        this.TextsX = this.changeTextXZ(this.legendX,this.TextsX,23,false);
        this.TextsZ = this.changeTextXZ(this.legendZ,this.TextsZ,27,true);
    }
    //  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setDefault">
Program.prototype.setDefault = function()
{
    var dataArray = this.data;
    var d = [];
    d.push(dataArray);
    return d;
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="find longest series">
Program.prototype.findMaxSerie = function()
{
    this.ser_max = this.series[0];
    if(this.chart.number_SeriesArray.length>1)
    for(var i = this.chart.number_SeriesArray[1], x = 0; x < this.chart.number_SeriesArray.length; x++)
    {
        if(this.series[i].data.length>this.ser_max.data.length)
            this.ser_max = this.series[i];
        
        i=this.chart.number_SeriesArray[x+1];
    }
    return this.ser_max.data.length;
};
 //  </editor-fold>
 
//  <editor-fold defaultstate="collapsed" desc="run">
Program.prototype.run = function()
{
    this.timeTick();
    if(this.type==0 && this.animation)
    {
        for(var i=0; i< this.series.length; i++)
            this.series[i].animate(this.elapsed_s,this.series,this.chart);
    }
    
    this.drawScene();
};
 //  </editor-fold>
 
//  <editor-fold defaultstate="collapsed" desc="configure">
Program.prototype.configure = function()
{
    this.gl.clearColor(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2], this.backgroundColor[3]);
    this.gl.clearDepth(1.0);
    
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
         
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);   
    this.gl.blendColor(1.0, 1.0, 1.0, 1.0); 
    
    //  <editor-fold defaultstate="collapsed" desc="set transforms">
    this.transforms = new MatrixTransformations(this.camera,this.canvas,this.shaders.getShaderProgram());
    //  </editor-fold>
    
    this.interactor = new ListenerEvents(this.camera,this.canvas, this.type);
    this.interactor.setPicker(this.picker);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="drawScene">
Program.prototype.drawScene = function()
{
    //  <editor-fold defaultstate="collapsed" desc="set variables">
    var gl = this.shaders.getGL();
    var transforms = this.transforms;
    var shaderProgram = this.shaders.getShaderProgram();
    
    var numLine_back =0;
    var numLine_left =0;
    var numLine_ver =0;
    
    var numTextY  = 0;
    var numTextX = 0;
    var numTextZ = 0;
    
    switch(this.type)
    {
        case 0:
            for(var k=0; k<this.series.length; k++)
            {
              this.series[k].numTab_bottom = 0;
              this.series[k].numTab = 0;
            }
            break;
        case 1:
          //  if(this.series_area==null)
              //  break;
            //    this.series_area = new Series_area(this.gl,this.scene,this.data,this.speed,this.showMarks,this.anim,this.fillText,this.fontSize,this.font,this.lineWidth,this.alpha);
            this.series_area.numTab=0;
            this.series_area.numTab_bottom = 0;
            break;
   }
    
   //  </editor-fold>
     
    //  <editor-fold defaultstate="collapsed" desc="clear">
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
    mat4.perspective(30, this.canvas.width/this.canvas.height, 0.1, 1000.0, this.transforms.pMatrix);
    //  </editor-fold>

    for(var i=0; i<this.scene.objects.length; i++)
    {
        //  <editor-fold defaultstate="collapsed" desc="get object">
        var object = this.scene.objects[i];
         //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="calculate ModelView">
        transforms.mvMatrix = mat4.inverse(this.camera.matrix, mat4.create());
        transforms.push();
         //  </editor-fold>
         
        //  <editor-fold defaultstate="collapsed" desc="set uniform">
        try{
            gl.uniform4fv(shaderProgram.uMaterialDiffuse, object.diffuse);
        }catch(err)
        {
            object.diffuse=this.scene.colors[0];
            gl.uniform4fv(shaderProgram.uMaterialDiffuse, object.diffuse);
        }
        
        gl.uniform4fv(shaderProgram.uMaterialAmbient, object.ambient);
        gl.uniform4fv(shaderProgram.uMaterialSpecular, object.specular);
        gl.uniform1i(shaderProgram.uWireframe, object.wireframe);
        gl.uniform4fv(shaderProgram.uPickingColor, object.pcolor);
        gl.uniform1i(shaderProgram.uUseTextures, false);
        gl.uniform1i(shaderProgram.uUseShadow, true);
        gl.uniform1f(shaderProgram.uAlpha, 1.0);
        gl.enable(gl.BLEND);
        
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        gl.disableVertexAttribArray(shaderProgram.aVertexNormal);
        gl.disableVertexAttribArray(shaderProgram.textureCoordAttribute);
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set floor position">
        if(object.alias == 'floor')
        {
            mat4.translate(transforms.mvMatrix, [-130+this.offsetX, -14.7-this.offsetY, -170]);
            mat4.scale(transforms.mvMatrix, [12, 14, 12]) ;
            mat4.rotate(transforms.mvMatrix, 1.57, [1, 0, 0]);
            gl.uniform1f(shaderProgram.uAlpha, 0.0);
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set wall position">
        else if(object.alias.substring(0,4)=='wall')
        {
            var obj = object.alias.substring(0,9);

            if(obj=='wall_back')
                mat4.translate(transforms.mvMatrix, [0+this.offsetX, -0.1-this.offsetY, -10.2]);
            else if(object.alias.substring(0,11)=='wall_bottom')
            {
                mat4.translate(transforms.mvMatrix, [0+this.offsetX, -0.6-this.offsetY, -10.3]);
                mat4.rotate(transforms.mvMatrix, 1.57, [1, 0, 0]);
                mat4.scale(transforms.mvMatrix, [1, 0.92, 10]);
            }
            else if(obj=='wall_left')
            {
                mat4.translate(transforms.mvMatrix, [0+this.offsetX, -0.1-this.offsetY, 10]);
                mat4.rotate(transforms.mvMatrix, 1.57,[0, 1, 0]);
                mat4.scale(transforms.mvMatrix, [0.405, 1, 1]);
            }
        }
 
        //  </editor-fold>
          
        //  <editor-fold defaultstate="collapsed" desc="set line position">
        else if(object.alias.substring(0,4)=='line')
        {
            var obj = object.alias.substring(0,9);

            if(obj=='line_back')
            {  
                mat4.translate(transforms.mvMatrix, [0+this.offsetX, 53+numLine_back*3-this.offsetY, -10.15]);
                numLine_back += 1; 
            }
            else if(obj=='line_left')
            {
                mat4.translate(transforms.mvMatrix, [0.05+this.offsetX, 53+numLine_left*3-this.offsetY, 10]);
                mat4.scale(transforms.mvMatrix, [1, 1, 0.4]);
                mat4.rotate(transforms.mvMatrix,1.57,[0, 1, 0]);
                numLine_left += 1;
            }
            else if(object.alias.substring(0,8)=='line_ver')
            {
               if(this.type==1 || this.diffType)
                    mat4.translate(transforms.mvMatrix, [-48+this.series_area.lineVer_pos[numLine_ver]+this.offsetX, 0-this.offsetY, -10.15]);
           
               else if(this.type==0)
                    mat4.translate(transforms.mvMatrix, [-50+this.ser_max.posX[numLine_ver]+this.offsetX, -this.offsetY, -10.15]);
               
                mat4.scale(transforms.mvMatrix, [1, 0.435, 1]);
               mat4.rotate(transforms.mvMatrix, 1.57, [0, 0, 1]);
               numLine_ver += 1;
            }
        }

         //  </editor-fold>
          
        //  <editor-fold defaultstate="collapsed" desc="set texts position">  
        else if(object.alias.substring(1,6)=='textY')
        {
            mat4.translate(transforms.mvMatrix, [-3.3+3.3*((1-this.TextsY[numTextY].scaleX)*0.5)+this.offsetX, 1.3+numTextY*3-this.offsetY, 10.0]); 
            mat4.scale(transforms.mvMatrix, [this.TextsY[numTextY].scaleX, this.TextsY[numTextY].scaleY, 1.0]);  
        }
        else if(object.alias.substring(1,6)=='textX' || object.alias.substring(2,7)=='textX')
        {  
            var posX = 0;
            if(this.camera.horizontal<0)
                 posX -= 5;

            if(this.ShowTextXZ)
            {
                switch(this.type)
                {
                    case 0:
                        mat4.translate(transforms.mvMatrix, [this.ser_max.posX[numTextX]+2+posX+this.offsetX, (-4-this.camera.vertical/8)*this.TextsX[numTextX].bottom-this.offsetY, 15]);
                        break;
                    case 1:
                        mat4.translate(transforms.mvMatrix, [this.series_area.lineVer_pos[numTextX]+this.offsetX, (-4-this.camera.vertical/8)*this.TextsX[numTextX].bottom-this.offsetY, 15]);
                        break;
                }

                mat4.rotateX(transforms.mvMatrix, this.camera.vertical * Math.PI/180);
                mat4.rotateY(transforms.mvMatrix, this.camera.horizontal * Math.PI/180);
                mat4.rotate(transforms.mvMatrix, 0.6, [0, 0, 1]);
                mat4.rotate(transforms.mvMatrix, 0.1, [0, 1, 0]); 
                mat4.scale(transforms.mvMatrix, [this.TextsX[numTextX].scaleX, this.TextsX[numTextX].scaleY, 1.0]);              
            }
            if(this.camera.horizontal<0)
                 mat4.rotate(transforms.mvMatrix, -1.3, [0, 0, 1]);
        }
        else if(object.alias.substring(1,6)=='textZ' || object.alias.substring(2,7)=='textZ')
        {    
            mat4.translate(transforms.mvMatrix, [53+this.offsetX, -3-this.camera.vertical/8+numTextZ-this.offsetY, this.PosTextsZ[numTextZ]-this.camera.horizontal/10]);
            mat4.rotateX(transforms.mvMatrix, this.camera.vertical * Math.PI/180);
            mat4.rotateY(transforms.mvMatrix, this.camera.horizontal * Math.PI/180);
            mat4.scale(transforms.mvMatrix, [this.TextsZ[numTextZ].scaleX, this.TextsZ[numTextZ].scaleY, 1.0]);
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set top_marks">
        else if(object.alias.substring(1,10)=='top_marks' || object.alias.substring(2,11)=='top_marks' )
        {
            switch(this.type)
            {
                case 0:
                    var index = (!isNaN(object.alias.charAt(1))) ? object.alias.substring(0,2) : object.alias.substring(0,1);
                    mat4.translate(transforms.mvMatrix, [this.series[index].posX_old[this.series[index].numTab]+this.offsetX, 18+this.series[index].marks_pos[this.series[index].numTab]+1-this.offsetY, this.series[index].posZ+this.series[index].Zoffset]);
                    mat4.scale(transforms.mvMatrix, [0.45, 0.1, 0.01]); 
                    break;
                case 1:
                    var Y=this.series_area.data[this.series_area.numTab]+0.8-this.offsetY
                    if(this.series_area.anim==1)
                        Y=this.series_area.posY +this.series_area.data[this.series_area.numTab]+1-this.offsetY;

                    mat4.translate(transforms.mvMatrix, [2.5+this.series_area.lineVer_pos[this.series_area.numTab]+ this.offsetX, 
                        Y, this.series_area.label_pos_Z+this.series_area.width_Z_start]);

                    mat4.scale(transforms.mvMatrix, [0.45, 0.1, 0.01]); 
                break;
            }
        }  
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set bottom_marks">
        else if(object.alias.substring(1,13)=='bottom_marks' || object.alias.substring(2,14)=='bottom_marks')
        {          
            switch(this.type)
            {
                case 0:
                    var index = (!isNaN(object.alias.charAt(1))) ? object.alias.substring(0,2) : object.alias.substring(0,1);
                    mat4.translate(transforms.mvMatrix, [this.series[index].posX_old[this.series[index].numTab_bottom]+this.offsetX, 17+this.series[index].marks_pos[this.series[index].numTab_bottom]-this.offsetY, this.series[index].posZ+this.series[index].Zoffset]);
                    mat4.scale(transforms.mvMatrix, [0.05, 0.2, 0.05]); 
                    this.series[index].numTab_bottom += 1;
                    break;
                case 1:
                    if(this.series_area.showMarks)
                    {
                        var tmp=2.5;
                        if(this.series_area.numTab_bottom==0)
                            tmp+=0.3;
                        if(this.series_area.numTab_bottom==this.series_area.data.length-1)
                            tmp-=0.3;
                        
                        var Y=this.series_area.data[this.series_area.numTab_bottom]-1.2-this.offsetY
                        if(this.series_area.anim==1)
                            Y=this.series_area.posY+this.series_area.data[this.series_area.numTab_bottom]-1-this.offsetY;
                        

                        mat4.translate(transforms.mvMatrix, [tmp+this.series_area.lineVer_pos[this.series_area.numTab_bottom]+this.offsetX, 
                            Y,  this.series_area.label_pos_Z+this.series_area.width_Z_start]);
  
                        mat4.scale(transforms.mvMatrix, [0.05, 0.2, 0.05]); 
                        this.series_area.numTab_bottom += 1;
                    }
                    break;
            }
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set shapes">
        else
        {
            if(this.type==0)
            {
                if(!isNaN(parseInt(object.alias.substring(0,1))))
                {
                    var k = (!isNaN(object.alias.charAt(1))) ? object.alias.substring(0,2) : object.alias.substring(0,1);
                    var j=(!isNaN(object.alias.charAt(object.alias.length-2))) ? object.alias.substring(object.alias.length-2,object.alias.length) : object.alias.charAt(object.alias.length-1);
                    
                    if(object.alias === k+"cube"+j)
                        this.setShape(k, j, this.series[k].scaleX, 1, transforms);
                    else if(object.alias === k+"cylinder"+j)
                    {  
                        mat4.translate(transforms.mvMatrix, [0, 7.9, 0]);
                        this.setShape(k, j, this.series[k].scaleX*3, 9.9,transforms);
                        mat4.rotate(transforms.mvMatrix,1.57,[1 ,0, 0]);
                        mat4.rotate(transforms.mvMatrix,0.9,[0, 0, 1]);
                    }
                    else if(object.alias === k+"cone"+j)
                    {
                        mat4.translate(transforms.mvMatrix, [0,8,0]);
                        this.setShape(k,j,this.series[k].scaleX*3,10,transforms);
                        mat4.rotate(transforms.mvMatrix,-1.57,[1,0,0]);
                    }
                    gl.uniform1f(shaderProgram.uAlpha, this.series[k].alpha[j]);
                }
            }
            if(this.type==1 || this.diffType)
            {
                if(object.alias.substring(0,11) == "series_area") 
                {
                    if(this.series_area.anim==1)
                    {
                        mat4.translate(transforms.mvMatrix, [2.5+this.offsetX,this.series_area.posY-this.offsetY,this.series_area.width_Z_start]);
                        this.series_area.setPositionY();
                        gl.uniform1f(shaderProgram.uAlpha,this.series_area.alphaDoc);
                    }
                    else if(this.series_area.anim==0)
                    {
                        mat4.translate(transforms.mvMatrix, [2.5+this.offsetX,-6.5,this.series_area.width_Z_start]);
                        this.series_area.setAlpha();
                        gl.uniform1f(shaderProgram.uAlpha,this.series_area.alpha);
                    }
                }
                else if(object.alias.substring(0,4) == "cube") 
                {
             
                    mat4.translate(transforms.mvMatrix, [2.5+this.offsetX,this.series_area.posY-this.offsetY,this.series_area.width_Z_start+this.series_area.Zoffset]);
                    this.series_area.setPositionY();
                    gl.uniform1f(shaderProgram.uAlpha,0);
                   // gl.disable(gl.BLEND);
                }
                else if (object.alias.substring(0,11) == "picker_line") 
                {
                    mat4.translate(transforms.mvMatrix, [2.5+this.offsetX+this.series_area.picker_line_posX,this.series_area.picker_line_posY-0.4-this.offsetY,this.series_area.width_Z_start]);
                    this.series_area.setPositionY();
                    gl.uniform1f(shaderProgram.uAlpha,1);
                    mat4.scale(transforms.mvMatrix, [0.01, 0.01, 0.3]);
                    mat4.rotate(transforms.mvMatrix,-1.57,[1,0,0]);
                }
            }
        }
        //  </editor-fold>
         
        //  <editor-fold defaultstate="collapsed" desc="set matrix uniform">
        transforms.complementShaders(gl);
        transforms.pop();
         //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="enable vertex attribute">
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo); 
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
         //  </editor-fold>
         
        //  <editor-fold defaultstate="collapsed" desc="set texture buffer">
        if (object.texture_coords)
        {
            var t = object.alias;
            if(!((t.substring(1,5)=='cube' || t.substring(1,9)=='cylinder' || t.substring(2,6)=='cube' || t.substring(2,10)=='cylinder' ||  t.substring(1,5)=='cone' || t.substring(2,6)=='cone' ) && !this.series[0].textured))
            {
                gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
                gl.uniform1i(shaderProgram.uUseTextures, true);
                gl.bindBuffer(gl.ARRAY_BUFFER, object.tbo);
                gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
                gl.activeTexture(gl.TEXTURE0);
                
                //  <editor-fold defaultstate="collapsed" desc="set text texture">
                if(object.alias.substring(1,6)=='textY')
                {   
                   gl.bindTexture(gl.TEXTURE_2D, this.TextsY[numTextY].texture);
                   gl.uniform1i(shaderProgram.uUseShadow, false);
                   numTextY += 1;
                }
                else if(object.alias.substring(1,6)=='textX' || object.alias.substring(2,7)=='textX')
                {   
                   gl.bindTexture(gl.TEXTURE_2D, this.TextsX[numTextX].texture);
                   gl.uniform1i(shaderProgram.uUseShadow, false);
                   numTextX += 1;
                }
                else if(object.alias.substring(1,6)=='textZ' || object.alias.substring(2,7)=='textZ')
                {   
                   gl.bindTexture(gl.TEXTURE_2D, this.TextsZ[numTextZ].texture);
                   gl.uniform1i(shaderProgram.uUseShadow, false);
                   numTextZ += 1;
                }
                 //  </editor-fold>
            
                //  <editor-fold defaultstate="collapsed" desc="set top_marks texture">
                else if (object.alias.substring(1,10)=='top_marks' || object.alias.substring(2,11)=='top_marks' )
                {
                    switch(this.type)
                    {
                        case 0:
                            var index = (!isNaN(object.alias.charAt(1))) ? object.alias.substring(0,2) : object.alias.substring(0,1);
                            gl.bindTexture(gl.TEXTURE_2D, this.series[index].TextsTab[this.series[index].numTab].texture);
                            this.series[index].numTab += 1;
                            break;
                        case 1:
                            gl.bindTexture(gl.TEXTURE_2D, this.series_area.TextsTab[this.series_area.numTab].texture);                
                            this.series_area.numTab += 1;
                            break;
                    }
                }
                 //  </editor-fold>
            
                else
                    gl.bindTexture(gl.TEXTURE_2D,this.series[0].texture);
                
                gl.uniform1i(shaderProgram.samplerUniform, 0);
            }
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set normal buffer">
        if(!object.wireframe)
        {
            gl.enableVertexAttribArray(shaderProgram.aVertexNormal);
            gl.bindBuffer(gl.ARRAY_BUFFER, object.nbo);
            gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0,0);
        }
        //  </editor-fold>
    
        //  <editor-fold defaultstate="collapsed" desc="bind buffer indices">
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.ibo);
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="draw elements">
        if(object.alias.substring(0,4)=='line')
            gl.drawElements(gl.LINES, object.indices.length, gl.UNSIGNED_SHORT, 0);
        else
            gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
           //  </editor-fold>
           
        //  <editor-fold defaultstate="collapsed" desc="disable">   
        gl.disableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        gl.disableVertexAttribArray(shaderProgram.aVertexNormal);
        gl.disableVertexAttribArray(shaderProgram.textureCoordAttribute);
        //  </editor-fold>
    }
};
//  </editor-fold>
 
//  <editor-fold defaultstate="collapsed" desc="setShape">
Program.prototype.setShape = function(indexSeries, index, scale_hor, scale_ver, transforms)
{ 
    mat4.translate(transforms.mvMatrix, [this.series[indexSeries].posX_old[index]+this.offsetX, this.series[indexSeries].min_h[index]-this.offsetY, this.series[indexSeries].posZ+this.series[indexSeries].Zoffset]);
    mat4.scale(transforms.mvMatrix, [scale_hor, scale_ver, scale_hor]);
};
 //  </editor-fold>
 
//  <editor-fold defaultstate="collapsed" desc="timeTick">
Program.prototype.timeTick = function()
{
    var timeNow = (new Date).getTime();
    if (this.lastTime !== 0)
    {
        this.elapsed = timeNow - this.lastTime;
        this.elapsed_s = this.elapsed/1000;
    }
    this.lastTime = timeNow;
};
 //  </editor-fold>