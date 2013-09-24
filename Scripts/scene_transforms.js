function SceneTransforms(c)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.stack     = [];
    this.camera    = c;
    this.mvMatrix  = mat4.create();    
    this.pMatrix   = mat4.create();    
    this.nMatrix   = mat4.create();    
    this.cMatrix   = mat4.create();  	
    this.init();
    //  </editor-fold>
};

//  <editor-fold defaultstate="collapsed" desc="calculate modelView">
SceneTransforms.prototype.calculateModelView = function()
{
    this.mvMatrix = this.camera.getViewTransform();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="calculate normal">
SceneTransforms.prototype.calculateNormal = function()
{
    mat4.identity(this.nMatrix);
    mat4.set(this.mvMatrix, this.nMatrix);
    mat4.inverse(this.nMatrix);
    mat4.transpose(this.nMatrix);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="calculate perspective">
SceneTransforms.prototype.calculatePerspective = function()
{
    mat4.identity(this.pMatrix);
    mat4.perspective(30, c_width/c_height, 0.1, 1000.0, this.pMatrix);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="init">
SceneTransforms.prototype.init = function()
{
    this.calculateModelView();
    this.calculatePerspective();
    this.calculateNormal();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="update perspective">
SceneTransforms.prototype.updatePerspective = function()
{
    mat4.perspective(30, c_width/c_height, 0.1, 1000.0, this.pMatrix); 
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set matrixUniforms">
SceneTransforms.prototype.setMatrixUniforms = function()
{
    this.calculateNormal();
    gl.uniformMatrix4fv(shaderProgram.uMVMatrix, false, this.mvMatrix);  
    gl.uniformMatrix4fv(shaderProgram.uPMatrix, false, this.pMatrix);    
    gl.uniformMatrix4fv(shaderProgram.uNMatrix, false, this.nMatrix);    
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="push">
SceneTransforms.prototype.push = function()
{
    var memento =  mat4.create();
    mat4.set(this.mvMatrix, memento);
    this.stack.push(memento);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="pop">
SceneTransforms.prototype.pop = function()
{
    if(this.stack.length == 0) 
        return;
    
    this.mvMatrix = this.stack.pop();
};
//  </editor-fold>