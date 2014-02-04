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
function Light(shaderProgram,gl,lightPosition,ambient,diffuse,lightSpecular,Shininess)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    /**
     * @member lightPosition
     * @type Array
     * @desc Set light source position.
     */
    this.lightPosition  = lightPosition;
    /**
     * @member ambient
     * @type Array
     * @desc Set ambient.
     */
    this.ambient        = ambient;
    /**
     * @member diffuse
     * @type Array
     * @desc Set light colour.
     */
    this.diffuse        = diffuse;
    /**
     * @member lightSpecular
     * @type Array
     * @desc Set power of light specular.
     */
    this.lightSpecular  = lightSpecular;
    /**
     * @member Shininess
     * @type Number
     * @desc Set light intensity.
     */
    this.Shininess      = Shininess;
    
    this.shaderProgram = shaderProgram;
    this.initLight(gl);
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="init light">
Light.prototype.initLight= function(gl)
{
    gl.uniform3fv(this.shaderProgram.uLightPosition,  this.lightPosition);
    gl.uniform4fv(this.shaderProgram.uLightAmbient,   this.ambient );
    gl.uniform4fv(this.shaderProgram.uLightDiffuse,   this.diffuse);
    gl.uniform4fv(this.shaderProgram.uLightSpecular,  this.lightSpecular);
    gl.uniform1f(this.shaderProgram.uShininess,       this.Shininess); 
    gl.uniform1f(this.shaderProgram.uAlpha,           1.0);
};
//  </editor-fold>

