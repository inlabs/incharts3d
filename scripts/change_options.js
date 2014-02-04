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

(function( $ ) {
    $.fn.settings = function(action, value) {
        switch(action) {
            
            //  <editor-fold defaultstate="collapsed" desc="type">
           case "type": {
                    program.demo.deleteAll();
                    program.type=value;
                    program.scene.type=value;
                    switch(value)
                    {
                        case 0:        
                            var d = program.data;
                            var data = [];
                            data.push(d);
                            program.demo.restart(data);
                            program.demo.setText();
                            program.scene.setSeriesType(0,program.series);
                            program.interactor.type=0;
                            if(program.series[0].max<-18)
                                program.TextsY=program.chart.changeTextY(program.TextsY);
                            program.demo.setLines(program.findMaxSerie())
                            break;
                        case 1:
                            program.series_area = new Series_area(program.gl,program.scene,program.data,program.speed,
                            program.showMarks,program.anim,program.fillText,program.fontSize,program.font,program.lineWidth,program.alpha);

                            program.scene.setSeriesType(1,program.series_area);
                            program.picker.setSeriesArea(program.series_area);
                            program.interactor.type=1;
                            program.TextsY = new Array();
                            program.demo.setText();
                            program.TextsY=program.series_area.changeTextY(program.TextsY)
                            program.demo.setLines(program.series_area.data_pier.length);
                        break;
                    }

                    break;
            }
             //  </editor-fold>
             
            //  <editor-fold defaultstate="collapsed" desc="data">
            case "data": {
                    program.demo.deleteAll();
                    program.data=value;
                    switch(program.type)
                    {
                        case 0:
                            var data = [];
                            data.push(value);
                            program.demo.restart(data);
                            program.demo.setText();
                            if(program.series[0].max<-18)
                                program.TextsY=program.chart.changeTextY(program.TextsY);
                            program.demo.setLines(program.findMaxSerie())
                            break;
                        case 1:
                            for(var i=0; i<program.data.length;i++)
                            for(var j=program.data[i].length; j>=0;j--)
                                if(j!=0)
                                    program.data[i].splice(1, 1);
                                    
                            program.series_area = new Series_area(program.gl,program.scene,program.data,program.speed,
                            program.showMarks,program.anim,program.fillText,program.fontSize,program.font,program.lineWidth,program.alpha);

                            program.scene.setSeriesType(1,program.series_area);
                            program.picker.setSeriesArea(program.series_area);
                            program.interactor.type=1;
                            program.TextsY = new Array();
                            program.demo.setText();
                            program.TextsY=program.series_area.changeTextY(program.TextsY)
                            program.demo.setLines(program.series_area.data_pier.length);
                            break;
                    }
                    break;
            }
             //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="shape">
            case "shape": {
                    if(program.type==0)
                    {
                        program.demo.deleteAll();
                        program.shape=2;

                        var d = program.data;
                        var data = [];
                        data.push(d);
                        program.demo.restart(data);
                        program.demo.setText();
                        if(program.series[0].max<-18)
                             program.TextsY=program.chart.changeTextY(program.TextsY);
                        program.demo.setLines(program.findMaxSerie())
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="speed">
            case "speed": {
                    
                    program.speed=value;
                    switch(program.type)
                    {
                        case 0:
                            for(var i=0; i<program.series.length;i++)
                            {
                                program.series[i].speed=value;
                                for(var j=0; j<program.series[i].min_h.length;j++)
                                    program.series[i].min_h[j]=-18;
                            }
                            break;
                        case 1:
                            program.series_area.speed = value/500;
                            program.series_area.posY=-18;
                            break;
                            
                    }
                    break;
            }
             //  </editor-fold>
        
            //  <editor-fold defaultstate="collapsed" desc="showMarks">
            case "showMarks": {
                    program.demo.deleteAll();
                    program.showMarks=value;
                    switch(program.type)
                    {
                        case 0:       
                            var data = [];
                            var d = program.data;
                            data.push(d);
                            program.demo.restart(data);
                            program.demo.setText();
                            if(program.series[0].max<-18)
                                program.TextsY=program.chart.changeTextY(program.TextsY);
                            program.demo.setLines(program.findMaxSerie())
                            break;
                            
                        case 1:
                            program.series_area = new Series_area(program.gl,program.scene,program.data,program.speed,
                            program.showMarks,program.anim,program.fillText,program.fontSize,program.font,program.lineWidth,program.alpha);

                            program.scene.setSeriesType(1,program.series_area);
                            program.picker.setSeriesArea(program.series_area);
                            program.interactor.type=1;
                            program.TextsY = new Array();
                            program.demo.setText();
                            program.TextsY=program.series_area.changeTextY(program.TextsY)
                            program.demo.setLines(program.series_area.data_pier.length);
                            break;
                        break;
                    }
                    break;
            }
            //  </editor-fold>
             
            //  <editor-fold defaultstate="collapsed" desc="anim">
            case "anim": {
                    program.demo.deleteAll();
                    program.anim=value;
                    switch(program.type)
                    {
                        case 0:        
                            var d = program.data;
                            var data = [];
                            data.push(d);
                            program.demo.restart(data);
                            program.demo.setText();
                            program.scene.setSeriesType(0,program.series);
                            program.interactor.type=0;
                            if(program.series[0].max<-18)
                                program.TextsY=program.chart.changeTextY(program.TextsY);
                            program.demo.setLines(program.findMaxSerie())
                            break;
                        case 1:
                            program.series_area = new Series_area(program.gl,program.scene,program.data,program.speed,
                            program.showMarks,program.anim,program.fillText,program.fontSize,program.font,program.lineWidth,program.alpha);

                            program.scene.setSeriesType(1,program.series_area);
                            program.picker.setSeriesArea(program.series_area);
                            program.interactor.type=1;
                            program.TextsY = new Array();
                            program.demo.setText();
                            program.TextsY=program.series_area.changeTextY(program.TextsY)
                            program.demo.setLines(program.series_area.data_pier.length);
                        break;
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="texturePath">
            case "texturePath": {
                    
                 if(program.type==0)   
                {
                    var T = new Texture(value,program.gl);
                    for(var i=0; i<program.series.length;i++)
                    {
                        program.series[i].texture = T.tex;
                        program.texturePath = T.tex;
               }
                }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="textX">
            case "textX": {
                    program.legendX = value;
                    program.TextsX =program.changeTextXZ(program.legendX,program.TextsX,23,false);
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="textZ">
            case "textZ": {
                    program.legendZ = value;
                    program.TextsZ =program.changeTextXZ(program.legendZ,program.TextsZ,27,false);
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="ShowWall">
            case "ShowWall": {
                    program.ShowWall = value;
                    
                    if(!value)
                    {
                        for(var i=0; i<program.scene.objects.length;i++)
                            if(program.scene.objects[i].alias=='wall_bottom' || program.scene.objects[i].alias=='wall_left'|| program.scene.objects[i].alias=='wall_back')
                                program.scene.removeObject(program.scene.objects[i].alias)
                    }
                    else
                    {
                        program.scene.loadObject('models/wall_back.json', 'wall_bottom');
                        if(program.ShowWallBack)
                        {
                            program.scene.loadObject('models/wall_back.json', 'wall_back');
                            program.scene.loadObject('models/wall_back.json', 'wall_left');
                        }
                    }
                    break;
            }
             //  </editor-fold>
             
            //  <editor-fold defaultstate="collapsed" desc="ShowWallBack">
            case "ShowWallBack": {
                    program.ShowWallBack = value;
                    
                    if(!value)
                    {
                        for(var i=0; i<program.scene.objects.length;i++)
                            if( program.scene.objects[i].alias=='wall_left'|| program.scene.objects[i].alias=='wall_back')
                                program.scene.removeObject(program.scene.objects[i].alias)
                    }
                    else
                    {
                            program.scene.loadObject('models/wall_back.json', 'wall_back');
                            program.scene.loadObject('models/wall_back.json', 'wall_left');
                    }
                   
                    break;
            }
             //  </editor-fold>
       
            //  <editor-fold defaultstate="collapsed" desc="ShowLine">
            case "ShowLine": {
                    program.ShowLine  = value;
                  
                    if(!value)
                    {
                        for(var i=program.scene.objects.length-1; i>=0;i--)
                            if(program.scene.objects[i].alias.substring(0,4)=='line')
                                 program.scene.objects.splice(i, 1);
                    }
                    else
                    {
                        for(var i=0; i<6; i++)
                        {
                            program.scene.loadObject('models/line.json', 'line_back'+i);
                            program.scene.loadObject('models/line.json', 'line_left'+i);
                        }
                        for(var i=0; i<program.max_data; i++)
                            program.scene.loadObject('models/line.json', 'line_ver'+i);
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="ShowTextY">
            case "ShowTextY": {
                    program.ShowTextY  = value;
                  
                    if(!value)
                    {
                        for(var i=program.scene.objects.length-1; i>=0;i--)
                            if(program.scene.objects[i].alias.substring(1,6)=='textY')
                                 program.scene.objects.splice(i, 1);
                    }
                    else
                    {
                        for(var i=0; i<6; i++)
                        {
                            program.scene.loadObject('models/text.json', i+'textY');
                            program.TextsY.push(new Text(3+3*i+".0",program.gl,program.fillText,program.fontSize,program.font,program.lineWidth));
                        }
                        switch(program.type)
                        {
                            case 0:
                                if(program.series[0].max<-18)
                                    program.TextsY=program.chart.changeTextY(program.TextsY);
                                break;
                                
                            case 1:
                                program.TextsY=program.series_area.changeTextY(program.TextsY)
                                break;
                        }
                    }
                    
                    break;
            }
            //  </editor-fold>
        
            //  <editor-fold defaultstate="collapsed" desc="ShowTextXZ">
            case "ShowTextXZ": {
                   program.ShowTextXZ  = value;
                  
                    if(!value)
                    {
                        for(var i=program.scene.objects.length-1; i>=0;i--)
                            if(program.scene.objects[i].alias.substring(1,6)=='textX' || program.scene.objects[i].alias.substring(2,7)=='textX'
                                || program.scene.objects[i].alias.substring(1,6)=='textZ' || program.scene.objects[i].alias.substring(2,7)=='textZ')
                                 program.scene.objects.splice(i, 1);
                    }
                    else
                    {
                        for(var i=0; i<program.max_data; i++)
                        {
                            program.scene.loadObject('models/text.json', i+'textX');
                            program.TextsX.push(new Text(program.legendX[i],program.gl,program.fillText,program.fontSize,program.font,program.lineWidth));
                        }
                        switch(program.type)
                        {
                            case 0:
                                for(var i=0; i<program.chart.number_SeriesArray.length; i++)
                                {
                                    program.scene.loadObject('models/text.json', i+'textZ');
                                    program.TextsZ.push(new Text(program.legendZ[i],program.gl,program.fillText,program.fontSize,program.font,program.lineWidth));
                                }
                                 for(var i=0; i<program.series.length;i++)
                                {
                                    if(program.series[i].number_series==program.series[i].numberBaseSeries)
                                        program.PosTextsZ.push(program.series[i].posZ+12*program.series[0].scaleX);
                                }
                                break;
                            case 1:
                                program.scene.loadObject('models/text.json', '0textZ');
                                program.TextsZ.push(new Text(program.legendZ[0],program.gl,program.fillText,program.fontSize,program.font,program.lineWidth));
                                program.PosTextsZ.push(program.series_area.width_Z_start);
                                break;

                        }
                        program.TextsX = program.changeTextXZ(program.legendX,program.TextsX,23,false);
                        program.TextsZ = program.changeTextXZ(program.legendZ,program.TextsZ,27,true);
                    }
                    
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="drawTex">
           case "drawTex": {
                   
                   if(program.type==0)
                    {
                        program.demo.deleteAll();
                        program.drawTex = value;
                        var d = program.data;
                        var data = [];
                        data.push(d);
                        program.demo.restart(data);
                        program.demo.setText();
                        program.scene.setSeriesType(0,program.series);
                        program.interactor.type=0;
                        if(program.series[0].max<-18)
                            program.TextsY=program.chart.changeTextY(program.TextsY);
                        program.demo.setLines(program.findMaxSerie())
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="backgroundColor">
            case "backgroundColor": {
                    program.backgroundColor = value;
                    program.gl.clearColor(value[0], value[1], value[2], value[3]);
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="lightPosition">
            case "lightPosition": {
                    program.light.lightPosition = value;
                    program.lightPosition = value;
                     var shaderProgram = program.shaders.getShaderProgram();
                    program.gl.uniform3fv(shaderProgram.uLightPosition,  value);
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="ambient">
            case "ambient": {
                    program.light.ambient = value;
                    program.ambient = value;
                    var shaderProgram = program.shaders.getShaderProgram();
                    program.gl.uniform4fv(shaderProgram.uLightAmbient, value);
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="diffuse">
            case "diffuse": {
                    program.light.diffuse = value;
                    program.diffuse = value;
                     var shaderProgram = program.shaders.getShaderProgram();
                    program.gl.uniform4fv(shaderProgram.uLightDiffuse, value);
                    
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="lightSpecular">
            case "lightSpecular": {
                    program.light.lightSpecular = value;
                    program.lightSpecular = value;
                    var shaderProgram = program.shaders.getShaderProgram();
                    program.gl.uniform4fv(shaderProgram.uLightSpecular, value);
                    
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="Shininess">
            case "Shininess": {
                    program.light.Shininess = value;
                    program.Shininess = value;
                    var shaderProgram = program.shaders.getShaderProgram();
                    program.gl.uniform1f(shaderProgram.uShininess, value);
                    
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="fillText">
            case "fillText": {
                    program.fillText = value;
                    
                    if(program.ShowTextY)
                    for(var i=0; i<program.TextsY.length;i++)
                    {
                        program.TextsY[i].fillText = value;
                        program.TextsY[i].init();
                    }
                    if(program.ShowTextXZ)
                    {
                        for(var i=0; i<program.TextsX.length;i++)
                        {
                            program.TextsX[i].fillText = value;
                            program.TextsX[i].init();
                        }
                        for(var i=0; i<program.TextsZ.length;i++)
                        {
                            program.TextsZ[i].fillText = value;
                            program.TextsZ[i].init();
                        }
                    }
                    if(program.showMarks)
                    switch(program.type)
                    {
                        case 0:
                            for(var j=0; j<program.series.length;j++)
                            for(var i=0; i<program.series[j].TextsTab.length;i++)
                            {
                                
                                program.series[j].TextsTab[i].fillText = value;
                                program.series[j].TextsTab[i].init();
                            }
                            break;
                        case 1:
                            for(var i=0; i<program.series_area.TextsTab.length;i++)
                            {
                                
                                program.series_area.TextsTab[i].fillText = value;
                                program.series_area.TextsTab[i].init();
                            }
                            break;
                    }
                        
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="fontSize">
            case "fontSize": {
                    program.fontSize = value;
                    
                    if(program.ShowTextY)
                    for(var i=0; i<program.TextsY.length;i++)
                    {
                        program.TextsY[i].fontSize = value;
                        program.TextsY[i].init();
                    }
                    if(program.ShowTextXZ)
                    {
                        for(var i=0; i<program.TextsX.length;i++)
                        {
                            program.TextsX[i].fontSize = value;
                            program.TextsX[i].init();
                        }
                        for(var i=0; i<program.TextsZ.length;i++)
                        {
                            program.TextsZ[i].fontSize = value;
                            program.TextsZ[i].init();
                        }
                    }
                    
                    if(program.showMarks)
                    switch(program.type)
                    {
                        case 0:
                            for(var j=0; j<program.series.length;j++)
                            for(var i=0; i<program.series[j].TextsTab.length;i++)
                            {
                                
                                program.series[j].TextsTab[i].fontSize = value;
                                program.series[j].TextsTab[i].init();
                            }
                            break;
                        case 1:
                            for(var i=0; i<program.series_area.TextsTab.length;i++)
                            {
                                
                                program.series_area.TextsTab[i].fontSize = value;
                                program.series_area.TextsTab[i].init();
                            }
                            break;
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="font">
            case "font": {
                    program.font = value;
                    
                    if(program.ShowTextY)
                    for(var i=0; i<program.TextsY.length;i++)
                    {
                        program.TextsY[i].font = value;
                        program.TextsY[i].init();
                    }
                    if(program.ShowTextXZ)
                    {
                        for(var i=0; i<program.TextsX.length;i++)
                        {
                            program.TextsX[i].font = value;
                            program.TextsX[i].init();
                        }
                        for(var i=0; i<program.TextsZ.length;i++)
                        {
                            program.TextsZ[i].font = value;
                            program.TextsZ[i].init();
                        }
                    }
                    
                    if(program.showMarks)
                    switch(program.type)
                    {
                        case 0:
                            for(var j=0; j<program.series.length;j++)
                            for(var i=0; i<program.series[j].TextsTab.length;i++)
                            {
                                
                                program.series[j].TextsTab[i].font = value;
                                program.series[j].TextsTab[i].init();
                            }
                            break;
                        case 1:
                            for(var i=0; i<program.series_area.TextsTab.length;i++)
                            {
                                
                                program.series_area.TextsTab[i].font = value;
                                program.series_area.TextsTab[i].init();
                            }
                            break;
                    }
                        
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="lineWidth">
            case "lineWidth": {
                    program.lineWidth = value;
                    
                    if(program.ShowTextY)
                    for(var i=0; i<program.TextsY.length;i++)
                    {
                        program.TextsY[i].lineWidth = value;
                        program.TextsY[i].init();
                    }
                    if(program.ShowTextXZ)
                    {
                        for(var i=0; i<program.TextsX.length;i++)
                        {
                            program.TextsX[i].lineWidth = value;
                            program.TextsX[i].init();
                        }
                        for(var i=0; i<program.TextsZ.length;i++)
                        {
                            program.TextsZ[i].lineWidth = value;
                            program.TextsZ[i].init();
                        }
                    }
                    
                    if(program.showMarks)
                    switch(program.type)
                    {
                        case 0:
                            for(var j=0; j<program.series.length;j++)
                            for(var i=0; i<program.series[j].TextsTab.length;i++)
                            {
                                
                                program.series[j].TextsTab[i].lineWidth = value;
                                program.series[j].TextsTab[i].init();
                            }
                            break;
                        case 1:
                            for(var i=0; i<program.series_area.TextsTab.length;i++)
                            {
                                
                                program.series_area.TextsTab[i].lineWidth = value;
                                program.series_area.TextsTab[i].init();
                            }
                            break;
                    }
                        
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="lineColor">
            case "lineColor": {
                    program.scene.lineColor = value;
                    program.lineColor = value;
                    
                    for(var i=0; i<program.scene.objects.length;i++)
                    {
                        if(program.scene.objects[i].alias.substring(0,4)=='line')
                            program.scene.objects[i].diffuse = value;
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="wallColor">
            case "wallColor": {
                    program.scene.wallColor = value;
                    program.wallColor = value;
                    
                    for(var i=0; i<program.scene.objects.length;i++)
                    {
                        if(program.scene.objects[i].alias.substring(0,4)=='wall')
                            program.scene.objects[i].diffuse = value;
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="marksBottomColor">
            case "marksBottomColor": {
                    if(program.showMarks)
                        {
                    program.scene.marksBottomColor = value;
                    program.marksBottomColor = value;
                    for(var i=0; i<program.scene.objects.length;i++)
                    {
                        if(program.scene.objects[i].alias.substring(1,13)=='bottom_marks'|| program.scene.objects[i].alias.substring(2,14)=='bottom_marks')
                            program.scene.objects[i].diffuse = value;
                    }
                        }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="marksTopColor">
            case "marksTopColor": {
                if(program.showMarks)
                {
                    program.marksTopColor = value;
                    program.scene.marksTopColor = value;
                    var color = "rgba("+Math.round(program.scene.marksTopColor[0]*255)+","+Math.round(program.scene.marksTopColor[1]*255)+","+Math.round(program.scene.marksTopColor[2]*255)+",255)";
                    switch(program.type)
                    {
                        
                        case 0:
                        for(var i=0; i<program.series.length;i++)
                            for(var j=0; j<program.series[i].TextsTab.length;j++)
                            {
                              //  var color = "rgba("+program.scene.marksTopColor[0]*255+","+program.scene.marksTopColor[1]*255+","+program.scene.marksTopColor[2]*255+",255)";
                                program.series[i].TextsTab[j].fillAlpha = color;
                                program.series[i].TextsTab[j].init();
                            }
                            break;
                        case 1:
                            for(var j=0; j<program.series_area.TextsTab.length;j++)
                            {
                              //  var color = "rgba("+0*255+","+1*255+","+Math.round(0.9*255)+",255)";
                                program.series_area.TextsTab[j].fillAlpha = color;
                                program.series_area.TextsTab[j].init();
                            }
                            break;
                    }
                }
                break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="twoColorsPalette">
            case "twoColorsPalette": {
                    if(program.type==0)
                    {
                        program.scene.twoColorsPalette = value;
                        program.twoColorsPalette = value;

                        for(var i=0; i<program.scene.objects.length;i++)
                            if(program.scene.objects[i].alias.substring(1,10)!=='top_marks' && program.scene.objects[i].alias.substring(2,11)!=='top_marks' && program.scene.objects[i].alias.substring(1,13)!=='bottom_marks' && program.scene.objects[i].alias.substring(2,14)!=='bottom_marks' )
                            program.scene.setColorType0(program.scene.objects[i]);
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="diffColorsPalette">
            case "diffColorsPalette": {
                    if(program.type==0)
                    {
                        program.scene.diffColorsPalette = value;
                        program.diffColorsPalette = value;

                        for(var i=0; i<program.scene.objects.length;i++)
                            if(program.scene.objects[i].alias.substring(1,10)!=='top_marks' && program.scene.objects[i].alias.substring(2,11)!=='top_marks' && program.scene.objects[i].alias.substring(1,13)!=='bottom_marks' && program.scene.objects[i].alias.substring(2,14)!=='bottom_marks' )
                            program.scene.setColorType0(program.scene.objects[i]);
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="diffCol">
            case "diffCol": {
                    if(program.type==0)
                    {
                        program.scene.diffCol = value;
                        program.diffCol = value;

                        for(var i=0; i<program.scene.objects.length;i++)
                        {
                            if(!value) {
                                var t = program.scene.objects[i].alias;

                                if(t.substring(1,5)=='cube' || t.substring(1,9)=='cylinder' || t.substring(2,6)=='cube' || t.substring(2,10)=='cylinder' ||
                                   t.substring(1,5)=='cone' ||  t.substring(2,6)=='cone')
                                    program.scene.objects[i].diffuse=[0.313,0.364,0.552,1];
                            } else {
                                for(var i=0; i<program.scene.objects.length;i++)
                                    program.scene.setColorType0(program.scene.objects[i]);
                            }
                        }
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="twoCol">
            case "twoCol": {
                    if(program.type==0)
                    {
                        program.scene.twoCol = value;
                        program.twoCol = value;
                        
                        for(var i=0; i<program.scene.objects.length;i++)
                        {
                            if(!value) {
                                var t = program.scene.objects[i].alias;

                                if(t.substring(1,5)=='cube' || t.substring(1,9)=='cylinder' || t.substring(2,6)=='cube' || t.substring(2,10)=='cylinder' ||
                                   t.substring(1,5)=='cone' ||  t.substring(2,6)=='cone')
                                    program.scene.objects[i].diffuse=program.scene.colors[0];
                            } else {
                                for(var i=0; i<program.scene.objects.length;i++)
                                    program.scene.setColorType0(program.scene.objects[i]);


                            }
                        }
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="colors">
            case "colors": {
                    program.colors = value;
                    program.scene.colors=value;
                    switch(program.type)
                    {
                        case 0:
                            for(var i=0; i<program.scene.objects.length;i++)
                            {
                               // for(var i=0; i<program.scene.objects.length;i++)
                                    program.scene.setColorType0(program.scene.objects[i]);
                            }
                            break;
                        case 1:
                            for(var i=0; i<program.scene.objects.length;i++)
                                if(program.scene.objects[i].alias=='series_area')
                                    program.scene.setColorType1(program.scene.objects[i])
                            break;
                    }
                    break;
            }
            //  </editor-fold>
            
            //  <editor-fold defaultstate="collapsed" desc="alpha">
            case "alpha": {
                    program.alpha = value;
                    switch(program.type)
                    {
                        case 0:
                            for(var i=0; i<program.series.length;i++)
                                for(var j=0; j<program.series[i].alpha.length;j++)
                                    program.series[i].alpha[j]=value;
                            break;
                        case 1:
                            program.series_area.alphaDoc=value;
                            break;
                    }
                    break;
            }
            //  </editor-fold>
        }
    };
}( jQuery ));