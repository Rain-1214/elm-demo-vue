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
	   	<section>
	   		<el-input v-model="password" placeholder="密码"></el-input>
	   	</section>
	   	<section class="code">
	   		<div class="input">
	   			<el-input v-model="code" placeholder="请输入验证码"></el-input>
	   		</div>
	   		<div class="code-img">
	   			<img src="/ElmPro/User/getCode.do" alt="">
	   		</div>
	   		<div class="change">
	   			<p>看不清？</p>
	   			<p class="blue" @click="change1()">换一张</p>
	   		</div>
	   	</section>
	   	<section class="tips">
	   		<p>温馨提示：未注册过的账号，登录时将自动注册</p>
	   		<p>注册过的用户可凭账号密码登录</p>
	   	</section>
	   	<section class="submit">
	   		<el-button type="success">提交</el-button>
	   		<router-link to="">立即注册</router-link>
	   	</section>
	   	<section>
	   	</section>
   	</article>
	</div>
</template>
<script>
	
	export default {
		data() {
			return {
				userName:'',
				password:'',
				code:''
			}
		},
		methods:{
			change1(){
				document.querySelector('.code-img img').src = '/ElmPro/User/getCode.do?' + new Date();
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
			@include remCalc('height',160px);
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