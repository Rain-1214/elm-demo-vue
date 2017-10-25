<template>
  <div id="register">
    <mt-header title="注册">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item prop="userName">
          <el-input v-model="form.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="passwordAgain">
          <el-input v-model="form.passwordAgain" type="password" placeholder="请再次输入密码密码"></el-input>
        </el-form-item>
        <el-form-item prop="safetyQuestion">
          <el-input v-model="form.safetyQuestion" placeholder="请输入一个安全问题用于忘记密码时找回密码"></el-input>
        </el-form-item>
        <el-form-item prop="safetyAnswer">
          <el-input v-model="form.safetyAnswer" placeholder="请填写安全问题答案"></el-input>
        </el-form-item>
        <section class="code">
           <div class="input">
             <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
           </div>
           <div class="code-img">
             <img :src="`/ElmPro/User/getCode.do?${new Date()}`" v-once alt="">
           </div>
           <div class="change">
             <p>看不清？</p>
             <p class="blue" @click="change()">换一张</p>
           </div>
         </section>
      </el-form>
       <section class="tips">
         <p>温馨提示：验证码不区分大小写</p>
       </section>
       <section class="submit">
         <el-button type="success" @click.native="submit('form')">立即注册</el-button>
       </section>
     </article> 	
  </div>
</template>
<script>
  
  import { Toast } from 'mint-ui';
  import { register, checkUserName } from '../../api/user';
  import { SAVE_CURRENT_USER } from '../../store/mutation-types';

  export default {
    data() {
      const checkPasswordAgain = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
        }
        if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致'));
        }
        callback();
      };

      const checkPassword = (rule, value, callback) => {
        const reg = /^[0-9a-zA-Z_-]+$/;
        if (!reg.test(value)) {
          callback(new Error('只能用数字、字母、下划线、中划线组成'));
        }
        callback();
      };

      const checkUser = async (rule, value, callback) => {
        const reg = /^[0-9a-zA-Z_-]+$/;
        if (!reg.test(value)) {
          callback(new Error('只能用数字、字母、下划线、中划线组成'));
        }
        try {
          const res = await checkUserName({ userName: value });
          if (res.data.stateCode) {
            callback();
          } else {
            callback(new Error('用户名已存在'));
          }
        } catch (e) {
          console.log(e);
          callback();
        }
      };
      return {
        ajaxFlag: true,
        form: {
          userName: '',
          password: '',
          passwordAgain: '',
          safetyQuestion: '',
          safetyAnswer: '',
          code: '',
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur,change' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur,change' },
            { validator: checkUser, trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur,change' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur,change' },
            { validator: checkPassword, trigger: 'blur' },
          ],
          passwordAgain: [
            { required: true, message: '请输入密码', trigger: 'blur,change' },
            { validator: checkPasswordAgain, trigger: 'blur,change' },
          ],
          safetyQuestion: [
            { required: true, message: '此项不能为空', trigger: 'blur,change' },
            { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur,change' },

          ],
          safetyAnswer: [
            { required: true, message: '此项不能为空', trigger: 'blur,change' },
            { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur,change' },
          ],
          code: [
            { required: true, message: '此项不能为空', trigger: 'blur,change' },
          ],
        },
      };
    },
    computed: {
      passwordType() {
        return this.showPassword ? 'text' : 'password';
      },
    },
    methods: {
      change() {
        /* eslint-disable no-undef */
        document.querySelector('.code-img img').src = `/ElmPro/User/getCode.do?${new Date()}`;
      },
      submit(formName) {
        if (this.ajaxFlag) {
          this.ajaxFlag = false;
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              const { userName, password, safetyQuestion, safetyAnswer, code } = this.form;
              const data = { userName, password, safetyQuestion, safetyAnswer, code };
              try {
                const res = await register(data);
                if (res.data.stateCode) {
                  Toast({
                    message: res.data.message,
                    duration: 3000,
                    className: 'big-font',
                  });
                  this.$store.commit(SAVE_CURRENT_USER, res.data.data);
                  this.$router.push('/user');
                } else {
                  Toast({
                    message: res.data.message,
                    duration: 3000,
                    className: 'big-font',
                  });
                }
              } catch (e) {
                console.log(error);
              } finally {
                this.ajaxFlag = true;
              }
            } else {
              this.ajaxFlag = true;
            }
          });
        }
      },
    },
    created() {

    },
  };
</script>
<style lang="scss">
  @import '../../assets/css/common/tool';
  @import '../../assets/css/common/responsive';

  #register{
    .el-form-item{
      &.is-error{
        .el-input__inner{
          border: 1px solid #ff4949;
        }
      }
    }
    article{
      @include remCalc('padding',10px);
      .code{
        display: flex;
        .input{
          flex:1;
        }
        .code-img{
          @include remCalc('width',80px);
          position: relative;
          img{
            width: 80%;
            height: 80%;
            @include all-center(absolute);
          }
        }
        .change{
          p{
            @include remCalc('padding-left',0px);
          }
        }
      }
      .tips{
        border-bottom: none;
        p{
          line-height: 1.5;
          color: red;
        }
      }
      .submit{
        width: 100%;
        border-bottom: none;
        @include clear;
      }
    }
  }

</style>