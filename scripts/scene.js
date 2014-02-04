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

function Scene(lineColor,wallColor,marksBottomColor,marksTopColor,twoColorsPalette,twoCol,diffColorsPalette,diffCol,colors)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    
    /**
     * @member lineColor
     * @type Array
     * @desc Change colour line on the wall.
     */
    this.lineColor        = lineColor;
    /**
     * @member wallColor
     * @type Array
     * @desc Change walls colour.
     */
    this.wallColor        = wallColor;
    /**
     * @member marksBottomColor
     * @type Array
     * @desc Change labels footer colour.
     */
    this.marksBottomColor = marksBottomColor;
    /**
     * @member marksTopColor
     * @type Array
     * @desc Change labels header colour.
     */
    this.marksTopColor    = marksTopColor;
    /**
     * @member twoColorsPalette
     * @type {Array}
     * @desc Define two colors for series. Change twoCol on true.
     */
    this.twoColorsPalette      = twoColorsPalette;
    /**
     * @member diffColorsPalette
     * @type {Array}
     * @desc Define mix of colors for series. Change diffCol on true.
     */
    this.diffColorsPalette     = diffColorsPalette;
    /**
     * @member diffCol
     * @type {Boolean}
     * @desc Switch on/off mix of colors for series.
     */
    this.diffCol        = diffCol;
    /**
     * @member twoCol
     * @type {Boolean}
     * @desc Switch on/off two colors for series.
     */
    this.twoCol         = twoCol;
    /**
     * @member colors
     * @type {Array}
     * @desc Set default colour for series.
     */
    this.colors   = colors;
    
    this.objects        = [];
    this.gl= null;

    this.type = 0;
    this.series_area = null;
    this.series = null;
//  </editor-fold>
};

//  <editor-fold defaultstate="collapsed" desc="setGl">
Scene.prototype.setGL = function(new_gl)
{
    this.gl=new_gl;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="get object">
Scene.prototype.findAlias = function(alias)
{
    for(var i=0; i<this.objects.length; i++)
        if (alias === this.objects[i].alias) 
            return this.objects[i];

    return null;
};
    //  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="load object">
Scene.prototype.loadObject = function(filename, alias, vertices, indices)
{
    var request = new XMLHttpRequest();
    request.open("GET", filename);

    var that = this;
    request.onreadystatechange = function() 
    {
        if (request.readyState == 4) 
        {
            if(request.status == 404)
                console.info(filename + ' does not exist');
            else 
            {
                var object    = JSON.parse(request.responseText);
                object.alias  = (alias == null) ? 'none' : alias;
                object.remote = true;
                if(vertices==undefined)
                    that.addObject(object);
                else
                    that.addObject(object,vertices,indices);
            }
        }
    };
    request.send();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setType">
Scene.prototype.setType = function(type)
{
    this.type=type;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setSeriesType">
Scene.prototype.setSeriesType = function(type, series)
{
    switch(type)
    {
        case 0:
            this.series = series;
            break;
        case 1:
            this.series_area = series;  
            break;
    }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setColorType0">
Scene.prototype.setColorType0 = function(object)
{
    if(!isNaN(parseInt(object.alias.substring(0,1))) && object.diffuse[3]!=0) 
    {
        var seria_number = 0;
        var shapeNumber = 0;
        
        seria_number = (!isNaN(object.alias.charAt(1))) ? object.alias.substring(0,2) : object.alias.substring(0,1);
        shapeNumber = (!isNaN(object.alias.charAt(object.alias.length-2))) ? object.alias.charAt(object.alias.length-2) : object.alias.charAt(object.alias.length-1);
         
        object.pcolor = [Math.random(), Math.random(), Math.random(), 1.0];
        this.series[seria_number].pickerColor.push([ Math.round(object.pcolor[0]*255), Math.round(object.pcolor[1]*255), Math.round(object.pcolor[2]*255), 1.0]);
          
        if(!this.series[0].textured)
        {
            if(this.twoCol)
                object.diffuse= (shapeNumber%2==0) ? this.twoColorsPalette[0] : this.twoColorsPalette[1];
            else if(this.diffCol)
                object.diffuse = this.diffColorsPalette[shapeNumber];
            else
                object.diffuse=this.colors[this.series[seria_number].colorNumber];
            
            if(this.series[seria_number].sumSeries)
                object.diffuse = [0.3,0.3,0.3,1.0]; 
        }
    } 
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setColorType1">
Scene.prototype.setColorType1 = function(object)
{
    if(object.alias=='series_area')
        object.diffuse=this.colors[0];
    else if(object.alias.substring(0,4)=='cube')
    {
        object.diffuse = [1,1,0,0.9];
        object.pcolor = [Math.random(), Math.random(), Math.random(), 1];
        this.series_area.pickerColor.push([ Math.round(object.pcolor[0]*255), Math.round(object.pcolor[1]*255), Math.round(object.pcolor[2]*255), 1]);
    }
   
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="add object">
Scene.prototype.addObject = function(object,vertices,indices) 
{
    //  <editor-fold defaultstate="collapsed" desc="get data">
    var gl = this.gl;
    if(vertices!==undefined)
    {
        object.vertices= vertices
        object.indices= indices;
    }
    //  </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="set properties">
    if (object.wireframe === undefined) { object.wireframe = false;            }
    if (object.diffuse   === undefined) { object.diffuse   = [1.0,1.0,1.0,1.0];}
    if (object.ambient   === undefined) { object.ambient   = [0.2,0.2,0.2,1.0];}
    if (object.specular  === undefined) { object.specular  = [1.0,1.0,1.0,1.0];}
    if (object.pcolor    === undefined) { object.pcolor    = [0.0,0.0,0.0,0.0];}
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="set color">
    this.setColorType0(object);
    this.setColorType1(object);
   
    
    if(object.alias.substring(1,13)=='bottom_marks'|| object.alias.substring(2,14)=='bottom_marks')
        object.diffuse = this.marksBottomColor;
    
    else if(object.alias.substring(1,10)=='top_marks' || object.alias.substring(2,11)=='top_marks' )
        object.diffuse = this.marksTopColor;

    else if(object.alias.substring(0,4)=='line')
        object.diffuse = this.lineColor;

    else if(object.alias.substring(0,4)=='wall')
        object.diffuse = this.wallColor;
        
    else if(object.alias.substring(0,11)=='picker_line')
        object.diffuse = [1,1,0,1];
       
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="set vertexBuffer">
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.vertices), gl.STATIC_DRAW);
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="set normalBuffer">
    var normalBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferObject);

    if(object.normals)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.normals), gl.STATIC_DRAW);
    else
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(calculateNormals(object.vertices, object.indices)), gl.STATIC_DRAW);
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="set textureBuffer">
    var textureBufferObject;
    if (object.texture_coords)
    {
        textureBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.texture_coords), gl.STATIC_DRAW);
        object.tbo = textureBufferObject;
    }
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="set indicesBuffer">
    if(object.indices)
    {
        var indexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.indices), gl.STATIC_DRAW);
    }
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="set data">
    object.vbo = vertexBufferObject;
    object.ibo = indexBufferObject;
    object.nbo = normalBufferObject;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.objects.push(object);
    //  </editor-fold>
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="remove object">
Scene.prototype.removeObject= function(object)
{
    var alias = this.findAlias(object);
    var index = this.objects.indexOf(alias);
    this.objects.splice(index, 1);
},
    //  </editor-fold>
    
