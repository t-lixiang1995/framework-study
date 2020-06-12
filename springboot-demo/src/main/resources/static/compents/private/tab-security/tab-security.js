var formatDate1 = function(ns) {
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
	  return Y + M + D + ' ';
};
var tabSecurity = {
	template: reutrnRes(comp_src + "/compents/private/tab-security/tab-security.html"),
	data: function() {
		return {	
			dataList:{},  //用于接收安全检查返回数据
			select: true,
			centerDialogVisible:false,
			pagesize: 15,
    		currentPage:1,
    		total:'',
    		dataList:{},
    		tableData:[],    //表格接收数据
    		tableData1:[],   //用于接收安全检查返回数据列表
    		sels: [],        //选中的值显示 
    		multipleSelection: [],
    		textarea: '',
			tableTitle:{
    			title2:'负责人',
    			title3:'类型',
    			title4:'计划检查流程',
    			title5:'创建时间',
    			title6:'计划自查时间',
    			title7:'计划核查时间',
    			title8:'计划抽查时间',
    			title9:'计划整改时间',
    			title10:'任务组成员',
    			title11:'检查要求',
    			title11:'状态',
    			title12:'操作'}
			}
	},
	methods: {	
		 maskOne:function(e){
	    	this.centerDialogVisible = true;
	    	console.log(e.target.innerText)
	    },
	    handleJoinPeople:function(row,id){
	    	console.log(row)
	    	this.centerDialogVisible = true;
	    },
	    maskTwo:function(row, column, cell, event){
	    	console.log(row)
	    	var _this = this
	    	
	    },
	    adopt:function(e){
	    	this.textarea = e.target.innerText
	    },
	    noadopt:function(e){
	    	if(this.textarea !== ''){
	    		this.textarea = '';
	    	}else{

	    	}
	    },
	    upadopt:function(e){
	    	if(this.textarea !== ''){
	    		this.textarea = '';
	    	}
	    },
	    determine:function(){
	    	this.centerDialogVisible = false;
	    	this.textarea = '';
	    },
	    cancel:function(){
	    	this.centerDialogVisible = false;
	    	this.textarea = '';
	    },
	    toggleSelection(rows) {
	      if (rows) {
	        rows.forEach(row => {
	          this.$refs.multipleTable.toggleRowSelection(row);
	        });
	      } else {
	        this.$refs.multipleTable.clearSelection();
	      }
	    },
	    handleSelectionChange(val) {
            this.sels = val
            console.log(1)
            console.log(val)
            this.multipleSelection = val;
        },
        deleteRow(index) {
            this.centerDialogVisible = true;
            console.log(index)
            // console.log(rows)
        },
        //分页与页面建立联系
	    handleCurrentChange: function(currentPage){
    	 	this.currentPage = currentPage;
    	 	this.tableData = this.tableData1.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
	    }
	},
	created: function() {
		var _this = this
		$.get("/restful/HomePage/findSeciStayList",{},function(data){
			console.log(data)
			_this.dataList = data.data.data;
			_this.tableData1 = _this.dataList.stayList;
			
			_this.total = _this.tableData1.length;
			console.log(_this.tableData[0])
			for(var i=0;i<_this.tableData.length;i++){
				_this.tableData[i].inspectBeginTime=formatDate1(_this.tableData[i].inspectBeginTime);
				_this.tableData[i].checkBeginTime=formatDate1(_this.tableData[i].checkBeginTime);
				_this.tableData[i].spotCheckBeginTime=formatDate1(_this.tableData[i].spotCheckBeginTime);
				_this.tableData[i].rectificationBeginTime=formatDate1(_this.tableData[i].rectificationBeginTime);
				_this.tableData[i].createTime=formatDate1(_this.tableData[i].createTime);
				_this.tableData[i].taskStatus = '待审核'
				if(_this.tableData[i].taskType == '1'){
					_this.tableData[i].taskType = '信息安全水平评价';
				}else if(_this.tableData[i].taskType == 2){
					_this.tableData[i].taskType = '促优检查';
				}
			}
		});
		this.tableData = _this.tableData1.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
	},
	mounted: function() {
	}
}