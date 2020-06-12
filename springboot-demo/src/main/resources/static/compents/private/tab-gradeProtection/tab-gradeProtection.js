var gradeProtection = {
	template: reutrnRes(comp_src + "/compents/private/tab-gradeProtection/tab-gradeProtection.html"),
	data: function() {
		return {	
			dataList:{},  //用于接收返回数据
			tableData:'',   //用于接收返回数据列表
			select0: true,
			centerDialogVisible:false,
			pagesize: 15,
    		currentPage:1,
    		total:'',
    		dataList:{},
    		multipleSelection: [],
	        sels: [],//选中的值显示 
    		textarea: '',
			tableTitle:{
    			title2:'流程实例名称',
    			title3:'发起人',
    			title4:'上一步执行人',
    			title5:'执行时间',
    			title6:'业务节点',
    			title7:'专家评审意见',
    			title8:'备案证明',
    			title11:'状态',
    			title12:'操作'
			},
			tableData1:[
			    		{
			    			id:1,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:2,
			    			title:'t2',
			    			num:2,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:3,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:4,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:5,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:6,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:7,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:8,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:9,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:10,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:11,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:12,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:13,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:14,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:15,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:16,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:17,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:18,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:19,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        },
				        {
			    			id:20,
			    			title:'t1',
			    			num:1,
			    			type:'a',
			    			zhu:'a',
			    			chao:'a',
			    			guannum:'1',
			    			name: '王小虎',
				          	establishTime: '2016-05-02',
				          	LowerHairTime:'2016-0812',
				          	over:'待审批',
				          	operation:'审批'
				        }
			        ]
	}
	},
	methods:{
		deleteRow(index) {
	      this.centerDialogVisible = true;
	      console.log(index)
	      // console.log(rows)
	    },
		handleJoinPeople:function(row,id){
	    	console.log(row)
	    	this.centerDialogVisible = true;
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
		maskOne:function(e){
	    	var _this = this
	    	_this.centerDialogVisible = true;
	    	console.log(e.target.innerText)
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
		this.tableData = this.tableData1.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
	},
	mounted: function() {
	}
}