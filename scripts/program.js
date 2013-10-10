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
function Program(canvas)
{
    //  <editor-fold defaultstate="collapsed" desc="init">
    this.initGL(canvas);
    this.initShaders();
    //  </editor-fold>
};

//  <editor-fold defaultstate="collapsed" desc="init GL">
Program.prototype.initGL = function(canvas) 
{
    try 
    {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        
        c_width  = canvas.width;
        c_height = canvas.height;
        gl.viewport(0, 0, c_width, c_height);
    } 
    catch(e){}
    
    if (!gl) 
        if( confirm("Could not initialise WebGL, Sorry :( \nDo you want to go to browser installation page?") )
             location.href = "http://3dgames.pl/blog/2010/03/ustawienia-przegladarki/";
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="get shader">
//Program.prototype.getShader = function(gl, id) 
//{
//    var shaderScript = document.getElementById(id);
//    if (!shaderScript)
//        return null;
//
//    var str = "";
//    var k   = shaderScript.firstChild;
//    while(k) 
//    {
//        if (k.nodeType == 3) 
//            str += k.textContent;
//    
//        k = k.nextSibling;
//    }
//
//    var shader;
//    if (shaderScript.type == "x-shader/x-fragment") 
//        shader = gl.createShader(gl.FRAGMENT_SHADER);
//    else if (shaderScript.type == "x-shader/x-vertex") 
//        shader = gl.createShader(gl.VERTEX_SHADER);
//    else 
//        return null;
//};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="compile shader">
Program.prototype.compileShader = function(shaderString, isFragmentShader)
{
    var shader;
    shader = (isFragmentShader) ? gl.createShader(gl.FRAGMENT_SHADER) : gl.createShader(gl.VERTEX_SHADER);

    gl.shaderSource(shader, shaderString);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
    {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="init shader">
Program.prototype.initShaders = function() 
{
    var fragmentShader = this.compileShader(fs, true);   
    var vertexShader   = this.compileShader(vs, false);

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) 
        alert("Could not initialise shaders");

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    shaderProgram.aVertexNormal           = gl.getAttribLocation(shaderProgram, "aVertexNormal");  
    shaderProgram.textureCoordAttribute   = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.aVertexNormal);
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.uPMatrix          = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.uMVMatrix         = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.uNMatrix          = gl.getUniformLocation(shaderProgram, "uNMatrix");
    shaderProgram.samplerUniform    = gl.getUniformLocation(shaderProgram, "uSampler");

    shaderProgram.uMaterialAmbient  = gl.getUniformLocation(shaderProgram, "uMaterialAmbient");
    shaderProgram.uMaterialDiffuse  = gl.getUniformLocation(shaderProgram, "uMaterialDiffuse");
    shaderProgram.uMaterialSpecular = gl.getUniformLocation(shaderProgram, "uMaterialSpecular");
    shaderProgram.uShininess        = gl.getUniformLocation(shaderProgram, "uShininess");

    shaderProgram.uLightPosition    = gl.getUniformLocation(shaderProgram, "uLightPosition");
    shaderProgram.uLightAmbient     = gl.getUniformLocation(shaderProgram, "uLightAmbient");
    shaderProgram.uLightDiffuse     = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
    shaderProgram.uLightSpecular    = gl.getUniformLocation(shaderProgram, "uLightSpecular");
    shaderProgram.uWireframe        = gl.getUniformLocation(shaderProgram, "uWireframe");
    shaderProgram.uPerVertexColor   = gl.getUniformLocation(shaderProgram, "uPerVertexColor");
    shaderProgram.uUseTextures      = gl.getUniformLocation(shaderProgram, "uUseTextures");
    shaderProgram.uUseShadow        = gl.getUniformLocation(shaderProgram, "uUseShadow");
    shaderProgram.uAlpha            = gl.getUniformLocation(shaderProgram, "uAlpha");
    shaderProgram.vLightRay         = gl.getUniformLocation(shaderProgram, "vLightRay");
    
    shaderProgram.uOffscreen        = gl.getUniformLocation(shaderProgram, "uOffscreen");
    shaderProgram.uPickingColor     = gl.getUniformLocation(shaderProgram, "uPickingColor");
};
//  </editor-fold>


