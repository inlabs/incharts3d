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
//  <editor-fold defaultstate="collapsed" desc="webGLStart">
function inChartsStart(canvas) 
{
    canvas = document.getElementById(canvas);
    Scene.loadObject('models/floor.json', 'floor'); 
    var legendDiv = document.createElement('div');

    legendDiv.id = 'legend';
    legendDiv.style.position = "absolute";
    legendDiv.style.width = "20px";
    legendDiv.style.height = "20px";
    legendDiv.style.background = "#000";
    
    css = {
      position: 'absolute',
      width: 'auto',
      height: 'auto',
      background: '#fff',
      padding: 10 + 'px',
      zIndex: 2,
      'mozBorderRadius': '3px',
      'webkitBorderRadius': '3px',
      'khtmlBorderRadius': '3px',
      'borderRadius': '3px'
    }; 
    
    for(var i in css){
        legendDiv.style[i] = css[i];
    }
    
    
    document.getElementsByTagName('body')[0].appendChild(legendDiv);

    app     = new Application();
    program = new Program(canvas); 
    light   = new Light();
    Texts   = new Array();
    TextsX  = new Array();
    TextsZ  = new Array();
    series  = new Array();
   
    chart = new Chart(setDefault());
    
    app.configure(canvas);
    chart.addSeries();
    app.loadScene();
    chart.addSeriesVert();
    Scene.addColors();

    setInterval(run, 15);
}
//  </editor-fold>


(function( $ ) {
$.fn.Incharts3dStart = function(jsonData) 
{
    var canvas = jQuery(this).attr("id");
    
    for(var obj in jsonData)
    {
        if(jsonData.hasOwnProperty(obj))
        {
            for(var prop in jsonData[obj])
            { // prop = chart, tytul
                if(jsonData[obj].hasOwnProperty(prop))
                {
                    if(prop=="chart")
                    {
                        for(var prop2 in jsonData[obj][prop])
                        { // prop2 = shape, age
                            switch(prop2)
                            {
                                case 'shape': shape=parseInt(jsonData[obj][prop][prop2]); break;
                                case 'speed': speed=parseInt(jsonData[obj][prop][prop2]); break;
                                case 'showMarks': showMarks=stringToBoolean(jsonData[obj][prop][prop2]); break;
                                case 'animation': anim=parseInt(jsonData[obj][prop][prop2]); break;
                                case 'texturePath': texturePath=jsonData[obj][prop][prop2]; break;
                                case 'data': data=jsonData[obj][prop][prop2]; break;
                            }
                        }
                    }
                    else if(prop=="axisX")
                    {
                        for(var prop2 in jsonData[obj][prop])
                        { 
                            for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                legendX.push(jsonData[obj][prop][prop2][i])
                        }
                    }
                    else if(prop=="axisZ")
                    {
                        for(var prop2 in jsonData[obj][prop])
                        { 
                            for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                legendZ.push(jsonData[obj][prop][prop2][i])
                        }
                    }
                    else if(prop=="platform")
                    {
                        for(var prop2 in jsonData[obj][prop])
                        { 
                            if(prop2=="backgroundColor")
                            {
                                backgroundColor = [];
                                for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                    backgroundColor.push(jsonData[obj][prop][prop2][i]);
                            }
                            else
                            {
                                var tmp= stringToBoolean(jsonData[obj][prop][prop2]);
                                switch(prop2)
                                {
                                    case 'ShowWall': ShowWall=tmp; break;
                                    case 'ShowWallBack': ShowWallBack=tmp; break;
                                    case 'ShowLine': ShowLine=tmp; break;
                                    case 'ShowTextY': ShowTextY=tmp; break;
                                    case 'ShowTextXZ': ShowTextXZ=tmp; break;
                                    case 'drawTex': drawTex=tmp; break;
                                }
                            }
                        }
                    }
                    else if(prop=="light")
                    {
                        for(var prop2 in jsonData[obj][prop])
                        { 
                            switch(prop2)
                            {
                                case 'lightPosition' : 
                                    lightPosition = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                        lightPosition.push(jsonData[obj][prop][prop2][i]); break;
                                case 'ambient' : 
                                    ambient = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                        ambient.push(jsonData[obj][prop][prop2][i]); break;
                                case 'diffuse' : 
                                    diffuse = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                        diffuse.push(jsonData[obj][prop][prop2][i]); break;
                                case 'lightSpecular' : 
                                    lightSpecular = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                        lightSpecular.push(jsonData[obj][prop][prop2][i]); break;
                                case 'Shininess': Shininess=parseInt(jsonData[obj][prop][prop2]); break;
                            }
                            
                        }
                    }
                    else if(prop=="text")
                    {
                        for(var prop2 in jsonData[obj][prop])
                        { 
                            switch(prop2)
                            {
                                case 'fillText': fillText =jsonData[obj][prop][prop2]+""; break;
                                case 'fontSize': fontSize=parseInt(jsonData[obj][prop][prop2]); break;
                                case 'font': font=jsonData[obj][prop][prop2]+""; break;
                                case 'lineWidth': lineWidth=parseInt(jsonData[obj][prop][prop2]); break;
                            }
                        }
                    }
                    else if(prop=="colors")
                    {
                        for(var prop2 in jsonData[obj][prop])
                        { 
                            switch(prop2)
                            {
                                case 'lineColor' : 
                                    lineColor = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                        lineColor.push(jsonData[obj][prop][prop2][i]); 
                                    Scene.lineColor = lineColor ; break;
                                case 'wallColor' : 
                                     wallColor = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                         wallColor.push(jsonData[obj][prop][prop2][i]); 
                                    Scene. wallColor =  wallColor ; break;
                                case 'marksBottomColor' : 
                                    marksBottomColor = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                        marksBottomColor.push(jsonData[obj][prop][prop2][i]); 
                                    Scene.marksBottomColor = marksBottomColor ; break;
                                case 'marksTopColor' : 
                                    marksTopColor = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                        marksTopColor.push(jsonData[obj][prop][prop2][i]); 
                                    Scene.marksTopColor = marksTopColor ; break;
                                case 'twoColors' : 
                                    twoColors = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                        twoColors.push(jsonData[obj][prop][prop2][i]); 
                                    Scene.twoColors = twoColors ; break;
                                case 'twoCol': twoCol=stringToBoolean(jsonData[obj][prop][prop2]); 
                                     Scene.twoCol = twoCol ;break;
                                case 'diffColors' : 
                                    diffColors = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                        diffColors.push(jsonData[obj][prop][prop2][i]); 
                                    Scene.diffColors = diffColors ; break;
                                case 'diffCol': diffCol=stringToBoolean(jsonData[obj][prop][prop2]); 
                                     Scene.diffCol = diffCol ;break;
                                case 'colors' : 
                                    colors = [];
                                    for(var i=0; i<jsonData[obj][prop][prop2].length;i++)
                                        colors.push(jsonData[obj][prop][prop2][i]); 
                                    Scene.colors = colors ; break;
                                    
                            }
                        }
                    }
                }
            }
        }
    }
    
    inChartsStart(canvas);
};
}( jQuery ));

