//  <editor-fold defaultstate="collapsed" desc="webGLStart">
function webGLStart() 
{
    var canvas = document.getElementById("canvas");
    
    app     = new Application();
    program = new Program(canvas); 
    light   = new Light();
    Texts   = new Array();
    TextsX  = new Array();
    TextsZ  = new Array();
    series  = new Array();

    data  = setDefault();
    chart = new Chart(data);
    
    app.configure();
    chart.addSeries();
    app.loadScene();
    chart.addSeriesVert();
    Scene.addColors();
    
    setInterval(run, 15);
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set default value">
function setDefault()
{
    var d = [[3],[5],[10],[16],[4],[7],[11],[9]];
    var data = [];
    data.push(d);
    
    return data;
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
    
    if(late===40)
    {
        app.loadTexts();
        chart.initText();
    }
    app.render();
    
    if((demoNumber==11 || demoNumber==12)  && late==(startChange+40))
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
    else if(!series[0].animDelete && late==(startChange+150) && series[0].sumAnim && demoNumber==13)
    {
        chart.showS();
        startChange=late;
    }
    else if(demoNumber==14 && late==(startChange+140) && series[0].addAnim)
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
    else if(demoNumber==15 && late==(startChange+100) && (series[0].addAnim || series[2].addAnim))
    {
        series[0].addDyn=8;
        series[2].addDyn=8;
        
        if(addCount%2==0)
        {
            var ran = Math.floor((Math.random()*7)+1)+","; 
            var ran2 = Math.floor((Math.random()*7)+1)+""; 
            chart.addData(0,ran+ran2);

            for(var j=0;j<series[0].posX.length;j++)
            {
                series[2].posX[j]=series[0].posX[j];
                series[3].posX[j]=series[0].posX[j];
            }
            series[2].scaleX = series[0].scaleX;
            series[3].scaleX = series[1].scaleX;
        }
        else
        {
            var ran = Math.floor((Math.random()*19)+1)+","; 
            var ran2 = Math.floor((Math.random()*19)+1)+""; 
            chart.addData(2,ran+ran2);
            
            for(var j=0;j<series[2].posX.length;j++)
            {
                series[0].posX[j]=series[2].posX[j];
                series[1].posX[j]=series[2].posX[j];
            }
            series[0].scaleX = series[2].scaleX;
            series[1].scaleX = series[3].scaleX;
        }

        startChange=late;
        addCount+=1;
        if(addCount==12)
        {
            addCount=0;
            startChange=late-200;
        }
    }
}
//  </editor-fold>
