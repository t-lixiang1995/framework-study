window.onload = function () {
	var vm = new Vue({
		el: '#approval',
		data: function () {
			return {
				mccGetData: null, 
				businessId:0,
				ruleForm: {
					result: '',
					desc: ''
				},
				remnant: 0,
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
				rules: {
					result: [{
						required: true, 
						message:'请选择审批结果',
						trigger: 'change'
					}],
					desc: [{
						required:false,
						message:'请输入审批意见',
						trigger: 'blur'
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
				},

				feedData:null,
				revertlData:null,
				SPopinion:null,
				descplaceholder:'',
				maskPop:false,
				submitFeed:false
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
				}else if(this.SmccGetData == 'approval'){
					param["businessId"] = this.businessId;
					param["SPopinion"] = this.ruleForm.desc;
				}
                return param
        	},
			descInput() {
				var txtVal = this.ruleForm.desc.length;
				this.remnant = 200 - txtVal;
			},
			reqInfo:function(){
                this.SmccGetData = 'info';
				this.FnGetData('/PortalPermissions/findByBusinessId','infoData');
			},
			reqStep:function(){
                this.SmccGetData = 'step';
				this.FnGetData('/PortalPermissions/approveHistory','oldStepData');
			},
			submitExam:function(){
				this.maskPop = true;
			},
			changeResult:function(){
				if(this.ruleForm.result=='通过'){
					$("#examdesc").removeClass("must");
					this.descplaceholder = '';
					this.ruleForm.desc='通过';
				}else if(this.ruleForm.result=='不通过'){
					this.ruleForm.desc='';
					$("#examdesc").addClass("must");
					this.descplaceholder = '请输入不通过原因';
				}else{
					this.ruleForm.desc='';
				}
				this.descInput();
			},
			submitExamOk:function(){
				var that = this;
				if(this.ruleForm.result=='通过'&&this.ruleForm.desc!='' || this.ruleForm.result=='不通过'&&this.ruleForm.desc!=''){
					this.SmccGetData = 'approval';
					if(this.ruleForm.result == '通过'){
						this.FnGetData('/PortalPermissions/approve/complete','feedData');
					}else if(this.ruleForm.result == '不通过'){
						this.FnGetData('/PortalPermissions/approve/revert','feedData');
					}
				}else{
					if(this.ruleForm.result==''){
						$(".examresult input").addClass('red');
					}
					if(this.ruleForm.desc==''){
						$(".examdesc textarea").addClass('red');
					}
					this.maskPop = false;
				}
			},
			submitExamNo:function(){
				if(this.ruleForm.result==''){
					$(".examresult input").addClass('red');
				}
				if(this.ruleForm.desc==''){
					$(".examdesc textarea").addClass('red');
				}
				this.maskPop = false;
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
			ruleForm:{
				handler:function(val) {
					if(val.result!=''){
						$(".examresult input").removeClass('red');
					}
					if(val.desc!=''){
						$(".examdesc textarea").removeClass('red');
					}
				},
				deep: true
			},
			feedData:function(val){
				if(val.msg == '成功'){
					this.submitFeed = true;
					this.maskPop = false;
					setTimeout(function(){
						window.location.href = 'http://usmg.smcc.sinopec.com:8092';
					},3000)
				}
			}
		}
	})
}