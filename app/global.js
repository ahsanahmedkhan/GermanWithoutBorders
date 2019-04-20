/**
 * @license SmartBuilder4 HTML5 widget framework, Copyright (c) 2014
 *          SuddenlySmart;
 * @author Kent Xu
 */

var SB4TabOrder={
	previousOrder:[],
	nextOrder:[],
	focusElement:"",
	current:"",
	//other tab way
	normalOrder:[],
}
var assetmap={};

function SB4WgtSvc(id) {
	this.uid = id;

	this.getWidgetAssetURI = function(s) {
		return SB4API.util.getWidgetAssetURI(s, this.uid);
	};


	this.getFullUIKey = function() {
		return "sb4." + this.getShortUIKey();
	};

	this.getShortUIKey = function() {
		return this.uid.replace(/\./g, "_");
	};
};

function SB4Global() {
}

SB4Global.qparams={};

if (location.search) {
	var parts = location.search.substring(1).split('&');
	for (var i = 0; i < parts.length; i++) {
		var nv = parts[i].split('=');
		if (!nv[0])
			continue;
		SB4Global.qparams[nv[0]] = nv[1] || true;
	}
}

function onSBContentReady(w,h) {
	if (w==undefined || h==undefined) {
		if (SB4Global.qparams["sref"]!=undefined) {
			var e=$('#'+SB4Global.qparams["sref"]);
			w=e.width();
			h=e.height();
		}
	}
	if (typeof onRenderReady=="function")	onRenderReady(w, h);
}

var sb4runtime = {
	version : "0.1.0",
	mode : "prod",
	requiresetting : {
		waitSeconds : 0,
urlArgs : "bust=1.0.0.201902070832_1555517417665",
//		deps : [ "css!style/axon.css",
//				"css!style/ui-lightness/jquery-ui-1.10.4.custom.min.css" ],
		deps : [],
		config : {
			"sb4core/logging" : {
				_debug_log : false,
			},
			"sb4core/sbobj" : {
				"widgetsvc" : new SB4WgtSvc("axon.sbobj"),
			},
		},
		paths : {
			"jquery" : "lib/jquery.min",
			"jqueryui" : "lib/jqueryui",
			"scrollbar": "lib/scrollbar",
			"mousewheel":"lib/jquery.mousewheel.min",
			"underscore" : "lib/underscore-min",
			"underscore_str": "lib/underscore.string.min",
			"modernizr":"lib/modernizr.custom.44495",
			"text" : "lib/text",
			"pako_inflate" : "lib/pako_inflate.min",
			"sb4core" : "app",
			"widgets" : "wgt",
			"util" : "lib/util",
			"sb4core/loloader": "app/loloader",
			"xapiwrapper" : "lib/xapiwrapper.min",
			"perload": "lib/preloadjs-0.6.0.min",
		// "selectBoxIt" : "lib/util/selectBoxIt/widget",
		},
		shim : {
			"util/selectBoxIt/widget" : ["jqueryui/widget",
					"css!util/selectBoxIt/style.css" ],
			"modernizr": [],
			'scrollbar':[],
			'underscore': {
	            exports: '_'
	        },
	        'underscore_str': {
	            deps: ['underscore'],
	        },
	        "xapiwrapper" : [],	
	        'preload':[],
		},
		map : {
			'*' : {
				'css' : 'lib/css',
				"image" : "lib/image",
				"json" : "lib/json",
			}
		}
	},
	"getWidgetInfo":function(s) {
			var wgtreg=undefined;
			var a=this.requiresetting.config["wgt/"+s+"/s"];
		  if (a!=undefined && a["widgetsvc"]!=undefined) {
		  	wgtreg=a;
		  }
			return wgtreg;
	},
	 "loggerSetting": {
	        "engine": 1,
	        "parse": 1,
	        "util": 1,
	        "player": 1,
	        "box": 1,
	        "task": 1,
	        "timeline": 1,
	        "default": 1
	    }
};
//SetDebugPublishTask will set DEBUG false 
var DEBUG=false;
if (SB4Global.qparams["debug"]!=null && SB4Global.qparams["debug"]=='1') {
	DEBUG=false; //DEBUG may be false due to external program
}
if (DEBUG!=true) {
	Function.empty = function(){};
	console = {};
	console.log = Function.empty;
}
(function() {
	var wconfig = {
			"wgt/com.smartbuilder.axon.widget.frame/s": {
				"widgetsvc" : new SB4WgtSvc("com.smartbuilder.axon.widget.frame"),
			},	
			"wgt/com.smartbuilder.axon.widget.slide/s": {
				"widgetsvc" : new SB4WgtSvc("com.smartbuilder.axon.widget.slide"),
			},	
			"wgt/com.smartbuilder.axon.widget.slideset/s": {
				"widgetsvc" : new SB4WgtSvc("com.smartbuilder.axon.widget.slideset"),
			},	
			"wgt/com.smartbuilder.axon.widget.image/s": { "widgetsvc" : new SB4WgtSvc("com.smartbuilder.axon.widget.image"),},	
			"wgt/com.smartbuilder.axon.widget.text.richtext/s": { "widgetsvc" : new SB4WgtSvc("com.smartbuilder.axon.widget.text.richtext"),},	
			"wgt/com.smartbuilder.axon.widget.shape/s": { "widgetsvc" : new SB4WgtSvc("com.smartbuilder.axon.widget.shape"),},	
			"wgt/com.smartbuilder.axon.widget.menunavigator/s": { "widgetsvc" : new SB4WgtSvc("com.smartbuilder.axon.widget.menunavigator"),},	
			"wgt/com.smartbuilder.axon.widget.audio/s": { "widgetsvc" : new SB4WgtSvc("com.smartbuilder.axon.widget.audio"),},	
			"wgt/com.smartbuilder.axon.widget.text.text/s": { "widgetsvc" : new SB4WgtSvc("com.smartbuilder.axon.widget.text.text"),},	
			"wgt/com.smartbuilder.axon.widget.input.textentry/s": { "widgetsvc" : new SB4WgtSvc("com.smartbuilder.axon.widget.input.textentry"),},	
			"wgt/com.smartbuilder.axon.widget.button/s": { "widgetsvc" : new SB4WgtSvc("com.smartbuilder.axon.widget.button"),},	
	};
	var config = sb4runtime.requiresetting.config;
	for ( var a in wconfig) {
		config[a] = wconfig[a];
	}
}());

