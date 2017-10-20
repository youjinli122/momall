/**************************************************************************************
*						基础配置
**************************************************************************************/
var CLT_INITIALIZED	= false;

var APP_ENV			= "";
var APP_NAME		= "";
var URI_BASE		= "";
var PLAT_NAME		= "";
var PLAT_COM_NAME	= "北京盛泰华夏科技有限公司";
var AMQClient		= null;


/**************************************************************************************
*							调试相关
**************************************************************************************/
var _TR				= function(){};

function debugf(msg){
	$("#version").append("<div>"+msg+"</div>");
}

//Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36
if( navigator.userAgent.indexOf("Android")>0 || navigator.userAgent.indexOf("Mobile")>0 ){
	_TR				= console.log;
}else if( navigator.userAgent.indexOf("Windows")>0 ){
	_TR				= console.log;
}else{
	_TR				= console.log;
}

/**************************************************************************************
*							通讯方法
**************************************************************************************/
function Api(api,data,success,failed){
	_Api(URI_BASE,api,data,success,failed);	
}

function _Api(host,api,data,success,failed)
{
	var fullUrl = host+api+"?jsoncallback=?";
	_TR("get:",fullUrl);
	try{
		$.getJSON(fullUrl,data,function(result,status,xhr){
			if(result.code==0){
				if(success)
					success(result.data);
			}else if(result.code<0){
				if(failed)
					failed(result.code,result.msg);
				else
					doError(result.code,result.msg);
			}else{
				if(failed)
					failed(result.code,result.msg);
				else
					doError(result.code,result.msg);
			}
		});
	}catch(e){
		doError(-10,e.toString());
		_TR(e);
	}
}

function ApiPost(api,data,success,failed){
	_ApiPost(URI_BASE,api,data,success,failed);	
}

function _ApiPost(host,api,data,success,failed){
	var fullUrl = host+api;
	_TR("post:",fullUrl);
	$.ajax({
		"url"		:	fullUrl,
		"type"		:	"post",
		"data"		:	data,
		"cache"		:	false,
		"processData"	: false,
		"contentType"	: false,
//		"beforeSend"	: function(request) {
//			request.setRequestHeader("test", "llrock");
//		},
		"headers": {
			"Accept": "application/json; charset=utf-8",
			"x-requested-with": "XMLHttpRequest",
		},
		"success"	: function(result){
			if(result.code==0){
				if(success)
					success(result.data);
			}else if(result.code<0){
				if(failed)
					failed(result.code,result.msg);
				else
					doError(result.code,result.msg);
			}else{
				if(failed)
					failed(result.code,result.msg);
				else
					doError(result.code,result.msg);
			}
		},
		"error"		: function(e){
			doError(-10,e.toString());
			_TR(e);
		}
	});   
}



window.onerror=function(sMsg,sUrl,sLine){ 

	_TR("<b>An error was thrown and caught.</b><p>"); 

	_TR(sMsg);
	_TR(sUrl);
	_TR(sLine);

	return false; 

};

//权限不足
function InsufficientAuthority(str){
	toastr.options = {
	  "closeButton": true,
	  "debug": false,
	  "progressBar": true,
	  "positionClass": "toast-top-right",
	  "onclick": null,
	  "showDuration": "400",
	  "hideDuration": "1000",
	  "timeOut": "7000",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}
	toastr.warning(str)
}

function ISDEBUG(){
	if(parent==window || parent.GFrames.length==0){
		return true;
	}
	return false;
}

/**************************************************************************************
*							工具函数
**************************************************************************************/
function isNull(o){
	return o==null||o==undefined;
}

String.prototype.replaceAll = function(s1,s2){
　　return this.replace(new RegExp(s1,"gm"),s2);
}

Array.prototype.contains = function (obj) {  
    var i = this.length;  
    while (i--) {  
        if (this[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
}  

function isArray(value){
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	}else{
		return Object.prototype.toString.call(value) === "[object Array]";
	}
	return false;
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

Date.prototype.DateAdd = function(strInterval, Number) {     
  
    var dtTmp = this;    
  
    switch (strInterval) {     
  
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));    
  
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));    
  
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));    
  
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));    
  
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));    
  
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());    
  
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());    
  
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());    
  
    }    
  
}   

$.formatTimeStr		= function(date,fmt){
	var d = new Date(date);
	return d.Format(fmt);
}

$.getUrlParam = function (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}


function SubYear(date1,date2){
	var v1=parseInt(date1.split("-")[0]);
	var v2=parseInt(date2.split("-")[0]);
	return v1-v2;
}

function SubMonth(date1,date2){
	var vd1= date1.split("-");
	var vd2= date2.split("-");
	var v1=parseInt(vd1[0],10)*12+parseInt(vd1[1],10);
	var v2=parseInt(vd2[0],10)*12+parseInt(vd2[1],10);
	return v1-v2;
}

function SubDay(date1,  date2){    
	var d1, d2;  
	var vd1= date1.split("-");
	var vd2= date2.split("-");
	d1  =  new  Date(vd1[1]  +  '-'  +  vd1[2]  +  '-'  +  vd1[0]);    
	d2  =  new  Date(vd2[1]  +  '-'  +  vd2[2]  +  '-'  +  vd2[0]);  
	return parseInt(Math.abs(d1  -  d2)  /  86400000);    
}

