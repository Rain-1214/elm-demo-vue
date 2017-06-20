<template>
	<div id="home">
		<mt-header>
      <section class="headAddress " slot="left">
      	{{tempAddress.city}} {{tempAddress.district}} {{tempAddress.name}} 
      </section>
    </mt-header>
    <section class="search">
    	<input type="text" name="" placeholder="搜索店铺或者商家">
    </section>
    <section class="swiper-wrapper">
    	<mt-swipe :auto="0">
    		<mt-swipe-item v-for="(v,i) in shopTypeList" :key = 'v'>
    			<div class="item-wrapper">
    				<div class="item" v-for="obj in v">
    					<img :src="obj.typeLogo">
    					<p>{{obj.typeName}}</p>
    				</div>
    			</div>
    		</mt-swipe-item>
			</mt-swipe>
    </section>
    <section class="grayLine"></section>
    <section class="shop-wrapper">
    	<div class="title">
    		<h2>推荐商家</h2>
    	</div>
    	<div class="shop">
    		<div class="img">
    			<img src="//fuss10.elemecdn.com/4/0f/f402d4307554210917027b4a421e2png.png?imageMogr/format/webp/thumbnail/!120x120r/gravity/Center/crop/120x120/">
    		</div>
    		<div class="shop-detail">
    			<div class="shop-header">
    				<h2>店铺名称称店铺名称称店铺名称称</h2>
    				<div class="shop-type">
    					<span>保</span>
    					<span>准</span>
    					<span>票</span>
    				</div>
    			</div>
    			<div class="shop-info">
    				<div>
    					<el-rate
							  v-model="value5"
							  disabled
							  show-text
							  text-color="#ff9900"
							  text-template="{value}">
							</el-rate>
							<p>
								月销售599单	
							</p>
    				</div>
    				<div>
    					
    				</div>
    			</div>
    		</div>
    	</div>
    </section>
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex';
	import {getShopTypeList} from '../../api/shop.js';
	export default{
		data(){
			return {
				shopTypeList:[],
				value5:3.7
			}
		},
		computed:{
			...mapGetters([
				'tempAddress'
				])
		},
		methods:{
			loadShopTypeList(){
				const _this = this;
				getShopTypeList().then((res) => {
					console.log(res);
					for(let i = 0; i<res.data.data.length; i += 8){
						_this.shopTypeList.push(res.data.data.slice(i,i+8));
					}
				})
				.catch((error) => {
					console.log(error)
				})
			}
		},
		created(){
			this.loadShopTypeList();
		}
	}
</script>
<style lang='scss' scope>
  @import '../../assets/css/common/tool';
	.headAddress{
		max-width: 3rem;
		padding:2px 8px;
		@include ellipsis;
	}
	.search{
		padding:15px 10px;
		background: $blue;
		input{
			width: 100%;
			border: none;
			height: 45px;
			border-radius: 22.5px;
			padding:0 22.5px;
		}
	}
	.swiper-wrapper{
		height: 200px;
		.mint-swipe-indicator.is-active{
			opacity: 1;
			background: #000;
		}
		.item-wrapper{
			display: flex;
			flex-direction:row;
			flex-wrap:wrap;
			padding-top: 8px;
			// flex-flow:row wrap;
			// justify-content:flex-start;
			.item{
				width: 25%;
				p{
					text-align: center;
					margin:10px 0;
				}
				img{
					display: block;
					margin: 0 auto;
					max-width: 50%;
				}
			}
		}
	}
	.grayLine{
		height: 15px;
		width: 100%;
		background: #e5e5e5;
	}
	.shop-wrapper{
		.title{
			border-bottom: 1px solid #e5e5e5;
			h2{
				padding:5px 10px;
				font-weight: bold;
			}
		}
		.shop{
			display: flex;
			flex-direction:row;
			flex-wrap:nowrap;
	    justify-content: space-between;
			.img{
				width: 1.5rem;
				padding:15px;
				img{
					max-width: 100%;
					height: auto !important;
				}
			}
			.shop-detail{
				flex:1;
				.shop-header{
					padding:5px;
					display: flex;
					justify-content:space-between;
					h2{
						@include ellipsis;
						max-width: 2rem;
					}
					div{
						span{
							height: 24px;
							width: 24px;
							line-height: 24px;
							color:#c1c1c1;
						}
					}
				}
				.shop-info{
					display: flex;
					flex-direction:row;
					flex-wrap:nowrap;
			    justify-content: space-between;
					.el-rate__icon{
						font-size: 12px;
					}
					>div{
						display: flex;
					}
				}
			}
		}
	}
</style>