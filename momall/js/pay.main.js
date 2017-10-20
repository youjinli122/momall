/********************************************************************
*							智购宝 API 接口文件
* 本文件仅维护网络接口
*
* creater : llrock 2017/10/9
********************************************************************/

var GUser			= null;
var GStore			= null;
var GUsers			= null;
var GMerchantId		= "";
var GDealerId		= "";


// 登录
// function apiLogin(mobile,password,callback){
// 	var data	= {"loginName":mobile,"loginPass":password};
// 	Api("passport/login",data,function(result){
// 		_TR(data);
// 		// 登录成功跳到index页面
// 		setTimeout(function(){
// 			redirectUrl("#p-shop");
// 		},3400);
// 		if(callback)callback();
// 	});
// }

// function apiLoginByToken(token){
    
// 	// var data = window.sessionStorage.getItem("data");
// 	// _TR(token)
// 	// document.getElementById("loading").style.display = "block";
	
// 	// document.write(data)
// 	Api("passport/login",data,function(result){	
// 		_TR(data)	
//         // document.write(data)
// 		setTimeout(function(){	
// 		// document.getElementById("loading").style.display = "none";		
// 			redirectUrl("#p-shop");
// 		},100);
// 	});
// }

// 注销
function apiLogout(cb){
	Api("passport/logout",null,function(){
		GUser	= null;
		if(cb)cb();
	});
}

// 用户信息
function apiLoginData(){
	Api("boss/getInfo",null,function(data){
		if(null==GUser)GUser={};
		GUser["operator"]	= data.baseinfo;
		GUser["menu"]		= data.menu;
		EMIT("user.menu",data.menu);
		EMIT("user.data",data.baseinfo);
		doInfo("登陆",data.baseinfo.realName + ",欢迎回来!");
	});
}

//								产品相关
//====================================================================================

//--- [spu]查询 
function apiListProduct(options,cb){
	Api("boss/prod/list",options,function(r){
		if(cb)cb(r.products,r.page);
	});
}

//--- [sku]查询
function apiListProductSku(options,cb){
	Api("boss/prod/listSku",options,function(r){
		if(cb)cb(r.attributes);
	});
}


//--- [属性值]查询
function apiListProductByAttributeV(options,cb){
	Api("boss/prod/listByAttributeV",options,function(r){
		if(cb)cb(r.attributes);
	});
}

//--- 通过属性查询
function apiListProductByAttribute(options,cb){
	Api("boss/prod/listByAttribute",options,function(r){
		if(cb)cb(r.attributes);
	});
}


