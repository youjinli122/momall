var myApp = new Framework7({
    pushState: true, /*哈希导航*/
    pushStateSeparator: '', /*哈希导航分割 index.html#login*/
    animateNavBackIcon: true, /*返回动画*/
    dynamicNavbar: true,  /*动态导航条*/
    modalTitle: '温馨提示',
    modalButtonOk: '确定',
    modalCloseByOutside: true

});
var mainView = myApp.addView('.view-main', {
    domCache: true
});
               
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

//启用加载等待
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