//  <editor-fold defaultstate="collapsed" desc="stringToBoolean">
function stringToBoolean(string)
{
    switch(string.toLowerCase())
    {
        case "true":  return true;
        case "false":  return false;
    }
}
//  </editor-fold>

/**
 * @desc Return array of data for default chart.
 * @returns {Array}
 */
//  <editor-fold defaultstate="collapsed" desc="setDefault">
function setDefault()
{
    /**
     * @member data
     * @type Array
     * @desc Set default data for chart.
     */
    var dataArray = data;
    var d = [];
    d.push(dataArray);
    return d;
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="run">
function run()
{
    late++;
    app.timeTick();

    if(late>60)
    for(var i=0; i< series.length; i++)
        series[i].animate();
    
    app.render();
    
    if((demoNumber==4)  && late==(startChange+40))
    {
        for(var k=0; k<series.length;k++)
        {
            var n=series[k].data.length-1;
            for(var i = Scene.objects.length-1; i>=0; i--)
            {
                if(Scene.objects[i].alias.substring(0,9)=='0cylinder')
                {
                    Scene.removeObject(Scene.objects[i].alias);
                    n--;
                }
            }
        }
    }
    else if((demoNumber==8 || demoNumber==9)  && late==(startChange+40))
    {
        for(var k=0; k<series.length;k++)
        {
            var n=series[k].data.length-1;
            for(var i = Scene.objects.length-1; i>=0; i--)
            {
                if(Scene.objects[i].alias.substring(0,9)=='0cylinder')
                {
                    Scene.removeObject(Scene.objects[i].alias);
                    n--;
                }
            }
        }
    }
    else if(!series[0].animDelete && late==(startChange+150) && series[0].sumAnim && demoNumber==10)
    {
        chart.showS();
        startChange=late;
    }
    else if(demoNumber==11 && late==(startChange+140) && series[0].addAnim)
    {
        series[0].addDyn=8;
        var ran = Math.floor((Math.random()*16)+3)+""; 
        chart.addData(0,ran);
        
        startChange=late;
        addCount+=1;
        if(addCount==5)
        {
            startChange=late-200;
            addCount = 0;
        }
    } 
}
//  </editor-fold>

