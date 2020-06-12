var safetyNotice = {
	template: reutrnRes(comp_src + "/compents/private/tab-safetyNotice/tab-safetyNotice.html"),
	data: function() {
		return {	
			dataList:{},  //用于接收安全检查返回数据
			tableData:[],   //用于接收安全检查返回数据列表
			select0: true,
			pagesize: 15,
    		currentPage:1,
    		total:'',
    		dataList:{},
    		tableTitle:{title1:'序号',
    			title2:'标题',
    			title3:'漏洞编号',
    			title4:'类型',
    			title5:'主送',
    			title6:'抄送',
    			title7:'关联数量',
    			title8:'创建人',
    			title9:'创建时间',
    			title10:'下发时间',
    			title11:'状态',
    			title12:'操作'
    		},
    		tableData:[],
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
			        ],
			        multipleSelection: [],
			        sels: [],//选中的值显示 
			        centerDialogVisible: false,
			        handle:{
			        	idList:[],
			        	opinion:'',
			        	result:''
			        },
			        textarea: ''
		}
	},
	methods:{
		deleteRow(index) {
	      this.centerDialogVisible = true;
	      console.log(index)
	      // console.log(rows)
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
		handleJoinPeople:function(row,id){
	    	console.log(row)
	    	this.centerDialogVisible = true;
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
    	 	console.log(this.currentPage)
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
	    	this.handle.opinion = this.textarea;
	    	console.log(this.handle.opinion)
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
		console.log(this.tableData)
		console.log(this.pagesize)
	},
	mounted: function() {
	}
}