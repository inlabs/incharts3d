//  <editor-fold defaultstate="collapsed" desc="webGLStart">
function inChartsStart() 
{
    var canvas = document.getElementById("canvas");
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
    
    app.configure();
    chart.addSeries();
    app.loadScene();
    chart.addSeriesVert();
    Scene.addColors();

    setInterval(run, 15);
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
    var dataArray = [[5],[8],[10],[12],[15],[21],[18],[7],[12],[15]];
    var d = [];
    d.push(dataArray);
    Scene.diffCol = true;
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

