var vm=new Vue({
        el:"#managementDetails",
        components:{smccFooter:smccFooter},
        data:{
            contObj:{}
        },
        mounted:function(){
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
                        that.contObj=data;
          })
             },loadFile:function(fileId){
               $.ajax({
                  url:"/sebl/seblfile/downMongoFile?id="+fileId+"",
                  type: "GET",
                 datType: "JSON"
               }).done(function(res){
                   console.log("下载成功")
               })
             },expiredateFun:expiredateFun
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

function expiredateFun(date){
     var nowDate=new Date().getTime();
     return date > nowDate ? true : false;
}

