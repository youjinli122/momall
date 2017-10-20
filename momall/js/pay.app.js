/**********************************************************************
*	pay.app.js
* 
* llrock	@ 2017.1.3
***********************************************************************/


redirectUrl("#p-shop");
//--------------------------------------------------------
//			p-login  登录
//--------------------------------------------------------

PAGE_SHOW2("#p-login",function(){
	// LOADER_HIDE();
});
myApp.init();

// 登陆按钮
// CLICK("#p-login .submit-button",function(){
// 	var mobile	= $("#p-login input[name=mobile]").val();
// 	var pass	= $("#p-login input[name=password]").val();
// 	// LOADER_SHOW();
// 	// apiLogin(mobile,pass);	
// 	apiLoginByToken();
// });


//--------------------------------------------------------
//			p-index
//--------------------------------------------------------
PAGE_INIT("#p-index",function(e){
	LOADER_HIDE();
});

PAGE_SHOW("#p-index",function(e){
	LOADER_HIDE();
	apiLoginData();
});

//--------------------------------------------------------
//			p-myinfo
//--------------------------------------------------------
PAGE_INIT("#p-myInfo",function(e){
	LOADER_HIDE();
	$("#p-myInfo .sub-title").text(GUser["operator"].realName);
	$("#p-myInfo .title").text(GUser["operator"].mobileNo);
});

PAGE_SHOW("#p-myInfo",function(e){
	LOADER_HIDE();
	$("#p-myInfo .sub-title").text(GUser["operator"].realName);
	$("#p-myInfo .title").text(GUser["operator"].mobileNo);
});

CLICK("#p-myInfo .mylogout",function(){
	apiLogout(function(){
		redirectUrl("#p-shop");
	});
});


//--------------------------------------------------------
//			p-shop
//--------------------------------------------------------
// CLICK("#p-shop .icon-back",function(){
// 	// PAGE_BACK();
// });


CLICK('#p-shop .mall_select_box',function() {
	var $this = $$(this);
	var i = $this.index()-1;
	$(".mall_select_list").eq(i).toggle();
})
// $$('#p-shop').on('click','.mall_select_box',function() {
// 	var $this = $$(this);
// 	var i = $this.index();
// 	var show = $$('.mall_select_list').css('display')
//     if(show == 'none'){
//        $$('.mall_select_list').css('display','block')
//     }if(show == 'block'){
//        $$('.mall_select_list').css('display','none')
//     }
// })
// $$('#p-shop').on('click','.mall_select_box',function() {
// 	var $this = $$(this);
// 	$this.find('.mall_select_list').css('display','none')
// })

