
var vm=new Vue({
		el:"#survey",
    components:{smccFooter:smccFooter},
		data:{
      href:location.href,
			subcategory:false,//子类别显示
      nowDate:false,
      nowDate2:false,
      nowDate3:false,
      nowDate4:false,
      categoryOne:true,
      nowPage:false,
			totalStart:1,//总页数
			totalEnd:15,
			totalCount:0,//总条数
      currentPage:1,//当前页
      genreList:[],//类别列表
      findChildList:[],//子类别列表
			noticeList:[],//安全公告列表
			categoryArray:[{"categoryKey":"全部",active:true},{"categoryKey":"周",active:false},{"categoryKey":"月",active:false},{"categoryKey":"年",active:false}],
			formData:{
               bulletinName:'', //公告名称
               timeStart:'', //发布时间
               timeEnd:'', //发布时间
               category:'', //类别
               subcategory:'', //子类别
               keyword:'' //关键字'
            },
     pickerOptions0:{
              disabledDate:function(time) {
                 return  time.getTime() < new Date(vm.formData.timeStart).getTime();
               }
          }      
		},
		mounted:function(){
        $(".categoryArray li").click(function(){
            $(this).addClass("active").siblings().removeClass("active");
        })
			  this.getBulletinlist();
			  this.getCategoryDetails();
			  this.getLookThroughTop5();
			  this.getAppendixDownloadTop5();
        this.findCategory();//查找类别
        //var jump=document.querySelector(".el-pagination__jump").firstChild
            //jump.nodeValue="跳到"
		},
		methods:{
			advancedQuery:function(){
                 this.subcategory=!this.subcategory;
                 if(!this.subcategory){
                   this.formData.keyword='';
                 }
			},
			transformDate:transformDate,
			newState:newState,
			categoryList:function(item){
				  this.categoryArray.forEach(function(item){
                       item.active=false;
				  })
				  item.active=true;
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
            cache:false,
				 	  type: "POST",
		              datType: "JSON",
		              contentType: "application/json;charset=utf-8",
		              data:JSON.stringify(data)
				  }) 
			},getMessage:function(url){
				 return $.ajax({
				 	  url:url,
            cache:false,
				 	  type: "GET",
		              datType: "JSON"
				  }) 
			},
      query:function(){//查询
          this.getBulletinlist(null,true)
      },
			getBulletinlist:function(currPage,query){//返回公告列表
				  var that=this;
          var currPage = currPage || 1;
          var obj={
                noticeName:$.trim(this.formData.bulletinName) || '',
                publishDate1:this.formData.timeStart || '',
                publishDate2:this.formData.timeEnd || '',
                noticeParentCategoryID:this.formData.category || '',
                noticeChildCategoryID:this.formData.subcategory || '',
                keyword:$.trim(this.formData.keyword )|| '',
                dataStatus:1,
                pageSize:20,
                currPage:currPage
           }
           this.postMessage("/AnnounceManage/findAnnounceByOthers",obj).done(function(res){
               var list=res.data.list;
               if(list.length>0){
                 that.noticeList=list;
                 that.totalCount=res.data.totalCount; 
                 that.nowPage=true;
                 that.nowDate4=false;
                 if(query){
                    that.currentPage=1;
                 } 
               }else{
                 that.noticeList=[];
                 that.nowDate4=true; 
                 that.nowPage=false;
               }  
         })
			},
      currentChange:function(page){//分页
            this.currentPage=page;
            this.getBulletinlist(page);
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
      },
      subcategoryEvent:function(val){
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
			getCategoryDetails:function(str){//安全类别详情
                var str=  str || '';
                var that=this;
                  this.getMessage("/AnnounceManage/getCategoryDetails?flag="+str+"").done(function(res){
                 	   var data=res.data;
                     if(data.length>0){
                         that.nowDate=false;
                         categoryOneOption(data,str);
                     }else{
                          that.nowDate=true;  
                     }
                 	   
                 })
			},

			getLookThroughTop5:function(){//返回浏览top5
                 var that=this;
                 this.getMessage("/AnnounceManage/getLookThroughTop5").done(function(res){
                 	   var data=res.data;
                     if(data.length>0){
                         categoryTwoOption(data);   
                     }else{
                          that.nowDate2=true;
                     }
                 })
			},
			getAppendixDownloadTop5:function(){//返回下载次数top5
                  var that=this;
                 this.getMessage("/AnnounceManage/getAppendixDownloadTop5").done(function(res){
                 	   var data=res.data;
                     if(data.length>0){
                       categoryThreeOption(data);
                       that.nowDate3=false;
                     }else{
                      that.nowDate3=true;
                     }  
                 })
			},timeEnd:function(date){
        var datc = new Date(new Date(date).getTime()+24*60*60*1000-1);
            this.formData.timeEnd=datc;
      },jiequ:jiequ
		}
	})

