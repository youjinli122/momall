// 加入购物车动画
;(function($){
	$.extend($.fn,{
		shoping:function(options){
			var self=this;
			var $shop=$('.J-shoping');
			var $num=$('.J-shoping-num');//购物车里面的数量
		
			var S={
				init:function(){
					$(self).data('click',true).live('click',this.addShoping);
				},
				addShoping:function(e){
					e.stopPropagation()
					var $target=$(e.target);
					var id=$(e.target).attr('id');
					var dis=$(e.target).data('click');
					var x = $(e.target).offset().left + 30 - 70;
					var y = $(e.target).offset().top + 10;
					var X = $('.J-shoping').offset().left+$('.J-shoping').width()/2-$(e.target).width()/2+10-130;
					var Y = $('.J-shoping').offset().top;
					if(dis){
						if ($('#floatOrder').length <= 0) {
							$('body').append('<div id="floatOrder"><img src="img/lizi.png" width="50" height="50" /></div');
						};
						var $obj=$('#floatOrder');
						if(!$obj.is(':animated')){
							$obj.css({'left': x,'top': y}).animate({'left': X,'top': Y-80},500,function() {
								$obj.stop(false, false).animate({'top': Y-20,'opacity':0},500,function(){
									$obj.fadeOut(300,function(){
										$obj.remove();	
										// $target.data('click',false).addClass('dis-click');
										// var num=Number($num.text());
										// $num.text(++num);
									});
								});
							});	
						};
					};
				}
			};
			S.init(); 
		}
	});	
})(jQuery);
$('.Q-buy-btn').shoping();

$(function() {	
		// $.ajax({
		// 	url:"http://cdh.mz.com:8080/api/prod/list",
		// 	type:"get",
		// 	dataType:"jsonp",
		// 	jsonp:"callback",
		// 	jsonpCallback:"success_jsonpCallback",

		// 	success:function(data) {
		// 		console.log(data)

		// 	}
		// }); 
		// apiListProduct(function(data){
  //          console.log(data)
		// })

});






