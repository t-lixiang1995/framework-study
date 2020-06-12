var vm=new Vue({
        el:"#bulletinList",
        components:{smccFooter:smccFooter},
        data:{
          linkName:'',
          subcategory:false,//子类别显示
          totalStart:1,//总页数
          totalEnd:15,
          totalCount:0,//总条数
          currentPage:1,//当前页
          pageSizeNow:0,
          currPageNow:0,
          genreList:[],//类别列表
          findChildList:[],//子类别列表
          formData:{
               bulletinName:'', //公告名称
               timeStart:'', //发布时间
               timeEnd:'', //发布时间
               category:'', //类别
               subcategory:'', //子类别
               keyword:'' //关键字'
            },
          bulletinList: [],
          outLineArr:[{value:10,label:'10'},{value:20,label:'20'},{value:50,label:'50'},{value:100,label:'100'}],
          outLineText:10,
          pickerOptions0:{
              disabledDate:function(time) {
                 return  time.getTime() < new Date(vm.formData.timeStart).getTime();
               }
          } 
        },
        mounted:function(){
             this.queryList();//返回列表
             //this.findCategory();//查找类别
             var categoryID=getQueryVariable("categoryID");
             /*this.linkName=decodeURI(getQueryVariable("name"))=='false' ? '' : decodeURI(getQueryVariable("name")) ;
             this.formData.category=this.linkName;*/
             this.findChildCategory(categoryID);
             //var jump=document.querySelector(".el-pagination__jump").firstChild
            //jump.nodeValue="跳到";
        },
        filters:{//过滤数组
         bulletinFilters:function(bulletinFilters){
               if(bulletinFilters.length>0){
                    return bulletinFilters=bulletinFilters.filter(function(item){
                         return !item.overdue;
                    })
               }
         }
       },
        methods:{
           transformDate:transformDate,
           advancedQuery:function(){
                 this.subcategory=!this.subcategory;
                 if(!this.subcategory){
                   this.formData.keyword='';
                 }
           },
           reset:function(){
            this.formData={
               bulletinName:'', //公告名称
               timeStart:'', //发布时间
               timeEnd:'', //发布时间
               category:'', //类别
               subcategory:'', //子类别
               keyword:'' //关键字'
            }
      },
      postMessage:function(url,data){
         return $.ajax({
            url:url,
            type: "POST",
                  datType: "JSON",
                  contentType: "application/json;charset=utf-8",
                  data:JSON.stringify(data)
          }) 
      },getMessage:function(url){
         return $.ajax({
            url:url,
            type: "GET",
                  datType: "JSON"
          }) 
      },
      queryList:function(currPage,pageSize,query,dsisplayQuery){
            var categoryID=getQueryVariable("categoryID");
            var flag=getQueryVariable("flag");
            var that=this;
            var currPage = currPage || 1;
            var pageSize = pageSize || 10;
            var obj={
                noticeName:this.formData.bulletinName || '',
                publishDate1:this.formData.timeStart || '',
                publishDate2:this.formData.timeEnd || '',
                noticeParentCategoryID:categoryID,//this.formData.category || '',
                noticeChildCategoryID:this.formData.subcategory || '',
                keyword :this.formData.keyword || '',
                dataStatus:1,
                flag:flag,
                pageSize:pageSize,
                currPage:currPage
           }
           this.postMessage("/AnnounceManage/findAnnounceByOthers",obj).done(function(res){
               var list=res.data.list;
               that.linkName=list[0].categoryName;
               that.formData.category=list[0].categoryName;
               that.bulletinList=list;
               that.pageSizeNow=res.data.pageSize;
               that.currPageNow=res.data.currPage;
               that.totalCount=res.data.totalCount; 
               if(query){
                  that.outLineText=10;
                  that.currentPage=1;
               }
               if(dsisplayQuery){
                that.currentPage=1;
               } 
         })
      },generalQuery:function(){
          this.queryList(null,null,true)
      },
      currentChange:function(val){//分页
            this.currentPage=val; 
            this.queryList(val,this.outLineText) 
      },outLineChange:function(val){
           this.outLineText=val;
           this.queryList(null,val,null,true)
      },
      findCategory:function(){//查询所有类别
         var that=this;
          this.getMessage("/AnnounceManage/findCategory").done(function(res){
                     var data=res.data;
                     that.genreList=data;
                 })
      },
      findCategoryEvent:function(val){
          this.formData.category=val;
          this.findChildCategory(val);
      },subcategoryEvent:function(val){
           this.formData.subcategory=val;
      },findChildCategory:function(val){//查询所有子类别
           this.formData.subcategory='';
            var that=this;
            var val= val || '';
          this.getMessage("/AnnounceManage/findChildCategory?categoryID="+val+"").done(function(res){
                     var data=res.data;
                     that.findChildList=data;
                 })  
      },timeEnd:function(date){
        var datc = new Date(new Date(date).getTime()+24*60*60*1000-1);
            this.formData.timeEnd=datc;
      },headerDragend:function(newWidth){
          $(".cellAll").width(newWidth-30)
      }
       
        }
    })

 

function thanTen(num){
     return  num < 10 ? "0"+ num : num ;
}

function transformDate(date){
      if(date){
      var newDate=new Date(date);
      var fullYear=newDate.getFullYear();
      var month=newDate.getMonth()+1;
      var date=newDate.getDate();
      var hours=newDate.getHours();
      var minutes=newDate.getMinutes();
      var seconds=newDate.getSeconds();
      var yearText=fullYear+'-'+thanTen(month)+'-'+thanTen(date);
      var timeText=thanTen(hours)+":"+thanTen(minutes)+":"+thanTen(seconds);
      return {yearText:yearText,timeText:timeText};
      }
      return {yearText:'',timeText:''};     
}


function getQueryVariable(variable)//获取url参数
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}