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

function Picker(program, shaderProgram)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">  
    this.canvas       = program.canvas;
    this.gl           = program.gl;
    this.program      = program;
    this.shaderProgram = shaderProgram;
    this.scene        = program.scene;
    this.series_area  = null;
    this.series       = null;
    this.texture      = null;
    this.framebuffer  = null;
    this.renderbuffer = null;
    this.showLegend   = true;
    
    this.color         = [];
    this.coords        = [];
    this.showLegend    = true;
    this.objectsList   = [];
    this.first         = true;

    this.init();
    //  </editor-fold>
};

//  <editor-fold defaultstate="collapsed" desc="setSeriesArea">
Picker.prototype.setSeriesArea = function(series)
{
    this.series_area=series;
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setSeries">
Picker.prototype.setSeries = function(series)
{
    this.series=series;
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="init">
Picker.prototype.init = function(){

    var width  = this.canvas.width;
    var height = this.canvas.height;
    var gl = this.gl;
    
    this.color[0]=255;
    this.color[1]=255;
    this.color[2]=255;
    
    this.renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
    
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	
    this.framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);
	
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="isSame">
Picker.prototype.isSame = function(picColor, color)
{
    var i = Math.abs(Math.round(color[0]*255) - picColor[0]);
    var j = Math.abs(Math.round(color[1]*255) - picColor[1]);
    var k = Math.abs(Math.round(color[2]*255) - picColor[2]);
    return (i <= 1 && j<= 1 && k<= 1);
};
//  </editor-fold>

Picker.prototype.g = function()
{
    this.stop();
}
//  <editor-fold defaultstate="collapsed" desc="getObject">
Picker.prototype.getObject = function(coords)
{
    //  <editor-fold defaultstate="collapsed" desc="get pixels">
    var gl = this.gl;
    var picColor = new Uint8Array(4);

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.readPixels(coords[0], coords[1], 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, picColor);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="set coords">
    this.coords[0] = coords[0];
    this.coords[1] = coords[1];
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="find new object">
    var color = [picColor[0], picColor[1], picColor[2], 1.0];
    
    if(this.first)
    if(this.color[0] == color[0] || this.color[1] == color[1] || this.color[2] == color[2])
    {
        var that = this;
        //setTimeout(function() { that.g(); }, 2000);
        this.first=false;
       // this.stop();
    }
    if(this.color[0] != color[0] || this.color[1] != color[1] || this.color[2] != color[2])
    {         
        var getObject = false;
        for(var i=0; i<this.scene.objects.length;  i++)
        {
            //  <editor-fold defaultstate="collapsed" desc="get object property">
            var ob = this.scene.objects[i];
            
            if (ob.alias == 'floor' || ob.alias.substring(0,4)=='wall' ||  ob.alias.substring(0,4)=='line') continue;
            if(ob.alias.substring(1,10)=='top_marks' || ob.alias.substring(2,11)=='top_marks') continue;
            if(ob.alias.substring(1,13)=='bottom_marks' || ob.alias.substring(2,14)=='bottom_marks') continue;
            if(ob.alias.substring(1,5)=='text')continue;
            if(this.program.type==1 && ob.alias.substring(0,4)!='cube' && !this.program.diffType) continue;
            
            var pickerColor  = ob.pcolor;
            this.color     = color;
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="compare colors">
            if (this.isSame(picColor, pickerColor))
            {      
                this.stop();

                this.objectsList.push(ob);
                if(this.showLegend)
                {
                    if(ob.alias.substring(0,4)=='cube')
                        this.getSeriesArea(ob.alias); 
                    else if(this.program.type==0)
                        this.getSeries(ob.alias);  
                }

                this.selectObject(ob); 
                getObject = true;
                break;
            }
            //  </editor-fold>
        }
        this.render();
        return getObject;
    }
    else
       return true;   
   //  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="get series_area">
Picker.prototype.getSeriesArea = function(alias)
{
    var shapeNumber=0;
    if(alias.substring(0,4)=='cube')
       shapeNumber = (this.series_area.data.length<10) ? alias.substring(4,5) : alias.substring(4,6);

    for(var i=0; i<this.scene.objects.length;i++)
        if(this.scene.objects[i].alias == alias)
        {
            this.setDataArea(1,shapeNumber);
            this.color[0] += 1;
            this.series_area.picker_line_posX= this.series_area.lineVer_pos[shapeNumber];
            this.series_area.picker_line_posY= this.series_area.data[shapeNumber];
        }
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="get series">
Picker.prototype.getSeries = function(alias)
{
    var series_number =0;
    var shapeNumber = 0;
    series_number = (!isNaN(alias.charAt(1))) ? alias.substring(0,2) : alias.substring(0,1);;
    shapeNumber = (!isNaN(alias.charAt(alias.length-2))) ? alias.substring(alias.length-2,alias.length) : alias.charAt(alias.length-1);
         
    for(var i=0; i<this.scene.objects.length;i++)
        if(this.scene.objects[i].alias == alias)
        {
            this.setData(series_number, shapeNumber);
            this.color[0] += 1;
        }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set dataArea">
Picker.prototype.setDataArea = function(series_number,index)
{
    var height  = this.series_area.data_pier[index];
    var num_ser = "sum ";
    var num_ser  = this.series_area.numSeries;
    this.setMessage(height,num_ser,index,0);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set data">
Picker.prototype.setData = function(series_number,index)
{
    if(this.series[series_number]!='undefined')
    {
        var height  = this.series[series_number].info_data[index];
        var num_ser = "sum ";
        for(var j=0; j<this.program.chart.number_SeriesArray.length; j++)
            if(this.series[series_number].numberBaseSeries==this.program.chart.number_SeriesArray[j])
               var numZ = j;

        if(!this.series[series_number].sumSeries)   
        {
            num_ser  = " ";
            num_ser += this.series[series_number].number_series+1;
        }

        this.setMessage(height,num_ser,index,numZ);
    }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set message">
Picker.prototype.setMessage = function(height,num_ser,index,numZ)
{
    var osX     = this.program.legendX[index];
    var osZ    = this.program.legendZ[numZ];
    var mouseX = this.coords[0];
    var mouseY = this.coords[1];
    
    this.showLegend=false;
    if(!this.showLegend) {
        var legendDiv = document.getElementById('legend');
        
        legendDiv.innerHTML = '';
        legendDiv.innerHTML = legendDiv.innerHTML + "<span>height: "+ height +"</span><br/>";
        legendDiv.innerHTML = legendDiv.innerHTML + "<span>series: "+ num_ser +"</span><br/>";
        legendDiv.innerHTML = legendDiv.innerHTML + "<span>axis X: "+ osX +"</span><br/>";
        legendDiv.innerHTML = legendDiv.innerHTML + "<span>axis Z: "+ osZ +"</span><br/>";
        legendDiv.innerHTML = legendDiv.innerHTML + "<span>mousePosX: "+ mouseX +"</span><br/>";
        legendDiv.innerHTML = legendDiv.innerHTML + "<span>mousePosY: "+ mouseY +"</span><br/>";
        
        css = {
            "text-align": "left", 
            "margin": "0 auto",
            "fontFamily": "Open Sans", 
            "fontSize": "x-small", 
            "color": "#000",
            "display": "block"
        };
        
        for(var i in css){
            legendDiv.style[i] = css[i];
        }
    }
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="stop picker">
Picker.prototype.stop = function()
{
    if (this.clearObject(this.objectsList) != null && this.objectsList.length > 0)
        this.clearObject(this.objectsList);

    this.objectsList = [];
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="select/clear objects">
Picker.prototype.selectObject = function(ob)
{
    ob.previous = ob.diffuse;  
    ob.diffuse  = [ob.diffuse[0]-0.2, ob.diffuse[1]-0.2, ob.diffuse[2]-0.2, 1.0];
};

Picker.prototype.deletePickerLine = function()
{
    this.series_area.picker_line_posX= -10;
    this.series_area.picker_line_posY= -10;
};

Picker.prototype.clearObject = function(objects)
{
    for(var i=0; i<objects.length; i++)
        objects[i].diffuse = objects[i].previous;

    this.render();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="get mouse coords">
document.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(e) {
    var x = e.pageX + 20;   
    var y = e.pageY + 20;
        
    var legendDiv = document.getElementById('legend');
    
    css = {
        "left": x + "px", 
        "top": y + "px"
    };

    for(i in css){
        legendDiv.style[i] = css[i];
    }
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="render"> 
Picker.prototype.render = function()
{
    var gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.uniform1i(this.shaderProgram.uOffscreen, true);
    this.program.drawScene();
    
    gl.uniform1i(this.shaderProgram.uOffscreen, false);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};
 //  </editor-fold>