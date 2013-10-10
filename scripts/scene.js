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
var Scene = 
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    
    /**
     * @member lineColor
     * @type Array
     * @desc Change colour line on the wall.
     */
    lineColor        : lineColor,
    /**
     * @member wallColor
     * @type Array
     * @desc Change walls colour.
     */
    wallColor        : wallColor,
    /**
     * @member marksBottomColor
     * @type Array
     * @desc Change labels footer colour.
     */
    marksBottomColor : marksBottomColor,
    /**
     * @member marksTopColor
     * @type Array
     * @desc Change labels header colour.
     */
    marksTopColor    : marksTopColor,
    /**
     * @member twoColors
     * @type {Array}
     * @desc Define two colors for series. Change twoCol on true.
     */
    twoColors      : twoColors,
    /**
     * @member diffColors
     * @type {Array}
     * @desc Define mix of colors for series. Change diffCol on true.
     */
    diffColors     : diffColors,
    /**
     * @member diffCol
     * @type {Boolean}
     * @desc Switch on/off mix of colors for series.
     */
    diffCol        : diffCol,
    /**
     * @member twoCol
     * @type {Boolean}
     * @desc Switch on/off two colors for series.
     */
    twoCol         : twoCol,
    /**
     * @member colors
     * @type {Array}
     * @desc Set default colour for series.
     */
    colors   : colors,
    
    objects        : [], 
    colorsPalette  : [],
    defaultPalette : 0,
   
//  </editor-fold>
       
    //  <editor-fold defaultstate="collapsed" desc="add colors">
    addColors : function()
    {
      this.colorsPalette.push(this.colors);
    },
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="get object">
    getObject : function(alias)
    {
        for(var i=0; i<Scene.objects.length; i++)
            if (alias === Scene.objects[i].alias) 
                return Scene.objects[i];

        return null;
    },
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="load object">
    loadObject : function(filename, alias)
    {
        var request = new XMLHttpRequest();
        request.open("GET", filename);
    
        request.onreadystatechange = function() 
        {
            if (request.readyState == 4) 
            {
                if(request.status == 404)
                    console.info(filename + ' does not exist');
                else 
                {
                    var o    = JSON.parse(request.responseText);
                    o.alias  = (alias == null) ? 'none' : alias;
                    o.remote = true;
                    Scene.addObject(o);
                }
            }
        };
        request.send();
    },
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="set shape color">
    setShapeColor : function(numberPalette,object)
    {
        var shapeNumber=0;
        var t = object.alias;
        if(t.substring(1,5)=='cube' || t.substring(1,9)=='cylinder' || t.substring(2,6)=='cube' || t.substring(2,10)=='cylinder' ||
            t.substring(1,5)=='cone' ||  t.substring(2,6)=='cone')
        {
            var seria_number;
            if(t.substring(1,5)=='cube' || t.substring(1,9)=='cylinder' || t.substring(1,5)=='cone')
                seria_number = t.substring(0,1);
            else if(t.substring(2,6)=='cube' || t.substring(2,10)=='cylinder' ||t.substring(2,6)=='cone')
                seria_number = t.substring(0,2);
            
            if(t.substring(1,5)=='cube' || t.substring(1,5)=='cone')
                shapeNumber=t.substring(5,6);
            else if(t.substring(2,6)=='cube' || t.substring(2,6)=='cone')
                shapeNumber=t.substring(6,7);
            else if(t.substring(1,9)=='cylinder')
                shapeNumber=t.substring(9,10);
             else if(t.substring(2,10)=='cylinder')
                shapeNumber=t.substring(10,11);
            
            object.pcolor = [Math.random(), Math.random(), Math.random(), 1.0];
            series[seria_number].pickerColor.push([ Math.round(object.pcolor[0]*255), Math.round(object.pcolor[1]*255), Math.round(object.pcolor[2]*255), 1.0]);
            
            
            if(!app.drawTex)
            {
                for(var i=0; i< series.length; i++)
                    if(seria_number==i)
                    { 
                        if(this.twoCol)
                        {
                            if(shapeNumber%2==0)
                                object.diffuse=this.twoColors[0];
                            else
                                object.diffuse=this.twoColors[1];
                        }
                        else if(this.diffCol)
                            object.diffuse = this.diffColors[shapeNumber];
                        else
                           object.diffuse=this.colorsPalette[numberPalette][series[seria_number].colorNumber];
                    }
            }
            else
                object.diffuse = [1,1,1,1.0];
            
            if(series[seria_number].sumSeries && !app.drawTex)
                object.diffuse = [0.3,0.3,0.3,1.0]; 
        }
    },
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="add object">
    addObject : function(object) 
    {
        //<editor-fold defaultstate="collapsed" desc="set properties">
        if (object.wireframe === undefined) { object.wireframe = false;            }
        if (object.diffuse   === undefined) { object.diffuse   = [1.0,1.0,1.0,1.0];}
        if (object.ambient   === undefined) { object.ambient   = [0.2,0.2,0.2,1.0];}
        if (object.specular  === undefined) { object.specular  = [1.0,1.0,1.0,1.0];}
        if (object.pcolor    === undefined) { object.pcolor    = [0.0,0.0,0.0,0.0];}
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set color">
        if(object.alias.substring(1,13)=='bottom_marks'|| object.alias.substring(2,14)=='bottom_marks')
            object.diffuse = this.marksBottomColor;
        
        if(object.alias.substring(0,4)=='line')
            object.diffuse = this.lineColor;
        
        if(object.alias.substring(0,4)=='wall')
            object.diffuse = this.wallColor;
        
        this.setShapeColor(0, object);
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
    
        Scene.objects.push(object);
        //  </editor-fold>
    },
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="remove object">
    removeObject: function(objectName)
    {
        var o = this.getObject(objectName);
        var idx = this.objects.indexOf(o);
        this.objects.splice(idx, 1);
    },
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="remove all">
    removeAll: function()
    {
        for(var i = this.objects.length-1; i>=0; i--)
            if(this.objects[i].alias !== 'floor' && this.objects[i].alias !== 'wall_bottom' && this.objects[i].alias !== 'wall_back'
                && this.objects[i].alias !== 'wall_left'  && this.objects[i].alias.substring(0,9) !== 'line_back'
                && this.objects[i].alias.substring(0,9) !== 'line_left')
                this.removeObject(this.objects[i].alias);    
    },
    //  </editor-fold>
    
    //  <editor-fold defaultstate="collapsed" desc="add shapes">
    addShapes: function(number, min, max)
    {
        if(series[number].shape === 0)
            for(var i=min; i<max; i++)
                this.loadObject('models/cylinder_shape.json', number+'cylinder'+i);  
        else if(series[number].shape === 1)
            for(var i=min; i<max; i++)
                this.loadObject('models/cube.json', number+'cube'+i);
        else if(series[number].shape === 2)
            for(var i=min; i<max; i++)
                this.loadObject('models/cone.json', number+'cone'+i);
    },
    //  </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="remove shapes">      
    removeShapes: function(number)
    {
        var n=series[number].data.length-1;
        for(var j=n;j>=0;j--)
            for(var i = this.objects.length-1; i>=0; i--)
            {
                 if(this.objects[i].alias === number+"cube"+j || this.objects[i].alias === number+"cylinder"+j || this.objects[i].alias === number+"cone"+j)
                 {
                    this.removeObject(this.objects[i].alias);
                   // n--;
                 }
                 else if (this.objects[i].alias === "undefined")
                    this.objects.splice(i, 1);

            } 
    }
    // </editor-fold>
};
