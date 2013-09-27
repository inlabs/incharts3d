var gl = null;
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
var data =[];
var demoNumber = 0;
var startChange = 0;
var addCount   = 0;
