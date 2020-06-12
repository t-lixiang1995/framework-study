/*var formatDate1 = function(ns) {
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
};*/
var tabSafetyInspection = {
	template: reutrnRes(comp_src + "/compents/private/tab-safetyInspection/tab-safetyInspection.html"),
	data: function() {
		return {	
			dataList:{},  //用于接收安全检查返回数据
			tableData1:[],   //用于接收安全检查返回数据列表
			select0: true,
			centerDialogVisible:false,
			pagesize: 15,
    		currentPage:1,
    		total:'',
    		dataList:{},
    		tableData:[],
    		sels: [],//选中的值显示 
    		multipleSelection: [],
    		textarea: '',
			tableTitle:{
    			title2:'系统名称',
    			title3:'编号',
    			title4:'类型',
    			title5:'等保级别',
    			title6:'业务主管部门',
    			title7:'是否为互联网对外发布应用系统',
    			title8:'检测队伍',
    			title9:'申请时间',
    			title10:'检测开始时间',
    			title11:'状态',
    			title12:'操作'}
			}
	},
	methods: {	
		 maskOne:function(e){
	    	var _this = this
	    	_this.centerDialogVisible = true;
	    	console.log(e.target.innerText)
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
        	var _this = this
            _this.centerDialogVisible = true;
            console.log(index)
            // console.log(rows)
        },
	    maskTwo:function(){
	    	var _this = this
	    	_this.centerDialogVisible = true;
	    },
	    handleCurrentChange: function(currentPage){
    	 	this.currentPage = currentPage;
    	 	this.tableData = this.tableData1.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
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
	    }
	},
	created: function() {
		var _this = this
		$.get("/restful/HomePage/findSecpStayList",{},function(data){
			console.log(data)
			_this.dataList = JSON.parse(data.data);
			_this.tableData1 = _this.dataList.list;
			console.log(_this.tableData)
			_this.total = _this.tableData1.length;
			console.log(_this.tableData[0])
			for(var i=0;i<_this.tableData.length;i++){
				_this.tableData1[i].inspectBeginTime=formatDate1(_this.tableData1[i].inspectBeginTime);
				_this.tableData1[i].checkBeginTime=formatDate1(_this.tableData1[i].checkBeginTime);
				_this.tableData1[i].spotCheckBeginTime=formatDate1(_this.tableData1[i].spotCheckBeginTime);
				_this.tableData1[i].rectificationBeginTime=formatDate1(_this.tableData1[i].rectificationBeginTime);
				_this.tableData1[i].createTime=formatDate1(_this.tableData1[i].createTime);
				if(_this.tableData1[i].taskType == '1'){
					_this.tableData1[i].taskType = '信息安全水平评价';
				}else if(_this.tableData1[i].taskType == 2){
					_this.tableData1[i].taskType = '促优检查';
				}
			}
			_this.tableData = _this.tableData1.slice((_this.currentPage-1)*_this.pagesize,_this.currentPage*_this.pagesize);
		})
	},
	mounted: function() {
	}
}