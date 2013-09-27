function Texture(path)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    var self       = this;
    this.tex       = gl.createTexture();
    this.image     = new Image();
    this.image.src = path; 
    //  </editor-fold>

    //  <editor-fold defaultstate="collapsed" desc="onload">
    this.image.onload = function()
    {
         self.loadedTexture();
    };
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="load texture">
Texture.prototype.loadedTexture = function()
{
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
};
//  </editor-fold>

