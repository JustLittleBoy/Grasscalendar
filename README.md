# Grasscalendar
A  calendar select widget  日历选择插件<br/>
功能介绍
-------------------------
1).支持jQuery和Zepot框架 谷歌浏览器测试通过，手机没有做详细测试。<br/>
2).由于日历操作都绑定在样式上，所以目前单个页面暂时只支持一个日历，多个日历会有想不到的冲突<br/>
使用方法
-------------------------
		<div id="calendar">
		     This is Calendar Widget
		</div>

		<script>
		var arr=new Array();//存放选中的日期
		var obj=$("#calendar").GrassCalendar({
		//month: 10,//初始化月 默认本月
		//year: 2015,//初始化年 默认本年
		day_type:'US',//使用周格式
		min_month:"2016-01",// 最小月
		max_month:'2026-01',// 最大月
		currentDayClass:'GrassCalendar-current-day',//今天的样式
		currentChoseClass:"GrassCalendar-chose",//选中是显示的养殖
		tableId:"GrassCalendar",//插件生成的tableid
		GDClass:"GrassCalendar",//插件生成的table样式，请保证该样式唯一
		allActive:false,//上个月和下个月是否可以点选择
		eachTdClass:"tdday",//每一个可操作的td的class
		dataValues:{"2016-01-01":true},//初始化数据，不初始化此项不设置或设置为[]
		//初始化操作就是给指定数据加上选择的样式 2016-01-01 被选中
		onClick:function(options){
			$(options.clickTdDay).toggleClass(obj.options.currentChoseClass);//最后选的数据按照 currentChoseClass 样式进行确定
			//$(options.clickTdDay).toggleClass('GrassCalendar-chose');
			console.log(obj.getChoseDay(true));
			//获得选中的日期数据，返回的数据格式是{"2015-10-21":true,"2015-10-22":false} true表示选中，false表示未选中
			//传值为true 只返回选中的，否则返回所有经过页面的值
			//obj.changeMonth('11','2015');
			//转到指定月，受最大最小月限制
			//console.log(obj);
			},
		initData:function(Obj,options){
			//对当显示月每个td进行样式初始化操作
			$('.'+options.GDClass+' .'+options.eachTdClass).each(function(){
				if($(this).attr('date-time')=='2016-03-01'){
					$(this).addClass(options.currentChoseClass);
					//console.log(options.currentChoseClass);
					}
				});
			}
	 		});
		</script>

排版不太熟练。。。具体看index中如何使用

插件使用场景
------------
当时是为了解决日期选择的需求，要求选择某些日期，并将选择的日期返回给后台处理。<br/>
再显示时将之前选择的日期显示在日历上。<br/>
进一步的用法：<br/>
日历中的每个td可以按照需求写入文字，可以作为一个日历备忘插件使用，但是需要使用者自己去扩展了<br/>

PS：日历配色，大小什么的，可以自己调整，我这个确实很low,很难看，哭着也必须得承认<br/>
