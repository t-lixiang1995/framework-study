var vm=new Vue({
        el:"#managementList",
        components:{smccFooter:smccFooter},
        data:{
          subcategory:false,//子类别显示
          unavailable:true,
          addGray:true,
          totalStart:1,//总页数
          totalEnd:15,
          totalCount:0,//总条数
          currentPage:1,//当前页
          pkId:0,//获取pkId
          pageSizeNow:0,
          currPageNow:0,
          genreList:[],//类别列表
          findChildList:[],//子类别列表
          selectionChangeList:[],//当表格选中时赋值数据
          outLineArr:[{value:10,label:'10'},{value:20,label:'20'},{value:50,label:'50'},{value:100,label:'100'}],
          outLineText:10,
          formData:{
               bulletinName:'', //公告名称
               timeStart:'', //发布时间
               timeEnd:'', //发布时间
               category:'', //类别
               subcategory:'', //子类别
               keyword:'' //关键字'
            },
            managementTable: [],
           pickerOptions0:{
              disabledDate:function(time) {
                 return  time.getTime() < new Date(vm.formData.timeStart).getTime();
               }
          } 
        },
        mounted:function(){
           this.queryList();//返回列表
           this.findCategory();//查找类别
           //var jump=document.querySelector(".el-pagination__jump").firstChild
            //jump.nodeValue="跳到"
        },computed:{
            managementComputed:function(vm){
                 vm.managementTable.forEach(function(item,index){
                        if(item.overdue && item.dataStatus=='1'){
                            vm.postMessage("/AnnounceManage/editAnnounce",{pkId:item.pkId,dataStatus:0}).done(function(res){
                                  console.log("修改成功")
                            })
                        }
                 })
                 return vm.managementTable;
            }
        },
        methods:{
           transformDate:transformDate,
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
           advancedQuery:function(){
                 this.subcategory=!this.subcategory;
                 if(!this.subcategory){
                   this.formData.keyword='';
                 }
           },reset:function(){
            this.formData={
               bulletinName:'', //公告名称
               timeStart:'', //发布时间
               timeEnd:'', //发布时间
               category:'', //类别
               subcategory:'', //子类别
               keyword:'' //关键字'
            }
      },
      queryList:function(currPage,pageSize,query,dsisplayQuery){ 
           var that=this;
           var currPage = currPage || 1;
           var pageSize = pageSize || 10;
           var obj={
                noticeName:this.formData.bulletinName || '',
                publishDate1:this.formData.timeStart || '',
                publishDate2:this.formData.timeEnd || '',
                noticeParentCategoryID:this.formData.category || '',
                noticeChildCategoryID:this.formData.subcategory || '',
                keyword :this.formData.keyword || '',
                pageSize:pageSize,
                currPage:currPage
           }
           this.postMessage("/AnnounceManage/findAnnounceByOthers",obj).done(function(res){
               var list=res.data.list;
               console.log(list)
               that.pageSizeNow=res.data.pageSize;
               that.currPageNow=res.data.currPage;
               that.managementTable=list;
               that.totalCount=res.data.totalCount;
               if(query){
                that.currentPage=1;
                that.outLineText=10;  
               }
               if(dsisplayQuery){
                  that.currentPage=1; 
               }
               var spanChild='';
               var txt='';
               that.$nextTick(function(){
                  $(".operation").each(function(index,obj){
                      spanChild=$(obj).children().children("span").last();
                      txt=spanChild.text().replace(/[\|+|\s+]/g,'');
                      spanChild.html("<strong>"+txt+"</strong>");
                   })
               })
         })
      },generalQuery:function(){
          this.queryList(null,null,true)
      },currentChange:function(val){//分页
          this.currentPage=val; 
          this.queryList(val,this.outLineText) 
      },outLineChange:function(val){//数字查询
          this.outLineText=val;
          this.queryList(null,val,null,true)
      },findCategory:function(){//查询所有类别
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
      },
      findChildCategory:function(val){//查询所有子类别
          this.formData.subcategory='';
            var that=this;
            var val= val || '';
          this.getMessage("/AnnounceManage/findChildCategory?categoryID="+val+"").done(function(res){
                     var data=res.data;
                     that.findChildList=data;
                 })  
      },
      addBtn:function(){
             location.href="newAnnouncement";
      },
      selectionChange:function(tablist){
             this.selectionChangeList=tablist;
             if(this.selectionChangeList.length>0){
                  this.unavailable=false;
                  this.addGray=false;
             }else{
                 this.unavailable=true;
                 this.addGray=true;
             }
      },
      batchDeletingAlert:function(){//批量删除
            $(".batchDeleting").disappear();
      },
      deleteAlert:function(pkId){//删除弹窗
            this.pkId=pkId;
            $(".releaseOne").disappear();
      },
      deleteOne:function(){//删除一条
          var that=this;
           this.getMessage("/AnnounceManage/deleteAnnounce?pkId="+this.pkId+"").done(function(res){
                  that.queryList(that.currentPage,that.outLineText); 
                  $(".releaseSuccess").disappear({hide:true,text:"删除成功"})
                  $(".releaseOne").hide();    
            })
      },
      cancelDeleteOne:function(){//取消删除一条
           $(".releaseDelete").hide();
      },batchDeleting:function(){//批量删除
           var list=this.selectionChangeList;
            var addList=[];
            var that=this;
            list.forEach(function(item){
                addList.push(item.pkId)
            })
            this.postMessage("/AnnounceManage/deleteAnnounceList",{"idList":addList}).done(function(res){
                   that.queryList(that.currentPage,that.outLineText);
                   $(".releaseSuccess").disappear({hide:true,text:"批量删除成功"}) 
                   $(".batchDeleting").hide();
            })
      },cancelBatchDeleting:function(){//取消批量删除
            $(".batchDeleting").hide();
      },
      editClick:function(pkId){
            location.href="editorialBulletin?pkId="+pkId+"";
         },
       revoke:function(pkId){//撤销
          var that=this;
          var obj={pkId:pkId,dataStatus:0}
           this.postMessage("/AnnounceManage/editAnnounce",obj).done(function(res){
                  var data=res.data;
                  if(data){
                      that.queryList(that.currentPage,that.outLineText); 
                      $(".releaseSuccess").disappear({hide:true,text:"撤销成功"})
                  }else{
                      $(".releaseFail").disappear({hide:true,text:"撤销失败，请稍后重试！"})
                  }        
            })

       },release:function(pkId){//发布
            var that=this;
            var obj={pkId:pkId,dataStatus:1};
            this.postMessage("/AnnounceManage/publishAnnounce",obj).done(function(res){
                  var data=res.data;
                  if(data){
                     that.queryList(that.currentPage,that.outLineText); 
                      $(".releaseSuccess").disappear({hide:true,text:"发布成功"})
                  }else{
                      $(".releaseFail").disappear({hide:true,text:"发布失败，请稍后重试！"})
                  }        
            })
       },oneSetTop:function(pkId){//置顶
           var that=this;
           var obj={pkId:pkId,top:1};
           this.postMessage("/AnnounceManage/editAnnounce",obj).done(function(res){
                  var data=res.data;
                  if(data){
                      that.queryList(that.currentPage,that.outLineText);  
                      $(".releaseSuccess").disappear({hide:true,text:"置顶成功"})
                  }else{
                      $(".releaseFail").disappear({hide:true,text:"置顶失败，请稍后重试！"})
                  }        
            })
       },cancelOneSetTop:function(pkId){//取消置顶
          var that=this;
           var obj={pkId:pkId,top:0};
           this.postMessage("/AnnounceManage/editAnnounce",obj).done(function(res){
                  var data=res.data;
                  if(data){
                      that.queryList(that.currentPage,that.outLineText); 
                      $(".releaseSuccess").disappear({hide:true,text:"取消置顶成功"})
                  }else{
                      $(".releaseFail").disappear({hide:true,text:"取消置顶失败，请稍后重试！"})
                  }        
            })
       },batchPlacement:function(){//批量置顶
            var list=this.selectionChangeList;
            var addList=[];
            var that=this;
            list.forEach(function(item){
                addList.push(item.pkId)
            });
            this.postMessage("/AnnounceManage/batchTopping",{"idList":addList,top:1}).done(function(res){
                   $(".releaseSuccess").disappear({hide:true,text:"置顶成功"})
                   that.queryList(that.currentPage,that.outLineText); 
            }) 
       },batchCancellation:function(){//批量取消置顶
            var list=this.selectionChangeList;
            var addList=[];
            var that=this;
            list.forEach(function(item){
                addList.push(item.pkId)
            });
            this.postMessage("/AnnounceManage/batchTopping",{"idList":addList,top:0}).done(function(res){
                   $(".releaseSuccess").disappear({hide:true,text:"取消置顶成功"})
                   that.queryList(that.currentPage,that.outLineText);   
            })
       },expiredateFun:expiredateFun,
       expiredateFun2:expiredateFun2
       ,timeEnd:function(date){
        var datc = new Date(new Date(date).getTime()+24*60*60*1000-1);
            this.formData.timeEnd=datc;
      },headerDragend:function(newWidth){
          $(".cellAll").width(newWidth-30)
      },sortChange:function(){
            this.$nextTick(function(){
                  $(".operation").each(function(index,obj){
                      spanChild=$(obj).children().children("span").last();
                      txt=spanChild.text().replace(/[\|+|\s+]/g,'');
                      spanChild.html("<strong>"+txt+"</strong>");
                   })
               })
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


function expiredateFun(date){
     var nowDate=new Date().getTime();
     if(date){
        return date > nowDate ? true : false;
     } 
}

function expiredateFun2(date){
     var nowDate=new Date().getTime();
     if(date){
        return date < nowDate ? true : false;
     } 
}


