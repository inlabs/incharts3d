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
function CameraInter(camera,canvas)
{
    //  <editor-fold defaultstate="collapsed" desc="variables">
    this.camera = camera;
    this.canvas = canvas;
    this.update();
    
    this.dragging = false;
    this.x = 0;
    this.y = 0;
    this.lastX = 0;
    this.lastY = 0;
    
    this.MOTION_FACTOR = 10.0;
    this.dstep = 0;
      //  </editor-fold>
}

//  <editor-fold defaultstate="collapsed" desc="set picker">
CameraInter.prototype.setPicker = function(p)
{
    this.picker = p;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="get 2D coords">
CameraInter.prototype.get2DCoords = function(ev)
{
    var x, y, top = 0, left = 0, obj = this.canvas;
    
    this.picker.offX =obj.offsetLeft;
    this.picker.offY =obj.offsetTop;
    
    while (obj)
    {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    
    left += window.pageXOffset;
    top  -= window.pageYOffset;
 
 
    x = ev.clientX - left;
    y = c_height - (ev.clientY - top);
    
    return {x:x, y:y};
};

//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="onMouseUp">
CameraInter.prototype.onMouseUp = function(ev)
{
    this.dragging = false;
    this.picking = false;
    this.picker.stop();
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="onMouseDown">
CameraInter.prototype.onMouseDown = function(ev)
{
    this.dragging = true;
    this.x = ev.clientX;
    this.y = ev.clientY;
    this.dstep  = Math.max(this.camera.position[0],this.camera.position[1],this.camera.position[2])/100;
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="onMouseMove">
CameraInter.prototype.onMouseMove = function(ev)
{    
    this.lastX = this.x;
    this.lastY = this.y;
    this.x = ev.clientX;
    this.y = ev.clientY;

    {
        if (this.picker == null) return;

        this.coords = this.get2DCoords(ev);
        this.picking = this.picker.find(this.coords);
        if (!this.picking) {
            this.picker.showLegend =true;
            this.picker.stop();
            hide('legend');
        }
    }
        
    if (!this.dragging) return;

    this.ctrl = ev.ctrlKey;
    this.alt = ev.altKey;
    var dx = this.x - this.lastX;
    var dy = this.y - this.lastY;

//    if (this.button == 0) 
    this.rotate(dx,dy);
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="onKeyDown">
CameraInter.prototype.onKeyDown = function(ev)
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

//  <editor-fold defaultstate="collapsed" desc="mousewheel">
CameraInter.prototype.mousewheel = function(event)
{
    var top = 0, left = 0, obj = this.canvas;
    
    while (obj)
    {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    
    left += window.pageXOffset;
    top  -= window.pageYOffset;
    
    if(event.clientX>left && event.clientX<left+c_width && event.clientY>top && event.clientY<top+c_height)
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
        var pos;
        if(this.camera.z <= 110 + ( 1 / delta ) * 0.8 && this.camera.z >20+( 1 / delta ) * 0.8)
        {
            pos = [this.camera.x, this.camera.y, this.camera.z - ( 1 / delta ) * 0.8];
            this.camera.z -= ( 1 / delta ) * 0.8;
            this.camera.setPosition(pos);
        }
        else
        {
            if(this.camera.z <108 +( 1 / delta ) * 0.8)
            {
                pos = [this.camera.x, this.camera.y, this.camera.z+( 1 / delta ) * 0.8];
                this.camera.z += ( 1 / delta ) * 0.8;
            }
        }
        //  </editor-fold>
    }
};
//  </editor-fold>

//  <editor-fold defaultstate="collapsed" desc="update">
CameraInter.prototype.update = function()
{
    var self   = this;
    var canvas = this.canvas;
	
    if(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
       window.addEventListener('DOMMouseScroll', this.mousewheel, false);
    else
       window.addEventListener( 'mousewheel', this.mousewheel, false);
 
    canvas.onmousedown = function(ev) 
    {
	self.onMouseDown(ev);
    };
    canvas.onmouseup = function(ev) 
    {
	self.onMouseUp(ev);
    };
    canvas.onmousemove = function(ev) 
    {
	self.onMouseMove(ev);
    };
    window.onkeydown = function(ev)
    {
        self.onKeyDown(ev);
    };
    window.onkeyup = function(ev)
    {
        self.onKeyUp(ev);
    };
};
//  </editor-fold>  

//  <editor-fold defaultstate="collapsed" desc="rotate">
CameraInter.prototype.rotate = function(dx, dy)
{
    var camera = this.camera;
    var canvas = this.canvas;

    var delta_elevation = -20.0 / canvas.height;
    var delta_azimuth   = -20.0 / canvas.width;

    var nAzimuth   = dx * delta_azimuth * this.MOTION_FACTOR;
    var nElevation = dy * delta_elevation * this.MOTION_FACTOR;

    camera.changeAzimuth(nAzimuth);
    camera.changeElevation(nElevation);
};
//  </editor-fold>

function hide(obj) {
    var win = document.getElementById(obj);
    win.style.display = 'none';
}