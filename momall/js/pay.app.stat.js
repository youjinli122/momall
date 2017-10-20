



//----------------------------
//			p-jiaoyitongji  交易统计
//----------------------------
PAGE_INIT("#p-jiaoyitongji",function(e){
	var self = this;
	//--- CONDITIONAL
	this.ItemPicker		= null;
	this.Time0Picker	= null;
	this.Time1Picker	= null;
	this.UserPicker		= null;
	this.TypePicker		= null;

	function createPicker(InObjId,InValues,InDisplayValues){
		return myApp.picker({input: InObjId,cols: [{textAlign: 'center',values: InValues,displayValues:InDisplayValues?InDisplayValues:InValues}]});
	}

	function createTimePicker(InObjId,InType){
		var Y = ["2017","2018","2019"];
		var M = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
		var D = ["1日","2日","3日","4日","5日","6日","7日","8日","9日","10日","11日","12日","13日","14日","15日","16日","17日","18日","19日","20日","21日","22日","23日","24日","25日","26日","27日","28日","29日","30日","31日"];
		var H = ["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"];

		var cols = [];
		switch(InType){
		case "年":
			break;
		case "月":
			cols.push({textAlign: 'center',values: Y});
			break;
		case "日":
			cols.push({textAlign: 'center',values: Y});
			cols.push({textAlign: 'center',values: M});
			break;
		case "时":
		default:
			cols.push({textAlign: 'center',values: Y});
			cols.push({textAlign: 'center',values: M});
			cols.push({textAlign: 'center',values: D});
			break;
		}
		
		return myApp.picker({"input": InObjId,"cols": cols});
	}

	//this.ItemPicker		= createPicker("#p-jiaoyitongji input[name=stat-item]",["hello","world"]);
	this.TypePicker		= createPicker("#p-jiaoyitongji input[name=type]",["时","日","月","年"]);
//	this.Time0Picker	= createTimePicker("#p-jiaoyitongji input[name=time0]");
//	this.Time1Picker	= createTimePicker("#p-jiaoyitongji input[name=time1]");
	this.UserPicker		= createPicker("#p-jiaoyitongji input[name=user]",["全部"]);

	// 统计精度控制
	$("#p-jiaoyitongji input[name=type]").change(function(){
		MyType	= $(this).val();
	}).val("时");

	// 统计项控制
	$('#p-jiaoyitongji .stat-item').click(function () {
		myApp.pickerModal('.stat-item-modal');
		return false;
	});

	$("#p-jiaoyitongji input[name=stat-item-sub]").change(function(){
		var str="";
		$("input[name=stat-item-sub]").each(function(){
			//str+=" "+$(this).val();
			if($(this).is(':checked')){
				str+=","+$(this).val();
			}
		});
		if(str.length>0){
			str = str.substr(1);
		}
		$("#p-jiaoyitongji input[name=stat-item]").val(str);

		MyLegend	= str.split(",");

	});

	$("#p-jiaoyitongji").click(function(){
		myApp.closeModal('.stat-item-modal');
	});


	$("#p-jiaoyitongji input[name=user]").val("全部");
	$("#p-jiaoyitongji input[name=type]").val("日");
	$("#p-jiaoyitongji input[name=stat-item-sub]:first").attr("checked","true"); 
	$("#p-jiaoyitongji input[name=stat-item]").val($("#p-jiaoyitongji input[name=stat-item-sub]:first").val()); 
	
//	$("#p-jiaoyitongji input[name=time0]").val("2017年 4月 26日");
//	$("#p-jiaoyitongji input[name=type]").val("时");
//	$("#p-jiaoyitongji input[name=type]").val("时");

	//---- ECHARTS
	var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
	var labelFont = 'bold 12px Sans-serif';

	var MyType	= "时";
	var MyLegend= ['商户/登录数'/*, 'B', 'C', 'D'*/];
	var MyXAxis = [];
	var MySeries= [];
	var MyTimeBegin	= "2017-04-10 00:00:00";

	var MyTemplate  = function(InName,InData){
		this.name	= InName;
		this.type	= 'line';
		this.data	= InData;
		this.smooth	= false;
		this.showSymbol	= false;
		this.lineStyle	=  {normal: {width: 2}};
	};

	function MyXFormater(value) {
		switch(MyType){
		case "年":return echarts.format.formatTime('yyyy', value);
		case "月":return echarts.format.formatTime('yyyy-MM', value);
		case "日":return echarts.format.formatTime('MM-dd', value);
		case "时":return echarts.format.formatTime('d日h点', value);
		}
	}

	function cacuDelta(begin,end,type){
		var n = 0;
		switch(type){
		case "年":n=SubYear(end,begin);break;
		case "月":n=SubMonth(end,begin);break;
		case "日":n=SubDay(end,begin);break;
		case "时":n=SubHour(end,begin);break;
		}
		return n;
	}

	function initXAxis(begin,end){

		var n = cacuDelta(begin,end,MyType);
		var d0 = new Date(begin);
		var v;
		MySeries= [];
		for(var i=0;i<MyLegend.length;i++){
			v = new Array();
			for(var j=0;j<n;j++){
				v.push(0);
			}
			MySeries.push(new MyTemplate(MyLegend[i],v) );
		}

		MyXAxis = [];
		for(var i=0;i<n;i++){
			MyXAxis.push(echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', d0));
			switch(MyType){
			case "年":d0.setFullYear(d0.getFullYear()+1);break;
			case "月":d0.setMonth(d0.getMonth()+1);break;
			case "日":d0.setDate(d0.getDate()+1);break;
			case "时":d0.setHours(d0.getHours()+1);break;
			}
		}

	}

//	function getTestData(n){
//		var v = [];
//		for(var i=0;i<n;i++)
//			v.push(Math.random()*100);
//		return v;
//	}
//
//	function pushData(InData,InObj){
//		var v = InObj.data;
//		var i=v.length-1;
//		for(;i>=0;i--){
//			if(v[i]=="-")break;
//		}
//		for(;i>=0 && InData.length>0;i--){
//			v[i] = InData.pop();
//		}
//		InObj.data = v;
//
//		return InObj;
//	}
//
//	function initData(){
//		var dlen = 0;
//		switch(MyType){
//		case "年":dlen = 100;break;
//		case "月":dlen = 12;break;
//		case "日":dlen = 31;break;
//		case "时":dlen = 24;break;
//		}
//		console.log(dlen);
//		var v,o;
//		for(var i=0;i<MyLegend.length;i++){
//			MySeries[i] = pushData(getTestData(dlen),MySeries[i]);
//		}
//	}

	// 数据区变化触发
	this.myChart1 = echarts.init(document.getElementById('chart-pie'));

//	this.myChart1.on("dataZoom", function(e){
//		var start = 0.0;
//		if(e.start){
//			start = e.start;
//		}else if(e.batch){
//			start = e.batch[0].start;
//		}
//		
//		var idx = start * MySeries.length ;
//		idx = Math.floor(idx);
//		if(MySeries[0].data[idx]=="-"){
//			initData();
//			setTimeout(function(){
//				self.myChart1.setOption(self.option1,true);
//			},100);
//			return;
//		}
//	});

	window.onresize = function () {
		self.myChart1.resize();
		//self.myChart2.resize();
	};


	this.initStatData1=function(){
	
		_TR(MyType);
		_TR(MyLegend);

		if(MyLegend.length==0){
			showMessage("必须选择统计项");
			return;
		}

		var now = new Date();
		var cond = {};
		cond["item"] = MyLegend.join(",");//"商户/登录数,订单/支付数量,订单/支付金额,订单/退款金额,订单/退款次数";

		switch(MyType){
		case "年":
			cond["year"]	= "*";
			break;
		case "月":
			cond["year"]	= now.getFullYear();
			cond["month"]	= "*";
			break;
		case "日":
			cond["year"]	= now.getFullYear();
			cond["month"]	= now.getMonth()+1;
			cond["day"]		= "*";
			break;
		case "时":
			cond["year"]	= now.getFullYear();
			cond["month"]	= now.getMonth()+1;
			cond["day"]		= now.getDate();
			cond["hour"]	= "*";
			break;
		}


		queryStat(cond,function(data){
			//_TR(cond);
			//_TR(data);
			
			initXAxis(MyTimeBegin,now.Format("yyyy-MM-dd hh:mm:ss"));

			var v,s,idx=0;
			for(var i=0;i<data.length;i++){
				v = MySeries[i].data;
				for(var j=0;j<data[i].data.length;j++){
					s = data[i].data[j].item;
					s = s.substr( s.indexOf("@")+1 );

					switch(MyType){
					case "年":
						s = s.split("/");
						s = s[0] + "-01-01 00:00:00"; 
						break;
					case "月":
						s = s.split("/");
						s = s[0] + "-" + s[1] + "-01 00:00:00"; 
						break;
					case "日":
						s = s.split("/");
						s = s[0] + "-" + s[1] + "-" + s[2] + " 00:00:00"; 
						break;
					case "时":
						s = s.split("/");
						s = s[0] + "-" + s[1] + "-" + s[2] + " " + s[3] + ":00:00"; 
						break;
					}
					idx = cacuDelta(MyTimeBegin,s,MyType)-1;
					
					v[idx] = data[i].data[j].value;
				}
				MySeries[i].data = v;
			}
			
			var myZoomStart = Math.floor(100.0- 1000.0/ MyXAxis.length);
			
			_TR(MyXAxis.length);

			var option = {
				animation: false,
				color: colorList,
				title: {
					left: 'left',
			text: '支付方式交易笔数分布',
			textStyle:{
                fontSize:16,
                fontWeight:'normal'
            }
				},
				legend: {
					top: 30,
					data: MyLegend
				},
				tooltip: {
					triggerOn: 'none',
					transitionDuration: 0,
					confine: true,
					bordeRadius: 4,
					borderWidth: 1,
					borderColor: '#333',
					backgroundColor: 'rgba(255,255,255,0.9)',
					textStyle: {
						fontSize: 12,
						color: '#333'
					},
					position: function (pos, params, el, elRect, size) {
						var obj = {
							top: 60
						};
						obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
						return obj;
					}
				},
				toolbox: {
					feature: {
						dataView: {show: false, readOnly: true},
						magicType: {show: true, type: ['line', 'bar']},
						restore: {show: true},
						saveAsImage: {show: true}
					}
				},
				axisPointer: {
					link: [{
						xAxisIndex: [0]
					}]
				},
				dataZoom: [{
					type: 'slider',
					xAxisIndex: [0],
					realtime: false,
					start: myZoomStart,
					end: 100,
					top: 65,
					height: 20,
					handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
					handleSize: '120%'
				}, {
					type: 'inside',
					xAxisIndex: [0],
					start: 40,
					end: 70,
					top: 30,
					height: 20
				}],
				xAxis: [{
					type: 'category',
					data: MyXAxis,
					boundaryGap : false,
					axisLine: { lineStyle: { color: '#777' } },
					axisLabel: {
						formatter: MyXFormater
					},
					min: 'dataMin',
					max: 'dataMax',
					axisPointer: {
						type: 'shadow',
						label: {show: false},
						triggerTooltip: true,
						handle: {
							show: true,
							margin: 50,
							color: '#B80C00'
						}   
					}
				}],
				yAxis: [{
					scale: true,
					splitNumber: 2,
					axisLine: { lineStyle: { color: '#777' } },
					splitLine: { show: true },
					axisTick: { show: false },
					axisLabel: {
						inside: true,
						formatter: '{value}\n'
					}
				}, {
					scale: true,
					gridIndex: 0,
					splitNumber: 2,
					axisLabel: {show: false},
					axisLine: {show: false},
					axisTick: {show: false},
					splitLine: {show: false}
				}],
				grid: [{
					left: 20,
					right: 20,
					top: 110,
					height: 300
				}, {
					left: 20,
					right: 20,
					height: 40,
					top: 260
				}],
				graphic: [{
					type: 'group',
					left: 'center',
					top: 70,
					width: 300,
					bounding: 'raw'
				}],
				series: MySeries
			};
	
			self.myChart1.setOption(option,true);
		});
	}

	// 查询按钮
	CLICK("#p-jiaoyitongji .submit-button",function(){self.initStatData1();});

});

PAGE_SHOW("#p-jiaoyitongji",function(e)
{

	this.initStatData1();

//	queryAllStatItem();
//
//	// 绘制饼图
//	queryStat({item:"订单/支付数量/WEIXIN,订单/支付数量/ALIPAY,订单/支付数量/QQ"},function(data){
//		for(var i=0;i<data.length;i++){
//			if(data[i].item=="订单/支付数量/WEIXIN"){
//				self.option1.series[0].data[1].value	= data[i].data[0].value;
//			}else if(data[i].item=="订单/支付数量/ALIPAY"){
//				self.option1.series[0].data[0].value	= data[i].data[0].value;
//			}else if(data[i].item=="订单/支付数量/QQ"){
//				self.option1.series[0].data[2].value	= data[i].data[0].value;
//			}
//		}
//
//		self.myChart1.setOption(self.option1);
//	});

});


