<template>
	<div id="user">
		<mt-header title="我的"></mt-header>
    <section class="login">
			<template v-if="!Object.hasOwnProperty.call(currentUser,`id`)">
	    	<div class="header-img">
		    	<svg>
		    		<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
		    	</svg>
	    	</div>
	    	<div class="user-info">
	    		<div class="center">
	    			<router-link to="/login">
			    		<h1>登录/注册</h1>
			    		<h2>
			    			<svg>
		    					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
		    				</svg>	
			    			登录后享受更多权限
			    		</h2>
	    			</router-link>
	    		</div>
	    	</div>
			</template>
			<template v-else>
				<div class="header-img">
					<template v-if="!currentUser.userImg && currentUser.userImg == ''">
			    	<svg>
			    		<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
			    	</svg>
					</template>
					<template v-else>
						<img :src="currentUser.userImg">
					</template>
	    	</div>
	    	<div class="user-info">
	    		<div class="center">
		    		<h1>{{currentUser.userName}}</h1>
		    		<h2>
		    			<template v-if="currentUser.phoneNumber === ''">
			    			<svg>
		    					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
		    				</svg>	
			    			绑定手机后享受更多权限
		    			</template>
		    			<template v-else>
		    				{{currentUser.phoneNumber}}
		    			</template>
		    		</h2>
	    		</div>
	    	</div>
			</template>
    </section>
		<section class="hongbao">
			<div>
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#luckybag"></use>
				</svg>	
				<h2>优惠</h2>
			</div>
			<div>
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profile-coins"></use>
				</svg>
				<h2>积分</h2>
			</div>
		</section>
		<section class="list">
			<mt-cell
			  title="我的地址"
			  to=""
			  is-link>
			  <svg slot='icon'>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#address"></use>
				</svg>
			</mt-cell>
			<mt-cell
			  title="积分商城"
			  to=""
			  is-link>
			  <svg slot='icon'>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
				</svg>
			</mt-cell>
			<mt-cell
			  title="下载饿了么APP"
			  to=""
			  is-link>
			  <svg slot='icon'>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
				</svg>
			</mt-cell>
			<mt-cell
			  title="绑定手机"
			  to=""
			  is-link>
			  <svg slot='icon'>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
				</svg>
			</mt-cell>
			<mt-cell title="退出登录" v-if="Object.hasOwnProperty.call(currentUser,`id`)" @click.native = "logout()">
			  <svg slot='icon'>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
				</svg>
			</mt-cell>
		</section>
		<my-footer :active="3"></my-footer>
	</div>
</template>
<script>
	import Footer from '../components/footer.vue';
	import { mapGetters } from 'vuex';
	import { REMOVE_CURRENT_USER } from '../../store/mutation-types.js'
	import {Toast} from 'mint-ui';

	export default {
		data(){
			return {

			}
		},
		components:{
			'my-footer':Footer,
		},
		computed:{
			...mapGetters(['currentUser'])
		},
		methods:{
			logout(){
				this.$store.commit(REMOVE_CURRENT_USER);
				Toast({
		  		message: "退出成功",
				  duration: 1500,
				  className:'big-font'
				})
			}
		},
		created(){
		}
	}
</script>
<style lang="scss">
	@import '../../assets/css/common/tool';
	@import '../../assets/css/common/responsive';

	#user{
		.login{
			background-image: linear-gradient(90deg,#0af,#0085ff);
	    color: #fff;
			@include remCalc('padding',60px);	    
			display: flex;
			flex-direction:row;
			flex-wrap:nowrap;
	    .header-img{
	    	background:#fff;
	    	border-radius: 50%;
	    	overflow: hidden;
	    	@include remCalc('width',200px);
	    	@include remCalc('height',200px);
	    	svg{
	    		width: 100%;
	    		height: 100%;
	    	}
	    	img{
	    		width: 100%;
	    		height: 100%;
	    	}
	    }
	    .user-info{
				.center{
					@include remCalc('padding-left',80px);
					@include remCalc('padding-top',20px);
					h1{
						font-weight: bold;
						color: #fff;
						@include remCalc('font-size',80px);
					}									
					h2{
						color: #fff;
						svg{
							margin-right: 5px;
							position: relative;
							top: 5px;
							@include remCalc('width',30px);
							@include remCalc('height',50px);
						}
						@include remCalc('font-size',50px);
					}
		    }
			}
		}
		.hongbao{
			display: flex;
			flex-direction:row;
			flex-wrap:nowrap;
			@include remCalc('padding',30px,0);
			>div{
				width: 50%;
				svg{
					display: block;
					margin: 0 auto;
					@include remCalc('width',100px);
					@include remCalc('height',100px);
				}
				h2{
					text-align: center;
					@include remCalc('font-size',50px);
					@include remCalc('margin-top',15px);
				}
			}
		}
		.list{
			.mint-cell{
			}
			.mint-cell-text{
				@include remCalc('font-size',50px);
			}
			.mint-cell-allow-right::after{
				@include remCalc('border-width',10px);
				@include remCalc('width',30px);
				@include remCalc('height',30px);
				border-bottom: none !important;
				border-left: none !important;
			}
			svg{
				position: relative;
				@include remCalc('top',13px);
				@include remCalc('width',50px);
				@include remCalc('height',50px);
			}
		}
	}
</style>