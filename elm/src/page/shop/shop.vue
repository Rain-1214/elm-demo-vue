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
		    <el-tab-pane label="商品" name="product">
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
												<header>
													{{item.foodName}} 
													<span 
													class="yellow-border" 
													v-if="item.foodPropertyList.length != 0">
														多规格
													</span>
												</header>
												<section class="gray">月售{{item.countMonth}}份 好评率{{item.goodEvaluate * 100}}%</section>
												<section>{{item.foodInfo}}</section>
												<section class="price">
													<span>￥{{item.price}}</span>
													<div class="pull-right">
														<div v-show="item.foodPropertyList.length === 0?true:
															shoppingCartProducts[currentShop.id]?
															shoppingCartProducts[currentShop.id].foodIdList?
															shoppingCartProducts[currentShop.id].foodIdList.has(item.id)?true:false:false:false
															">

															<button class="minus" 
															v-show="shoppingCartProducts[currentShop.id]?
															shoppingCartProducts[currentShop.id].foodIdList?
															shoppingCartProducts[currentShop.id].foodIdList.has(item.id)?true:false:false:false">-</button>

															<span v-show="shoppingCartProducts[currentShop.id]?
															shoppingCartProducts[currentShop.id].foodIdList?
															shoppingCartProducts[currentShop.id].foodIdList.has(item.id)?true:false:false:false">
																{{
																shoppingCartProducts[currentShop.id]?
																shoppingCartProducts[currentShop.id][item.id]?
																shoppingCartProducts[currentShop.id][item.id]:0:0}}
															</span>
															<button class="plus" @click='addToShopping(item)'>+</button>
														</div>
														<div v-show="item.foodPropertyList.length === 0?false:
															shoppingCartProducts[currentShop.id]?
															shoppingCartProducts[currentShop.id].foodIdList?
															shoppingCartProducts[currentShop.id].foodIdList.has(item.id)?false:true:true:true">
															<button class="blue-background" @click="showSelect(item)">选规格</button>
														</div>
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
		    <el-tab-pane label="评价" name="evaluate">
		    	<section class="evaluate" :style="{'height':computedHeight}">
		    		2222
		    	</section>
		    </el-tab-pane>
		  </el-tabs>
		</section>
		<mt-popup
		  v-model="selectFoodType"
		  popup-transition="popup-fade">
		  <div class="foodtype">
		  	<div class="close" @click = "selectFoodType = false">
		  		<i class="el-icon-close"></i>
		  	</div>
		  	<h1 class="text-center">{{foodType.foodName}}</h1>
		  	<template v-for="(v,i) in foodType.foodPropertyList">
			  	<h2>{{v.typeName}}</h2>
			  	<ul>
			  		<li 
			  		:class="{'active':selectArray[i][index]}" 
			  		v-for="(item,index) in v.foodPropertyDetail"
			  		@click="changeSelect(i,index)">
			  			{{item.name}}
			  		</li>
			  	</ul>
		  	</template>
		  	<div class="last-price">
		  		<span>￥ {{currentPopupProductPrice}}</span>
		  		<el-button type="primary" @click = 'addToShopping()'>添加到购物车</el-button>
		  	</div>
		  </div>
		</mt-popup>
		
	</div>
