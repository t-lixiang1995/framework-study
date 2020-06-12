var vm=new Vue({
        el:"#editorialBulletin",
        components:{smccFooter:smccFooter},
        data:{
          dialogVisible:false,
          beOverdueBool:false,
          downIforme:false,//类别显示
          downIformeSubcategory:false,//子类别显示
          showName:false,//显示公告错误提示
          showKeyWord:false,//显示关键字错误
          showCategory:false,//显示类别错误
          showSubcategory:false,//显示子类别错误
          showCont:false,//显示内容错误提示
          showDate:1,
          showDateBtn:true,
          showDateErr:false,//显示日期错误提示
          notExpire:true,
          expire:false,
          preservationBtn:true,//启动发布按钮
          preservationSelect:false,//启动发布按钮样式
          timgGif:false,//加载动画
          ruleForm: {
          bulletinName: '',
          Keyword:'',
          category:'',
          categoryNmuber:0,
          subcategory:'',
          subcategoryNmuber:0,
          date:''
        },
        rules:{
             bulletinName: [
              { required: true, message: '请输入公告名称', trigger: 'blur' },
             ],category: [
              { required: true, message: '请选择类别', trigger: 'change' }
             ],subcategory: [
              { required: true, message: '请选择子类别', trigger: 'change' }
             ],date:[
                {required:false, message: '请选择日期', trigger: 'change' }
              ]
        },
        overdue:'',
        genreList:[],
        findChildList:[],
        fileList: [],
        filterArray:[],//过滤上传数组
        filterSize:0,
        filterTure:false,
        cancellationState:false,
        loading:false,//上传状态
        filterBtnTxt:"上传",
        placehText:"",
        previewObj:{},
        releaseId:0,
        fkContactId:'',//文件id
        timer:null,
        fileName1:'',
        fileName2:'',
        fileName3:'',
        fileId1:'',
        fileId2:'',
        fileId3:'',
        fileArrList1:'',
        fileArrList2:'',
        fileArrList3:'',
        attach1fileadress:'',
        attach2fileadress:'',
        attach3fileadress:'',
        pkId:'',
        selectDate:"请选择日期"
        },
        mounted:function(){
            var that=this;
          var ue = UE.getEditor('myEditor',{
                toolbars: [['undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|','touppercase', 'tolowercase', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts'
           
        ]],elementPathEnabled:false,
        wordCount:false,
        autoHeightEnabled:false
            });
            ue.addListener('blur',function(editor){
                 var text=ue.getContent();
                 if(!text){
                     that.showCont=true;
                  }else{
                     that.showCont=false;
                   } 
            });

             ue.addListener('contentChange',function(editor){
                   that.cancellationState=true;
            }); 

             this.getCategory()//初始化查询类别
             this.getNotice(getQueryVariable("pkId"))//初始化公告
        },
        methods:{
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
           upLoad:function(){
                $(".fileBtn").click();
           },
           fileBtn1:function(){
               var fileBtn=$(".fileBtn1")[0].files[0];
               var size=(fileBtn.size/1024/1024).toFixed(2);
               var name=fileBtn.name;
               var that=this;
               this.fileArrList1=name;
               if(this.fileArrList1 && this.fileArrList2){
                    if(this.fileArrList1==this.fileArrList2){
                         $(".releaseFail").disappear({
                            text:"文件重复",
                            hide:true,
                            speed:1000
                          })
                         this.fileArrList1='';
                         return false;
                    }
               }
               if(this.fileArrList1 && this.fileArrList3){
                    if(this.fileArrList1==this.fileArrList3){
                         $(".releaseFail").disappear({
                            text:"文件重复",
                            hide:true,
                            speed:1000
                          })
                         this.fileArrList1='';
                         return false;
                    }
               }
               
               if(this.fileId1){//此时id已经存在了
                 this.getMessage("/sebl/seblfile/deleteMongoFile?fileId="+this.fileId1).done(function(res){
                       this.fileId1='';
                 })
               }
               
               if(size>30){
                     this.fileArrList1='';
                     $(".fileBtn1").val('');
                    $(".releaseFail").disappear({
                            text:"上传失败,文件过大",
                            hide:true,
                            speed:1000
                   })
               }else{

                   if(fileBtn.name.match(/^.+(\.docx|\.doc|\.xls|\.xlsx|\.pdf|\.zip|\.rar|\.sep)$/i)){
                              var formData = new FormData();
                       formData.append("file",fileBtn);
                        //this.timgGif=true;
                        $(".loadCenter").show();
                        that.loading=true;
                       $.ajax({
                         url: '/sebl/seblfile/fileSingleUpload',
                         type: 'POST',
                         data: formData,
                         cache: false,
                         processData: false,
                         contentType: false
                       }).done(function(res) { 
                          var data=res.data;
                          that.fileName1=data.fileName;
                          that.fileId1=data.id;
                          that.attach1fileadress=data.fileAddress;
                          that.cancellationState=true;
                          $(".fileBtn1").val('');
                           //that.timgGif=false;
                           $(".loadCenter").hide();
                           that.loading=false;
                          $(".releaseSuccess").disappear({
                             text:"上传成功",
                             hide:true,
                             speed:1000
                          });
                       }).fail(function(res) {
                         $(".releaseFail").disappear({
                        text:"上传失败,文件过大",
                        hide:true,
                        speed:1000
                         })
                         $(".fileBtn1").val('');
                         //that.timgGif=false;
                         $(".loadCenter").hide();
                         that.loading=false;
                       });
                     }else{
                         this.fileArrList1='';
                         $(".fileBtn1").val('');
                        $(".releaseFail").disappear({
                        text:"上传失败,格式不正确",
                        hide:true,
                        speed:1000
                         })
                     }
               }             
          },
          fileBtn2:function(){
            var fileBtn=$(".fileBtn2")[0].files[0];
            var size=(fileBtn.size/1024/1024).toFixed(2);
            var name=fileBtn.name;
            var that=this;
               this.fileArrList2=name;
               if(this.fileArrList1 && this.fileArrList2){
                    if(this.fileArrList1==this.fileArrList2){
                         $(".releaseFail").disappear({
                            text:"文件重复",
                            hide:true,
                            speed:1000
                          })
                         this.fileArrList2='';
                         return false;
                    }
               }
               if(this.fileArrList2 && this.fileArrList3){
                    if(this.fileArrList2==this.fileArrList3){
                         $(".releaseFail").disappear({
                            text:"文件重复",
                            hide:true,
                            speed:1000
                          })
                         this.fileArrList2='';
                         return false;
                    }
               }
               
               if(this.fileId2){//此时id已经存在了
                 this.getMessage("/sebl/seblfile/deleteMongoFile?fileId="+this.fileId2).done(function(res){
                       this.fileId2='';
                 })
               }

               if(size>30){
                   this.fileArrList2='';
                   $(".fileBtn2").val('');
                     $(".releaseFail").disappear({
                            text:"上传失败,文件过大",
                            hide:true,
                            speed:1000
                   })
               }else{

                 if(fileBtn.name.match(/^.+(\.docx|\.doc|\.xls|\.xlsx|\.pdf|\.zip|\.rar|\.sep)$/i)){
                             var formData = new FormData();
                       formData.append("file",fileBtn);
                       //this.timgGif=true;
                       $(".loadCenter").show();
                       that.loading=true;
                       $.ajax({
                         url: '/sebl/seblfile/fileSingleUpload',
                         type: 'POST',
                         data: formData,
                         cache: false,
                         processData: false,
                         contentType: false
                       }).done(function(res) { 
                          var data=res.data;
                          that.fileName2=data.fileName;
                          that.fileId2=data.id;
                          that.attach2fileadress=data.fileAddress;
                          that.cancellationState=true;
                          //that.timgGif=false;
                          $(".loadCenter").hide();
                          that.loading=false;
                          $(".fileBtn2").val('');
                           $(".releaseSuccess").disappear({
                             text:"上传成功",
                             hide:true,
                             speed:1000
                          });
                       }).fail(function(res) {
                         $(".releaseFail").disappear({
                        text:"上传失败,文件过大",
                        hide:true,
                        speed:1000
                         })
                          $(".fileBtn2").val('');
                         //that.timgGif=false;
                         $(".loadCenter").hide();
                         that.loading=false;
                       });
                     }else{
                         this.fileArrList2='';
                         $(".fileBtn2").val('');
                           $(".releaseFail").disappear({
                        text:"上传失败,格式不正确",
                        hide:true,
                        speed:1000
                        })
                     }
               }
                     
                       
          },
          fileBtn3:function(){
            var fileBtn=$(".fileBtn3")[0].files[0];
            var size=(fileBtn.size/1024/1024).toFixed(2);
            var name=fileBtn.name;
            var that=this;
               this.fileArrList3=name;
               if(this.fileArrList1 && this.fileArrList3){
                    if(this.fileArrList1==this.fileArrList3){
                         $(".releaseFail").disappear({
                            text:"文件重复",
                            hide:true,
                            speed:1000
                          })
                         this.fileArrList3='';
                         return false;
                    }
               }
               if(this.fileArrList2 && this.fileArrList3){
                    if(this.fileArrList2==this.fileArrList3){
                         $(".releaseFail").disappear({
                            text:"文件重复",
                            hide:true,
                            speed:1000
                          })
                         this.fileArrList3='';
                         return false;
                    }
               }
               
               if(this.fileId3){//此时id已经存在了
                 this.getMessage("/sebl/seblfile/deleteMongoFile?fileId="+this.fileId3).done(function(res){
                       this.fileId3='';
                 })
               }

               if(size>30){
                    this.fileArrList3='';
                    $(".fileBtn3").val('');
                    $(".releaseFail").disappear({
                            text:"上传失败,文件过大",
                            hide:true,
                            speed:1000
                   }) 
               }else{

                  if(fileBtn.name.match(/^.+(\.docx|\.doc|\.xls|\.xlsx|\.pdf|\.zip|\.rar|\.sep)$/i)){
                             var formData = new FormData();
                       formData.append("file",fileBtn);
                       //this.timgGif=true;
                       $(".loadCenter").show();
                       that.loading=true;
                       $.ajax({
                         url: '/sebl/seblfile/fileSingleUpload',
                         type: 'POST',
                         data: formData,
                         cache: false,
                         processData: false,
                         contentType: false
                       }).done(function(res) { 
                          var data=res.data;
                          that.fileName3=data.fileName;
                          that.fileId3=data.id;
                          that.attach3fileadress=data.fileAddress;
                          that.cancellationState=true;
                          //that.timgGif=false;
                          $(".loadCenter").hide();
                          that.loading=false;
                          $(".fileBtn3").val('');
                           $(".releaseSuccess").disappear({
                             text:"上传成功",
                             hide:true,
                             speed:1000
                          });
                       }).fail(function(res) {
                         $(".releaseFail").disappear({
                        text:"上传失败,文件过大",
                        hide:true,
                        speed:1000
                         })
                         $(".fileBtn3").val('');
                         //that.timgGif=false;
                         $(".loadCenter").hide();
                         that.loading=false;
                       });
                     }else{
                        this.fileArrList3='';
                        $(".fileBtn3").val('');
                        $(".releaseFail").disappear({
                        text:"上传失败,格式不正确",
                        hide:true,
                        speed:1000
                         })
                     }
               }            
          },
      findCategoryEvent:function(id,val){
          this.findChildCategory(id,val);
      },
      findChildCategory:function(id,val){//查询所有子类别
            var that=this;
            var val= val || '';
            var id= id || '';
            this.getMessage("/AnnounceManage/findVagueChildCategory?categoryID="+id+"&childCategory="+val+"").done(function(res){
                     var data=res.data;
                     that.findChildList=data;
                 })
      },
           beOverdue:function(){//过期状态
               if(this.notExpire){
                  this.cancellationState=true;
               }
               this.beOverdueBool=true;
               this.expire=true;
               this.notExpire=false;
               this.showDate=0;
               this.rules.date[0].required=true;
           },
           noOverdue:function(){//不过期
              if(this.expire){
                  this.cancellationState=true;
               }
               this.beOverdueBool=false;
               this.expire=false;
               this.notExpire=true;
               this.showDate=1;
               this.showDateErr=false;
               this.rules.date[0].required=false;
           },cancelTanc:function(){//取消弹窗
                if(this.cancellationState){
                    $(".determine").disappear()
                }else{
                   location.href="managementList"; 
                }  
           },cancelBtn:function(){//取消弹窗
                 $(".determine").hide()
           },sureBtn:function(){//确定去取消弹窗
                 location.href="managementList";
           },preview:function(){//预览
               this.dialogVisible=true;
           },dialogVisibleRemove:function(){
               this.dialogVisible=false;
           },releaseData:function(){//发布
                 var releaseId=this.pkId;
                 if(this.loading){
                     $(".preventText").text("发布");
                     $(".prevent").disappear();
                  }else{
                 this.postMessage("/AnnounceManage/publishAnnounce",{pkId:releaseId,dataStatus:1}).done(function(res){
                      $(".releaseSuccess").disappear({
                                  hide:true,
                                  speed:3000,
                                  text:"成功发布",
                                  fn:function(){
                                      location.href="managementList";
                                  }
                     })
                      //location.href="managementList";
                 })
               }


           },preservation:function(ruleForm){//保存
                 var that=this;
                 var bulletinName=this.ruleForm.bulletinName;//公告名称
                 var Keyword=this.ruleForm.Keyword;//关键字
                 var categoryText=this.ruleForm.category;//类别文字
                 var subcategoryText=this.ruleForm.subcategory;//子类别文字
                 var category=this.ruleForm.categoryNmuber;//类别
                 var subcategory=this.ruleForm.subcategoryNmuber;//子类别
                 var date=this.ruleForm.date;//过期时间
                 var showDate=this.showDate;//过期状态
                 var getEditor=UE.getEditor('myEditor').getContent();//公告内容
                 var beOverdueBool=this.beOverdueBool;//过期显示
                 var fkContactId=this.fkContactId;//获取文件id 
                 var fileName1=that.fileName1//获取文件名字
                 var fileName2=that.fileName2//获取文件名字
                 var fileName3=that.fileName3//获取文件名字
                 var fileId1=that.fileId1;//获取文件id
                 var fileId2=that.fileId2;//获取文件id
                 var fileId3=that.fileId3;//获取文件id
                 var attach1=that.attach1fileadress;
                 var attach2=that.attach2fileadress;
                 var attach3=that.attach3fileadress;
                 var pkid=this.pkId;
                 var parameterObj=null;
                 if(beOverdueBool){//如果过期时间存在
                      parameterObj={noticename:bulletinName,keyword:Keyword,noticeparentcategoryid:category,
                                noticechildcategoryid:subcategory,expiredate:date,fkContactId:fkContactId,encoder:getEditor,keepshow:0,attach1filename:fileName1,attach2filename:fileName2,attach3filename:fileName3,pkId:pkid,fileid1:fileId1,fileid2:fileId2,fileid3:fileId3,attach1fileadress:attach1,attach2fileadress:attach2,attach3fileadress:attach3};
                  }else{
                      parameterObj={noticename:bulletinName,keyword:Keyword,noticeparentcategoryid:category,
                           noticechildcategoryid:subcategory,fkContactId:fkContactId,encoder:getEditor,keepshow:1,attach1filename:fileName1,attach2filename:fileName2,attach3filename:fileName3,pkId:pkid,fileid1:fileId1,fileid2:fileId2,fileid3:fileId3,attach1fileadress:attach1,attach2fileadress:attach2,attach3fileadress:attach3};
                   }

                   if(this.loading){
                       $(".preventText").text("保存");
                       $(".prevent").disappear(); 
                   }else{
                    if(!getEditor){
                       this.showCont=true;
                  }
                  this.$refs[ruleForm].validate(function(valid){
                          if(valid && getEditor){
                            that.postMessage("/AnnounceManage/editAnnounce",parameterObj).done(function(res){
                               $(".releaseSuccess").disappear({
                                  hide:true,
                                  text:"保存成功"
                                })
                               that.previewObj=res.data;
                               that.releaseId=res.data.pkId;
                               that.cancellationState=false;
                             })
                          }
                  })
                  }
           },downBtn:function(){
               this.downIforme= !this.downIforme;
           },downChange:function(val){
               this.ruleForm.categoryNmuber=val;
               this.cancellationState=true;
               this.ruleForm.subcategory='';
               this.showCategory=false;
               var label='';
               this.genreList.forEach(function(item){
                     if(val==item.categoryID){
                       label=item.noteCategoryName;
                     }
               })
               this.ruleForm.category=label;
               this.findCategoryEvent(this.ruleForm.categoryNmuber,this.ruleForm.subcategory);

           },categoryClick:function(item){
                 this.cancellationState=true;
                 this.downIformeSubcategory=false;
                 var that=this;
                 this.ruleForm.category=item.noteCategoryName;
                 this.ruleForm.categoryNmuber=item.categoryID;
                 this.ruleForm.subcategory='';
                 this.downIforme=false;
                 this.showCategory=false;
                 this.findCategoryEvent(that.ruleForm.categoryNmuber,that.ruleForm.subcategory);

           },downBtnSubcategory:function(){
            if(this.findChildList.length>0){
                   this.downIformeSubcategory= !this.downIformeSubcategory;
               }
              
           },downChangeSubcategory:function(val){
                this.ruleForm.subcategoryNmuber=val;
                this.downIformeSubcategory=true; 
                this.showSubcategory=false;
                this.cancellationState=true; 
                var label='';
                this.findChildList.forEach(function(item){
                     if(val==item.categoryID){
                       label=item.noteCategoryName;
                     }
               })
                this.ruleForm.subcategory=label;  
           },subcategoryClick:function(item){
               this.cancellationState=true
               this.ruleForm.subcategory=item.noteCategoryName;//值
               this.ruleForm.subcategoryNmuber=item.categoryID;
               this.downIformeSubcategory=false;
               this.showSubcategory=false;
               this.findCategoryEvent(this.ruleForm.categoryNmuber,this.ruleForm.subcategory);
           },categoryFocus:function(){
               this.downIforme=true;
           },subcategoryFocus:function(){
                if(this.findChildList.length>0){
                   this.downIformeSubcategory= !this.downIformeSubcategory;
               }
           },bulletinNameBlur:function(){
               if(!this.ruleForm.bulletinName){
                   this.showName=true;
               }else{
                  this.showName=false;
               }
           },KeywordBlur:function(){
                if(!this.ruleForm.Keyword){
                   this.showKeyWord=true;
               }else{
                   this.showKeyWord=false;
               }
           },categoryBlur:function(){
               if(!this.ruleForm.category){
                   this.showCategory=true;
               }else{
                   this.showCategory=false;
               } 
           },subcategoryBlur:function(){
                if(!this.ruleForm.subcategory){
                   this.showSubcategory=true;
               }else{
                   this.showSubcategory=false;
               } 
           },dateChange:function(val){
              this.cancellationState=true;
              if(!val){
                  this.placehText="选择日期";
              }
           },dataFocus:function(){
                this.ruleForm.date=''
           },removeLoadFileSing:function(id,index){
                 var that=this;
                 this.getMessage("/sebl/seblfile/deleteMongoFile?fileId="+id+"").done(function(res){
                        that.filterArray.splice(index,1);
                         $(".releaseSuccess").disappear({
                        text:"删除成功",
                        hide:true,
                        speed:1000
                   })
                 })
           },transformDate:transformDate,
           getCategory:function(){
                 var that=this;
                 this.getMessage("/AnnounceManage/findCategory").done(function(res){
                        var data=res.data; 
                        that.genreList=data;
                 }) 
           },
           getNotice:function(id){//初始化返回公告
            var that=this;
                 this.getMessage("/AnnounceManage/findAnnounceById?pkId="+id).done(function(res){
                       var data=res.data;
                       that.previewObj=data;
                       var fileName=data.attach1filename;//文件名字
                       var fileName2=data.attach2filename;//文件名2
                       var fileName3=data.attach3filename;//文件名3
                       var fileid1=data.fileid1;//文件id1
                       var fileid2=data.fileid2;//文件id2
                       var fileid3=data.fileid3;//文件id3
                       var encoder=data.encoder;//编辑内容
                       var keyword=data.keyword;//关键字
                       var noticename=data.noticename;//公告名字
                       var noticeparentcategoryid=data.noticeparentcategoryid;//类别id
                       var noticechildcategoryid=data.noticechildcategoryid;//子类别id
                       var keepshow=data.keepshow;//过期状态
                       var expiredate=data.expiredate;//过期时间
                       var fkContactId=data.fkContactId;//文件id
                       var pkId=data.pkId;
                       that.ruleForm.bulletinName=noticename;//赋值公告名字
                       that.ruleForm.Keyword=keyword;//赋值关键字
                       that.ruleForm.categoryNmuber=noticeparentcategoryid;//赋值类别id
                       that.ruleForm.subcategoryNmuber=noticechildcategoryid;//赋值子类别id
                       that.fileName1=fileName;//赋值文件名字1
                       that.fileName2=fileName2;//赋值文件名字2
                       that.fileName3=fileName3;//赋值文件名字3
                       that.fileArrList1=fileName;
                       that.fileArrList2=fileName2;
                       that.fileArrList3=fileName3;
                       that.fileId1=fileid1;//赋值文件名字id1
                       that.fileId2=fileid2;//赋值文件名字id2
                       that.fileId3=fileid3;//赋值文件名字id3
                       that.attach1fileadress=data.attach1fileadress;
                       that.attach2fileadress=data.attach2fileadress;
                       that.attach3fileadress=data.attach3fileadress;
                       that.fkContactId=fkContactId;//赋值文件关联id
                       that.pkId=pkId;//赋值公告id
                       that.ruleForm.category=data.categoryName;//赋值类别名字
                       that.ruleForm.subcategory=data.childCategoryName;//赋值子类别名字
                       that.initialization(noticeparentcategoryid);
                       if(keepshow=='1'){
                           that.notExpire=true;
                           that.beOverdueBool=false;
                           that.expire=false;
                           that.placehText='选择日期';
                       }else{
                           if(expiredate){
                           that.beOverdueBool=true;
                           that.notExpire=false;
                           that.expire=true;
                           that.ruleForm.date=new Date(expiredate);//赋值过期日期
                           that.rules.date[0].required=true;
                           }
                       }
                       setTimeout(function(){
                         UE.getEditor('myEditor').setContent(encoder);
                         that.cancellationState=false; 
                       },300);
                 })
           },enclosureBtn1:function(){
                $(".fileBtn1").click()
           },enclosureBtn2:function(){
                $(".fileBtn2").click()
           },enclosureBtn3:function(){
                $(".fileBtn3").click()
           },fileRemove1:function(){
               var that=this;
               if(this.fileId1){
                   this.getMessage("/sebl/seblfile/deleteMongoFile?fileId="+this.fileId1).done(function(res){
                        $(".releaseSuccess").disappear({
                        text:"删除文件成功",
                        hide:true,
                        speed:1000
                        })
                         that.fileName1='';
                         that.fileId1='';
                         that.fileArrList1='';
                         that.cancellationState=true;
                   })
               }else{
                   $(".releaseFail").disappear({
                        text:"请选择文件",
                        hide:true,
                        speed:1000
                   })
               }
           },fileRemove2:function(){
               var that=this;
               if(this.fileId2){
                   this.getMessage("/sebl/seblfile/deleteMongoFile?fileId="+this.fileId2).done(function(res){
                        $(".releaseSuccess").disappear({
                        text:"删除文件成功",
                        hide:true,
                        speed:1000
                        })
                         that.fileName2='';
                         that.fileId2='';
                         that.fileArrList2='';
                         that.cancellationState=true;
                   })
               }else{
                   $(".releaseFail").disappear({
                        text:"请选择文件",
                        hide:true,
                        speed:1000
                   })
               }
           },fileRemove3:function(){
               var that=this;
               if(this.fileId3){
                   this.getMessage("/sebl/seblfile/deleteMongoFile?fileId="+this.fileId3).done(function(res){
                        $(".releaseSuccess").disappear({
                        text:"删除文件成功",
                        hide:true,
                        speed:1000
                        })
                         that.fileName3='';
                         that.fileId3='';
                         that.fileArrList3='';
                         that.cancellationState=true;
                   })
               }else{
                   $(".releaseFail").disappear({
                        text:"请选择文件",
                        hide:true,
                        speed:1000
                   })
               }
           },changeState:function(val){
                this.cancellationState=true
           },initialization:function(number){
                var that=this;
                this.getMessage("/AnnounceManage/findChildCategory?categoryID="+number).
                done(function(res){
                    var data=res.data;
                    that.findChildList=data;
                })
           },loadingFun:function(){
               $(".prevent").hide();
           }
        }
    })

 
 function thanTen(num){
     return  num < 10 ? "0"+ num : num ;
}

 function transformDate(date){
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

