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

function ListenerEvents(camera,canvas, type)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.canvas = canvas;
    this.camera = camera;
   
    this.type= type;
    this.diffType = false;
   
    this.isMove = false;
    this.actualX = 0;
    this.actualY = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.first = true;
    this.last = true;
    this.tmp=true;
    this.count =0;
    
    this.getEvents();
    //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="setDiffType">
ListenerEvents.prototype.setDiffType = function(type)
{
    this.diffType = type;
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="set picker">
ListenerEvents.prototype.setPicker = function(picker)
{
    this.picker = picker;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="onKeyDown">
ListenerEvents.prototype.onKeyDown = function(ev)
{
    var pos;
    if (ev.keyCode == 38)
    {
        pos = [this.camera.x, this.camera.y+1, this.camera.z];
        this.camera.y += 1;
    }
    else if (ev.keyCode == 40)
    {
        pos = [this.camera.x, this.camera.y-1, this.camera.z];
        this.camera.y -= 1;
    }
    else if (ev.keyCode == 37)
    {
        pos = [this.camera.x-1, this.camera.y, this.camera.z];
        this.camera.x -= 1;
    }
    else if (ev.keyCode == 39)
    {
        pos = [this.camera.x+1, this.camera.y, this.camera.z];
        this.camera.x += 1;
    }
    this.camera.setPosition(pos);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="onMouseDown">
ListenerEvents.prototype.onMouseDown = function(ev)
{
    this.isMove = true;
    this.actualX = ev.clientX;
    this.actualY = ev.clientY;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="setFirst">
ListenerEvents.prototype.setFirst = function(ev)
{
    this.tmp=false;
    this.picker.showLegend =true;
    this.picker.stop();
    this.actualX = ev.clientX;
    this.actualY = ev.clientY;
    
    this.lastX = this.actualX;
    this.lastY = this.actualY;

    if (this.picker == null) 
        return;

    this.picking = this.picker.getObject(this.getMousePos(ev));

    if (!this.picking) 
        this.picker.showLegend =true;

    var dx = this.actualX - this.lastX;
    var dy = this.actualY - this.lastY;

    this.rotate(dx,dy);

    this.picking = false;  
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="onMouseMove">
ListenerEvents.prototype.onMouseMove = function(ev)
{    
    if(this.count<100)
    {
        this.count+=1;
    }
    else if(this.count == 100)
    {
        this.setFirst(ev);
        this.count+=1;
    }
    if(this.tmp)
    {
        var that = this;
        setTimeout(function() { that.setFirst(ev); },100);
    }
    

    this.lastX = this.actualX;
    this.lastY = this.actualY;
    this.actualX = ev.clientX;
    this.actualY = ev.clientY;

    if (this.picker == null) 
        return;

    this.picking = this.picker.getObject(this.getMousePos(ev));
    if (!this.picking) 
    {
        this.picker.showLegend =true;
        this.picker.stop();
        if(this.type==1 || this.diffType) 
            this.picker.deletePickerLine();
        this.hide('legend');
    }

    if (!this.isMove) 
        return;

    var dx = this.actualX - this.lastX;
    var dy = this.actualY - this.lastY;

    this.rotate(dx,dy);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="onMouseUp">
ListenerEvents.prototype.onMouseUp = function(ev)
{
    this.isMove = false;
    this.picking = false;
     this.picker.stop();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="mousewheel">
ListenerEvents.prototype.mousewheel = function(event)
{
    var c = program.canvas;
    var camera= program.camera;
    var x = c.offsetLeft + window.pageXOffset;
    var y = c.offsetTop - window.pageYOffset;
 
    if(event.clientX>x && event.clientX<x+c.width && event.clientY>y && event.clientY<y+c.height)
    {
        event.preventDefault();
        event.stopPropagation();
        var delta = 0;

        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
             if(event.detail) 
                delta = - event.detail / 10;
        }
        else
        {
             if(event.wheelDelta)  // WebKit / Opera / Explorer 9
                delta = event.wheelDelta / 250;
        }

        //  <editor-fold defaultstate="collapsed" desc="set new Z position">
        var pos= camera.position;
        if(camera.z <= 110 + ( 1 / delta ) * 0.8 && camera.z >20+( 1 / delta ) * 0.8)
        {
            
            pos = [camera.x, camera.y, camera.z - ( 1 / delta ) * 0.8];
            camera.z -= ( 1 / delta ) * 0.8;
            camera.setPosition(pos);
        }
        else
        {
            if(camera.z <108 +( 1 / delta ) * 0.8)
            {
                pos = [camera.x, camera.y, camera.z+( 1 / delta ) * 0.8];
                camera.z += ( 1 / delta ) * 0.8;
                camera.setPosition(pos);
            }
        }
        //  </editor-fold>
    }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="getEvents">
ListenerEvents.prototype.getEvents = function()
{
    var that   = this;

    window.onkeydown = function(ev)
    {
        that.onKeyDown(ev);
    };
    
    if(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
       window.addEventListener('DOMMouseScroll', this.mousewheel, false);
    else
       window.addEventListener( 'mousewheel', this.mousewheel, false);

    this.canvas.onmousedown = function(ev) 
    {
	that.onMouseDown(ev);
    };
    this.canvas.onmousemove = function(ev) 
    {
	that.onMouseMove(ev);
    };
    this.canvas.onmouseup = function(ev) 
    {
	that.onMouseUp(ev);
    };
};
//  </editor-fold>  

//  <editor-fold defaultstate="collapsed" desc="rotate">
ListenerEvents.prototype.rotate = function(dx, dy)
{
    var newAz   = -(dx * 0.1);
    var newEl = -(dy * 0.1);

    this.camera.changeHorizontalPosition(newAz);
    this.camera.changeVerticalPosition(newEl);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="hide">
ListenerEvents.prototype.hide = function(obj) 
{
    var win = document.getElementById(obj);
    win.style.display = 'none';
}
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="getMousePos">
ListenerEvents.prototype.getMousePos = function(ev)
{
    var actualPos =[];
    var x = ev.clientX - this.canvas.offsetLeft + window.pageXOffset;
    var y = this.canvas.height - (ev.clientY - this.canvas.offsetTop +window.pageYOffset);
    
    actualPos[0]=x;
    actualPos[1]=y;
    return actualPos;
};
//  </editor-fold>