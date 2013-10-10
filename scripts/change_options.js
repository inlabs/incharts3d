/******************************************************************************
Name:    incharts3d
Author:  Inlabs sp. z o.o. (Maciej Pleśnar, Ewelina Bendlin, Kamil Daszkowski)
Version: 1.1 (October 2013)
Support: http://incharts3d.com

Licence:
incharts3d is licensed under a Creative Commons Attribution-NonCommercial 3.0
License (http://creativecommons.org/licenses/by-nc/3.0/).
Noncommercial. You may not use this work for commercial purposes.
******************************************************************************/
(function( $ ) {
    $.fn.settings = function(action, value) {
        switch(action) {
            case "data": {
                    deleteAll();
                    data = [];
                    data.push(value);
                    restart();
    
                    break;
            }
            case "shape": {
                    chart.changeShape(value);
                    chart.setMarksPos();
                    chart.setZeroElement();   
                    
                    break;
            }
            case "speed": {
                    for(var i=0; i<series.length;i++)
                    {
                        series[i].speed=value;
                        for(var j=0; j<series[i].min_h.length;j++)
                            series[i].min_h[j]=-18;
                    }
                    
                    break;
            }
            case "showMarks": {
                    for(var i=0; i<series.length;i++)
                    {
                        series[i].showMarks=value;
                        showMarks = value;
                    }
                    break;
            }
            case "anim": {
                    for(var i=0; i<series.length;i++)
                    {
                        series[i].anim=value;
                        anim = value;
                        switch(value) {
                            case 0: {
                                series[i].initAnim0();
                                break;
                            }
                            case 1: {
                                series[i].initAnim1();
                                break;
                            }
                            default : {
                                series[i].initAnim1();
                                series[i].anim=1;
                                anim = 1;
                                break;   
                            }
                        }
                    }
                    break;
            }
            case "texturePath": {
                    
                    var T = new Texture(value);
                    for(var i=0; i<series.length;i++)
                    {
                        series[i].texture = T.tex;
                        texturePath = T.tex;
                    }
                    
                    break;
            }
            case "legendX": {
                    legendX = value;
                    
                    TextsX = chart.changeTextXZ(legendX,TextsX,23,false);
                    break;
            }
            case "legendZ": {
                    legendZ = value;
                    
                    TextsZ = chart.changeTextXZ(legendZ,TextsZ,33,false);
                    break;
            }
            case "showWall": {
                    app.ShowWall = value; 
                    break;
            }
            case "showWallBack": {
                    app.ShowWallBack = value;
                    break;
            }
            case "showLine": {
                    app.ShowLine = value;
                    break;
            }
            case "showTextY": {
                    app.ShowTextY = value;
                    
                    break;
            }
            case "showTextXZ": {
                    app.ShowTextXZ = value;
                    break;
            }
            case "backgroundColor": {
                    app.backgroundColor = value;
                    gl.clearColor(value[0], value[1], value[2], value[3]);
                    
                    break;
            }
            case "drawTex": {
                    app.drawTex = value;
                    if(app.drawTex)
                    {
                      var t;
                      for(var i=0; i<Scene.objects.length; i++)
                      {
                        t = Scene.objects[i].alias;
                        if(t.substring(1,5)=='cube' || t.substring(1,9)=='cylinder' || t.substring(2,6)=='cube' || t.substring(2,10)=='cylinder')
                            Scene.objects[i].diffuse = [1,1,1,1.0];
                      }
                    } 
                    
                    break;
            }
            case "lightPosition": {
                    light.lightPosition = value;
                    lightPosition = value;
                    gl.uniform3fv(shaderProgram.uLightPosition,  value);
                    break;
            }
            case "ambient": {
                    light.ambient = value;
                    ambient = value;
                    gl.uniform4fv(shaderProgram.uLightAmbient, value);
                    break;
            }
            case "diffuse": {
                    light.diffuse = value;
                    diffuse = value;
                    gl.uniform4fv(shaderProgram.uLightDiffuse, value);
                    
                    break;
            }
            case "lightSpecular": {
                    light.lightSpecular = value;
                    lightSpecular = value;
                    gl.uniform4fv(shaderProgram.uLightSpecular, value);
                    
                    break;
            }
            case "shininess": {
                    light.Shininess = value;
                    Shininess = value;
                    gl.uniform1f(shaderProgram.uShininess, value);
                    
                    break;
            }
            case "fillText": {
                    fillText = value;
                    for(var i=0; i<Texts.length;i++)
                    {
                        Texts[i].fillText = value;
                        Texts[i].init();
                    }
                        
                    break;
            }
            case "fontSize": {
                    fontSize = value;
                    for(var i=0; i<Texts.length;i++)
                    {
                        Texts[i].fontSize = value;
                        Texts[i].init();
                    }
                    break;
            }
            case "font": {
                    font = value;
                    for(var i=0; i<Texts.length;i++)
                    {
                        Texts[i].font = value;
                        Texts[i].init();
                    }
                    break;
            }
            case "lineWidth": {
                    lineWidth = value;
                    for(var i=0; i<Texts.length;i++)
                    {
                        Texts[i].lineWidth = value;
                        Texts[i].init();
                    }
                    break;
            }
            case "lineColor": {
                    Scene.lineColor = value;
                    lineColor = value;
                    
                    for(var i=0; i<Scene.objects.length;i++)
                    {
                        if(Scene.objects[i].alias.substring(0,4)=='line')
                            Scene.objects[i].diffuse = value;
                    }
                    break;
            }
            case "wallColor": {
                    Scene.wallColor = value;
                    wallColor = value;
                    
                    for(var i=0; i<Scene.objects.length;i++)
                    {
                        if(Scene.objects[i].alias.substring(0,4)=='wall')
                            Scene.objects[i].diffuse = value;
                    }
                    break;
            }
            case "marksBottomColor": {
                    Scene.marksBottomColor = value;
                    marksBottomColor = value;
                    for(var i=0; i<Scene.objects.length;i++)
                    {
                        if(Scene.objects[i].alias.substring(1,13)=='bottom_marks'|| Scene.objects[i].alias.substring(2,14)=='bottom_marks')
                            Scene.objects[i].diffuse = value;
                    }
                    break;
            }
            case "marksTopColor": {
                    marksTopColor = value;
                    Scene.marksTopColor = value;
                    for(var i=0; i<series.length;i++)
                        for(var j=0; j<series[i].TextsTab.length;j++)
                        {
                            var color = "rgba("+Scene.marksTopColor[0]*255+","+Scene.marksTopColor[1]*255+","+Scene.marksTopColor[2]*255+",255)";
                            series[i].TextsTab[j].fillAlpha = color;
                            series[i].TextsTab[j].init();
                        }
                    break;
            }
            case "twoColors": {
                    Scene.twoColors = value;
                    twoColors = value;
                    
                    for(var i=0; i<Scene.objects.length;i++)
                        Scene.setShapeColor(0,Scene.objects[i]);
                    break;
            }
            case "diffColors": {
                    Scene.diffColors = value;
                    diffColors = value;
                    
                    for(var i=0; i<Scene.objects.length;i++)
                        Scene.setShapeColor(0,Scene.objects[i]);
                    break;
            }
            case "diffCol": {
                    Scene.diffCol = value;
                    diffCol = value;
                  
                    for(var i=0; i<Scene.objects.length;i++)
                    {
                        if(!value) {
                            var t = Scene.objects[i].alias;

                            if(t.substring(1,5)=='cube' || t.substring(1,9)=='cylinder' || t.substring(2,6)=='cube' || t.substring(2,10)=='cylinder' ||
                               t.substring(1,5)=='cone' ||  t.substring(2,6)=='cone')
                                Scene.objects[i].diffuse=[0.313,0.364,0.552,1];
                        } else {
                            for(var i=0; i<Scene.objects.length;i++)
                                Scene.setShapeColor(0,Scene.objects[i]);
                        }
                    }
                    break;
            }
            case "twoCol": {
                    Scene.twoCol = value;
                    twoCol = value;
                    for(var i=0; i<Scene.objects.length;i++)
                    {
                        if(!value) {
                            var t = Scene.objects[i].alias;

                            if(t.substring(1,5)=='cube' || t.substring(1,9)=='cylinder' || t.substring(2,6)=='cube' || t.substring(2,10)=='cylinder' ||
                               t.substring(1,5)=='cone' ||  t.substring(2,6)=='cone')
                                Scene.objects[i].diffuse=[0.313,0.364,0.552,1];
                        } else {
                            for(var i=0; i<Scene.objects.length;i++)
                                Scene.setShapeColor(0,Scene.objects[i]);
                        }
                    }
                    break;
            }
            case "colors": {
                    colors = value;
                    Scene.colorsPalette[0]=value;
                    for(var i=0; i<Scene.objects.length;i++)
                    {
                        for(var i=0; i<Scene.objects.length;i++)
                            Scene.setShapeColor(0,Scene.objects[i]);
                    }
                    break;
            }
        }
    };
}( jQuery ));