function Text(t)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.texture    = null;
    this.crateImage = null;
    this.text       = t;
    
    /**
     * @member fillText
     * @type String
     * @desc Change text colour.
     */
    this.fillText   = 'black';
    /**
     * @member fontSize
     * @type Number
     * @desc Change text size.
     */
    this.fontSize   = 70;
    /**
     * @member font
     * @type String
     * @desc Change font-family for text.
     */
    this.font       = "Arial";
    /**
     * @member lineWidth
     * @type Number|Number
     * @desc Change text weight.
     */
    this.lineWidth  = 4;
    
    this.fillAlpha  = "rgba(0, 0, 0, 0)";    
    this.scaleX     = 1;
    this.scaleY     = 1;
    this.step       = 2;
    this.step_left  = 2;
    this.bottom     = 1;
    this.rot        = 1;
    
    this.init();
//  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="init text">
Text.prototype.init = function()
{
    this.texture    = gl.createTexture();
    this.crateImage = document.getElementById('text');
    var ctx         = this.crateImage.getContext('2d');

    ctx.fillStyle = this.fillAlpha
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle =  this.fillText;
    ctx.lineWidth = this.lineWidth;
    ctx.save();
    ctx.font         = this.fontSize+"px "+this.font;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    var text         = this.text;
    var leftOffset   = ctx.canvas.width/this.step_left ;
    var topOffset    = ctx.canvas.height/this.step ;
    
    ctx.strokeText(text, leftOffset, topOffset);
    ctx.fillText(text, leftOffset, topOffset);
    ctx.restore();
    
    this.loadedTexture(this.crateImage, this.texture);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="load text">
Text.prototype.loadedTexture = function(image,texture) 
{
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR_MIPMAP_LINEAR); 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set textXZ">
Text.prototype.setTextXZ = function(max,len,m,Z)
{
    var min  = m;
    var text = max+"";
    while (text.length>1)
    {
        this.fontSize -= min;
        this.scaleX   += 1.1;
        this.scaleY   += 0.5;
        this.bottom   += 0.1;
        text -= 1;
        min  -= 1;
    }

    if(len>8)
    {
        this.scaleX -= 0.6;
        this.scaleY -= 0.3;
    }
    else
        this.bottom += 0.2;
    
    this.step_left = 2;
    this.step      = 5;
     
     if(Z)
     {
        var t = max+"";
        if(t.length<=8)   
            this.step_left = 3;
      }
          
     this.lineWidth = 2.5;
     this.init();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set textY">
Text.prototype.setText = function(max)
{
    var min  = 20;
    var text = max+"";
    text = text.length+1;

    while (text>7)
    {
        this.fontSize -= min;
      //  this.scaleX   += 0.2;
      //  this.scaleY   += 0.3;
        text -= 1;
        min  -= 3;
    }
    this.init();
};
//  </editor-fold>
