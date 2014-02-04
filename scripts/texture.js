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

function Texture(path,gl)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    var that       = this;
    this.gl        = gl;
    this.tex       = gl.createTexture();
    this.image     = new Image();
    this.image.src = path; 
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="onload">
    this.image.onload = function() { that.loadedTexture();};
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="load texture">
Texture.prototype.loadedTexture = function()
{
    var gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
};
//  </editor-fold>

