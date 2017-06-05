<template>
	<div id="register">
		<div class="center login-warpper">
			<el-form ref="form" :rules="rules" :model="form" label-width="110px" label-position="left">
				<h1>注册</h1>
			  <el-form-item label="用户名" prop="userName">
			    <el-input v-model="form.userName"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="password">
			    <el-input type='password' v-model="form.password"></el-input>
			  </el-form-item>
        <el-form-item label="再次输入密码" prop="passwordAgain">
          <el-input type='password' v-model="form.passwordAgain"></el-input>
        </el-form-item>
        <el-form-item class='changLabel' label="安全问题" prop="safetyQuestion">
          <el-input v-model="form.safetyQuestion"></el-input>
        </el-form-item>
        <el-form-item class='changLabel' label="安全问题答案" prop="safetyAnswer">
          <el-input v-model="form.safetyAnswer"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="onSubmit('form')">立即注册</el-button>
          <router-link to="/home"><el-button type="default">返回首页</el-button></router-link>
        </el-form-item>
      </el-form>  	
		</div>
	</div>
</template>
<script>
  import {Toast} from 'mint-ui'
	export default{
		data(){
      const checkPasswordAgain = (rule,value,callback) => {
        if(!value){
          return callback(new Error('请再次输入密码'))
        }
        if(value != this.form.password){
          return callback(new Error('两次输入密码不一致'))
        }
        callback()
      }
      const checkRepeatUserName = (rule,value,callback) => {
        this.$ajax.post('http://localhost:8080/StudentInfo/user/findUser.do',{userName:value})
                  .then((response) => {
                    console.log(response);
                    if(response.status == 200){
                      if(!response.data.errorCode) { 
                        return callback(new Error(response.data.message))
                      }else{
                        callback()
                      }
                    }else{
                      Toast('网络出现问题，请稍候再试');
                      callback()
                    }
                  })
                  .catch((error) => { 
                    console.log(error)
                    callback()
                  })
      }
			return {
        passwordAgainBoolean:false,
        form:{
          userName:"",
          password:"",
          passwordAgain:"",
          safetyQuestion:"",
          safetyAnswer:""
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur,change' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur,change' },
            { validator: checkRepeatUserName, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur,change' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur,change' }
          ],
          passwordAgain: [
            { required: true, message: '请输入密码', trigger: 'blur,change' },
            { validator: checkPasswordAgain, trigger: 'blur,change' }
          ],
          safetyQuestion:[
            { required: true, message: '此项不能为空', trigger: 'blur,change' },
          ],
          safetyAnswer:[
            { required: true, message: '此项不能为空', trigger: 'blur,change' },
          ]
        }
			}
		},
    methods:{
      onSubmit(formName){ 
        const data = this.form;
        console.log(this.$refs)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax({
              method:'post',
              url:'http://localhost:8080/StudentInfo/user/register.do',
              data:{
                userName:data.userName,
                password:data.password,
                safetyQuestion:data.safetyQuestion,
                safetyAnswer:data.safetyAnswer
              }
            })
            .then(function (response) {
                console.log(response);
                if(response.status == 200){
                  if(!response.data.errorCode) { 
                    Toast(response.data.message);
                  }else{
                    Toast('注册成功');
                  }
                }else{
                  Toast('网络出现问题，请稍候再试');
                }
            })
            .catch(function (error) {
              console.log(error);
            });
          }
        })
        
      }
    }
	}

</script>