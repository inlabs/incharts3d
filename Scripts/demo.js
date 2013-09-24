//  <editor-fold defaultstate="collapsed" desc="drawTex">
function drawTex()
{
    app.drawTex = true;
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
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="deleteAll">
function deleteAll()
{
    Scene.removeAll();
    Texts   = null;
    series  = null;
    chart   = null;
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="restart">
function restart(t)
{
    series  = new Array();
    chart   = new Chart(data);
    if(t)
        chart.firstStep = 2.4;
    
    chart.addSeries();
    Texts = new Array();
    app.loadScene();
    chart.addSeriesVert();        
    late  = 30;
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="show next">
function start()
{
    deleteAll();
    Scene.twoCol  = false;
    Scene.diffCol = false;
    app.drawTex   = false;
    
    demoNumber++;
    if(demoNumber==16)
        demoNumber=0; 
    
    switch(demoNumber)
    {
        case 0:
        {
            data = setDefault();
            restart();
            for(var i=0; i< series.length;i++)
            for(var j=0;j<series[i].min_h.length;j++)
                series[i].min_h[j]-=4;

            Scene.colorsPalette[0] = [[0.3,0.3,1,1]];
            break;
        }
        case 1:
        {        
            var d = [[1],[5],[7],[13],[16],[14],[11],[6],[2]];
            data = [];
            data.push(d);
            restart();
            
           Scene.colorsPalette[0] = [[1,0,0,1]];
           
            for(var i=0; i< series.length;i++)
            for(var j=0;j<series[i].min_h.length;j++)
            {
                series[i].min_h[j]-=8;
                series[i].marks_pos[j]-=8;
            }
            
           for(var i=0; i<series.length; i++)
                series[i].showMarks = (series[i].showMarks) ? false : true;
            
            break;
        }
        case 2:
        {
            var d = [[13],[9],[11],[7],[21],[17],[8],[5],[12]];
            data = [];
            data.push(d);
            restart();

             Scene.twoColors = [[0,1,1,1],[1,1,0,1]];
             Scene.twoCol = true;
            
            break;
        }
        case 3:
        {
            var d = [[5],[8],[10],[12],[15],[20],[18],[7],[12],[15]];
            data = [];
            data.push(d);
            restart();
            Scene.diffCol = true;
    
            break;
         }
        case 4:
        {
            var d = [[4],[2],[12],[5],[17],[8],[15],[4],[13],[2],[11]];
            data = [];
            data.push(d);
            restart();
            
            chart.changeShape(1);     
            Scene.colorsPalette[0] = [[0.44,0.03,0.42,1]];

            break;
         }
        case 5:
        {
            var d = [[9],[15],[7],[17],[15],[12],[6],[13],[14],[12]];
            data = [];
            data.push(d);
            restart();
            
            for(var i=0; i< series.length;i++)
            for(var j=0;j<series[i].min_h.length;j++)
            {
                series[i].min_h[j]-=8;
                series[i].marks_pos[j]-=8;
            }
            
           for(var i=0; i<series.length; i++)
                series[i].showMarks = (series[i].showMarks) ? false : true;
            
            chart.changeShape(1);
            chart.setMarksPos();
            drawTex();                     
            break;
         }
        case 6:
        {
            var d = [[5,2,1],[5,6,1],[1,3,2],[17,3,4],[3,5,1],[8,9,3],[3,5,4]]; 
            data = [];
            data.push(d);
            restart();
            
            Scene.colorsPalette[0] = [[1,0,0,1],[1,0.66,0,1],[1,1,1,1],[1,0.8,0.53,1],[0.53,0.33,0.13,1],[1,0,0,1],
                                      [1,0.66,0,1],[1,1,1,1],[1,0.8,0.53,1],[0.53,0.33,0.13,1]];        
            break;
         }
        case 7:
        {
            var d = [[3,5,1,3,1,1],[8,9,3,1,1,1],[3,1,4,5,7,2],[5,7,7,1,5,2],
                     [3,5,4,1,1,3],[8,9,7,3,1,3],[3,5,4,1,1,3],[1,5,1,8,4,4],[8,1,3,1,11,1],[2,11,4,6,1,9]];
            data = [];
            data.push(d);
            restart();
            
            Scene.colorsPalette[0] = [[0.26,0.2,0.2,1],[0.86,0,0,1],[1,0.46,0,1],[1,1,0.93,1],[0.2,0.53,0.73,1],
                                      [0.26,0.2,0.2,1],[0.86,0,0,1],[1,0.46,0,1],[1,1,0.93,1],[0.2,0.53,0.73,1]];
            break;
         }
        case 8:
        {
            var d = [[15,3,1,8,3],[5,1,2,1,1],[12,6,2,2,1],[5,9,1,7,9],[1,5,2,7,4],[8,3,5,1,2],[6,11,3,4,8]]; 
            data = [];
            data.push(d);
            restart();
            
            for(var i=0; i<series.length; i++)
            {
               series[i].initAnim0();
               series[i].anim = 0;
            }
            Scene.colorsPalette[0] =[[0.53,0.2,0,1],[1,0.4,0,2],[0.93,0.73,0.4,1],[1,0.93,0.93,1],[0.4,0.6,0.06,1],
                                     [0.53,0.2,0,1],[1,0.4,0,2],[0.93,0.73,0.4,1],[1,0.93,0.93,1],[0.4,0.6,0.06,1]];
            break;
         }
        case 9:
        {
            var d = [[15,3,1,8,3,3],[5,1,2,1,1,1],[12,6,2,2,1,6],[5,9,1,7,9,3],[1,5,2,7,4,8],[8,3,5,1,2,3],[6,11,3,4,8,5]]; 
            var dd = [[5,2,1],[5,6,1],[1,3,2],[7,3,7]]; 
            data = [];
            data.push(dd);
            data.push(d);
            restart();
            
            for(var i=0; i<series.length; i++)
            {
               series[i].initAnim0();
               series[i].anim = 0;
            }
            Scene.colorsPalette[0] =[[0.66,0.75,0.69,1],[0.46,0.4,0,1],[0.86,0.6,0,1],[1,1,0.4,1],[0.6,0.66,0.2,1],
                        [0.4,0,0,1],[0.66,0.75,0.69,1],[0.46,0.4,0,1],[0.86,0.6,0,1],[1,1,0.4,1],[0.6,0.66,0.2,1],[0.4,0,0,1]];
            break;
         }
        case 10:
        {
            var d = [[15,3,1,8,3,3],[5,1,2,1,1,1],[12,6,2,2,1,6],[5,9,1,7,9,3],[1,5,2,7,4,8],[8,3,5,1,2,3],[6,11,3,4,8,5]]; 
            var dd = [[5,2,1],[5,6,1],[1,3,2],[7,3,7]]; 
            var ddd  = [[15,3,1,8,3],[5,1,2,1,1],[12,6,2,2,1],[11,9,1,3,1],[1,2,3,4,5]]; 
            data = [];
            data.push(dd);
            data.push(ddd);
            data.push(d);
            restart();
            
            Scene.colorsPalette[0] = [[0.26,0.2,0.13,1],[0.73,0.33,0.13,1],[0.86,0.6,0.26,1],[0.73,0.86,0.8,1],[0.33,0.53,0.73,1],
                                     [0.26,0.2,0.13,1],[0.73,0.33,0.13,1],[0.86,0.6,0.26,1],[0.73,0.86,0.8,1],[0.33,0.53,0.73,1]];
          
            break;
         }
        case 11:
        {
            var d  = [[15],[9],[12],[11],[16],[18],[9],[12],[7],[13]]; 
            data = [];
            data.push(d);
            restart();
            
            chart.changeShape(2);
            startChange=late;
          
            Scene.twoCol = true;
            Scene.twoColors = [[1,0,0,1],[0,1,0,1]];
            break;
         }
        case 12:
        {
            var d  = [[13],[9],[11],[10],[16],[18],[9],[12],[7],[13]]; 
            var dd = [[14],[9],[13],[17],[21],[17],[15],[5],[12],[17]];
            data = [];
            data.push(d);
            data.push(dd);
            restart();
            
            startChange=late;
            chart.changeShape(2);
           
            for(var i=0; i<series.length;i++)
            {
                Scene.removeShapes(i);
                if(series[i].numberBaseSeries==0)
                {
                     series[i].shape=2;
                     for(var j=0; j<series[i].data.length; j++)
                         Scene.loadObject('models/cone.json', i+'cone'+j);  
                }
                else
                {
                    series[i].shape=0;
                    for(var j=0; j<series[i].data.length; j++)
                        Scene.loadObject('models/cylinder_shape.json', i+'cylinder'+j);  
                }
            }
            series[0].colorNumber =1;
            Scene.colorsPalette[0] =[[0.66,0.75,0.69,1],[0.46,0.4,0,1]];
            break;
         }
        case 13:
        {
            var d  = [[13],[9],[11],[10],[14],[18],[9]]; 
            var dd = [[14],[9],[13],[17],[15],[17],[15]];
            data = [];
            data.push(d);
            data.push(dd);
            restart(true);

            Scene.colorsPalette[0] = [[0.44,0.03,0.42,1]];
            series[0].sumAnim = true;
            startChange=late;
            
            break;
        }
        case 14:
        {
            var d  = [[13],[9],[11],[2],[5]]; 
            data = [];
            data.push(d);
            restart();
           
            for(var i=0; i< series.length;i++)
            for(var j=0;j<series[i].min_h.length;j++)
                series[i].min_h[j]-=4;
            
            chart.texture = "Images/wood2.jpg";
            for(var i=0; i<series.length;i++)
            {
                var T = new Texture(chart.texture);
                    series[0].texture = T.tex;
            }
           
            drawTex();
            Scene.colorsPalette[0] = [[0.44,0.03,0.42,1]];
            startChange=late;

            break;
        }
        case 15:
        {
            var d  = [[1,4],[2,6],[3,1],[4,2]]; 
            var dd  = [[4,7],[4,9],[9,3],[5,3]]; 
            data = [];
            data.push(d);
            data.push(dd);
            restart();

            for(var i=0; i< series.length;i++)
            for(var j=0;j<series[i].min_h.length;j++)
                series[i].min_h[j]-=4;
            
            Scene.colorsPalette[0] = [[0.42,0.37,0.5,1],[0.95,0.78,0.26,1]];
           
            addCount=0;
            startChange=late;
            break;
         }
    }
}
//  </editor-fold>