</template>
<script>
	
	import * as _ from 'lodash';
	import * as type from '../../store/mutation-types.js';
	import {getShopFoodTypeList} from '../../api/shop.js';
	import {mapGetters} from 'vuex'

	export default{
		name:'shop',
		data(){
			return {
				shopInfo:{},
				tag:'product', //商品与评价切换
				computedHeight:'', //商品组件高度
				shopFoods:[], //店铺所有食物
				selectFoodType:false, //多规格商品弹出框控制变量
				selectArray:[], //多规格商品的已选择状态数组
				foodType:{}, //多规格商品的类型对象
				currentPopupProductPrice:0.00,
			}
		},
		computed:{
			...mapGetters(['shoppingCartProducts','currentShop']),
		},
		methods:{
			handleClick(tab, event) {
        console.log(tab, event);
      },
      productScroll:_.throttle((event) => {
      	console.log(event.srcElement.scrollTop)
      },100),
      showSelect(e){
      //读取多规格商品的具体类型
    	this.selectArray.splice(0);
    	e.foodPropertyList.forEach((e) => {
    		let tempArray = new Array(e.foodPropertyDetail.length);
    		tempArray.fill(false);
    		tempArray[0] = true;
    		this.selectArray.push(tempArray);
    	});
    	Object.assign(this.foodType,e);
    	//计算商品默认状态价格
    	let productTypePrice = 0;
    	this.foodType.foodPropertyList.forEach((e) => {
    		productTypePrice += e.foodPropertyDetail[0].price;
    	})
    	this.currentPopupProductPrice = this.foodType.price + productTypePrice; 
    	this.selectFoodType = true;

      },
      changeSelect(i,index){
      	// 多规格商品选择时 改变 选择状态
      	if(!this.selectArray[i][index]){
	      	//改变选中状态
      		let trueIndex = this.selectArray[i].indexOf(true);
      		this.selectArray[i].splice(trueIndex,1,false);
      		this.selectArray[i].splice(index,1,true);
      		//改变不同状态下的价格
      		let productTypePrice = 0;
		    	this.foodType.foodPropertyList.forEach((e,i) => {
		    		let newtrueIndex = this.selectArray[i].indexOf(true);
		    		productTypePrice += e.foodPropertyDetail[newtrueIndex].price;
		    	})
		    	this.currentPopupProductPrice = this.foodType.price + productTypePrice; 
      	}
      },
      addToShopping(product=false){
      	//判断商品是否 为多规格商品 以判断是否需要计算价格
      	if (product) {}
      	if (product) {
      		let foodType = '';
      		let foodNum = 1;
      		let {foodName,price,id:foodId} = product; //食物名称 价格 ID
      		let {shopName,id:shopId} = this.currentShop; //当前店铺名称 店铺ID
      		let Data = {foodName,shopId,price,shopName,foodType,foodId,foodNum};
      		this.$store.commit(type.ADD_TO_SHOPPINGCART,Data);
      		this.selectFoodType = false;
      	}else{
      		//判断购物车中是否存在 该店铺 及该食物
      		let foodType = '';
      		let foodNum = 1;
      		this.foodType.foodPropertyList.forEach((element,index) => {
      			const trueIndex = this.selectArray[index].indexOf(true);
      			foodType += `[${element.foodPropertyDetail[trueIndex].name}]`;
      		});
    		  let {foodName,id:foodId} = this.foodType; //食物名称 食物ID
      	  let {shopName,id:shopId} = this.currentShop; //当前店铺名称
     	 	  let price = this.currentPopupProductPrice; //食物价格
      		let Data = {foodName,shopId,price,shopName,foodType,foodId,foodNum};
      		this.$store.commit(type.ADD_TO_SHOPPINGCART,Data);
      		this.selectFoodType = false;
      	}
      },
		},
		filters:{
			computedProductNum(foodId,shoppingCartProducts,currentShop){
				let productNum = 0;
				if(shoppingCartProducts[currentShop.id] && shoppingCartProducts[currentShop.id].foodList){
	      	shoppingCartProducts[currentShop.id].foodList.forEach((e,i) => {
	      		if (e.foodId === foodId) {
	      			productNum = e.foodNum
	      		}
	      	});
	      	return productNum;
				}else{
					return 0;
				}
			}
		},
		created(){
			//初始化时 通过店铺ID获取店铺商品
			const id = this.currentShop.id;
			getShopFoodTypeList({id}).then((res) =>{
				console.log(res);
				this.shopFoods = res.data.data;	
			})
			.catch((error) => {
				console.log(error);
			})
		},
		//计算 底部商品组件的高
		mounted(){
			let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let headerHeight = document.querySelector('.shop-header').offsetHeight;
			let tagHeight = document.querySelector('.el-tabs__header').offsetHeight;
			this.computedHeight = (windowHeight - headerHeight - tagHeight) + "px";
		}

	}

</script>
<style lang='scss'>
	
	@import '../../assets/css/common/tool';
	@import '../../assets/css/common/responsive';

	#shop{
		max-height: 100vh;
		overflow: hidden;
		.foodtype{
			min-width: 80vw;
			@include remCalc('padding',40px);
			.close{
				position: absolute;
				@include remCalc('right',30px);
				@include remCalc('top',30px);
			}
			h1{
				@include remCalc('font-size',60px);
			}
			h2{
				@include remCalc('font-size',50px);
				margin-bottom: 20px;
				margin-top: 20px;
			}
			ul{
				display: flex;
				li{
					@include remCalc('padding',15px,30px);
					@include remCalc('border-radius',50px);
					@include remCalc('margin-right',20px);
					&.active{
						color:$blue;
						border: 1px solid $blue;
					}
				}
			}
			.last-price{
				@include remCalc('padding',20px,0);
				display: flex;
				flex-direction:row;
				flex-wrap:nowrap;
				justify-content: space-between;
				>span{
					color:#f60;
					@include remCalc('font-size',60px);

				}
				button{
					@include remCalc('padding',30px)
				}
			}
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
										span{
											float: right;
											@include remCalc('padding-left',30px);
											@include remCalc('padding-right',30px);
											@include remCalc('border-radius',30px);
										}
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
											.blue-background{
												border:none;
												outline: none;
												@include remCalc('padding-left',30px);
												@include remCalc('padding-right',30px);
												@include remCalc('border-radius',30px);
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
	}
	
</style>