//  <editor-fold defaultstate="collapsed" desc="remove all">
Scene.prototype.removeAll= function()
{
    for(var i = this.objects.length-1; i>=0; i--)
        if(this.objects[i].alias !== 'floor' && this.objects[i].alias !== 'wall_bottom' && this.objects[i].alias !== 'wall_back'
            && this.objects[i].alias !== 'wall_left'  && this.objects[i].alias.substring(0,9) !== 'line_back'
            && this.objects[i].alias.substring(0,9) !== 'line_left')
            this.removeObject(this.objects[i].alias);   
};
    //  </editor-fold>
    
//  <editor-fold defaultstate="collapsed" desc="add shapes">
Scene.prototype.addShapes= function(number, min, max)
{
    if(this.series[number].shape === 0)
        for(var i=min; i<max; i++)
            this.loadObject('models/cylinder_shape.json', number+'cylinder'+i);  
    else if(this.series[number].shape === 1)
        for(var i=min; i<max; i++)
            this.loadObject('models/cube.json', number+'cube'+i);
    else if(this.series[number].shape === 2)
        for(var i=min; i<max; i++)
            this.loadObject('models/cone.json', number+'cone'+i);
};
//  </editor-fold>
    
//<editor-fold defaultstate="collapsed" desc="remove shapes">      
Scene.prototype.removeShapes= function(number)
{
    var n=this.series[number].data.length-1;
    for(var j=n;j>=0;j--)
        for(var i = this.objects.length-1; i>=0; i--)
        {
             if(this.objects[i].alias === number+"cube"+j || this.objects[i].alias === number+"cylinder"+j || this.objects[i].alias === number+"cone"+j)
                this.removeObject(this.objects[i].alias);
             else if (this.objects[i].alias === "undefined")
                this.objects.splice(i, 1);

        } 
};
// </editor-fold>

