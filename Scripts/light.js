function Light()
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    /**
     * @member lightPosition
     * @type Array
     * @desc Set light source position.
     */
    this.lightPosition  = [0, -5, 50];
    /**
     * @member ambient
     * @type Array
     * @desc Set ambient.
     */
    this.ambient        = [0.0,0.0,0.0,0.0];
    /**
     * @member diffuse
     * @type Array
     * @desc Set light colour.
     */
    this.diffuse        = [0.8,0.8,0.8,1];
    /**
     * @member lightSpecular
     * @type Array
     * @desc Set power of light specular.
     */
    this.lightSpecular  = [1,1,1,1];
    /**
     * @member Shininess
     * @type Number
     * @desc Set light intensity.
     */
    this.Shininess      = 100.0;
    
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
    gl.uniform1i(shaderProgram.uPerVertexColor,  true);
    gl.uniform1f(shaderProgram.uAlpha,           1.0);
};
//  </editor-fold>

