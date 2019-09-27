<!--
 * @Author: Huanghao
 * @Date: 2019-09-10 15:03:43
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-18 15:45:03
 * @Description: 
 -->
<template>
  <div
    class="mino-login__wrap flex_column_start"
    v-loading="loading"
  >
    <div class="login-header flex_row_start">
      <img
        height="65%"
        src="@/assets/images/system/logoHeart.png"
        style="margin-left:20px;"
      />
    </div>
    <div class="login-content-wrapper">
      <div class="login-content"></div>
      <div class="system-title">
        <div class="name">任务管理系统</div>
        <div class="content">Task Management System</div>
      </div>
      <div class="login">
        <div class="login-title">
          <h1>用户登录</h1>
        </div>
        <div class="login-btn_area">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item prop="sapCode">
              <el-input
                auto-complete="on"
                class="mino-login__input"
                name="sapCode"
                placeholder="请输入您的用户名"
                prefix-icon="iconfont icon-denglu2"
                v-model="ruleForm.sapCode"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                auto-complete="on"
                class="mino-login__input mgb25"
                name="pass"
                placeholder="请输入您的用户密码"
                prefix-icon="iconfont icon-mima"
                type="password"
                v-model="ruleForm.pass"
              ></el-input>
            </el-form-item>
            <div>
              <el-checkbox v-model="checked">记住密码</el-checkbox>
            </div>
            <div
              class="flex_row_center"
              style="margin-top:20px"
            >
              <el-button
                @click="login"
                size="small"
                type="primary"
              >登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="login-bottom flex_column_center">
      <div>广州明珞汽车装备有限公司</div>
      <div class="version">版本：V1.01</div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
  mapGetters
} from 'vuex'
export default {
  data () {
    return {
      ruleForm: {
        sapCode: '', // 用户名
        pass: '' // 密码
      },
      rules: {
        // 验证规则
        sapCode: [{
          required: true,
          message: '请输入用户名'
        }],
        pass: [{
          required: true,
          message: '请输入密码'
        }]
      },
      loading: false, // 控制Loading显示
      checked: true
    }
    },
  methods: {
    ...mapActions(
      'editableTabs', {
        pushEditableTabs: 'pushEditableTabs'
      }
    ),
    login() {
        //登录函数
        let self = this;
        if (self.checked) {
            localStorage.setItem("loginusername", self.ruleForm.sapCode);
            localStorage.setItem("loginpassword", self.ruleForm.pass);
            localStorage.setItem("loginchecked", '1');
        } else {
            localStorage.removeItem("loginusername");
            localStorage.removeItem("loginpassword");
            localStorage.setItem("loginchecked", '0');
        }
        this.$refs["ruleForm"].validate(valid => {
            //验证输入格式
            if (valid) {
                //如果通过
                self.loading = true;
                self.$http.post(
                    "/admin/admin/login.d",
                    self.ruleForm,
                    function (suc) {
                        self.$store.dispatch('user/setToken', suc.body.rows.token)
                        self.$store.dispatch('user/setPermissions', JSON.stringify(suc.body.rows.menus))
                        let bottoms=suc.body.rows.bottoms; //按钮权限
                        let btPermissions=suc.body.rows.permission
                        self.$store.dispatch('user/setBtPermissions', JSON.stringify(btPermissions))
                         Reflect.deleteProperty(suc.body.rows,'bottoms')
                         suc.body.rows.sapCode=self.ruleForm.sapCode
                         console.log(suc.body.rows,'Dengl')
                        self.$store.dispatch('user/setInfo', JSON.stringify(suc.body.rows))      
                        self.$replaceTo('/')
                        self.$message({
                            showClose: true,
                            message: "登陆成功",
                            type: "success"
                        });
                    },
                    function (err) {
                        //提示错误信息
                        self.$message({
                            showClose: true,
                            message: err.result.msg,
                            type: "warning"
                        });
                        self.loading = false; //隐藏loading
                    },
                    function(serverErr){
                        //提示错误信息
                        self.$message({
                            showClose: true,
                            message: serverErr.error + '-' + serverErr.message,
                            type: "warning"
                        });
                        self.loading = false; //隐藏loading
                    }
                );

            } else {
                self.$message({
                    showClose: true,
                    message: "输入格式错误",
                    type: "warning"
                });
                return false;
            }
        });
    }
  },
  created () {
    let self = this
    self.$onkeydown(self.login)
    self.ruleForm.sapCode = localStorage.getItem('loginusername')
    self.ruleForm.pass = localStorage.getItem('loginpassword')
    if (localStorage.getItem('loginchecked') == '1') {
      self.checked = true
    } else {
      self.checked = false
    }
  }
}
</script>

<style lang="scss" scoped>
.mino-login__wrap {
  width: 100%;
  height: 100%;
  background-color: #edf0f4;
  overflow: hidden;
  /*     background-image: url('~@/assets/images/login/bg04.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%; */
  .login-header {
    width: 100%;
    height: 70px;
    flex-shrink: 0;
    background-color: #ffffff;
  }

  .login-content-wrapper {
    flex-shrink: 1;
    width: 100%;
    height: calc(100% - 94px);
    /*  background-image: url("~@/assets/images/login/login.png"); */
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    position: relative;
    .login-content {
      width: 100%;
      height: 98%;
      // background-color: rgba(0, 0, 0, 0.1);
      //filter: blur(50px);
    }
  }

  .login-bottom {
    width: 100%;
    height: 40px;
    flex-shrink: 0;
  }
}

/* .bgimg li {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
} */

.system-title {
  position: absolute;
  left: 200px;
  top: 100px;
  .name {
    font-size: 40px;
    color: #ffffff;
    padding-bottom: 16px;
  }

  .content {
    width: auto;
    font-size: 28px;
    color: #ffffff;
    padding-bottom: 6px;
  }
}
.login {
  width: 350px;
  height: 300px;
  border-radius: 2px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  right: 50px;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-btn_area {
  width: 250px;
  height: auto;
  margin: 0 auto;
}

.login-title {
  width: 350px;
  height: 35px;
  padding-top: 20px;
}
.login-title h1 {
  text-align: center;
  line-height: 35px;
  font-weight: 500;
  color: $blue;
  font-size: $fs_16;
}

.login-btn_area .el-form-item {
  margin-top: 30px !important;
  cursor: pointer;
}

.login-btn_area .el-button {
  width: 100%;
  height: 30px;
  background-color: $bg_blue;
  border: 1px solid $bg_blue;
}
/* transition动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.login-content {
  background-image: url("~@/assets/images/system/bg_login.png");
  background-repeat: no-repeat;
  background-position: center;
}
.login-bottom .vertion {
  font-size: $fs_10;
}
</style>
