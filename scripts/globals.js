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

var gl = null;
var canvas = null;
var shaderProgram = null;
var translateY    = 6;
var translateX    = 2.5;

var camera     = null;
var interactor = null;
var transforms = null;
var picker     = null;

var series     = [];
var ser_max    = [];
var light      = null;
var texture    = null;
var program    = null;
var chart      = null;
var app        = null;

var lastTime  = 0;
var elapsed   = 0;
var elapsed_s = 0;
var late      = 0;

var Texts  = null;
var TextsX = null;
var TextsZ = null;
var posZ   = [];
var demoNumber = 0;
var startChange = 0;
var addCount   = 0;

var data = [[5],[80],[10],[12],[15],[21],[18],[7],[12],[15]];
var shape = 0;
var speed = 15;
var showMarks = false;
var anim = 1;
var texturePath = "images/texture1.png";
var legendX = [];
var legendZ = [];
var ShowWall = true;
var ShowWallBack = true;
var ShowLine = true;
var ShowTextY = true;
var ShowTextXZ = false;
var backgroundColor = [0.9019607843137255, 0.9019607843137255, 0.9019607843137255, 1.0];
var drawTex = false;
var lightPosition = [0, -5, 50];
var ambient = [0.1,0.1,0.1,0.1];
var diffuse = [0.8,0.8,0.8,1];
var lightSpecular = [1,1,1,1];
var Shininess = 100.0;
var fillText = 'black';
var fontSize = 70;
var font = "Arial";
var lineWidth = 4;
var lineColor = [1,1,1,1];
var wallColor = [0.8,0.8,0.8,0.8];
var marksBottomColor = [0.4,0.5,0.6,0];
var marksTopColor = [1,1,1,0];
var twoColors = [[0,1,1,1],[1,1,0,1]];
var diffColors = [[0,0.5,0,1],[0,1,0,1],[1,1,0,1],[1,0.58,0.15,1],[0.7,0.3,0.2,1],[1,0,0,1],[1,0,0.5,1],[0.44,0.03,0.42,1],[0,0,1,1],[0,1,1,1]];
var diffCol = true;
var twoCol = false;
var colors = [[0.313,0.364,0.552,1],[1,1,1,1]];
