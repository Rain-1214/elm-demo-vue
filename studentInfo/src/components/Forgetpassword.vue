<template>
	<div id="login">
		<div class="center login-warpper">
			<template v-if="checkUserName">
				<el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
					<h1>忘记密码</h1>
				  <el-form-item label="请输入用户名" prop='userName'>
				    <el-input v-model="form.userName" :key="1"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click.native="onSubmit('form')">下一步</el-button>
				    <router-link to="/"><el-button type="default">返回首页</el-button></router-link>
				  </el-form-item>
				</el-form>		
			</template>
			<template v-if="checkSafetyQuestion">
				<el-form ref="form2" :model="form2" :rules="rules" label-width="80px" label-position="top">
					<h1>回答安全问题</h1>
				  <el-form-item label="安全问题">
				    <el-input :disabled="true" v-model="form2.safetyQuestion"></el-input>
				  </el-form-item>
				  <el-form-item label="请输入安全问题答案">
				    <el-input v-model="form2.safetyAnswer"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click.native="onSubmit2('form2')">下一步</el-button>
				    <router-link to="/"><el-button type="default">返回首页</el-button></router-link>
				  </el-form-item>
				</el-form>	
			</template>
			<template v-if="alterPassword">
				<el-form ref="form3" :model="form3" :rules="rules" label-width="80px" label-position="top">
					<h1>回答安全问题</h1>
				  <el-form-item label="新密码" prop="password">
				    <el-input v-model="form3.password"></el-input>
				  </el-form-item>
				  <el-form-item label="重复输入新密码" prop="passwordAgain">
				    <el-input v-model="form3.passwordAgain"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click.native="onSubmit3('form3')">提交</el-button>
				    <router-link to="/"><el-button type="default">返回首页</el-button></router-link>
				  </el-form-item>
				</el-form>	
			</template>
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
        if(value != this.form3.password){
          return callback(new Error('两次输入密码不一致'))
        }
        callback()
      }
			return {
				checkUserName:true,
				checkSafetyQuestion:false,
				alterPassword:false,
				form:{
					userName:""
				},
				form2:{
					userName:"",
					safetyQuestion:"",
					safetyAnswer:""
				},
				form3:{
					id:"",
					userName:"",
					password:"",
					passwordAgain:""
				},
				rules:{
					userName: [
	          { required: true, message: '请输入用户名', trigger: 'blur,change' },
	          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur,change' },
	        ],
	        password: [
            { required: true, message: '请输入密码', trigger: 'blur,change' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur,change' }
          ],
          passwordAgain: [
            { required: true, message: '请输入密码', trigger: 'blur,change' },
            { validator: checkPasswordAgain, trigger: 'blur,change' }
          ]
				}
			}
		},
		methods:{
			onSubmit(fromName){
				const data = this.form;
				const _this = this;
				this.$refs[fromName].validate((valid) => {
					if(valid) {
						this.$ajax({
		          method:'post',
		          url:'http://localhost:8080/StudentInfo/user/findUserSafetyQuestion.do',
		          data:data
		        })
		        .then(function (response) {
		            console.log(response);
		            if(response.status == 200){
		            	if(!response.data.errorCode) { 
		            		Toast(response.data.message);
		            	}else{
		            		_this.checkUserName = false;
		            		_this.checkSafetyQuestion = true;
		            		_this.form3.id = response.data.data.id;
		            		_this.form3.userName = _this.form.userName;
		            		_this.form2.userName = _this.form.userName;
		            		_this.form2.safetyQuestion = response.data.data.safetyQuestion;
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
			},
			onSubmit2(fromName){
				const data = this.form2;
				const _this = this;
				this.$refs[fromName].validate((valid) => {
					if(valid) {
						this.$ajax({
		          method:'post',
		          url:'http://localhost:8080/StudentInfo/user/findUserSafetyQuestion.do',
		          data:data
		        })
		        .then(function (response) {
		            console.log(response);
		            if(response.status == 200){
		            	if(!response.data.errorCode) { 
		            		Toast(response.data.message);
		            	}else{
		            		_this.checkSafetyQuestion = false;
		            		_this.alterPassword = true;
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
			},
			onSubmit3(fromName){
				const data = this.form3;
				const _this = this;
				this.$refs[fromName].validate((valid) => {
					if(valid) {
						this.$ajax({
		          method:'post',
		          url:'http://localhost:8080/StudentInfo/user/alterUser.do',
		          data:data
		        })
		        .then(function (response) {
		            console.log(response);
		            if(response.status == 200){
		            	if(!response.data.errorCode) { 
		            		Toast(response.data.message);
		            	}else{
		            		Toast("修改成功3秒后调回登录页");
		            		setTimeout(()=>{
		            			_this.$router.push('/login')
		            		},3000)
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