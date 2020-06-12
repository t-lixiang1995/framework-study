$(function(){
  new Vue({
    el: '#app',
    data: function() {
      return { 
        tabPosition: 'right',
        activeIndex: '2',
        activeName: 'first',
        projectName:false,
        portalPermissionsList:[],
        ruleForm: {
          name: '',
          pid: '',
          email: '',
          phone: '',
          work:'',
          play: '',
          project:''
        },
        ruleForm1: {
          name: '',
          email: '',
          phone: '',
        },
        // 代理人中 申请人信息
        ruleForm2: [{
          project: '',
          pid: '',
          work:'',
          play: '',
          proposerName: '',
          disabled:true
        }],
        //申请人规格
        rules: {
          name: [
            { required: true, message: '请输入申请人姓名', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入正确格式电话',trigger: 'blur'},
            { type: 'number', message: '电话必须为数字值',trigger: 'blur'},
            { validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入电话'));
                } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
                  callback(new Error('手机号码有误，请重填'));
                } else {
                  callback();
                } 
              }, trigger: 'blur'
            }
          ],
          email:
            [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          pid: [
            { required: true, message: '请输入统一身份账号', trigger: 'blur' },
          ],
          work: [
            { required: true, message: '请选择业务', trigger: 'change' }
          ],
          play: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
          project:[
            { required: false, message: '请输入项目名称', trigger: 'blur' }
          ]
        },
        // 代理人规则
        rules1: {
          name: [
            { required: true, message: '请输入代理人姓名', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入正确格式电话',trigger: 'blur'},
            { type: 'number', message: '电话必须为数字值',trigger: 'blur'},
            { validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入电话'));
              } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
                callback(new Error('手机号码有误，请重填'));
              } else {
                callback();
              } 
            }, trigger: 'blur'
          }
          ],
          email:
           [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        },
        SmccGetData: null, 
        submitData:'',
        restaurants:[],
        // footer类目
        noticeData:{
          data:{
            list:[]
          }
        },
        contact: ['电话 010-1234567','商业合作','违规投诉'],
        server: ['日志审计', '安全管控', '安全检测', '应急响应'],
        hcontent: ['帮助文档', '开放API', '常见问题'],
        isable:true,
        tipPop:false,
        tipPopMes:'',
        tdHasSame:false,
        submitFeed:false
      }
    },
    created:function(){
      this.reqFootNotice()
    },
    methods: {
      FnSetParam:function(param){
        if(this.SmccGetData == 'submit'){
          param["portalPermissionsList"] = this.portalPermissionsList;
        }else if(this.SmccGetData == 'projectname'){
          param["projectName"] = this.ruleForm.project;
        }else if(this.SmccGetData == 'notice'){
          param["pageSize"] = 6;
          param["currPage"] = 1;
        }
        return param
      },
      FnPostData:FnPostData,	
      FnGetData:FnGetData,
      reqSubmit:function(){
        this.SmccGetData = 'submit';
        this.FnPostData('/PortalPermissions/startApi','submitData');
      },
      submitForm:function(formName){
        var  that = this;
        this.$refs[formName].validate((valid) => {
          if(that.ruleForm.play=='项目成员' && that.ruleForm.project ==''){
            $(".projectname input").addClass('red');
            $(".project_error").show();
          }
          if (valid) {
            if(that.activeName == 'first'){
              that.portalPermissionsList=[];
              var json={}
              json.proposerName = that.ruleForm.name;
              json.proposerNumber =  that.ruleForm.phone;
              json.proposerMail =  that.ruleForm.email;
              json.ssoUID =  that.ruleForm.pid;
              json.business =  that.ruleForm.work;
              json.role =  that.ruleForm.play;
              json.projectName =  that.ruleForm.project;
              json.identity = 1;
              that.portalPermissionsList.push(json);
              if(that.ruleForm.play!='项目成员' || that.ruleForm.play=='项目成员' && that.ruleForm.project !=''){
                $(".projectname input").removeClass('red');
                that.reqSubmit();
              }
            }else if(that.activeName == 'second'){
              //比较 统一身份账号-角色个字段是否全相等
              if(that.ruleForm2.length>1){
                for(var i=0 ;i<that.ruleForm2.length;i++){
                  for(var j=i+1 ;j<that.ruleForm2.length;j++){
                    if(that.ruleForm2[i].pid == that.ruleForm2[j].pid){
                      if(that.ruleForm2[i].work == that.ruleForm2[j].work){
                        if(that.ruleForm2[i].play == that.ruleForm2[j].play){
                          that.tipPop = true;
                          that.tipPopMes = that.ruleForm2[i].name;
                          $(".el-table__body tr").eq(j).find(".el-input__inner").css('borderColor', 'red');
                          that.tdHasSame = true;
                        }
                      }
                    }
                  }
                }
              }
              that.ruleForm2.forEach(function(val,index){
                that.portalPermissionsList=[];
                var json = {};
                json.agentName = that.ruleForm1.name;
                json.agentNumber = that.ruleForm1.phone;
                json.agentMail = that.ruleForm1.email;
                json.proposerName = val.proposerName;
                json.ssoUID = val.pid;
                json.business =  val.work;
                json.role = val.play;
                json.identity = 2;
                if(!val.disabled){
                  json.projectName = val.project;
                }
                if(val.proposerName && val.pid && val.work && val.play){
                  if($.trim(val.play)!='项目成员' || ($.trim(val.play)=='项目成员' && $.trim(val.project) !='' && !that.tdHasSame)){
                    that.portalPermissionsList.push(json)
                  }
                }else{
                  $('.table4 input').each(function(i,v){
                    if($.trim($(v).val()) == ''){
                      $('.table4 input').eq(i).css('borderColor', 'red');
                      $(".error").eq(i).show();
                      if(!val.disabled){
                        $(".project_error2").eq(i).show();
                      }else{
                        $(".project_error2").eq(i).hide();
                      }
                    }
                  })
                }
              })
              if(that.portalPermissionsList.length!=0){
                that.reqSubmit();
              }
            }
          } else {
            if(that.activeName == 'second'){
              $('.table4 input').each(function(i,v){
                if($.trim($(v).val()) == ''){
                  $('.table4 input').eq(i).css('borderColor', 'red');
                  $(".error").eq(i).show();
                }
              })
            }
            return false;
          }
        });
      },
      reqAllProject:function(){
        this.SmccGetData = 'projectname';
        this.FnGetData('/PortalPermissions/findVagueProjectName', 'restaurants');
      },
      querySearch:function(queryString, cb) {
        var restaurants = this.restaurants.data;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : projectData;
        results.forEach(function(val,index){
          val.value = val.projectName;
          results.splice(index,1,val);
        })
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter:function(queryString) {
        return (restaurant) => {
          return (restaurant.projectName.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
      },
      handleSelect:function(item) {
        console.log(item);
      },
      blurs:function(event){
        setTimeout(function(){
          if($.trim(event.target.value) == ''){
            event.target.style.borderColor = 'red';
          }else{
            event.target.style.borderColor = '#cecece';
            $(event.target).parents("td").find(".error").hide();
          }
        },300)
      },
      addMore:function(){
        this.ruleForm2.push({rank:1})
      },
      deleteRow:function(index, rows) {
        rows.splice(index, 1);
        $('.table4 input').each(function(i,v){
            $(v).css('borderColor', '#cecece');
        })
      },
      projectnameBlur:function(){
        if(this.ruleForm.project!=''){
          $(".projectname input").removeClass('red');
          $(".project_error").hide();
        }
      },
      //底部公告
      reqFootNotice:function(){
        this.SmccGetData = 'notice';
        this.FnPostData('/AnnounceManage/findQueryList','noticeData');
      }
    },
    watch:{
      ruleForm:{
        handler:function(val) {  
          if(val.play == '项目成员'){
            this.projectName = true;
          }else{
            this.projectName = false;
          }
          if(val.project){
            this.reqAllProject();
          }
        },
        deep: true    
      },
      ruleForm2:{
        handler:function(val) {  
          var that = this
          val.forEach(function(value,index){
            if(value.play == '项目成员'){
              value.disabled = false;
              $(".project_error2").eq(index).show();
            }else{
              value.disabled = true;
            }
            if(value.project){
              that.reqAllProject();
            }
          })
        },
        deep: true    
      },
      submitData:function(val){
        if(val.msg=='成功'){
          this.submitFeed = true;
					setTimeout(function(){
            window.location.href = 'http://usmg.smcc.sinopec.com:8092/portal';
					},3000)
        }
      }
    }
  })
})