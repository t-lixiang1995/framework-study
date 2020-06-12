window.onload = function () {
	var charts = [];
	var myChart;
	// 等级保护 组件
	Vue.component("el-echart1",{
        data:function(){
            return {
             
            }
        },
        template:"<div id='container' style='height:460px' ref='oneEcharts'></div>",
        created:function(){
        },
        mounted:function(){
        	_this = this
        	$.get('/restful/HomePage/findCproQueryList',{},function(data){
        		var broken = JSON.parse(data.data).data;
        		console.log(broken)
        	 	var one = _this.$refs.oneEcharts;
                // 第一个图表
    			myChart = echarts.init(one);
    			option = null;
    			var results = {type: [
    				{name:'预定级数',
    					type:'line',
    					data:[broken[0].readyGradCount, broken[1].readyGradCount, broken[2].readyGradCount,broken[3].readyGradCount, broken[4].readyGradCount, broken[5].readyGradCount, broken[6].readyGradCount, broken[7].readyGradCount,broken[8].readyGradCount, broken[9].readyGradCount, broken[10].readyGradCount, broken[11].readyGradCount],
    					itemStyle: {
    			                color: '#50e3c2',
    			                borderColor: '#50e3c2',
    			                shadowColor: 'rgba(80, 227, 194, 1)',
    			                shadowBlur: 10
    		            },
    		            symbol: 'circle'
    		        },
    				{ name:'审核定级数',
    		        	type:'line',
    		        	data:[broken[0].checkGradCount, broken[1].checkGradCount, broken[2].checkGradCount,broken[3].checkGradCount, broken[4].checkGradCount, broken[5].checkGradCount, broken[6].checkGradCount, broken[7].checkGradCount,broken[8].checkGradCount, broken[9].checkGradCount, broken[10].checkGradCount, broken[11].checkGradCount],
    		        	itemStyle: {
    		                color: '#12cbf6',
    		                borderColor: '#12cbf6',
    		                shadowColor: 'rgba(18, 203, 246, 1)',
    		                shadowBlur: 10
    			        },
    			        symbol: 'circle'
    				},
    				{ name:'备案数',
    					type:'line',
    					data:[broken[0].readyGradCount, broken[1].readyGradCount, broken[2].readyGradCount,broken[3].readyGradCount, broken[4].readyGradCount, broken[5].readyGradCount, broken[6].readyGradCount, broken[7].readyGradCount,broken[8].readyGradCount, broken[9].readyGradCount, broken[10].readyGradCount, broken[11].readyGradCount],
    					itemStyle: {
    		                color: '#9fe060',
    		                borderColor: '#9fe060',
    		                shadowColor: 'rgba(159, 224, 96, 1)',
    		                shadowBlur: 10
    			        },
    			        symbol: 'circle'
    				},
    				{ name:'测评数',
    					type:'line',
    					data:[broken[0].evaluationCount, broken[1].evaluationCount, broken[2].evaluationCount,broken[3].evaluationCount, broken[4].evaluationCount, broken[5].evaluationCount, broken[6].evaluationCount, broken[7].evaluationCount,broken[8].evaluationCount, broken[9].evaluationCount, broken[10].evaluationCount, broken[11].evaluationCount],
    					itemStyle: {
    		                color: '#ff9933',
    		                borderColor: '#ff9933',
    		                shadowColor: 'rgba(255, 153, 51, 1)',
    		                shadowBlur: 10
    			        },
    			        symbol: 'circle'
    				},
    				{ name:'自查数',
    					type:'line',
    					data:[broken[0].selfInspectionCount, broken[1].selfInspectionCount, broken[2].selfInspectionCount,broken[3].selfInspectionCount, broken[4].selfInspectionCount, broken[5].selfInspectionCount, broken[6].selfInspectionCount, broken[7].selfInspectionCount,broken[8].selfInspectionCount, broken[9].selfInspectionCount, broken[10].selfInspectionCount, broken[11].selfInspectionCount],
    					itemStyle: {
    		                color: '#028bff',
    		                borderColor: '#028bff',
    		                shadowColor: 'rgba(2, 139, 255, 1)',
    		                shadowBlur: 10
    			        },
    			        symbol: 'circle'
    				}],
    				month: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    			};
    			var names = [];
    			for(var i = 0; i <= results.type.length-1; i++){
    				names.push(results.type[i].name);
    			}
    			option = {
    			 	title: {
    			        text: '系统等保管理阶段趋势',
    			        textStyle:{
    			    　　　　 		fontSize:14
    			        },
    			        subtext: '不同等保管理状态下系统数量',
    			        left: 10
    			    },
    				tooltip: {
    			        trigger: 'axis'
    			    },
    			    legend: {
    			    	right: '5%',
    			        data:names
    			    },
    			    grid: {
    			        left: '2%',
    			        right: '4%',
    			        bottom: '3%',
    			        containLabel: true
    			    },
    			    toolbox: {
    			    	show:false,
    			        feature: {
    			            saveAsImage: {}
    			        }
    			    },
    			    xAxis: {
    			        type: 'category',
    			        data: results.month,
    			    },
    			    yAxis: {
    			        type: 'value'
    			    },
    			    series: results.type
    			};
    			
    			myChart.setOption(option);
    			charts.push(myChart);
        	})
        }
    });

	// 漏洞统计排名 组件
	Vue.component("el-echart2",{
        data:function(){
            return {
                data: []
            }
        },
        template:"<div id='callstrip' style='height:475px' ref='twoEcharts'></div>",
        created:function(){
        },
       
       mounted:function(){
    	   var _this = this;
   			$.get("/restful/HomePage/findSecpQueryList",{},function(data){
		    _this.data = JSON.parse(data.data);
		    console.log(_this.data);
			var two = _this.$refs.twoEcharts
			myChart = echarts.init(two)
			option = {
					title: {
			 	        text: '漏洞统计排名',
			 	        textStyle:{
				    　　　　 		fontSize:14
				        },
			 	        subtext: '点击图表查看各个状态下系统通报详情',
			 	        left: 10
			 	    },
			 	    color: ['#3398DB'],
			 	    tooltip : {
			 	        trigger: 'axis',
			 	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
			 	        }
			 	    },
			 	    grid: {
			 	        left: '3%',
			 	        right: '4%',
			 	        bottom: '3%',
			 	        containLabel: true
			 	    },
			 	    xAxis : [
			 	        {
			 	            type : 'category',
			 	            data : ['一级', '二级', '三级', '四级', '五级'],
			 	            axisTick: {
			 	                alignWithLabel: true
			 	            }
			 	        }
			 	    ],
			 	    yAxis : [
			 	        {
			 	            type : 'value',
			 	            splitLine: {
					        	 lineStyle: {
					        		 color: ["#ededed"]
					        	 }
					        }
			 	        }
			 	    ],
			 	    series : [
			 	        {
			 	            type:'bar',
			 	            barWidth: '60%',
				            data:_this.data,
				            itemStyle:{
				            	color:function(params){
				            		var colorList = ['rgb(162,208,247)','rgb(107,177,235)','rgb(61,149,223)','rgb(30,101,161)','rgb(2,56,101)'];
				            		return colorList[params.dataIndex];
				            	}
				            }
			 	        }
			 	    ]
			 	};
			 	myChart.setOption(option);
			 	charts.push(myChart);
			 })
         }
    });
	// 漏洞统计排名柱状图 组件
	Vue.component("el-echart3",{
    	data:function(){
            return {
    			columnar:[]
            }
        },
        template:"<div id='callconent' ref='threeEcharts'></div>",
        created:function(){
        
        },
        mounted:function(){
        	var _this = this;
        	$.get("/restful/HomePage/findSecbQueryList",{},function(data){
				_this.columnar = JSON.parse(data.data).data.list;
				console.log(_this.columnar)
				 // 给数据显示内容进行升序
				function compare(property){
				     return function(a,b){
				         var value1 = a[property];
				         var value2 = b[property];
				         return value1 - value2;
				     }
				 };
				 _this.columnar.sort(compare('vulType'));
				 var three = _this.$refs.threeEcharts;
				 myChart = echarts.init(three);
				 var vulType = [];
				 var vulTypeName = [];
				 for(var i=0;i<_this.columnar.length;i++){
				 	vulType.push(_this.columnar[i].vulType)
				 };
				 for(var l=0;l<_this.columnar.length;l++){
				 	vulTypeName.push(_this.columnar[l].vulTypeName)
				 };
				 option = {
				 title: {
				     text: '漏洞统计排名',
				     textStyle:{
			    　　　　 		fontSize:14
				     },
				     subtext: '点击图表查看各个状态下系统通报详情',
				     left: 10
				 },
				 color: ['#3398DB'],
				 tooltip : {
				     trigger: 'axis',
				     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				         type : 'cross'        // 默认为直线，可选为：'line' | 'shadow' | 'cross'
				     }
				 },
				 grid: {
				     left: '3%',
				     right: '4%',
				     bottom: '3%',
				     containLabel: true
				 },
				 xAxis : [
				     {
				         type : 'category',
				         data : vulTypeName,
				         axisLabel: {rotate: 50, interval: 0},
				         axisTick: {
				             alignWithLabel: true
				         }
				     }
				 ],
				 yAxis : [
				     {
				         type : 'value',
				         splitLine: {
				        	 lineStyle: {
				        		 color: ["#ededed"]
				        	 }
				         }
				     }
				 ],
				series : [
				     { // For shadow
				         type: 'bar',
				         itemStyle: {
				             normal: {color: 'rgba(0,0,0,0.05)'}
				         },
				         barGap:'-100%',
				         barCategoryGap:'40%',
				         animation: false
				     },
				     {	
				     	type: 'bar',
				     	itemStyle: {
				            normal: {
				                 color: new echarts.graphic.LinearGradient(
				                     0, 0, 0, 1,
				                     [
				                         {offset: 0, color: '#83bff6'},
				                         {offset: 0.5, color: '#188df0'},
				                         {offset: 1, color: '#188df0'}
				                     ]
				                 )
				             }
				         },
				         data:vulType
				     }
				 ]
				 };
				 ;
				 myChart.setOption(option);
				 charts.push(myChart);
        	})
        }
    });
	
	var vm = new Vue({
  		el: '#home',
  		data: function() {
	    	return { 
	    		pagesize: 15,
	    		currentPage:1,
	    		centerDialogVisible:false,
	    		ruleForm: {
			          desc: ''
			    },
	    		textarea: '',
	    		pies:{},
	    		inspect:false,  //安全检查表格
	    		test:false,     //安全检测表格
	    		notified:true,  //安全通报
	    		protect:false,   //等级保护
	    		select0: true,
	    		multipleSelection: [],
	    		results1:[],
	    		dataList:{},
	    		tableData:'',
	    		remnant: 100
	    	}
  		},
  		created:function(){
  			var _this = this;
  			$.get("/restful/HomePage/findAMQueryList",{},function(data){
         		_this.results1 = data.data.slice(0,12);
			})
  		},
	 	mounted: function(){
	 		
	 		var _this = this;
         	// 漏洞数据统计
         	$.get("/restful/HomePage/findSecbQueryList",{},function(data){
			 	_this.pies = JSON.parse(data.data).data;
			 	console.log(_this.pies.list)
			 	var three = _this.$refs.threeEcharts
	         	myChart = echarts.init(three);
	         	var arrData = [];
	         	for(var i=0;i<_this.pies.list.length; i++){
	         		var obj_item = {};
	         		obj_item.value = _this.pies.list[i].sumNums;
	         		obj_item.name = _this.pies.list[i].vulTypeName;
	         		arrData[arrData.length] = obj_item;
	         	}
			 	option = {
			 		title: {
		 	        text: '漏洞类型统计',
		 	        textStyle:{
			    　　　　 		fontSize:14
			        },
			 	    left: 10
			 	    },
			 	    color:['rgb(0,101,186)','rgb(18,203,246)','rgb(93,174,81)','rgb(159,224,96)','rgb(255,153,51)','rgb(51,132,200)','rgb(113,224,250)','rgb(125,190,116)','rgb(197,236,160)','rgb(255,173,92)','rgb(102,163,214)','rgb(80,227,194)','rgb(158,206,151)','rgb(221,212,53)','rgb(255,194,133)','rgb(153,193,227)','rgb(150,238,218)','rgb(190,223,185)','rgb(235,229,134)','rgb(255,214,173)','rgb(204,224,241)','rgb(223,239,220)'],
			 	    tooltip: {
			 	        trigger: 'item',
			 	        formatter: "{b}: {c} ({d}%)"
			 	    },
			 	    series: [
			 	        {
			 	            type:'pie',
			 	            radius: ['40%', '60%'],
			 	            selectedMode: 'single',
			 	            itemStyle: {
			 	                emphasis: {
			 	                    shadowBlur: 10,
			 	                    shadowOffsetX: 0,
			 	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			 	                },
			 	                normal:{
			 	                	label:{
			 	                		show:true,
			 	                		formatter:'{b}:{c} ({d}%)'
			 	                	},
			 	                	labelLine:{show:true}
			 	                }
			 	            },
				            
			 	            data:arrData
			 	        }
			 	    ]
			 	};
			 	myChart.setOption(option);
			 	charts.push(myChart);
			 })
	 	},
  		methods:{
  			//文本框驶入字数显示方法
  			descInput(){
				var txtVal = this.ruleForm.desc.length;
				this.remnant = 100 - txtVal;
			},
			//时间戳转换为正常显示时间
  			formatDate :function(ns) {
			      if (ns == 0 || isNaN(ns)) {
			          return ''
			      }
			      var date = new Date(parseInt(ns));
			      Y = date.getFullYear() + '-';
			      M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			      D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '';
			      h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			      m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			      s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) + ':';
			      ms = (date.getMilliseconds() < 10 ? '0' + date.getMilliseconds() : date.getMilliseconds());
			      return Y + M + D + ' ' + h + m +s +ms;
		    },
		    //分页页数
		    handleCurrentChange: function(currentPage){
	    	 	this.currentPage = currentPage;
	    	 	console.log(this.$refs.name)
		    },
		    tabArrow: function(e,n){
//		    	console.log(e)
//		    	console.log(n)
		    	if(n == 1){
		    		this.notified = true;
		    		this.inspect = false;
		    		this.test = false;
		    		this.protect = false;
		    	}else if(n == 2){
		    		this.notified = false;
		    		this.inspect = false;
		    		this.test = true;
		    		this.protect = false;
		    	}else if(n == 3){
		    		this.notified = false;
		    		this.inspect = false;
		    		this.test = false;
		    		this.protect = true;
		    	}else if(n == 4){
		    		this.notified = false;
		    		this.inspect = true;
		    		this.test = false;
		    		this.protect = false;
		    	}
		    	console.log(e.currentTarget)
				e.currentTarget.classList.add('click');
				$(e.currentTarget).siblings('div').removeClass('click');
		    }
		},
		components:{
			tabSecurity:tabSecurity,
			tabSafetyInspection:tabSafetyInspection,
			safetyNotice:safetyNotice,
			gradeProtection:gradeProtection
		}
	});
	window.onresize = function(){
		for(var i=0;i<charts.length;i++){
			charts[i].resize();
		}
	};
}