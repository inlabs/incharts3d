function Light()
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.lightPosition  = [0, -5, 50];
    this.ambient        = [0.0,0.0,0.0,0.0];
    this.diffuse        = [0.8,0.8,0.8,1];
    this.lightSpecular  = [1,1,1,1];
    this.Shininess      = 100.0;
    this.perVertexColor = true;
    this.alpha          = 1.0;
    
    this.initLight();
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="init light">
Light.prototype.initLight= function()
{
    gl.uniform3fv(shaderProgram.uLightPosition,  this.lightPosition);
    gl.uniform3fv(shaderProgram.uLightAmbient,   this.ambient );
    gl.uniform4fv(shaderProgram.uLightDiffuse,   this.diffuse);
    gl.uniform4fv(shaderProgram.uLightSpecular,  this.lightSpecular);
    gl.uniform1f(shaderProgram.uShininess,       this.Shininess); 
    gl.uniform1i(shaderProgram.uPerVertexColor,  this.perVertexColor);
    gl.uniform1f(shaderProgram.uAlpha,           this.alpha);
};
//  </editor-fold>

