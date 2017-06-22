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
    	<div class="shop" v-for="(v,i) in shopList">
    		<div class="img">
    			<img :src="v.shopLogo">
    		</div>
    		<div class="shop-detail">
    			<div class="shop-header">
    				<h2 :class="{'isbrand':v.isBrand}">{{ v.shopName }}</h2>
    				<div class="shop-type">
    					<span v-show="v.shopProperty.safeguard">保</span>
    					<span v-show="v.shopProperty.hummingbird">准</span>
    					<span v-show="v.shopProperty.invoice">票</span>
    				</div>
    			</div>
    			<div class="shop-info">
    				<div>
    					<el-rate
							  v-model="v.averageEvaluate"
							  disabled
							  show-text
							  text-color="#ff9900">
							</el-rate>
							<p>
								月销售{{v.countOrder}}单	
							</p>
    				</div>
    				<div>
    					<span v-show="v.shopProperty.hummingbird" class="blue-border">准时达</span>
    					<span v-show="v.shopProperty.hummingbird" class="blue-background">蜂鸟专送</span>
    				</div>
    			</div>
    			<div class="shop-price">
    				<div class="gray">
    					￥{{v.startCost}}元起送 / 配送费￥{{v.deliveryCost}} / ￥{{v.averageUserCost}}/人
    				</div>
    				<div>
    					<span class="gray">{{(v.distance/1000).toFixed(2) + "Km"}}</span> / <span class="blue">{{v.time}}分钟</span>
    				</div>
    			</div>
    		</div>
    	</div>
    </section>
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex';
	import {getShopTypeList,getShopList} from '../../api/shop.js';
	import {getGreatCircleDistance} from '../../tool/computdistance.js';
	export default{
		data(){
			return {
				shopTypeList:[],
				shopList:[]
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
					//将店铺类型分割成8个一组的多个数组
					for(let i = 0; i<res.data.data.length; i += 8){
						_this.shopTypeList.push(res.data.data.slice(i,i+8));
					}
				})
				.catch((error) => {
					console.log(error)
				})
			},
			loadShopList(){
				const _this = this;
				getShopList().then((res) => {
					console.log(res);
					res.data.data.forEach((e) => {
						//计算评价平均值
						const {serveEvaluate,foodEvaluate} = e;
						let averageEvaluate = parseFloat(((serveEvaluate+foodEvaluate) / 2).toFixed(2));
						e.averageEvaluate = averageEvaluate;
						// 计算商家与用户之间的距离
						let {latitude:lat1,longitude:log1} = e;
						let {lat:lat2,lng:log2} = _this.tempAddress.location;
						const distance = getGreatCircleDistance(lat1,log1,lat2,log2);
						e.distance = distance;
						// 计算配送时间
						let time = parseInt(parseFloat((e.distance/1000).toFixed(2)) * 15);
						if(time < 20) {
							time = 20;
						}
						e.time = time;
						_this.shopList.push(e);3
					});
					console.log(_this.shopList)
				})
				.catch((error) => {
					console.log(error)
				})
			}
		},
		created(){
			this.loadShopTypeList();
			this.loadShopList();
		}
	}
</script>
<style lang='scss' scope>
  @import '../../assets/css/common/tool';
  @import '../../assets/css/common/responsive';
  @import '../../assets/css/common/public';
	.headAddress{
		@include remCalc("padding",4px,8px);
		@include ellipsis;
	}
	.search{
		background: $blue;
		@include remCalc("padding",30px,20px);
		input{
			width: 100%;
			border: none;
			@include remCalc("height",120px);
			@include remCalc("border-radius",60px);
			@include remCalc("padding",0,50px);
		}
	}
	.swiper-wrapper{
		@include remCalc("height",530px);
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
					@include remCalc("margin",10px,0);
				}
				img{
					display: block;
					margin: 0 auto;
					@include remCalc("width",180px);
				}
			}
		}
	}
	.grayLine{
		width: 100%;
		background: #e5e5e5;
		@include remCalc("height",30px);
	}
	.shop-wrapper{
		.title{
			border-bottom: 1px solid #e5e5e5;
			h2{
				font-weight: bold;
				@include remCalc("padding",10px,20px);
			}
		}
		.shop{
			display: flex;
			flex-direction:row;
			flex-wrap:nowrap;
	    justify-content: space-between;
			.img{
				padding:15px;
				img{
					@include remCalc('height',240px);
					@include remCalc('width',240px);
				}
			}
			.shop-detail{
				flex:1;
				@include remCalc('padding-right',20px);
				.shop-header{
					padding:5px;
					display: flex;
					justify-content:space-between;
					h2{
						max-width: 3rem;
						font-weight: bold;
						@include ellipsis;
						@include remCalc('height',96px);
						@include remCalc('line-height',96px);
						@include remCalc("font-size",50px);
						&.isbrand{
							position: relative;
							@include remCalc('padding-left',80px);
							&:before{
								content:"品牌";
								display: inline-block;
								left:0;
								line-height: 1;
								@extend .yellow-background;
								@include tb-center(absolute);

							}
						}
					}
					div{
						span{
							display: inline-block;
							color:#c1c1c1;
							@include remCalc('height',48px);
							@include remCalc('width',48px);
							@include remCalc('line-height',48px);
							@include tb-center(relative);
						}
					}
				}
				.shop-info{
					display: flex;
					flex-direction:row;
					flex-wrap:nowrap;
			    justify-content: space-between;
			    .el-rate{
			    	@include remCalc('height',40px);
			    }
					.el-rate__icon{
						@include remCalc('font-size',30px);
					}
					.el-rate__text{
						@include remCalc('font-size',40px);
						@include remCalc('margin-right',20px);
					}
					>div{
						display: flex;
						>p{
							@include remCalc('font-size',30px)
						}
						.blue-border{
							@include remCalc('margin-right',8px)
						}
					}
				}
				.shop-price{
					display: flex;
					justify-content:space-between;
					@include remCalc('margin-top',20px);
					>div,>div span{
						@include remCalc('font-size',30px);
					}
				}
			}
		}
	}
</style>