function SubHour(date1,  date2){    
	var d1, d2;  
	var vd1= date1.split("-");
	var vd2= date2.split("-");
	d1  =  new  Date(vd1[1]  +  '-'  +  vd1[2]  +  '-'  +  vd1[0]);    
	d2  =  new  Date(vd2[1]  +  '-'  +  vd2[2]  +  '-'  +  vd2[0]);  
	return parseInt(Math.abs(d1  -  d2)  /  3600000) +1;    
	return v;
}

function clamp(min,max,value){
	return value>max ? max : (value<min? min : value);
}

function formToData(form) {
	form = $(form);
	if (form.length !== 1) return false;

	// Form data
	var formData = {};

	// Skip input types
	var skipTypes = ['submit', 'image', 'button', 'file'];
	var skipNames = [];
	form.find('input, select, textarea').each(function () {
		var input = $(this);
		var name = input.attr('name');
		var type = input.attr('type');
		var tag = this.nodeName.toLowerCase();
		if (skipTypes.indexOf(type) >= 0) return;
		if (skipNames.indexOf(name) >= 0 || !name) return;
		if (tag === 'select' && input.prop('multiple')) {
			skipNames.push(name);
			formData[name] = [];
			form.find('select[name="' + name + '"] option').each(function () {
				if (this.selected) formData[name].push(this.value);
			});
		}
		else {
			switch (type) {
				case 'checkbox' :
					skipNames.push(name);
					formData[name] = [];
					form.find('input[name="' + name + '"]').each(function () {
						if (this.checked) formData[name].push(this.value);
					});
					break;
				case 'radio' :
					skipNames.push(name);
					form.find('input[name="' + name + '"]').each(function () {
						if (this.checked) formData[name] = this.value;
					});
					break;
				default :
					formData[name] = input.val();
					break;
			}
		}
	});
	form.trigger('formToJSON formToData form:todata', {formData: formData});

	return formData;
};


function clamp(min,max,value){
	return value>max ? max : (value<min? min : value);
}









/**************************************************************************************
*							初始化环境
**************************************************************************************/

function INIT_ENV(){
	//var env = $("meta[name=runenv]").attr("content");
	var env = $.getUrlParam("env");
	var svr	= $.getUrlParam("svr");

	APP_ENV = env;

	APP_NAME		=  "智购宝@cdh";
	URI_BASE		= "http://cdh.mz.com:8080/";



	_TR("init:"," ---------BEGIN-----------");
	_TR("init:","client",window.location.href);
	_TR("init:","env=",env,"svr=",svr);
	_TR("init:","server-base",URI_BASE);
	_TR("init:","APP_NAME",APP_NAME);
	_TR("init:","---------END------------");
}

function redirectUrl(name){
	mainView.router.loadPage(name);
}

var redirect = redirectUrl;

/**************************************************************************************
*							事件发生器
*
*	1. object.On("msg",function(params){});
*	2.	EventEmitter.Emit("msg","hello");
*
*	$events={ 
*	"msg1":[ [obj1,fn], [obj2,fn],....],
*	"msg2":[ [obj1,fn], [obj2,fn],....],
*	...
*	}
**************************************************************************************/
function EventEmitter () {};

EventEmitter.isArray	= function(obj) {   
	return Object.prototype.toString.call(obj) === '[object Array]';    
}  

//Object.prototype.On = function (name, fn) {
//	if(!EventEmitter.$events) {
//		EventEmitter.$events = {};
//	}
//	
//	if(!EventEmitter.$events[name]){
//		EventEmitter.$events[name] = new Array;
//	}
//
//	EventEmitter.$events[name].push([this,fn]);
//
//	return this;
//};

$.fn.On = function (name, fn) {
	if(!EventEmitter.$events) {
		EventEmitter.$events = {};
	}
	
	if(!EventEmitter.$events[name]){
		EventEmitter.$events[name] = new Array;
	}

	EventEmitter.$events[name].push([this,fn]);

	return this;
};

EventEmitter.Once = function (name, fn) {
	var self = this;

	function on () {
		self.RemoveListener(name, on);
		fn.apply(this, arguments);
	};

	on.listener = fn;
	this.on(name, on);

	return this;
};


EventEmitter.RemoveListener = function (name, fn) {
	if (this.$events && this.$events[name]) {
		var list = this.$events[name];

		if (EventEmitter.isArray(list)) {
			var pos = -1;

			for (var i = 0, l = list.length; i < l; i++) {
				if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
					pos = i;
					break;
				}
			}

			if (pos < 0) {
				return this;
			}

			list.splice(pos, 1);

			if (!list.length) {
				delete this.$events[name];
			}
		} else if (list === fn || (list.listener && list.listener === fn)) {
			delete this.$events[name];
		}
	}

	return this;
};

EventEmitter.RemoveAllListeners = function (name) {
	if (this.$events && this.$events[name]) {
		this.$events[name] = null;
	}
	return this;
};


