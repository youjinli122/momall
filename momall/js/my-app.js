
var myApp = new Framework7({
    pushState: true, /*哈希导航*/
    pushStateSeparator: '', /*哈希导航分割 index.html#login*/
    animateNavBackIcon: true, /*返回动画*/
    modalTitle: '温馨提示',
    modalButtonOk: '确定',
    modalButtonCancel: '取消',
    cache : false,  //清楚缓存
  	tapHold: true,
  	init: false //禁用App的自动初始化功能
      //dynamicNavbar: true  /*动态导航条*/

});
var mainView = myApp.addView('.view-main', {
    domCache: true //内联页面开启
});     

var mySwiper = new Swiper('.swiper-container',{
  autoplay:5000,//延迟（毫秒）之间的转换
  speed:500,
  calculateHeight: true,
  pagination: '.pagination',
  paginationClickable: true,
  autoplayDisableOnInteraction : false,
  //followFinger:true,
  // grabCursor: true,//抓住光标
  loop:true
});
var $$ = Dom7;

//请求外部url加上等待
$$(document).on('ajaxStart', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        // Don't show preloader for autocomplete demo requests
        return;
    }
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        // Don't show preloader for autocomplete demo requests
        return;
    }
    myApp.hideIndicator();
});


