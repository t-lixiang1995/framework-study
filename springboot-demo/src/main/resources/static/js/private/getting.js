window.onload = function() {
	var vm = new Vue({
		el: '#Protal_home',
		data:{
			origin:'http://usmg.smcc.sinopec.com:8092/portal',
			fnbtn:'state',
			SmccGetData:'',
			selectData: {
				option: '12',
				email: '1年每周定期发送1次邮件，紧急通告立即发送、电话/短信告知',
				ser: '1年实时提供服务',
				money: '30',
				penetrate: '单次人工渗透',
				scan:'20',
				appscan:'30',
				allocation:'单次20台以下，30%抽样检查',
				seale:'小型规模'
			},
			reveal:'',
			optionSel:true,
			selectDa: {
				option: '二级系统',
				search: '单个企业 / 年',
				server: '1年实时提供服务'
			},
			rev:'',
			reve:'',
			offsetTop:0,
			optionFirst:true,
			selectDate: {
				option: 'CISP培训每名额'
			},
			 formLabelAlign: {
		            ldname: '',
		            xtname: '',
		            loophole: '',
		            rank:'',
		            company:'',
		            orgtname:'',
		            urlname:'',
		            iptname:'',
		            outertname:'',
		            portname:'',
		            operationtname:'',
		            versionstname:'',
		            syltname:'',
		            centertname:'',
		            voicename:'',
		            framename:'',
		            comname:'',
		            wwwname:'',
		            issuetname:'',
		            loopholeoptions: [{
			            value: '选项1',
			            label: '1'
			        }, {
			            value: '选项2',
			            label: '2'
			        }, {
			            value: '选项3',
			            label: '3'
			        }, {
			            value: '选项4',
			            label: '4'
			        }, {
			            value: '选项5',
			            label: '5'
			        }],
			        rankoptions: [{
			            value: '选项1',
			            label: '1'
			        }, {
			            value: '选项2',
			            label: '2'
			        }, {
			            value: '选项3',
			            label: '3'
			        }, {
			            value: '选项4',
			            label: '4'
			        }, {
			            value: '选项5',
			            label: '5'
			        }],
			        companyoptions: [{
			            value: '选项1',
			            label: '1'
			        }, {
			            value: '选项2',
			            label: '2'
			        }, {
			            value: '选项3',
			            label: '3'
			        }, {
			            value: '选项4',
			            label: '4'
			        }, {
			            value: '选项5',
			            label: '5'
			        }],
		       	},
		       	affiche:{
					data:{
						list:[]
					}
				},
				noticecontent:{
					data:{
						list:[]
					}
				},
				gonggao:{
					data:{
						list:[]
					}
				}
		},
		
		created:function(){
			this.ReqData()
			this.ResData()
			this.ResDatathree()
		},
		
		methods: {
			FnSetParam: function(param){
	            if(this.SmccGetData == 'uuu'){
	            	param["pageSize"] = 6;
	            	param["currPage"] = 1;
			    }else if(this.SmccGetData == 'notice'){
			    	param["pageSize"] = 17;
	            	param["currPage"] = 1;
			    }else if(this.SmccGetData == 'ccc'){
			    	param["pageSize"] = 3;
	            	param["currPage"] = 1;
			    }
	            return param
			},
			FnGetData:FnGetData,
			FnPostData:FnPostData,
			ReqData: function(){
				this.SmccGetData = 'uuu';
				this.FnPostData('/AnnounceManage/findQueryList','affiche')
			},
			ResData: function(){
				this.SmccGetData = 'notice';
				this.FnPostData('/AnnounceManage/findPublishQueryList','noticecontent')
			},
			ResDatathree: function(){
				this.SmccGetData = 'ccc';
				this.FnPostData('/AnnounceManage/findPublishQueryList','gonggao')
			},
			FnFooterLiClick:function(obj){
				this.offsetTop = this.$refs[obj].offsetTop
				$("html,body").animate({"scrollTop":this.offsetTop-60},1000);
			},
			ReturnBtn:function(){
				$("html,body").animate({"scrollTop":0},1500);
			}
			
		},
		watch:{
			selectDa:{
				handler: function (n, o) {
					if(n.option=='二级系统'){
						this.optionSel = true;
					}else{
						this.optionSel = false;
					}
		        },
	        	deep: true
			},
			selectDate:{
				handler: function (n, o) {
					if(n.option=='CISP培训每名额'){
						this.optionFirst = true;
					}else{
						this.optionFirst = false;
					}
		        },
	        	deep: true
			},
			noticecontent:{
				handler: function (n, o) {
					console.log(n.data.list[0].noticename)
		        },
	        	deep: true
			}
		}
	})
	var mySwiper = new Swiper ('.swiper-container', {
		loop:true,
		autoplay:{
		    delay: 2500,
		    disableOnInteraction: false,
		},
	    autoplayDisableOnInteraction : false,
	    pagination: {
	      el: '.swiper-pagination',
	      clickable: true,
	    }
	  }) 
		
}