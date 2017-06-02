<template>
	<div id="login">
		<div class="center login-warpper">
			<el-form ref="form" :model="form" label-width="80px">
				<h1>登录</h1>
			  <el-form-item label="用户名">
			    <el-input v-model="form.userName"></el-input>
			  </el-form-item>
			  <el-form-item label="密码">
			    <el-input v-model="form.password"></el-input>
			  </el-form-item>
			  <el-form-item>
			  	<router-link to='forgetPassword'><span class="h5">忘记密码？</span></router-link>
			  </el-form-item>
			   <el-form-item>
			    <el-button type="primary" @click="onSubmit">立即登录</el-button>
			    <router-link to="/register"><el-button type="default">去注册</el-button></router-link>
			    
			  </el-form-item>
			</el-form>	
		</div>
	</div>
</template>
<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {
				form:{
					userName:"",
					password:""	
				}
			}
		},
		methods:{
			onSubmit(){
				const data = this.form;
				this.$ajax({
          method:'post',
          url:'http://localhost:8080/StudentInfo/user/login.do',
          data:data
        })
        .then(function (response) {
            if(response.status == 200){
            	if(!response.data.errorCode) { 
            		Toast(response.data.message);
            	}else{
            		Toast('登录成功');
            	}
            }else{
            	Toast('网络出现问题，请稍候再试');
            }
        })
        .catch(function (error) {
          console.log(error);
        });
			}
		}
	}
</script>