<template>
  <div class="login-bg">
  <div class="app-img-title"><img src="../assets/images/title_home.png" style="margin:-5px auto -10px auto"></div>
  <div class="login-body">
    <div class="login-container">
      <div class="login-form-container">
        <div class="login-form-wrapper"> 
          <form class="login-form" @submit.prevent="submitForm" >
            <div class="login-form-tt">登录系统</div>
            <div class="login-form-iptgroups">
              <div class="login-form-iptgroup">
                <label class="login-form-label" for="ipt1"><i class="icon_login_user"></i></label>
                <span class="login-form-iptwrap"><input id="ipt1" type="text" name="j_username" v-model="j_username" placeholder="用户名"></span>
              </div>
              <div class="login-form-iptgroup">
                <label class="login-form-label" for="ipt2"><i class="icon_login_password"></i></label>
                <span class="login-form-iptwrap"><input id="ipt2" type="password" name="j_password" v-model="j_password" placeholder="密码"></span>
              </div>
              <div class="login-form-iptgroup">
                <label class="login-form-label" for="ipt3"><i class="icon_login_imgcode"></i></label>
                <span class="login-form-iptwrap"><input id="ipt3" class="ipt_imagecode" name="captcha" v-model="captcha" type="text" placeholder="验证码"></span>
                <span class="login-form-imagecode"><img src=""></span>
              </div>
            </div>
            <!-- <div class="login-form-misc">
              <a href="#">忘记密码？</a>
              <a href="#">注册</a>
            </div> -->
            <input type="submit" style="display:none">
            <div class="login-form-buttons">
              <a href="javascript:;" @click="submitForm">登陆</a>
            </div>
            <div class="login-message"  v-if="willShow">登录失败，用户名或者密码错误</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
 import services from 'services'
  export default {
    
    data:function() {
      return {
        j_username:'',
        j_password:'',
        captcha:'',
        willShow:false
      }
    },
    mounted () {

    },
    methods:{
      submitForm (){	
		   this.willShow=false;

	     services.UserService.userLogin({data:{j_username:this.j_username,j_password:this.j_password,captcha:this.captcha},
          success:(data)=>{
			       if(data && data.status == 'y'){
                window.isLogged=true;
                this.$router.replace(this.$route.query.redirect||'/')
             }else{
              this.willShow=true;
             }
			       
          }
        })
	  
       
      }
    }
  }
</script>

<style scoped>
  
.login-bg{ position:fixed; ;left:0; top:0; bottom:0; right:0; background:#0866c2 url(../assets/images/bg.jpg) repeat;background-size: cover;    z-index: 111;overflow: auto;}
.login-header,.login-footer{ width:100%; z-index:999}
.login-header{height: 104px;background:#fbfbfb;text-align: center;border-bottom:2px solid #0e8cc8;}
.login-body{padding:20px 0;overflow: auto;}

.login-logowrap{max-width:1200px;width:90%;margin:auto;text-align:center;}
.login-header img{margin-top:16px;max-width: 100%}

.login-container{display: table;table-layout: auto;width: 90%;max-width: 1400px;height: 100%;margin: auto;}

.login-form-container{display: table-cell;vertical-align: middle;padding-right: 16px;}

.login-form-wrapper{position: relative;padding:0;background-color:rgba(255,255,255,.3);width: 370px ;margin: auto;margin-bottom: 20px; box-shadow:0 0 2px 2px rgba(160,160,160,.1);z-index: 1}
@media (max-width:1000px) {
  .login-form-wrapper{width: 100% ;max-width:370px}
}
.login-form{background-color: #FFF;padding:0 30px 30px 30px;;border-radius:8px;}
.login-form-tt{font-size: 24px;color: #f0f0f0;line-height:20px;padding:22px 0 22px 0;margin:0 -30px 0 -30px; text-align: center;border-radius:8px 8px 0 0;background: #479eda;background: -webkit-linear-gradient(bottom, #50aceb , #4095d0);background: linear-gradient(to bottom, #50aceb , #4095d0);}
.login-form-tt span{color:#999;font-size: 16px;margin-left:10px;}

.login-form-iptgroups{border:1px solid #ccc;border-radius: 5px;padding:0 5px;margin:22px 0 0 0;}
.login-form-iptgroup{position: relative;padding:5px 0;display: table;table-layout: fixed;width: 100%;}
.login-form-iptgroup:first-child,.login-form-iptgroup:first-child+.login-form-iptgroup{border-bottom: 1px solid #ccc;}
.login-form-iptgroup .login-form-label{display: table-cell;vertical-align: top;width:26px;height:26px;line-height:26px ;width: 30px;
    border-right: 1px solid transparent; }
.login-form-iptgroup .login-form-iptwrap{display: table-cell;vertical-align: top;}
.login-form-iptgroup .login-form-imagecode{display: table-cell;vertical-align: top;height: 40px;overflow: hidden;background-color:#FFF;text-align: left;}


.login-form-iptgroup .login-form-label i{background: url('../assets/images/admin-login-icon.png') no-repeat -0 center;height:40px;width:26px;position: static;top:0;left:6px;display: inline-block;vertical-align: top}
.login-form-iptgroup .login-form-label .icon_login_password{background-position:-42px center;}
.login-form-iptgroup .login-form-label .icon_login_imgcode{background-position:-81px center;}

.login-form-iptgroup input{line-height:20px;font-size:16px;padding:9px 8px;border:1px solid transparent;outline:none;box-sizing:border-box;width: 100%;border-radius:2px;}
.login-form-iptgroup input:focus{/*border:1px solid #3298c8;*/}

.login-form .ipt_imagecode{}
.login-form .login-form-imagecode img{height: 100%;max-width: 100%; cursor: pointer;}

.login-form-misc{font-size:14px;margin-top:15px;height: 21px;}
.login-form-misc label{font-size:14px;color: #555;}
.login-form-misc a{float: right;color: #555;text-decoration: none;}
.login-form-misc a:hover{color: #000;text-decoration: underline;}
.login-form-misc a+a{margin-right: 12px;}
.login-form-misc input{width: 16px;height: 16px;margin-right: 10px;vertical-align: middle;}

.login-form-buttons{text-align: center;margin-top: 24px;}
.login-form-buttons a{font-size:18px;padding:8px 30px 8px 30px;line-height:24px;color: #FFF;background-color: #4196d1;box-shadow:0 2px 2px #338bc7;border:0px;border-radius:3px;display: block;transition:background-color .6s;text-decoration: none;letter-spacing: 1em;--webkit-tap-highlight-color:rgba(0,0,0,.1)}
.login-form-buttons a+a{margin-left:20px;}

.login-message{ position: absolute; left: 0; right: 0; top: 100%; margin-top: 5px; padding: 0 24px; line-height: 22px; font-size: 14px; color: #e00; background-color: #ffe4e8;}
</style>
