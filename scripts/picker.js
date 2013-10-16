/******************************************************************************
Name:    incharts3d
Author:  Inlabs sp. z o.o. (Maciej Pleśnar, Ewelina Bendlin, Kamil Daszkowski)
Version: 1.1 (October 2013)
Support: http://incharts3d.com

Licence:
incharts3d is licensed under a Creative Commons Attribution-NonCommercial 3.0
License (http://creativecommons.org/licenses/by-nc/3.0/).
Noncommercial. You may not use this work for commercial purposes.
******************************************************************************/
function Picker(canvas)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.plist        = [];
    this.canvas       = canvas;
    this.texture      = null;
    this.framebuffer  = null;
    this.renderbuffer = null;
    
    this.object        = null;
    this.color         = [];
    this.series_number = null;
    this.coords        = [];
    this.showLegend    = true;
    this.offX = null;
    this.offY = null;

    this.configure();
    //  </editor-fold>
};

//  <editor-fold defaultstate="collapsed" desc="update">
Picker.prototype.update = function(){

    var width  = this.canvas.width;
    var height = this.canvas.height;
   
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="configure">
Picker.prototype.configure = function(){

    var width  = this.canvas.width;
    var height = this.canvas.height;

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	
    this.renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
	
    this.framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);
	
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="compare">
Picker.prototype.compare = function(readout, color)
{
    var i = Math.abs(Math.round(color[0]*255) - readout[0]);
    var j = Math.abs(Math.round(color[1]*255) - readout[1]);
    var k = Math.abs(Math.round(color[2]*255) - readout[2]);
    return (i <= 1 && j<= 1 && k<= 1);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="find">
Picker.prototype.find = function(coords)
{
    //  <editor-fold defaultstate="collapsed" desc="read pixels">
    var readout = new Uint8Array(1 * 1 * 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.readPixels(coords.x, coords.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, readout);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="set coords">
    this.coords[0] = coords.x;
    this.coords[1] = coords.y;
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="find new object">
    var color = [readout[0], readout[1], readout[2], 1.0];
    if(focus)
    if(this.color[0] != color[0] || this.color[1] != color[1] || this.color[2] != color[2])
    {
        var found = false;
        for(var i=0, max=Scene.objects.length; i<max; i+=1)
        {
            //  <editor-fold defaultstate="collapsed" desc="get object property">
            var ob = Scene.objects[i];
            if (ob.alias == 'floor') continue;
            var property  = this.hitProperty(ob);
            this.object   = ob.alias;
            var color     = [readout[0], readout[1], readout[2], 1.0];
            this.color    = color;
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="compare colors">
            if (property == undefined) continue;
            if (this.compare(readout, property))
            {      
                this.stop();
                this.series_number = ob.alias.substring(0,1);
                var idx  = this.plist.indexOf(ob);
                if (idx != -1)
                {
                    this.plist.splice(idx,1);
                    if (this.removeHit(ob))
                        this.removeHit(ob); 
                }
                else 
                {
                    this.plist.push(ob);
                    if(this.showLegend)
                        this.getSeries(ob.alias);        
                    if (this.addHit(ob))
                        this.addHit(ob); 
                }
                found = true;
                break;
            }
            //  </editor-fold>
        }
        app.render();
        return found;
    }
    else
       return true;   
   //  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="get series">
Picker.prototype.getSeries = function(alias)
{
    //  <editor-fold defaultstate="collapsed" desc="find series">
    var series_number;
    if(alias.substring(1,5)=='cube' || alias.substring(1,9)=='cylinder' || alias.substring(1,5)=='cone' )
        series_number = alias.substring(0,1);
    else if(alias.substring(2,6)=='cube' || alias.substring(2,10)=='cylinder' || alias.substring(2,6)=='cone' )
        series_number = alias.substring(0,2);
    
    var shapeNumber=0;
    if(alias.substring(1,5)=='cube' || alias.substring(1,5)=='cone')
       shapeNumber=alias.substring(5,7);
    else if(alias.substring(2,6)=='cube' || alias.substring(2,6)=='cone')
       shapeNumber=alias.substring(6,8);
    else if(alias.substring(1,9)=='cylinder')
       shapeNumber=alias.substring(9,11);
    else if(alias.substring(2,10)=='cylinder')
       shapeNumber=alias.substring(10,12);
            
    for(var i=0; i<Scene.objects.length;i++)
         if(Scene.objects[i].alias == alias)
         {
             series[series_number].pickerColor[shapeNumber][0] = this.color[0];
             series[series_number].pickerColor[shapeNumber][1] = this.color[1];
             series[series_number].pickerColor[shapeNumber][1] = this.color[2];
         }
     //  </editor-fold>
      
    //  <editor-fold defaultstate="collapsed" desc="find shape">  
    if(this.series_number % 1 ==0)
    for(var i=0; i<series[series_number].data.length; i++)
    {
        if(this.color[0] == series[series_number].pickerColor[i][0]
            || this.color[1] == series[series_number].pickerColor[i][1]
            || this.color[2] == series[series_number].pickerColor[i][2])
        {
            this.setMessage(series_number, shapeNumber,i);
            this.color[0] += 1;
        }
    }
    //  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set message">
Picker.prototype.setMessage = function(series_number,index,numberX)
{
    var height  = series[series_number].info_data[index];
    var num_ser = "sum ";
    var osX     = chart.legendX[numberX+1];
    for(var j=0; j<chart.number_SeriesArray.length; j++)
        if(series[series_number].numberBaseSeries==chart.number_SeriesArray[j])
           var numZ = j;
    var osZ    = chart.legendZ[numZ];
    var mouseX = this.coords[0];
    var mouseY = this.coords[1];
    if(!series[series_number].sumSeries)   
    {
        num_ser  = "";
        num_ser += series[series_number].number_series+1;
    }
        
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
        
        for(i in css){
            legendDiv.style[i] = css[i];
        }
    }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="stop picker">
Picker.prototype.stop = function()
{
    if (this.processHits(this.plist) != null && this.plist.length > 0)
        this.processHits(this.plist);

    this.plist = [];
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="control picker">
Picker.prototype.hitProperty = function(ob)
{
    return ob.pcolor;
};

Picker.prototype.addHit = function(ob)
{
    if(this.series_number % 1 ==0)
    if(series[this.series_number].picker)
    {
        ob.previous = ob.diffuse.slice(0);  
        ob.diffuse  = [ob.diffuse[0]-0.2, ob.diffuse[1]-0.2, ob.diffuse[2]-0.2, 1.0];
    }
    app.render();
};

Picker.prototype.removeHit = function(ob)
{
    if(series[this.series_number].picker)
        ob.diffuse = ob.previous.slice(0);
    app.render();
};

Picker.prototype.processHits = function(hits)
{
    var ob;
    for(var i=0; i<hits.length; i++)
    {
        ob = hits[i];
        if(this.series_number % 1 ==0)
        if(series[this.series_number].picker)
            ob.diffuse = ob.previous;
    }
    app.render();
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