
    // 这是初始化
  function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge)};
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback)};
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
    }
   // 初始化结束
    
    
    setupWebViewJavascriptBridge(function(bridge) {	 
		function log(token) {
			var token = window.sessionStorage.getItem("data");
            // document.write(token)
            	// $.ajax({
            	// 	url:"passport/login",
            	// 	type:"POST",
            	// 	dataType:"json",
            	// 	beforeSend: function(request) {                
             //        request.setRequestHeader("Authorization", token);
             //        },
            	// 	success:function(data){
            	// 		document.write(data)
            	// 	},
            	// 	error:function(err){
            	// 		// document.write(err)
            	// 	}

            	// });
            }
//     $.ajax({
//     type: "POST",
//     url: "passport/login",
//     contentType: "application/json",
//     dataType: "json",
//     beforeSend: function(request) {                
//                request.setRequestHeader("Authorization", token);
//     },
//     success: function(data) {
// // document.write(data)
//     },
//     error: function(err) {
//      document.write(err)
//     }
// });        
		 //    Api("passport/login",data,function(result){			    
		 //    // document.getElementById("loading").style.display = "none";		    	                    
		 //    setTimeout(function(){				
			//         redirectUrl("#p-shop");
			//         // document.write(data);
		 //        },10000);
			// });
	// }
        // 这个js_ocToken用来OC给我传参数
	bridge.registerHandler('js_ocToken', function(data, responseCallback) {
	            // document.getElementById("loading").style.display = "block";	            
				window.token = JSON.stringify(data);
				window.sessionStorage.setItem("data",token);
				log("data")
		});

        // 这段代码调用了OC的backToHome方法
	var js_oc = document.getElementById("js_oc");
		js_oc.onclick = function(e) {
			e.preventDefault();
			bridge.callHandler('backToHome',function(response) {
				log('JS got response', response);
				// alert(response);
				// console.log(data)
			});
		}
	});
 


        
 

