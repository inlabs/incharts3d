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

function Shaders(canvas,gl)
{
    //  <editor-fold defaultstate="collapsed" desc="init">
    this.gl = gl;
    this.shaderProgram = null;
    this.initGL(canvas);
    this.initShaders();
    //  </editor-fold>
};

//  <editor-fold defaultstate="collapsed" desc="init GL">
Shaders.prototype.initGL = function(canvas) 
{
    try 
    {
        this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        this.gl.viewport(0, 0, canvas.width, canvas.height);
    } 
    catch(e){}
    
    if (!this.gl) 
        if( confirm("Could not initialise WebGL, Sorry :( \nDo you want to go to browser installation page?") )
             location.href = "http://3dgames.pl/blog/2010/03/ustawienia-przegladarki/";
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="getGL">
Shaders.prototype.getGL = function() 
{
    return this.gl;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="getShaderProgram">
Shaders.prototype.getShaderProgram = function() 
{
    return this.shaderProgram;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="compile shader">
Shaders.prototype.compileShader = function(shaderString, isFragmentShader)
{   
    var shader;
    shader = (isFragmentShader) ? this.gl.createShader(this.gl.FRAGMENT_SHADER) : this.gl.createShader(this.gl.VERTEX_SHADER);
    
    this.gl.shaderSource(shader, shaderString);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) 
    {
        alert(this.gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="init shader">
Shaders.prototype.initShaders = function() 
{
    var fragmentShader = this.compileShader(fs, true);   
    var vertexShader   = this.compileShader(vs, false);
    
    var shaderProgram = this.gl.createProgram();
    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);

    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) 
        alert("Could not initialise shaders");

    this.gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(shaderProgram, "aVertexPosition");
    shaderProgram.aVertexNormal           = this.gl.getAttribLocation(shaderProgram, "aVertexNormal");  
    shaderProgram.textureCoordAttribute   = this.gl.getAttribLocation(shaderProgram, "aTextureCoord");
    
   // gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
   // gl.enableVertexAttribArray(shaderProgram.aVertexNormal);
  //  gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.uPMatrix          = this.gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.uMVMatrix         = this.gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.uNMatrix          = this.gl.getUniformLocation(shaderProgram, "uNMatrix");
    shaderProgram.samplerUniform    = this.gl.getUniformLocation(shaderProgram, "uSampler");

    shaderProgram.uMaterialAmbient  = this.gl.getUniformLocation(shaderProgram, "uMaterialAmbient");
    shaderProgram.uMaterialDiffuse  = this.gl.getUniformLocation(shaderProgram, "uMaterialDiffuse");
    shaderProgram.uMaterialSpecular = this.gl.getUniformLocation(shaderProgram, "uMaterialSpecular");
    shaderProgram.uShininess        = this.gl.getUniformLocation(shaderProgram, "uShininess");

    shaderProgram.uLightPosition    = this.gl.getUniformLocation(shaderProgram, "uLightPosition");
    shaderProgram.uLightAmbient     = this.gl.getUniformLocation(shaderProgram, "uLightAmbient");
    shaderProgram.uLightDiffuse     = this.gl.getUniformLocation(shaderProgram, "uLightDiffuse");
    shaderProgram.uLightSpecular    = this.gl.getUniformLocation(shaderProgram, "uLightSpecular");
    shaderProgram.uWireframe        = this.gl.getUniformLocation(shaderProgram, "uWireframe");
    shaderProgram.uUseTextures      = this.gl.getUniformLocation(shaderProgram, "uUseTextures");
    shaderProgram.uUseShadow        = this.gl.getUniformLocation(shaderProgram, "uUseShadow");
    shaderProgram.uAlpha            = this.gl.getUniformLocation(shaderProgram, "uAlpha");
    shaderProgram.vLightRay         = this.gl.getUniformLocation(shaderProgram, "vLightRay");
    
    shaderProgram.uOffscreen        = this.gl.getUniformLocation(shaderProgram, "uOffscreen");
    shaderProgram.uPickingColor     = this.gl.getUniformLocation(shaderProgram, "uPickingColor");
    
    this.shaderProgram= shaderProgram;
};
//  </editor-fold>





