<template>
	<div id="shop">
		<section class="shop-header">
			<div class="back" @click="$router.go(-1)">
				<i class="el-icon-arrow-left"></i>
			</div>
			<div class="shop-info">
				<div class="img">
					<img src="https://fuss10.elemecdn.com/4/0b/11f8b91e6001e9184236bc3e51354jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/">
				</div>
				<div class="txt">
					<h1>克莉丝汀（上海莲安东路店）</h1>
					<p>蜂鸟专送/31分钟送达/配送费￥5</p>
					<p>公告：欢迎光临，用餐高峰期请提前下单，谢谢</p>
					<i class="el-icon-arrow-right"></i>
				</div>
			</div>
			<div class="activity">
				<p>
					<span class="green-background"> 新</span>新用户下单立减17.0元(不于其他活动叠加)
				</p>
			</div>
		</section>
		<section class="tag" >
			<el-tabs v-model="tag" type="card" @tab-click="handleClick">
		    <el-tab-pane label="商品" name="first">
		   		<section class="products" :style="{height:computedHeight}">
						<div class="list">
							<ul >
								<li class="active">
									热销
								</li>
								<li>
									优惠
								</li>	
								<li v-for = "(v,i) in shopFoods">
									{{v.listName}}
								</li>
							</ul>
						</div>
						<div class="product-wrapper" @scroll="productScroll($event)">
							<ul>

								<li v-for ="(v,i) in shopFoods">
									<p>{{v.listName}}<span>{{v.description}}</span></p>		
									<ul>
										<li v-for ="(item,index) in v.foodList">
											<div class="food-img">
												<img :src="item.foodPic">
											</div>
											<div class="food-detail">
												<header>{{item.foodName}}</header>
												<section class="gray">月售{{item.countMonth}}份 好评率{{item.goodEvaluate * 100}}%</section>
												<section>{{item.foodInfo}}</section>
												<section class="price">
													<span>￥{{item.price}}</span>
													<div class="pull-right">
														<button class="minus">-</button>
														<span>1</span>
														<button class="plus">+</button>
													</div>
												</section>
											</div>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</section>	
		    </el-tab-pane>
		    <el-tab-pane label="评价" name="second">
		    	<section class="evaluate" :style="{'height':computedHeight}">
		    		2222
		    	</section>
		    </el-tab-pane>
		  </el-tabs>
		</section>
		
		
	</div>
</template>
<script>
	
	import * as _ from 'lodash';
	import {getShopFoodTypeList} from '../../api/shop.js';

	export default{
		name:'shop',
		data(){
			return {
				tag:'first',
				computedHeight:'',
				shopFoods:[]

			}
		},
		computed:{
			
		},
		methods:{
			handleClick(tab, event) {
        console.log(tab, event);
      },
      productScroll:_.throttle((event) => {
      	console.log(event.srcElement.scrollTop)
      },100)
		},
		created(){
			const _this = this;
			getShopFoodTypeList({id:1}).then((res) =>{
				_this.shopFoods = res.data.data;	
			})
			.catch((error) => {
				console.log(error);
			})
		},
		mounted(){
			let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let headerHeight = document.querySelector('.shop-header').offsetHeight;
			let tagHeight = document.querySelector('.el-tabs__header').offsetHeight;
			this.computedHeight = (windowHeight - headerHeight - tagHeight) + "px";
		}

	}

</script>
<style lang='scss' >
	
	@import '../../assets/css/common/tool';
	@import '../../assets/css/common/responsive';
	
	

	#shop{
		max-height: 100vh;
		overflow: hidden;
	}

	.shop-header{
		background: $blue;
		@include remCalc('height',407px);
		@include remCalc('padding',20px);
		.back{
			color: #fff;
			@include remCalc('margin-bottom',20px);
			i{
				@include remCalc('font-size',48px);
			}
		}
		.shop-info{
			display: flex;
			flex-direction:row;
			flex-wrap:nowrap;
			.img{
				@include remCalc('width',240px);
				img{
					width: 100%;
				}
			}
			.txt{
				display: flex;
				flex-direction:column;
				flex:1;
				color: #fff;
				position: relative;
				@include remCalc('padding-left',40px);
				h1,p{
					display: block;
				}
				h1{
					font-weight: bold;
					@include remCalc('font-size',52px);
					@include remCalc('margin-bottom',20px);
					@include ellipsis;
				}
				p{
					@include remCalc('font-size',30px)
					@include remCalc('margin',10px,0)
					@include ellipsis;
				}
				i{
					@include remCalc('right',20px);
					@include tb-center(absolute);
				}
			}
		}
		.activity{
			color: #fff;
			p{
				@include ellipsis;
				span{
					margin-right: 10px;
				}
			}
		}
	}
	.tag{
		.el-tabs__header{
			margin: 0;
		}
		.el-tabs__nav{
			float: none !important;
			width: 100% !important;
			.el-tabs__item{
				width: 50%;
				height: auto;
				line-height: 1;
				text-align: center;
				@include remCalc('font-size',58px);
				@include remCalc('padding',40px,0);
				&.is-active{
					&:after{
						content: "";
						display: block;
						background: $blue;
						@include lr-center-transform(absolute);
						@include remCalc('bottom',20px);
						@include remCalc('width',116px);
						@include remCalc('height',6px);
					}
				}
			}
		}
	}
	.products{
		display: flex;
		flex-direction:row;
		flex-wrap:nowrap;
		.list{
			height: 100%;
			overflow-y: auto;
			background: #ededed;
			@include remCalc('width',240px);

			ul{
				li{
					@include remCalc('font-size',38px);
					@include remCalc('padding',40px,30px);
					&.active{
						background: #fff;
						border-left: 8px solid $blue;
					}
				}
			}
		}
		.product-wrapper{
			flex:1;
			height: 100%;
			overflow-y: auto;
			>ul{
				>li{
					>p{
						background: #f1f1f1;
						@include remCalc('padding',26px,42px);
						@include remCalc('font-size',36px);
						span{
							color: #999;
							@include remCalc('font-size',28px);
						}
					}
					>ul{
						>li{
							display: flex;
							.food-img{
								flex:2;
								@include remCalc('padding',30px)
							}
							.food-detail{
								flex:8;
								@include remCalc('padding',30px,15px)
								header{
									font-weight: bold;
									@include remCalc('font-size',48px);
								}
								section{
									margin:10px 0;
									&.gray{
										color: #666;
									}
									>span{
										color: #f60;
										@include remCalc('font-size',42px);
									}
								}
								.price{
									display: flex;
									justify-content: space-between;
									>span{
										display: block;
									}
									.pull-right{
										display: flex;
										span{
											text-align: center;
											overflow: hidden;
											@include remCalc('line-height',58px);
											@include remCalc('margin-left',25px);
											@include remCalc('margin-right',25px);
											@include remCalc('font-size',42px);
											@include remCalc('min-width',40px);
											@include remCalc('max-width',100px);
										}
										.minus{
											background: #fff;
											border-radius: 50%;				
											border:1px solid $blue;
											color: $blue;			
											@include remCalc('width',58px);
											@include remCalc('height',58px);
										}
										.plus{
											background: $blue;
											border-radius: 50%;
											color: #fff;
											border:none;
											@include remCalc('width',58px);
											@include remCalc('height',58px);	
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>