/**
 * @auth wanghchao
 * @email wangchaoxiaoban@gmail.com
 * @date 2015年10月21日
 * 这是一个日历插件，实现简单的点击变色，获取选中的日期，主要用于一些日期的选择需求
 * 代码开源可以随意改写，但请注明出处，尊重作者劳动果实
 */
;(function(Zepto,jQuery,window,document,undefined) {
	var $='';
	if(typeof Zepto!='undefined' && Zepto){
		$=Zepto;
	}
	if(typeof jQuery!='undefined' && jQuery){
		$=jQuery;
	}
	if(!$ || typeof $==undefined){
		console.error("No frame jQuery OR Zepto");
		return false;
	}
	var calendarWidget=function (el, params) {
		var calendar={
				options:{
					//用户可设置的
					currentDayClass:'GrassCalendar-current-day',//点击之后需要的样式
					currentChoseClass:"GrassCalendar-chose",
					tableId:"GrassCalendar",//生成的tableid
					GDClass:"GrassCalendar",
					allActive:false,//上个月和下个月是否可以点选择
					eachTdClass:"tdday",//每一个可操作的td的class
					min_month:'',// 最小月
					max_month:'',// 最大月
					dataValues:[],
					day_type:'CN',// 日期排布方式 US表示美国（星期日在前） CN表示中国（星期一在前）
					monthNames:[ '', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月','9月', '10月', '11月', '12月' ],
					USdayNames:[ '日', '一', '二', '三', '四', '五', '六' ],
					CNdayNames:[ '一', '二', '三', '四', '五', '六', '日' ],
					onClick:function(options){
						//点击触发的事件
						
					},
					initData:function(Obj,options){
						//初始化数据操作
						
					},
					
					//用户不可设置的
					elem:'',// 绑定的对象
					clickTdDay:'',//最后一次点击点的日期对应的td
					clickData:'',//点击的日期
					now : new Date(),
					thisday : new Date().getDate(),// 今日
					thismonth : new Date().getMonth() + 1,// 本月
					thisyear : new Date().getYear() + 1900,// 今年
					year : '',// 初始化设置的年，默认为本月
					month : '',// 初始化设置的月 默认为本年
					nowday : '',
					left_time:'',// 上一个月 2015-09
					right_time:'',// 下一个月 2015-11
					current_time:'',// 当前月 2015-10
					GD_html:'',
					
				},
				init:function(elem,param){
					// 初始化参数
					var GD_this=this;
					$.extend(GD_this.options,param);// 继承用户自定义方法
					GD_this.options.elem=elem;
					//处理起始时间
					if(!isNaN(GD_this.options.year) || !isNaN(GD_this.options.month)){
						GD_this.options.year=GD_this.options.thisyear;
						GD_this.options.month=GD_this._dispose(GD_this.options.thismonth);
					}
					GD_this.options.nowday=GD_this.options.thisyear+'-'+GD_this._dispose(GD_this.options.thismonth)+'-'+GD_this._dispose(GD_this.options.thisday);
					GD_this._build();//创建html
					GD_this._show();//显示
					GD_this._initData();//初始化数据
				},
				_initData:function(){
					this.options.initData.call(GD_this,GD_this,GD_this.options);
				},
				_onMousover:function(){
					//鼠标移动事件
				},
				_show:function(){
					var GD_this=this;
					$(GD_this.options.elem).html(GD_this.options.GD_html);
					//没每变换一次就设置一次页面数据
					GD_this._setVal();
					GD_this._bind();
				},
				_setVal:function(){
					//初始化数据
					GD_this=this;
					$('.'+GD_this.options.GDClass+' .'+GD_this.options.eachTdClass).each(function(){
						var td=this;
						var time=$(this).attr('date-time');
						if(GD_this.options.dataValues!=[]){
							$.each(GD_this.options.dataValues,function(index,val){
								if(index==time && val==true){
									$(td).toggleClass(GD_this.options.currentChoseClass);
								}
							});
						}
					});
				},
				_build:function(){
					GD_this=this;
					GD_this._create();
				},
				_dispose:function(val){
					// 处理月日前面的0，为了配合php的日期带0
					val=(parseInt(val)+100);
					val=val.toString();
					val=val.substring(1);
					return val;
				},
				_create:function(){
					// 创建页面html
					GD_this=this;
					GD_this.options.month = parseInt(GD_this.options.month);
					GD_this.options.year = parseInt(GD_this.options.year);
					var m = 0;
					var table = '';

					// 上个月
					if (GD_this.options.month == 1) {
						var prev_month = 'data-month="12,' + (GD_this.options.year - 1) + '"';
						var prev_span = '<span>' + (GD_this.options.year - 1) + '年12月</span>';
						GD_this.options.left_time = (GD_this.options.year - 1) + '-12';
					} else {
						var prev_month = 'data-month="' + (GD_this.options.month - 1) + ',' + (GD_this.options.year)+ '"';
						
						var prev_span = '<span>' + GD_this.options.year + '年' + (GD_this.options.month - 1) + '月</span>';
						
						GD_this.options.left_time = GD_this.options.year + '-'+GD_this._dispose(GD_this.options.month - 1) ;
						
					}

					// 下个月
					if (GD_this.options.month == 12) {
						var next_month = 'data-month="1,' + (GD_this.options.year + 1) + '"';
						var next_span = '<span>' + (GD_this.options.year + 1) + '年1月</span>';
						GD_this.options.right_time = (GD_this.options.year + 1) + '-12';
					} else {
						var next_month = 'data-month="' + (GD_this.options.month + 1) + ',' + GD_this.options.year+ '"';
						var next_span = '<span>' + GD_this.options.year + '年' + (GD_this.options.month + 1) + '月</span>';
						
						GD_this.options.right_time = GD_this.options.year + '-'+GD_this._dispose(GD_this.options.month + 1) ;
					}

					
					table += ('<table class="'+GD_this.options.GDClass+' calendar-month table-condensed" '
							+ 'id="'+GD_this.options.tableId+'" cellspacing="0">');
					table += '<thead>';

					table += '<tr>';
					if (GD_this.options.left_time) {
						table += '<th class="GDChangeMonth" ' + prev_month + '>'
								+ '<i class="lnr lnr-chevron-left"></i>' + prev_span
								+ '</th>';
					}
					table += '<th colspan="5" class="switch" id="current-month">' + GD_this.options.year
							+ '年' + GD_this.options.monthNames[GD_this.options.month] + '</th>';
					if (GD_this.options.right_time) {
						table += '<th class="GDChangeMonth" ' + next_month + '>' + next_span
								+ '<i class="lnr lnr-chevron-right"></i><span>' + '</th>';
					}
					table += '</tr>';

					table += '<thead>';
					table += '<tbody>';
					table += '<tr>';
					// 星期
					for (d = 0; d < 7; d++) {
						if(GD_this.options.day_type=='US'){
							table += '<th class="weekday">' + GD_this.options.USdayNames[d] + '</th>';
						}else{
							table += '<th class="weekday">' + GD_this.options.CNdayNames[d] + '</th>';
						}
						
					}

					table += '</tr>';

					var days = GrassCalendarGetDaysInMonth(GD_this.options.month, GD_this.options.year);//当前月总天数
					var firstDayDate = new Date(GD_this.options.year, GD_this.options.month - 1, 1);//当月第一天
					var firstDay = firstDayDate.getDay();//alert();
					
					var prev_m = GD_this.options.month == 1 ? 12 : GD_this.options.month - 1;
					var prev_y = prev_m == 12 ? GD_this.options.year - 1 : GD_this.options.year;
					var prev_days = GrassCalendarGetDaysInMonth(prev_m, prev_y);//上个月有多少天
					
					if(GD_this.options.day_type=='US'){
						firstDay = (firstDay == 0 && firstDayDate) ? 7 : firstDay;
					}else{
						firstDay = (firstDay == 0 && firstDayDate) ? 6 : firstDay-1;
					}

					var next_m = GD_this.options.month == 12 ? 1 : GD_this.options.month + 1;
					var next_y = next_m == 1 ? GD_this.options.year + 1 : GD_this.options.year;

					//获得上一个和下一个月份
					GD_this.options.right_time=next_y+'-'+GD_this._dispose(next_m);
					GD_this.options.left_time=prev_y+'-'+GD_this._dispose(prev_m);
					
					var i = 0;
					var mon = '';
					var allActive='';
					var settdday='';
					if(GD_this.options.allActive){
						allActive='active-month';
						settdday=GD_this.options.eachTdClass;
					}
					for (j = 0; j < 42; j++) {
						if ((j < firstDay)) {
							if (prev_m < 10) {
								mon = '0' + prev_m;
							} else {
								mon = prev_m;
							}
							
							var day = prev_days - firstDay + j + 1;
							
							if (day < 10) {
								day = '0' + day;
							}
							
							var date_time = prev_y + '-' + mon + '-' + day
							table += ('<td class="other-month '+allActive+' '+settdday+'" date-time="' + date_time
									+ '"><p class="day" ><a href="#"><span class="num">'
									+ day + '</span></a></p></td>');// 控制第一排
						} else if ((j >= firstDay + GrassCalendarGetDaysInMonth(GD_this.options.month, GD_this.options.year))) {
							i = i + 1;
							if (next_m < 10) {
								mon = '0' + next_m;
							} else {
								mon = next_m;
							}
							var day = i;
							if (day < 10) {
								day = '0' + day;
							}
							var date_time = next_y + '-' + mon + '-' + day;
							table += ('<td class="other-month '+allActive+' '+settdday+'" date-time="' + date_time
									+ '"><p class="day"><a href="#"><span class="num">' + i + '</span></a></p></td>'); // 控制最后一排
						} else {
							if (GD_this.options.month < 10) {
								mon = '0' + GD_this.options.month;
							} else {
								mon = GD_this.options.month;
							}
							var day = j - firstDay + 1;
							if (day < 10) {
								day = '0' + day;
							}
							var date_time = GD_this.options.year + '-' + mon + '-' + day;
							var CurrentClass='';
							if(date_time==GD_this.options.nowday){
								CurrentClass=GD_this.options.currentDayClass
							}else{
								CurrentClass='';
							}
							if (date_time) {
								table += ('<td class="current-month '+GD_this.options.eachTdClass+' day'
										+ (j - firstDay + 1)
										+' '+CurrentClass
										+'"  date-time="'
										+ date_time
										+ '"><p class="day"><a href="#"><span class="num">'
										+ (j - firstDay + 1) + '</span></a></p></td>');// 控制中间
							}
						}
						if (j % 7 == 6)
							table += ('</tr>');
					}

					table += ('</table>');
					
					GD_this.options.GD_html=table;
					
				},
				changeMonth:function(month,year){
					//换月
					GD_this=this;
					GD_this.options.month=month;
					GD_this.options.year=year;
					
					var changeData=year+'-'+GD_this._dispose(month);
					
					var change=false;
					//获取选中的数据
					GD_this.getChoseDay();
					
					if(GD_this.options.min_month && !GD_this.options.max_month && changeData>=GD_this.options.min_month){
						//只有最小日期
						change=true;

					}
					if(!GD_this.options.min_month && GD_this.options.max_month && changeData<=GD_this.options.max_month){
						change=true;

					}
					if(changeData<=GD_this.options.max_month && changeData>=GD_this.options.min_month
							&& GD_this.options.min_month && GD_this.options.max_month){
						change=true;

					}
					if(change){
						GD_this._create();
						GD_this._show();
						//保留选中的数据
						$('.'+GD_this.options.GDClass+' .'+GD_this.options.eachTdClass).each(function(){
							var time=$(this).attr('date-time');
							if($(this).hasClass(GD_this.options.currentChoseClass)){
								GD_this.options.dataValues[time]=true;
							}else{
								GD_this.options.dataValues[time]=false;
							}
						});
					}
				},
				_bind:function(){
					GD_this=this;
					$('.GDChangeMonth').click(function(){
						var changeData=$(this).attr('data-month');
						changeData = changeData.split(',');
						var changeyear=changeData.pop();
						var changemonth=changeData.pop();
						//约束日期变换
						GD_this.changeMonth(changemonth,changeyear);
					});
					
					$('.'+GD_this.options.GDClass+' .'+GD_this.options.eachTdClass).click(function(){
						GD_this.options.clickTdDay=this;
						GD_this.options.clickData=$(this).attr("date-time");
						GD_this.options.onClick.call(GD_this,GD_this.options);
					});
				},
				getChoseDay:function(select){
					//获取选择的数据
					GD_this=this;
					$('.'+GD_this.options.GDClass+' .'+GD_this.options.eachTdClass).each(function(){
						var time=$(this).attr('date-time');
						if($(this).hasClass(GD_this.options.currentChoseClass)){
							GD_this.options.dataValues[time]=true;
						}else{
							GD_this.options.dataValues[time]=false;
						}
					});
					//处理选中数据
					if(select==true){
						var selectval=[];
						$.each(GD_this.options.dataValues,function(index,val){
							if(val==true){
								selectval[index]=true;
							}
						});
						return selectval;
					}
					return GD_this.options.dataValues;
				}
				
			}
		
		//限定作用域
		$.extend(this, calendar);
	
		}
		
	function GrassCalendarGetDaysInMonth(month, year) {
		var daysInMonth = [ , 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		if ((month == 2) && (year % 4 == 0)
				&& ((year % 100 != 0) || (year % 400 == 0))) {
			return 29;
		} else {
			return daysInMonth[month];
		}
	}

	$.fn.GrassCalendar = function(params) {
		var obj= new calendarWidget();
		obj.init(this, params);
		return obj;
	};

})((typeof Zepto!='undefined')?Zepto:'',(typeof jQuery!='undefined')?jQuery:'',window,document);
