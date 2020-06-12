var vm=new Vue({
        el:"#announcementDetails",
        components:{smccFooter:smccFooter},
        data:{
        	  contObj:{},
            viewcountNumber:0,//浏览次数
            downloadsNumber:0,//下载次数
            href:''
        },
        mounted:function(){
            var href=getQueryVariable("href");
            this.href=href;
            this.findAnnounceById();
        },
        methods:{
        	 transformDate:transformDate,
             findAnnounceById:function(){
                   var pkId=getQueryVariable("pkId");
                   var that=this;
                   $.ajax({
				 	  url:"/AnnounceManage/findAnnounceById?pkId="+pkId+"",
				 	  type: "GET",
		              datType: "JSON"
				  }).done(function(res){
                        var data=res.data;
                        that.viewcountNumber=!data.viewcount ? 0 : data.viewcount;
                        that.downloadsNumber=!data.downloadcount ? 0 : data.downloadcount;
                        that.contObj=data;
                        that.viewcountUpdate(that.viewcountNumber+=1);
				  })
             },viewcountUpdate:function(browsingNumber){
                  var pkId=getQueryVariable("pkId");
                  var that=this;
                  var obj={
                       pkId:pkId,
                       viewcount:this.viewcountNumber
                  }
                  $.ajax({
                  url:"/AnnounceManage/editAnnounce",
                  data:JSON.stringify(obj),
                  type: "POST",
                  datType: "JSON",
                  contentType: "application/json;charset=utf-8",
                  }).done(function(res){
                       console.log("成功")
                  })
             },downloadUpdate:function(){
                var pkId=getQueryVariable("pkId");
                var that=this;
                var obj={
                       pkId:pkId,
                       downloadcount:this.downloadsNumber+=1
                  }
                 $.ajax({
                  url:"/AnnounceManage/editAnnounce",
                  data:JSON.stringify(obj),
                  type: "POST",
                  datType: "JSON",
                  contentType: "application/json;charset=utf-8",
                  }).done(function(res){
                       console.log("成功")
                  })
             },callBackHref:function(){
                 if(this.href){
                    location.href=this.href;
                 }else{
                    history.go(-1)
                 }
             } 
        }
    })


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

vm.$nextTick(function(){
    $(".detailsContTop").css({minHeight:$(window).height()-535})
})
