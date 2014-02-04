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

function Camera()
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.matrix     = mat4.create();
    this.position   = vec3.create();
    this.x          = 25.0;
    this.y          = 2.0;
    this.z          = 76.0;
    this.position   = [this.x, this.y, this.z];
    this.horizontal = 9.0;
    this.vertical   = -4.0;
    
    this.update();
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="change horizontal">
Camera.prototype.changeHorizontalPosition = function(ho)
{
    if((this.horizontal<80 || ho<0) && (this.horizontal>-40 || ho>0))
        this.horizontal += ho;
    
    if (this.horizontal < -360 || this.horizontal > 360) 
	this.horizontal = this.horizontal % 360;

    this.update();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="change vertical">
Camera.prototype.changeVerticalPosition = function(el)
{
    if((this.vertical<0 || el<0) && (this.vertical>-100 || el>0))
        this.vertical += el;
    
    if (this.vertical < -360 || this.vertical > 360)
	this.vertical = this.vertical % 360;

    this.update();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="update">
Camera.prototype.update = function()
{
    mat4.identity(this.matrix);
   
    var tmp = Math.PI/180;
    mat4.rotateY(this.matrix, this.horizontal * tmp);
    mat4.rotateX(this.matrix, this.vertical * tmp);
    mat4.translate(this.matrix, this.position);

    this.setNewMatrixCamera();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setNewMatrixCamera">
Camera.prototype.setNewMatrixCamera = function()
{
    var tmp = vec3.create();
    mat4.multiplyVec4(this.matrix, [0, 1, 0, 0], tmp);
    mat4.multiplyVec4(this.matrix, [1, 0, 0, 0], tmp);
    mat4.multiplyVec4(this.matrix, [0, 0, 1, 0], tmp);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setPosition">
Camera.prototype.setPosition = function(newPosition)
{
    vec3.set(newPosition, this.position);
    this.update();
};
//  </editor-fold>