function categoryOneOption(data,flag){
  //echarts.dispose(document.getElementById('categoryOne'));
  var keyArr=[];
  var valArr=[];
  data.forEach(function(res){
       keyArr.push(res.noteCategoryName);
       valArr.push({value:res.categotyCount,name:res.noteCategoryName,prantId:res.noticeParentCategoryID,flag:flag})
  })
	var categoryOne = echarts.init(document.getElementById('categoryOne'));//安全公告类别统计
	var option = {
 	
  tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} "
    },legend: {
        orient: 'vertical',
        right:10,
        data:keyArr
    },
    color:["#60b053","#ff9933","#028bff","#50e3c2"],
    series: [
        {
            name:'统计情况',
            type:'pie',
            radius: ['50%', '65%'],
            center:['50%', '58%'],
            avoidLabelOverlap: false,
            label: {
               show:true,
               color:"#000"
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data:valArr
        }
    ]
};
categoryOne.setOption(option);
categoryOne.on("click",function(param){
      var prantId=param.data.prantId;
      var name=param.data.name;
      var flag=param.data.flag;
      location.href="bulletinList?categoryID="+prantId+"&flag="+flag;
})
}


function categoryTwoOption(data){
   var nameArr=[];
   var valArr=[];
   data.forEach(function(res){
       nameArr.push(intercept(res.noticename))
       valArr.push({value:res.viewcount ? res.viewcount : 0 ,pkId:res.pkId,noticename:res.noticename})
   })
   var categoryTwo = echarts.init(document.getElementById('categoryTwo'));//浏览次数top5
   var option = {
	
  tooltip : {
        trigger: 'axis',
        position:function (pos, params, dom, rect, size) {
          var obj = {top: 60};
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
       },
        formatter:function(params){
        var result = '';
        params.forEach(function (item) {
        result += item.data.noticename + "</br><span style=\"display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#61b154;\"></span>" + item.seriesName + " : " + item.value +"</br>";
     });
    return result;
        },
        axisPointer : {            
            type : 'shadow'     
        }
    },
    xAxis: {
        type: 'category',
        axisLabel:{
        	margin:0,
        	padding:[10,0,0,20],
        	rotate:40
        },
        data: nameArr
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name:"浏览次数",
        data: valArr,
        type: 'bar',
        itemStyle:{
        	color:new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                    [
                        {offset: 0, color: '#c4f9a0'},   
                        {offset: 1, color: '#61b154'}
                    ]
                 )
        }
    }]
};
categoryTwo.setOption(option);
categoryTwo.on("click",function(param){
       var pkId=param.data.pkId;
       var noticename=param.data.noticename;
       var href=location.href;
       location.href="announcementDetails?pkId="+pkId+"&href="+href;
})

}


function categoryThreeOption(data){
   var nameArr=[];
   var valArr=[];
   data.forEach(function(res){
       nameArr.push(intercept(res.noticename))
       valArr.push({value:res.downloadcount ? res.downloadcount : 0 ,pkId:res.pkId,noticename:res.noticename})
   })
   var categoryThree = echarts.init(document.getElementById('categoryThree'));//下载次数Top5
	 var option = {
  tooltip : {
        trigger: 'axis',
        position:function (pos, params, dom, rect, size) {
          var obj = {top: 60};
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
       },
         formatter:function(params){
        var result = '';
        params.forEach(function (item) {
        result += item.data.noticename + "</br><span style=\"display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4097e0;\"></span>" + item.seriesName + " : " + item.value +"</br>";
          });
           return result;
        },
        axisPointer : {            
            type : 'shadow'     
        }
    },
 	color:["#53a3e5"],
    xAxis: {
        type: 'category',
        axisLabel:{
        	 margin:0,
        	padding:[10,0,0,20],
        	rotate:40
        },
        data: nameArr
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name:"下载次数",
        data: valArr,
        type: 'bar',
        itemStyle:{
        	color:new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                    [
                        {offset: 0, color: '#8bc5f6'},   
                        {offset: 1, color: '#4097e0'}
                    ]
                 )
        }
    }]
};
categoryThree.setOption(option);
categoryThree.on("click",function(param){
       var pkId=param.data.pkId;
       var noticename=param.data.noticename;
       var href=location.href;
       location.href="announcementDetails?pkId="+pkId+"&href="+href;
})
}


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

function newState(publishdate){
	   var publishdateDate=new Date(publishdate+7 * 24 * 3600 * 1000).getTime();
     var nowDate=new Date().getTime();
     return publishdateDate > nowDate ? true : false;
}


function intercept(str){
    if(str.length>6){
       return str.slice(0,6)+"...";  
    }else{
       return str;
    } 
}


function jiequ(str){
     if(str.length>30){
        return str.slice(0,30)+"..." 
     }else{
        return str; 
     }
}