var SB4XAPI={};

function FlowContext () {
    this.listenerList=[];
    this.context={};
    FlowContext.prototype.addListener = function(listener) {
        this.listenerList.push(listener);
    };
    FlowContext.prototype.removeListener=function(listener) {
    	this.listenerList=_.without(this.listenerList, listener);
    };
    FlowContext.prototype.setContext=function(context) {
        this.context=context;
    };
    FlowContext.prototype.fireEvent=function() {
    	var self = this;
    	_.each(this.listenerList, function(listener, index){
    		listener(self.context);
    	});
    };
}

var SB4API = {
    cacheSvgIdList:[],
	lms:{"type":0,"isCommitLMS":false},
	volume:undefined,	
	debug: null,
	tincan : null,
	txtLib : null,
	linkLib : null,
	flowcontext:new FlowContext(),
	LEGACY_KEYMAP:{
		'Spacebar':' ',
		'Esc':'Escape',
		'Up':'ArrowUp',
		'Down':'ArrowDown',
		'Left':'ArrowLeft',
		'Right':'ArrowRight',
	},
	//show error message
	handleError: function(message){
		alert(message);

	},
	handleNetworkError: function(message){
			if(!SB4API.networkError){
				SB4API.networkError=true;
				SB4API.handleError(message);
			}

        },
	util:{
		getWidgetAssetURI : function(s,type) {
			if (s==null || s=='') return '';
			if(s.indexOf("http")==0){
		         return s;
		    }
			if (assetmap) {
				if (assetmap[s]!=undefined) return assetmap[s];
			}
			return "wgt/" + type + "/" + s;
		},
		getWidgetAssetProperties : function(s) {
			s = s+"_properties";
			var props;	
			if (assetmap) {
				props = assetmap[s];
				if (props==undefined){
					props={};
				}
			}
			return props;
		}
	},
	onLoadLesson:function() {
		if (SB4API.functions==null) SB4API.functions={};
     	SB4API.functions.getTimeStamp=function(m) {
     		var d=new Date();     	
     		return d.getTime();
     	};
     	
    	SB4API.functions.alert=function(t) {
    		alert(t);
     	};
     	
     	SB4API.functions.confirm=function(t) {
    		return confirm(t);
     	};
     	
		
		if (typeof(onLoadLesson) == "function") {
			onLoadLesson();
		}
	},
};
	
