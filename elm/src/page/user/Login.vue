<template>
	<div id="login">
		<mt-header title="登录">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
   	<article>
	    <section>
	    	<el-input v-model="userName" placeholder="用户名"></el-input>
	    </section>
	   	<section class="code">
	   		<div class="input">
	   			<el-input v-model="password" :type="passwordType" placeholder="密码"></el-input>
	   		</div>
	   		<div class="code-img tb-center">
	   			<mt-switch v-model="showPassword"></mt-switch>
	   		</div>
	   	</section>
	   	<section class="code">
	   		<div class="input">
	   			<el-input v-model="code" placeholder="请输入验证码"></el-input>
	   		</div>
	   		<div class="code-img">
	   			<img :src="`/ElmPro/User/getCode.do?${new Date()}`" v-once alt="">
	   		</div>
	   		<div class="change">
	   			<p>看不清？</p>
	   			<p class="blue" @click="change()">换一张</p>
	   		</div>
	   	</section>
	   	<section class="tips">
	   		<p>温馨提示：验证码不区分大小写</p>
	   		<p>未注册的用户还请先去注册</p>
	   	</section>
	   	<section class="submit">
	   		<el-button type="success" @click.native="login()">提交</el-button>
	   		<router-link to="/register">立即注册</router-link>
	   	</section>
   	</article>
	</div>
</template>
<script>
	
	import { userLogin } from '../../api/user.js';
	import { SAVE_CURRENT_USER } from '../../store/mutation-types.js';
	import { Toast } from 'mint-ui';
 
	export default {
		data() {
			return {
				userName:'',
				password:'',
				code:'',
				ajaxFlag:true,
				showPassword:false
			}
		},
		computed:{
			passwordType(){
				return this.showPassword?"text":"password";
			}
		},
		methods:{
			change(){
				document.querySelector('.code-img img').src = '/ElmPro/User/getCode.do?' + new Date();
			},
			login(){
				if (this.ajaxFlag) {
					this.ajaxFlag = false;
					const {userName,password,code} = this;
					const data = {userName,password,code};
					userLogin(data).then((res) => {
						if (res.data.stateCode) {
							Toast({
							  message: res.data.message,
							  duration: 1500,
							  className:'big-font'
							});
							this.$store.commit(SAVE_CURRENT_USER,res.data.data);
							this.$router.push('/user');
							this.ajaxFlag = true;
						}else{
							Toast({
							  message: res.data.message,
							  duration: 3000,
							  className:'big-font'
							});
							if (res.data.message === "验证码错误") {
								this.change();
							}
							this.ajaxFlag = true;
						}

					})
					.catch((error) => {
						console.log(error)
					})

				}

			}
		},
		created(){
		}

	}
</script>
<style lang="scss">
	@import '../../assets/css/common/tool';
	@import '../../assets/css/common/responsive';

	#login{
		.el-input__inner{
			border: none;
			@include remCalc('height',140px);
			@include remCalc('font-size',52px);
			@include remCalc('padding-left',30px);
		}
		article{
			@include remCalc('padding',20px,0);
			section{
				border-bottom: 1px solid #ccc;
			}
			.code{
				display: flex;
				.input{
					flex:1;
				}
				.code-img{
					@include remCalc('width',300px);
					position: relative;
					img{
						width: 80%;
						height: 80%;
						@include all-center(absolute);
					}
				}
				.change{
					@include remCalc('width',230px);
					@include remCalc('padding-top',25px);
					p{
						@include remCalc('padding-left',25px);
					}
				}
				.tb-center{
					display: flex;
					flex-direction:row;
					flex-wrap:nowrap;
					align-items:center;

					.mint-switch{
						zoom:2;
					}
				}
			}
			.tips{
				@include remCalc('padding',20,30);
				border-bottom: none;
				p{
					line-height: 1.5;
					color: red;
				}
			}
			.submit{
				width: 100%;
				border-bottom: none;
				@include remCalc('padding',30);
				@include clear;
				button{
					width: 100%;
					@include remCalc('padding',30px,0);
					span{
						@include remCalc('font-size',52px);
					}
				}
				a{
					float: right;
					@include remCalc('margin-top',10px);
				}
			}
		}
	}

</style>