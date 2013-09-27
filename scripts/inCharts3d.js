function Application()
{
    //  <editor-fold defaultstate="collapsed" desc="variables">    
    /** 
     * @member ShowWall
     * @type {Boolean}
     * @desc Switch on/off all walls.
     */
    this.ShowWall        = true;
    /** 
     * @member ShowWallBack
     * @type {Boolean}
     * @desc Switch on/off left and back walls.
     */
    this.ShowWallBack    = true;
    /** 
     * @member ShowLine
     * @type {Boolean}
     * @desc Switch on/off lines on walls.
     */
    this.ShowLine        = true;
    /** 
     * @member ShowTextY 
     * @type {Boolean}
     * @desc Switch on/off text on y-axis.
     */
    this.ShowTextY       = true;
    /** 
     * @member ShowTextXZ 
     * @type {Boolean}
     * @desc Switch on/off text on x-axis and z-axis.
     */
    this.ShowTextXZ      = false;
    /** 
     * @member backgroundColor
     * @type {Array}
     * @desc Change background color of canvas.
     */
    this.backgroundColor = [0.9019607843137255, 0.9019607843137255, 0.9019607843137255, 1.0];
    /** 
     * @member drawTex
     * @type {Boolean}
     * @desc Switch on/off texturing.
     */
    this.drawTex = false;
    this.floorStep = 0;
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="find longest series">
Application.prototype.findMaxSerie = function()
{
    ser_max = series[0];
    if(chart.number_SeriesArray.length>1)
    for(var i = chart.number_SeriesArray[1], x = 0; x < chart.number_SeriesArray.length; x++)
    {
        if(series[i].data.length>ser_max.data.length)
            ser_max = series[i];
        
        i=chart.number_SeriesArray[x+1];
    }
};
 //  </editor-fold>
 
//  <editor-fold defaultstate="collapsed" desc="loadScene">
Application.prototype.loadScene = function()
{
  //  Scene.loadObject('models/floor.json', 'floor');  
    Scene.loadObject('models/wall_back.json', 'wall_bottom');
    Scene.loadObject('models/wall_back.json', 'wall_back');
    Scene.loadObject('models/wall_back.json', 'wall_left');
    
    for(var i=0; i<6; i++)
    {
        Scene.loadObject('models/line.json', 'line_back'+i);
        Scene.loadObject('models/line.json', 'line_left'+i);
    }

    this.load();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="load">
Application.prototype.load = function()
{
    this.findMaxSerie();

    for(var i=0; i<ser_max.data.length; i++)
        Scene.loadObject('models/line.json', 'line_ver'+i);
    
    app.loadTexts();
    chart.initText();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="loadTexts">
Application.prototype.loadTexts = function()
{
    for(var i=0; i<ser_max.data.length; i++)
    {
        Scene.loadObject('models/text.json', i+'textX');
        TextsX.push(new Text(chart.legendX[i]));
    }

    for(var i=0; i<chart.number_SeriesArray.length; i++)
    {
        Scene.loadObject('models/text.json', i+'textZ');
        TextsZ.push(new Text(chart.legendZ[i]));
    }
    
    for(var i=0; i<6; i++)
    {
        Scene.loadObject('models/text.json', i+'textY');
        Texts.push(new Text(3+3*i+".0"));
    }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="configure">
Application.prototype.configure = function()
{
    gl.clearColor(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2], this.backgroundColor[3]);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);   
    gl.blendColor(1.0, 1.0, 1.0, 1.0);    
    
    //  <editor-fold defaultstate="collapsed" desc="set camera">
    camera = new Camera();

    camera.goHome([25, 2, 76]);
    camera.azimuth   = 9;
    camera.elevation = -4; 

    camera.setFocus([0.0, 0.0, 0.0]);
    //  </editor-fold>

    picker     = new Picker(canvas);
    interactor = new CameraInter(camera,canvas);
    interactor.setPicker(picker);
    transforms = new SceneTransforms(camera);
};
  //  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="timeTick">
Application.prototype.timeTick = function()
{
    var timeNow = (new Date).getTime();
    if (lastTime !== 0)
    {
        elapsed = timeNow - lastTime;
        elapsed_s = elapsed/1000;
    }
    lastTime = timeNow;
};
 //  </editor-fold>
 
//  <editor-fold defaultstate="collapsed" desc="render"> 
Application.prototype.render = function()
{
    gl.bindFramebuffer(gl.FRAMEBUFFER, picker.framebuffer);
    gl.uniform1i(shaderProgram.uOffscreen, true);
    this.drawScene();

    gl.uniform1i(shaderProgram.uOffscreen, false);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.drawScene();
};
 //  </editor-fold>
   
//  <editor-fold defaultstate="collapsed" desc="drawScene">
Application.prototype.drawScene= function() 
{
  //  <editor-fold defaultstate="collapsed" desc="set viewport">
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0.0, 0.0, c_width, c_height);
  transforms.updatePerspective();
   //  </editor-fold>
   
  //  <editor-fold defaultstate="collapsed" desc="variables">
  var numText  = 0;
  var numTextX = 0;
  var numTextZ = 0;
  var numLine_back = 0;
  var numLine_left = 0;
  var numLine_ver  = 0;
  
  if(series[0]!=null)
  {
     for(var i=0; i<chart.number_SeriesArray.length ; i++)
        posZ[i]=series[chart.number_SeriesArray[i]].posZ+10*series[0].scaleX;
  }
  
  for(var k=0; k<series.length; k++)
  {
    series[k].numTab_bottom = 0;
    series[k].numTab = 0;
  }

  //  </editor-fold>
   
    for(var i=0; i<Scene.objects.length; i++)
    {
        //  <editor-fold defaultstate="collapsed" desc="get object">
        var object = Scene.objects[i];
         //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="calculate ModelView">
        transforms.calculateModelView();           
        transforms.push();
         //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set uniform">
        gl.uniform4fv(shaderProgram.uMaterialDiffuse, object.diffuse);
        gl.uniform4fv(shaderProgram.uMaterialAmbient, object.ambient);
        gl.uniform4fv(shaderProgram.uMaterialSpecular, object.specular);
        gl.uniform1i(shaderProgram.uWireframe, object.wireframe);
        gl.uniform1i(shaderProgram.uPerVertexColor, object.perVertexColor);
        gl.uniform4fv(shaderProgram.uPickingColor, object.pcolor);
        gl.uniform1i(shaderProgram.uUseVertexColor, false);
        gl.uniform1i(shaderProgram.uUseTextures, false);
        gl.uniform1i(shaderProgram.uUseShadow, true);
        gl.uniform1f(shaderProgram.uAlpha, 1.0);
        
        gl.enableVertexAttribArray(shaderProgram.aVertexPosition);
        gl.enableVertexAttribArray(shaderProgram.aVertexNormal);
        gl.disableVertexAttribArray(shaderProgram.aVertexColor);
        gl.disableVertexAttribArray(shaderProgram.aVertexTextureCoords);
        //  </editor-fold>
         
        //  <editor-fold defaultstate="collapsed" desc="set shape position">
        if(object.alias.substring(1,9)=='cylinder' || object.alias.substring(2,10)=='cylinder' ||
                object.alias.substring(1,5)=='cube' || object.alias.substring(2,6)=='cube' ||
                object.alias.substring(1,5)=='cone' || object.alias.substring(2,6)=='one')
        for(var k=0; k<series.length; k++)
            for(var j=0; j<series[k].data_p.length; j++)
            {
                if(object.alias === k+"cube"+j)
                {
                    this.setShape(k, j, series[k].scaleX, 1, series[k].alpha[j]);
                    texture = series[k].texture;
                }
                else if(object.alias === k+"cylinder"+j)
                {  
                    mat4.translate(transforms.mvMatrix, [0, 7.9, 0]);
                    this.setShape(k, j, series[k].scaleX*3, 9.9,series[k].alpha[j]);
                    mat4.rotate(transforms.mvMatrix,1.57,[1 ,0, 0]);
                    mat4.rotate(transforms.mvMatrix,0.9,[0, 0, 1]);
                    texture = series[k].texture;
                }
                else if(object.alias === k+"cone"+j)
                {
                    mat4.translate(transforms.mvMatrix, [0,8,0]);
                    this.setShape(k,j,series[k].scaleX*3,10,series[k].alpha[j]);
                    mat4.rotate(transforms.mvMatrix,-1.57,[1,0,0]);
                    texture=series[k].texture;
                }
            }
         //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="set text position">
        if(object.alias.substring(1,6)=='textY')
        {
            if(this.ShowTextY)
                mat4.translate(transforms.mvMatrix, [-3.3+3.3*((1-Texts[numText].scaleX)*0.5)+translateX, 1.3+numText*3-translateY, 10.0]); 
            else
                gl.uniform1f(shaderProgram.uAlpha, 0.0);
            mat4.scale(transforms.mvMatrix, [Texts[numText].scaleX, Texts[numText].scaleY, 1.0]);  
        }
        else if(object.alias.substring(1,6)=='textX' || object.alias.substring(2,7)=='textX')
        {  
            var posX = 0;
            if(camera.azimuth<0)
                 posX -= 5;

            if(this.ShowTextXZ)
            {
                //przesunięcie napisu "podsumowanie"
                if(numTextX==0)
                {
                    if(chart.showSum)
                        mat4.translate(transforms.mvMatrix, [ 7+posX+translateX, (-4-camera.elevation/8)*TextsX[numTextX].bottom-translateY, 15]); 
                    else
                    {
                        mat4.translate(transforms.mvMatrix, [7+translateX, -10-translateY, -15]); 
                        gl.uniform1f(shaderProgram.uAlpha, 0.0);
                    }
                }
                else
                    mat4.translate(transforms.mvMatrix, [ser_max.posX[numTextX-1]+2+posX+translateX, (-4-camera.elevation/8)*TextsX[numTextX].bottom-translateY, 15]);
                
                mat4.rotateX(transforms.mvMatrix, camera.elevation * Math.PI/180);
                mat4.rotateY(transforms.mvMatrix, camera.azimuth * Math.PI/180);
                mat4.rotate(transforms.mvMatrix, 0.6, [0, 0, 1]);
                mat4.rotate(transforms.mvMatrix, 0.1, [0, 1, 0]); 
                mat4.scale(transforms.mvMatrix, [TextsX[numTextX].scaleX, TextsX[numTextX].scaleY, 1.0]);              
            }
            else
            {
                 gl.uniform1f(shaderProgram.uAlpha, 0.0);
                 mat4.translate(transforms.mvMatrix, [0+translateX, -5-translateY, 0]);
            }
            
            if(camera.azimuth<0)
                 mat4.rotate(transforms.mvMatrix, -1.3, [0, 0, 1]);
        }
        else if(object.alias.substring(1,6)=='textZ' || object.alias.substring(2,7)=='textZ')
        {    
            if(this.ShowTextXZ)
            {
                mat4.translate(transforms.mvMatrix, [53+translateX, -3-camera.elevation/8+numTextZ-translateY, posZ[numTextZ]-camera.azimuth/10]);
                mat4.rotateX(transforms.mvMatrix, camera.elevation * Math.PI/180);
                mat4.rotateY(transforms.mvMatrix, camera.azimuth * Math.PI/180);
                mat4.scale(transforms.mvMatrix, [TextsZ[numTextZ].scaleX, TextsZ[numTextZ].scaleY, 1.0]);
            }
            else
            {
                 gl.uniform1f(shaderProgram.uAlpha, 0.0);
                 mat4.translate(transforms.mvMatrix, [0+translateX, -5-translateY, 0]);
            }
        }
        //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="set top_marks">
        if(object.alias.substring(1,10)=='top_marks' || object.alias.substring(2,11)=='top_marks' )
        {
            var index;
            if(object.alias.substring(1,10)=='top_marks')
                index= object.alias.substring(0,1);
            else if(object.alias.substring(2,11)=='top_marks')
                index= object.alias.substring(0,2);
            
            if(series[index].showMarks)
            {
                mat4.translate(transforms.mvMatrix, [series[index].posX_old[series[index].numTab]+translateX, 18+series[index].marks_pos[series[index].numTab]+1-translateY, series[index].posZ]);
                mat4.scale(transforms.mvMatrix, [0.45, 0.1, 0.01]) ; 
            }
            else
            {
                mat4.translate(transforms.mvMatrix, [0+translateX, -20-translateY, 0]);
                gl.uniform1f(shaderProgram.uAlpha, 0.0);
            }
        }
        //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="set bottom_marks">
        if(object.alias.substring(1,13)=='bottom_marks' || object.alias.substring(2,14)=='bottom_marks')
        {
            var index;
            if(object.alias.substring(1,13)=='bottom_marks')
                index= object.alias.substring(0,1);
            else if(object.alias.substring(2,14)=='bottom_marks')
                index= object.alias.substring(0,2);

            if(series[index].showMarks)
            {
                mat4.translate(transforms.mvMatrix, [series[index].posX_old[series[index].numTab_bottom]+translateX, 17+series[index].marks_pos[series[index].numTab_bottom]-translateY, series[index].posZ]);
                mat4.scale(transforms.mvMatrix, [0.05, 0.2, 0.05]); 
                series[index].numTab_bottom += 1;
            }
            else
            {
                mat4.translate(transforms.mvMatrix, [0+translateX, -20-translateY, 0]);
                gl.uniform1f(shaderProgram.uAlpha, 0.0);
            }
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set line position">
        if(object.alias.substring(0,4)=='line' && this.ShowLine)
        {
            if(object.alias.substring(0,9)=='line_back')
            {
                mat4.translate(transforms.mvMatrix, [0+translateX, 3+numLine_back*3-translateY, -10.15]);
                numLine_back += 1; 
            }
            else if(object.alias.substring(0,9)=='line_left')
            {
                mat4.translate(transforms.mvMatrix, [0.05+translateX, 3+numLine_left*3-translateY, 10]);
                mat4.scale(transforms.mvMatrix, [1, 1, 0.4]);
                mat4.rotate(transforms.mvMatrix,1.57,[0, 1, 0]);
                numLine_left += 1;
            }
            else if(object.alias.substring(0,8)=='line_ver')
            {

                mat4.translate(transforms.mvMatrix, [ser_max.posX[numLine_ver]+translateX, 0-translateY, -10.15]);
                mat4.scale(transforms.mvMatrix, [1, 0.435, 1]);
                mat4.rotate(transforms.mvMatrix, 1.57, [0, 0, 1]);
                numLine_ver += 1;
            }
            gl.uniform1i(shaderProgram.uWireframe, true);
        }
        else if(object.alias.substring(0,4)=='line' && !this.ShowLine)
        {
            mat4.translate(transforms.mvMatrix, [ser_max.posX[numLine_ver]+translateX, -10-translateY, -10]);
            gl.uniform1f(shaderProgram.uAlpha, 0.0);
        }
         //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="set wall position">
        if(object.alias.substring(0,4)=='wall' && this.ShowWall)
        {
            if(object.alias.substring(0,9)=='wall_back' && this.ShowWallBack)
                mat4.translate(transforms.mvMatrix, [0+translateX, -0.1-translateY, -10.2]);
            else if(object.alias.substring(0,9)=='wall_back' && !this.ShowWallBack)
                 mat4.translate(transforms.mvMatrix, [0+translateX, -25-translateY, -20]);
            else if(object.alias.substring(0,9)=='wall_left' && this.ShowWallBack)
            {
                mat4.translate(transforms.mvMatrix, [0+translateX, -0.1-translateY, 10]);
                mat4.rotate(transforms.mvMatrix, 1.57,[0, 1, 0]);
                mat4.scale(transforms.mvMatrix, [0.405, 1, 1]);
            }
            else if(object.alias.substring(0,9)=='wall_left' && !this.ShowWallBack)
                mat4.translate(transforms.mvMatrix, [0+translateX, -25-translateY, -20]);
            else if(object.alias.substring(0,11)=='wall_bottom')
            {
                mat4.translate(transforms.mvMatrix, [0+translateX, -0.6-translateY, -10.3]);
                mat4.rotate(transforms.mvMatrix, 1.57, [1, 0, 0]);
                mat4.scale(transforms.mvMatrix, [1, 0.92, 10]);
            }
            gl.uniform1f(shaderProgram.uAlpha, Scene.wallColor[3]);
        }
        else if(object.alias.substring(0,4)=='wall' && !this.ShowWall)
        {
            mat4.translate(transforms.mvMatrix, [0+translateX, -25-translateY, -20]);
            gl.uniform1f(shaderProgram.uAlpha, 0.0);
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set floor position">
        if(object.alias == 'floor')
        {
            mat4.translate(transforms.mvMatrix, [-130+translateX, -14.7-translateY-this.floorStep, -170]);
            mat4.scale(transforms.mvMatrix, [12, 14, 12]) ;
            mat4.rotate(transforms.mvMatrix, 1.57, [1, 0, 0]);
            gl.uniform1f(shaderProgram.uAlpha, 0.0);
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set matrix uniform">
        transforms.setMatrixUniforms();
        transforms.pop();
         //  </editor-fold>

        //  <editor-fold defaultstate="collapsed" desc="enable vertex attribute">
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
         //  </editor-fold>
         
        //  <editor-fold defaultstate="collapsed" desc="set texture buffer">
        if (object.texture_coords)
        {
            var t = object.alias;
            if(!((t.substring(1,5)=='cube' || t.substring(1,9)=='cylinder' || t.substring(2,6)=='cube' || t.substring(2,10)=='cylinder' ||  t.substring(1,5)=='cone' || t.substring(2,6)=='cone' ) && !this.drawTex))
            {
                gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
                gl.uniform1i(shaderProgram.uUseTextures, true);
                gl.bindBuffer(gl.ARRAY_BUFFER, object.tbo);
                gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
                gl.activeTexture(gl.TEXTURE0);
                gl.uniform1i(shaderProgram.samplerUniform, 0);
            
                //  <editor-fold defaultstate="collapsed" desc="set text texture">
                if(object.alias.substring(1,6)=='textY')
                {   
                   gl.bindTexture(gl.TEXTURE_2D, Texts[numText].texture);
                   gl.uniform1i(shaderProgram.uUseShadow, false);
                   numText += 1;
                }
                else if(object.alias.substring(1,6)=='textX' || object.alias.substring(2,7)=='textX')
                {   
                   gl.bindTexture(gl.TEXTURE_2D, TextsX[numTextX].texture);
                   gl.uniform1i(shaderProgram.uUseShadow, false);
                   numTextX += 1;
                }
                else if(object.alias.substring(1,6)=='textZ' || object.alias.substring(2,7)=='textZ')
                {   
                   gl.bindTexture(gl.TEXTURE_2D, TextsZ[numTextZ].texture);
                   gl.uniform1i(shaderProgram.uUseShadow, false);
                   numTextZ += 1;
                }
                 //  </editor-fold>
            
                //  <editor-fold defaultstate="collapsed" desc="set top_marks texture">
                else if (object.alias.substring(1,10)=='top_marks' || object.alias.substring(2,11)=='top_marks')
                {
                    var index;
                    if(object.alias.substring(1,10)=='top_marks')
                        index = object.alias.substring(0,1);
                    else if(object.alias.substring(2,11)=='top_marks')
                        index = object.alias.substring(0,2);

                    gl.bindTexture(gl.TEXTURE_2D, series[index].TextsTab[series[index].numTab].texture);
                    series[index].numTab += 1;
                }
                 //  </editor-fold>
            
                else
                    gl.bindTexture(gl.TEXTURE_2D,texture);
            }
        }
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="set normal buffer">
        if(!object.wireframe)
        {
            gl.enableVertexAttribArray(shaderProgram.aVertexNormal);
            gl.bindBuffer(gl.ARRAY_BUFFER, object.nbo);
            gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0,0);
        }
        //  </editor-fold>
    
        //  <editor-fold defaultstate="collapsed" desc="bind buffer indices">
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.ibo);
        //  </editor-fold>
        
        //  <editor-fold defaultstate="collapsed" desc="draw elements">
        if(object.alias.substring(0,4)=='line')
            gl.drawElements(gl.LINES, object.indices.length, gl.UNSIGNED_SHORT, 0);
        else
            gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
           //  </editor-fold>
    }
};
 //  </editor-fold>
 
//  <editor-fold defaultstate="collapsed" desc="setShape">
Application.prototype.setShape = function(indexSeries, index, scale_hor, scale_ver, alp)
{ 
    mat4.translate(transforms.mvMatrix, [series[indexSeries].posX_old[index]+translateX, series[indexSeries].min_h[index]-translateY, series[indexSeries].posZ]);
    mat4.scale(transforms.mvMatrix, [scale_hor, scale_ver, scale_hor]);
    
    //  <editor-fold defaultstate="collapsed" desc="set anim parameters">
    if(series[indexSeries].anim==0)
        gl.uniform1f(shaderProgram.uAlpha, alp);
     //  </editor-fold>
};
 //  </editor-fold>