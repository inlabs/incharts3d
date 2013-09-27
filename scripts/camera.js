function Camera()
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.matrix     = mat4.create();
    this.up         = vec3.create();
    this.right      = vec3.create();
    this.normal     = vec3.create();
    this.position   = vec3.create();
    this.focus      = vec3.create();
    this.home       = vec3.create();
    this.azimuth    = 0.0;
    this.elevation  = 0.0;
    this.steps      = 0.0;
    this.x          = 0.0;
    this.y          = 0.0;
    this.z          = 0.0;
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="goHome">
Camera.prototype.goHome = function(h)
{
    if (h != null)
        this.home = h;

    this.x = h[0];
    this.y = h[1];
    this.z = h[2];
    
    this.setPosition(this.home);
    this.steps = 0;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set position">
Camera.prototype.setPosition = function(p)
{
    vec3.set(p, this.position);
    this.update();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set focus">
Camera.prototype.setFocus = function(f)
{
    vec3.set(f, this.focus);
    this.update();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set azimuth">
Camera.prototype.setAzimuth = function(az)
{
    this.changeAzimuth(az - this.azimuth);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="change azimuth">
Camera.prototype.changeAzimuth = function(az)
{
    var c = this;
    
    if((c.azimuth<80 || az<0) && (c.azimuth>-40 || az>0))
    c.azimuth += az;
    
    if (c.azimuth > 360 || c.azimuth <-360) 
	c.azimuth = c.azimuth % 360;

    c.update();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set elevation">
Camera.prototype.setElevation = function(el)
{
    this.changeElevation(el - this.elevation);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="change elevation">
Camera.prototype.changeElevation = function(el)
{
    var c = this; 
    if((c.elevation<0 || el<0) && (c.elevation>-100 || el>0))
    c.elevation += el;
    
    if (c.elevation > 360 || c.elevation <-360)
	c.elevation = c.elevation % 360;

    c.update();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="calculate orientation">
Camera.prototype.calculateOrientation = function()
{
    var m = this.matrix;
    mat4.multiplyVec4(m, [1, 0, 0, 0], this.right);
    mat4.multiplyVec4(m, [0, 1, 0, 0], this.up);
    mat4.multiplyVec4(m, [0, 0, 1, 0], this.normal);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="update">
Camera.prototype.update = function()
{
    mat4.identity(this.matrix);
   
    mat4.rotateY(this.matrix, this.azimuth * Math.PI/180);
    mat4.rotateX(this.matrix, this.elevation * Math.PI/180);
    mat4.translate(this.matrix, this.position);

    this.calculateOrientation();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="get view transform">
Camera.prototype.getViewTransform = function()
{
    var m = mat4.create();
    mat4.inverse(this.matrix, m);
    return m;
};
//  </editor-fold>