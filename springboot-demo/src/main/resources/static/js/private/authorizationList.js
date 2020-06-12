window.onload = function () {
	var xm = new Vue({
		el: '#home',
		data() {
			return {
				filterData: {
					proposerName: '',
					ssoUID: null,
					status: '',
					business: ''
				},
				senFilterData: { //高级查询表单
					role: '',
					agentName: ''
				},
				senFilterShow: false,
				nohandlebtn: true,
				handledbtn: false, //已办按钮 当前
				SmccGetData: null,
				SmccGetWork: null,
				SmccPostWork: null,
				postData: {
					data: {
						list: []
					}
				},
				NoHandletotalCount: 0,
				totalCount: 0,
				pageSize: 1,
				currentPage: 1,
				tableTitle: {
					title1: '序号',
					title2: '申请人姓名',
					title3: '代理人姓名',
					title4: '统一身份账号',
					title5: '所属项目名称',
					title6: '业务',
					title7: '角色',
					title8: '状态',
					title9: '操作'
				},
				dialogAuth: false, //授权弹出框
				infoData: {
					data: [{
						proposerName: null,
						proposerNumber: null,
						proposerMail: null,
						ssoUID: null,
						business: null,
						role: null,
						projectName: null,
						agentMail: null,
						agentNumber: null,
						agentName: null,
					}]
				},
				businessId: 0,
				sqopinion: null,
				origin: 'http://usmg.smcc.sinopec.com:8092',
				empowerResult: null
			}
		},
		components: {
			smccBreadcrumb: smccBreadcrumb
		},
		created: function () {
			this.reqFilTodoTask();
		},
		methods: {
			senFilter: function () {
				this.senFilterShow = !this.senFilterShow;
				if(this.senFilterShow ==  false){
					$(".el-icon-arrow-down").removeClass("is-reverse");
				}else{
					$(".el-icon-arrow-down").addClass("is-reverse");
				}
			},
			tabbtn: function (e) {
				if (e.srcElement.innerText == '待办') {
					this.nohandlebtn = true;
					this.handledbtn = false;
					this.reqFilTodoTask();
				} else if (e.srcElement.innerText == '已办') {
					this.nohandlebtn = false;
					this.handledbtn = true;
					this.reqFilDoneTask();
				};
			},
			FnSetParam: function (param) {
				if (this.SmccGetData == 'list') {
					param["currPage"] = this.currentPage
					param["pageSize"] = 10
				} else if (this.SmccGetData == 'filterlist') {
					param["proposerName"] = this.filterData.proposerName;
					param["ssoUID"] = this.filterData.ssoUID;
					param["status"] = this.filterData.status;
					param["business"] = this.filterData.business;
					param["role"] = this.senFilterData.role;
					param["agentName"] = this.senFilterData.agentName;
					param["currPage"] = this.currentPage
					param["pageSize"] = 10
				} else if (this.SmccGetData == 'adopt') {
					param["businessId"] = this.businessId;
					param["SQopinion"] = this.sqopinion;
				} 
				return param
			},
			FnPostData: FnPostData,
			FnGetData: FnGetData,
			reqFilTodoTask: function () {
				this.SmccGetData = 'filterlist';
				this.FnPostData('/PortalPermissions/getToDoTaskByOthers', 'postData');
			},
			reqFilDoneTask: function () {
				this.SmccGetData = 'filterlist';
				this.FnPostData('/PortalPermissions/getDoneTaskByOthers', 'postData');
			},
			handleCurrentChange: function (val) {
				this.currentPage = val;
				if (this.nohandlebtn) {
					this.reqFilTodoTask();
				} else if (this.handledbtn) {
					this.reqFilDoneTask();
				}
			},
			maskAuth: function (index, row) {
				this.businessId = row.businessId;
				this.sqopinion = row.sqopinion;
				this.$set(this.infoData.data[0], 'proposerName', row.proposerName)
				this.dialogAuth = true;
			},
			toCheck: function (index, row) {
				this.businessId = row.businessId;
				$.cookie('businessId', this.businessId);
				window.location.href = origin + '/examinationapproval';
			},
			closeAuth: function () {
				this.dialogAuth = false;
			},
			toDetail: function (index, row) {
				this.businessId = row.businessId;
				$.cookie('businessId', this.businessId);
				window.location.href = origin + '/viewdetails';
			},
			search: function () {
				if (this.nohandlebtn) {
					this.reqFilTodoTask();
				} else if (this.handledbtn) {
					this.reqFilDoneTask();
				}
			},
			empty: function () {
				this.$set(this.filterData, 'proposerName', '');
				this.$set(this.filterData, 'ssoUID', null);
				this.$set(this.filterData, 'status', '');
				this.$set(this.filterData, 'business', '');
				this.$set(this.senFilterData, 'role', '');
				this.$set(this.senFilterData, 'agentName', '');
			},
			reqEmpowerAdopt: function () {
				this.SmccGetData = 'adopt';
				this.FnGetData('/PortalPermissions/empower', 'empowerResult');
				this.dialogAuth = false;
			}
		},
		watch: {
			postData: function (val) {
				var that = this;
				if (this.nohandlebtn) {
					this.NoHandletotalCount = this.postData.data.totalCount;
				}
				this.totalCount = val.data.totalCount;
				this.currentPage = val.data.currPage;
				this.pageSize = val.data.pageSize;
				val.data.list.forEach(function (value, index) {
					if (value.status == 1) {
						value.operation = '审批';
					} else if (value.status == 3) {
						value.operation = '确认授权';
					} 
					value.num = index + 1 + that.pageSize * (that.currentPage - 1);
					val.data.list.splice(index, 1, value);
				})
			},
			empowerResult: function (val) {
				if (val.msg == '成功') {
					this.reqFilTodoTask();
				}
			}
		},
	})
}