EventEmitter.Emit = function (name) {
	if (!this.$events) {
		return 0;
	}

	var handler = this.$events[name];

	if (!handler) {
		return 0;
	}

	var args = Array.prototype.slice.call(arguments, 1);

	var count=0,i=0;
	for (i=0, l = handler.length; i < l; i++) {
		if(handler[i][0]!=undefined && handler[i][1]!=undefined){
			handler[i][1].apply(handler[i][0],args);
			count++;
		}else{
			handler.splice(i,1);
			i--;
		}
	}
	if(count!=i)this.$events[name]=handler;

//	if(GFrame){
//		count+=GFrame.EventEmitter.Emit(name);
//		count+=GFrame.EventEmitter.Emit.apply(name,args);
//	}

	return count;
};

function EMIT(msg,data){
	EventEmitter.Emit(msg,data);
}

/**************************************************************************************
*							FOR AMQ
**************************************************************************************/
function initAMQ(options,cb){

	AMQClient = Stomp.client(options.url);
//	AMQClient.debug = function(str) {
//		_TR(str);
//	};
	AMQClient.connect(options.user, options.pass, function(frame) {
		AMQClient.subscribe(options.channel, function(message) {
			if(!message)return;
			try{
				EMIT(message.headers.id,JSON.parse(message.body));
			}catch(e){
				_TR(e);
				_TR(message);
			}
		});
	});

}



/**************************************************************************************
*							提示信息
**************************************************************************************/
function showMessage(msg,title){
	  myApp.addNotification({
        title: title,
        message: msg
    })
	// myApp.alert(title, msg);
	setTimeout(function(){myApp.closeModal();}, 2500);
}

function doError(c,m){
	if(c==-1){
		redirectUrl("#p-login");
		return;
	}

	showMessage("错误:"+c+" \r\n\r\n"+m);
	LOADER_HIDE();
}

function doInfo(c,m){
	showMessage("提示:"+c+" \r\n\r\n"+m);
	LOADER_HIDE();
}

function doSuccess(c,m){
	showMessage("成功:"+c+" \r\n\r\n"+m);
	LOADER_HIDE();
}


/**************************************************************************************
*							FOR framework7
**************************************************************************************/
var FLASH_DATA	= {};
function PAGE_ON(eve,page,func){
	$$(document).on(eve,page,func);
}
function PAGE_INIT(page,func){
	$$(document).on("pageInit",page,func);
}
function PAGE_SHOW(page,func){	
	$$(document).on("pageReinit",page,func);
}
function PAGE_SHOW2(page,func){	
	$$(document).on("pageInit pageReinit",page,func);
}
function PAGE_BACK(){
	mainView.router.back();
}
function PAGE_LOAD(url){
	mainView.router.loadPage(url);
}
function PAGE_SETDATA(name,data){
	FLASH_DATA[name] = data;
}
function PAGE_GETDATA(name){
	var data = FLASH_DATA[name];
	FLASH_DATA[name] = null;
	return data;
}
function ON(selid,msg,func){
	$(selid).On(msg,func);
}
function CLICK(ele,func){
	$(ele).unbind("click").click(func);
}
function LOADER_SHOW(){
	myApp.showIndicator();
	//超过10秒可能请求不过去，故关闭小菊花
	setTimeout(function () {myApp.hideIndicator()}, 10000);
}
function LOADER_HIDE(){
	myApp.hideIndicator();
}
function SHOW_QRCODE(el,context)
{
	var options = { background:"#ffffff",
					ecLevel:"H",
					image: $("#icon-yhlogo")[0],
					mPosX : 0.5,
					mPosY : 0.5,
					mSize : 0.3,
					minVersion : 6,
					mode : 4,
					quiet:1,
					radius:0.0,
					render:"canvas",
					size:200,
					fontcolor: "#ff9818",
					text:context	};

	$(el).empty().qrcode(options);
}


//function PAGE(pageid,option){
//	_TR
//	("PAGE:"+pageid);
//
//	function class_page(){
//		this._id	= pageid;
//		this._selId	= "#"+pageid;
//		this._self	= $(this._selId);
//		this.SUB	= function(sel){
//			return $(this._selId+" "+sel);
//		};
//		this.CLICK	= function(sub,func){
//			this.SUB(sub).click(function(){
//				func();
//			});
//		};
//	}
//
//	class_page.prototype	= option;
//	var obj	= new class_page();
//
//	if(option.onInit){
//		obj.onInit	= option.onInit;
//		$(document).on("pageinit",obj,function(){
//			obj.onInit();
//		});
//	}
//	if(option.onShow){
//		obj.onShow	= option.onShow;
//		$(document).on("pageshow",obj,function(){
//			obj.onShow();
//		});
//	}
//	
//	return obj;
//
//}


/**************************************************************************************
*							  初始化整个系统
**************************************************************************************/

$(document).ready(function(){
	if(CLT_INITIALIZED)
		return;
	
	// 初始化美宅
	INIT_ENV();

	// 初始化framework7
	// myApp.init();

	CLT_INITIALIZED = true;

});

