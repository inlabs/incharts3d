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
function MatrixTransformations(camera, canvas, shaderProgram)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.camera    = camera;
    this.canvas    = canvas;
    this.shaderProgram = shaderProgram;
    
    this.mvMatrix  = null;   
    this.pMatrix   = null;  
    this.nMatrix   = null; 
    this.heap     = [];
    
    this.initMatrix();
    //  </editor-fold>
};

//  <editor-fold defaultstate="collapsed" desc="initMatrix">
MatrixTransformations.prototype.initMatrix = function()
{
    this.mvMatrix  = mat4.create();    
    this.pMatrix   = mat4.create();    
    this.nMatrix   = mat4.create();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="pop">
MatrixTransformations.prototype.pop = function()
{
    this.mvMatrix = this.heap.pop();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="push">
MatrixTransformations.prototype.push = function()
{
    this.heap.push(mat4.create());
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="complementShaders">
MatrixTransformations.prototype.complementShaders = function(gl)
{
    mat4.identity(this.nMatrix);
    mat4.set(this.mvMatrix, this.nMatrix);
    mat4.transpose(this.nMatrix);
    mat4.inverse(this.nMatrix);

    gl.uniformMatrix4fv(this.shaderProgram.uNMatrix, false, this.nMatrix);    
    gl.uniformMatrix4fv(this.shaderProgram.uMVMatrix, false, this.mvMatrix);  
    gl.uniformMatrix4fv(this.shaderProgram.uPMatrix, false, this.pMatrix);  
};
//  </editor-fold>
