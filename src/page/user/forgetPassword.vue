<template>
  <div id="forgetPassword">
    <mt-header title="忘记密码">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <el-steps :space="100" :active="activeIndex" finish-status="success" :center='true'>
        <el-step
          :key="i"
          :title="v.title"
          v-for="(v,i) in stepTitle">
          <span slot="description" v-show="v.descriptionShow">
            {{v.description}}
          </span>
        </el-step>
      </el-steps>
      <div class="form">
        <el-form ref="form1" :model="form1" label-width="80px" v-show="stepTitle[0].descriptionShow">
          <el-form-item
            prop="userName" 
            :rules="[
              { required: true, message: '请输入用户名' },
              { min: 3, max: 10, message: '长度在 3 到 10 个字符' },
            ]"
            label="用户名" >
            <el-input v-model="form1.userName" placeholder="请填写您的用户名"></el-input>
          </el-form-item>
          <el-form-item 
            class="code" 
            prop="code" 
            :rules="[
              { required: true, message: '请输入验证码' },
            ]"
            label="验证码" >
            <div class="input">
              <el-input 
                v-model="form1.code" 
                placeholder="验证码"></el-input>
            </div>
            <div class="codeImage">
              <img id="codeImage" :src="`/ElmPro/User/getCode.do?${new Date()}`" v-once>
            </div>
            <div class="changeImage">
              <p>看不清</p>
              <p class="blue" @click="changeCodeImage()">换一张?</p>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="checkUserName('form1')">下一步</el-button>
          </el-form-item>
        </el-form>
        <el-form ref="form2" :model="form2" label-width="80px" v-show="stepTitle[1].descriptionShow">
          <el-form-item
            label="安全问题" >
            <el-input v-model="form2.safetyQuestion" readonly></el-input>
          </el-form-item>
          <el-form-item 
            prop="safetyAnswer" 
            :rules="[
              { required: true, message: '请输入答案' },
            ]"
            label="答案" >
            <div class="input">
              <el-input 
                v-model="form2.safetyAnswer" 
                placeholder="答案"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="checkSafetyQuestion('form2')">下一步</el-button>
          </el-form-item>
        </el-form>
        <el-form ref="form3" :model="form3" label-width="80px" v-show="stepTitle[2].descriptionShow">
          <el-form-item 
            prop="password" 
            :rules="[
              { required: true, message: '请输入密码' },
            ]"
            label="新密码" >
            <div class="input">
              <el-input 
                v-model="form3.password" 
                placeholder="新密码"></el-input>
            </div>
          </el-form-item>
          <el-form-item 
            prop="passwordAgain" 
            :rules="[
              { required: true, message: '请再次输入密码' },
            ]"
            label="再次输入" >
            <div class="input">
              <el-input 
                v-model="form3.passwordAgain" 
                placeholder="请再次输入新密码"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="setPassword('form3')">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </article>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { getUserSafetyQuestion, checkUserSafetyQuestion, setNewPassword } from '../../api/user';

export default {
  data() {
    return {
      activeIndex: 0,
      stepTitle: [
        {
          title: '第一步',
          description: '填写用户名',
          descriptionShow: true,
        },
        {
          title: '第二步',
          description: '回答安全问题',
          descriptionShow: false,
        },
        {
          title: '第三步',
          description: '设置新密码',
          descriptionShow: false,
        },
      ],
      form1: {
        userName: '',
        code: '',
      },
      form2: {
        safetyAnswer: '',
      },
      form3: {
        password: '',
        passwordAgain: '',
      },
      ajaxFlag: true,
      second: 3,
    };
  },
  methods: {
    changeCodeImage() {
      document.querySelector('#codeImage').src = `/ElmPro/User/getCode.do?${new Date()}`;
    },
    checkUserName(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid && this.ajaxFlag) {
          this.ajaxFlag = false;
          try {
            const data = {};
            data.userName = this.form1.userName;
            const res = await getUserSafetyQuestion(data);
            if (res.data.stateCode) {
              this.stepTitle[0].descriptionShow = false;
              this.stepTitle[1].descriptionShow = true;
              this.activeIndex = 1;
              this.form2 = { ...res.data.data, ...this.form2 };
            } else {
              Toast(res.data.message);
              this.changeCodeImage();
            }
          } catch (error) {
            console.log(error);
          } finally {
            this.ajaxFlag = true;
          }
        }
      });
    },
    checkSafetyQuestion(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid && this.ajaxFlag) {
          this.ajaxFlag = false;
          try {
            const data = {};
            data.safetyAnswer = this.form2.safetyAnswer;
            const res = await checkUserSafetyQuestion(data);
            if (res.data.stateCode) {
              this.stepTitle[1].descriptionShow = false;
              this.stepTitle[2].descriptionShow = true;
              this.activeIndex = 2;
            } else {
              Toast(res.data.message);
            }
          } catch (error) {
            console.log(error);
          } finally {
            this.ajaxFlag = true;
          }
        }
      });
    },
    setPassword(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid && this.ajaxFlag) {
          this.ajaxFlag = false;
          try {
            const password = this.form3.password;
            const id = this.form2.id;
            const data = { id, password };
            const res = await setNewPassword(data);
            console.log(res);
            if (res.data.stateCode) {
              /**@argument */
              const time = setInterval(() => {
                const toast = Toast(`修改成功,${this.second}秒后返回登录页面并使用新密码登录`);
                toast.close();
                this.second -= 1;
                if (this.second <= 0) {
                  clearInterval(time);
                  this.$router.push('/login');
                }
              }, 1000);

            } else {
              Toast(res.data.message);
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
  },
  created() {
    
  },
};
</script>
<style lang="scss">

  @import '../../assets/css/common.scss';

  #forgetPassword{
    article{
      @include remCalc('padding',10px);
      .form{
        margin: 15px 0;
      }
      .code{
        .el-form-item__content{
          display: flex;
          >div{
            flex: 0 0 30%;
            &.codeImage{
              @include remCalc('padding',2px,5px);
            }
            p{
              @include remCalc('height',18px);
              @include remCalc('line-height',18px);
            }
          }
        }
      }
    }
  }
</style>


