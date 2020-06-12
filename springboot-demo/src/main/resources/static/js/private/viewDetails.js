window.onload = function () {
	var vm = new Vue({
		el: '#viewdetail',
		data: function () {
			return {
				SmccGetData: null, 
				businessId:0,
				infoData:{
					data:[{
						proposerName:'',
						ssoUID:'',
						business:'',
						role:'',
						projectName:'',
						agentName:'',
						agentNumber:'',
						agentMail:''
					}]
				},
				oldStepData:{
					data:[]
				},
				stepData:{
					data:[
						{
							businessType:null,
							applyOperatorName:null,
							result:null,
							operationOpinion:null,
						},
						{
							businessType:null,
							applyOperatorName:null,
							result:null,
							operationOpinion:null,
						},
						{
							businessType:null,
							applyOperatorName:null,
							result:null,
							operationOpinion:null,
						}
					]
				}
			}
		},
		components: {
			smccBreadcrumb: smccBreadcrumb
		},
		created:function(){
            this.businessId = $.cookie('businessId');
			this.reqInfo();
			this.reqStep();
		},
		methods: {
			FnGetData:FnGetData,
			FnSetParam:function(param){
                if(this.SmccGetData == 'info' || this.SmccGetData == 'step'){
					param["businessId"] = this.businessId;
            	}
                return param
        	},
			reqInfo:function(){
                this.SmccGetData = 'info';
				this.FnGetData('/PortalPermissions/findByBusinessId','infoData');
			},
			reqStep:function(){
                this.SmccGetData = 'step';
				this.FnGetData('/PortalPermissions/approveHistory','oldStepData');
			},
			giveUpSub:function(){
				window.location.href='http://usmg.smcc.sinopec.com:8092/authorizationlist';
			}
		},
		watch:{
			infoData:function(val){},
			oldStepData:function(val){
				var that = this;
				val.data.forEach(function(value,index){
					if(value.businessType == 1){
						value.businessType ='申请';
						value.operationOpinion='无';
						if(value.operationResult == 0){
							value.operationResult ='已提交';
						}
					}else if(value.businessType == 2){
						value.businessType ='待审批';
						value.operationResult ='无';
						value.operationOpinion ='无';
					}else if(value.businessType == 3){
						value.businessType ='审批';
						if(value.operationResult == 1){
							value.operationResult ='通过';
						}else if(value.operationResult == 2){
							value.operationResult ='不通过';
						}
					}else if(value.businessType == 4){
						value.businessType ='待授权';
						value.operationResult ='无';
						value.operationOpinion ='无';
					}else if(value.businessType == 5){
						value.businessType ='授权';
						if(value.operationResult == 1){
							value.operationResult ='已授权';
						}else if(value.operationResult == 2){
							value.operationResult ='授权未通过';
						}
						value.operationOpinion = '无';
					}
				})
				that.stepData.data=[];
				if(val.data.length==5){
					val.data.forEach(function(v,i){
						if(i==0||i==2||i==4){
							that.stepData.data.push(v);
						}
					})
				}else if(val.data.length==4){
					val.data.forEach(function(v,i){
						if(i==0||i==2||i==3){
							that.stepData.data.push(v);
						}
					})
				}else if(val.data.length==3){
					val.data.forEach(function(v,i){
						if(i==0||i==2){
							that.stepData.data.push(v);
						}
					})
				}else if(val.data.length==2){
					val.data.forEach(function(v,i){
						if(i==0||i==1){
							that.stepData.data.push(v);
						}
					})
				}
			},
		}
	})
}