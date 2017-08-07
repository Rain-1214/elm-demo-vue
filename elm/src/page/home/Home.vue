<template>
	<div id="home">
		<mt-header>
      <section class="headAddress " slot="left" @click="$router.push('/location')">
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
    	<div class="shop" v-for="(v,i) in shopList" @click="toShopDetail(v)">
    		<div class="img">
    			<img :src="v.shopLogo">
    		</div>
    		<div class="shop-detail">
    			<div class="shopList-header">
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
		<mt-tabbar>
		  <mt-tab-item id="外卖" class="active">
		    <img slot="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNDAgNDAiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYyIgeDE9IjUwJSIgeDI9IjUwJSIgeTE9IjEwMCUiIHkyPSIwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzJCQUVGRiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwOTVGRiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJkIiB4MT0iNTAlIiB4Mj0iNTAlIiB5MT0iMTAwJSIgeTI9IjAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMjlBREZGIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDA5NUZGIi8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBpZD0iYSIgZD0iTTMwLjQyNiAyMi4wOTVsMi42NzggNS43NDIgMi45NDMtMS4zNzJhMy4xNzMgMy4xNzMgMCAwIDAgMS41MzctNC4yMTJsLTEuMzM5LTIuODcxLTUuODE5IDIuNzEzeiIvPjxtYXNrIGlkPSJlIiB3aWR0aD0iOS40NTUiIGhlaWdodD0iMTAuNDU2IiB4PSItMSIgeT0iLTEiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yOS40MjYgMTguMzgyaDkuNDU1djEwLjQ1NmgtOS40NTV6Ii8+PHVzZSB4bGluazpocmVmPSIjYSIvPjwvbWFzaz48cGF0aCBpZD0iYiIgZD0iTTI4LjA3NCAzMC4xNjFjLTEuMjI0LS40OS0yLjQwNC0uMzItMy40OS4xODUtNi4zODMgMi45NzctMTMuOTM4LjI4Ni0xNi44NzUtNi4wMS0yLjkzNi02LjI5Ny0uMTQtMTMuODE1IDYuMjQzLTE2Ljc5MiA1LjIxMS0yLjQzIDExLjIwMy0xLjA4MyAxNC44MjUgMi45MTlsLTEyLjI2MyA1LjcxOGMtMS41OTYuNzQ1LTIuMjk1IDIuNjI0LTEuNTYxIDQuMTk4LjczNCAxLjU3NCAyLjYyNSAyLjI0NiA0LjIyIDEuNTAzbDguNDIyLTMuOTI4IDkuOTUzLTQuNjQxYTE4Ljc4IDE4Ljc4IDAgMCAwLS45NDEtMi40NTNDMzIuMjAyIDEuNDE2IDIwLjg2OS0yLjYyIDExLjI5NCAxLjg0NCAxLjcxOCA2LjMwOS0yLjQ3NCAxNy41ODYgMS45MyAyNy4wM2M0LjQwNCA5LjQ0NSAxNS43MzcgMTMuNDgyIDI1LjMxMyA5LjAxNyAxLjA2OS0uNDk5IDIuMDY3LS44NzkgMy40MzgtMS43NDQgMCAwLTEuMzgyLTMuNjUxLTIuNjA3LTQuMTQyeiIvPjxtYXNrIGlkPSJmIiB3aWR0aD0iMzguNzY5IiBoZWlnaHQ9IjM5LjI0MSIgeD0iLS43IiB5PSItLjciPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0tLjUyMS0uNjc1aDM4Ljc2OXYzOS4yNDFILS41MjF6Ii8+PHVzZSB4bGluazpocmVmPSIjYiIvPjwvbWFzaz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIj48dXNlIGZpbGw9InVybCgjYykiIHhsaW5rOmhyZWY9IiNhIi8+PHVzZSBzdHJva2U9InVybCgjZCkiIHN0cm9rZS13aWR0aD0iMiIgbWFzaz0idXJsKCNlKSIgeGxpbms6aHJlZj0iI2EiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSI+PHVzZSBmaWxsPSJ1cmwoI2MpIiB4bGluazpocmVmPSIjYiIvPjx1c2Ugc3Ryb2tlPSJ1cmwoI2QpIiBzdHJva2Utd2lkdGg9IjEuNCIgbWFzaz0idXJsKCNmKSIgeGxpbms6aHJlZj0iI2IiLz48L2c+PC9nPjwvc3ZnPg==">
		    外卖
		  </mt-tab-item>
		  <mt-tab-item id="订单">
		    <img slot="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNDAgNDAiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNMjAgNDBjMTEuMDQ2IDAgMjAtOC45NTQgMjAtMjBTMzEuMDQ2IDAgMjAgMCAwIDguOTU0IDAgMjBzOC45NTQgMjAgMjAgMjB6Ii8+PG1hc2sgaWQ9ImIiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgeD0iMCIgeT0iMCIgZmlsbD0iI2ZmZiI+PHVzZSB4bGluazpocmVmPSIjYSIvPjwvbWFzaz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLXdpZHRoPSI0IiBtYXNrPSJ1cmwoI2IpIiB4bGluazpocmVmPSIjYSIvPjxwYXRoIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTIuNzkgMjguMTI2Yy0xLjUxNS42OC0yLjE2OS4wMTYtMS40NjItMS40ODRsMy45MDUtOC4yODRjLjQ3LS45OTkgMS42NjUtMi4xOTggMi42Ni0yLjY3NWw4LjQ4NC00LjA2NGMxLjQ5Ny0uNzE3IDIuMTUzLS4wOCAxLjQ2IDEuNDM1bC0zLjk1MyA4LjY0Yy0uNDYgMS4wMDYtMS42NDcgMi4xODYtMi42NTUgMi42NGwtOC40NCAzLjc5MnoiLz48cGF0aCBmaWxsPSIjNjY2IiBkPSJNMTUuNjkzIDI0LjYzNmMtLjY5Mi4yNzYtMS4wMi0uMDYtLjc0Ny0uNzQ2bDIuMjEtNC45NDZjLjIyNS0uNTA1LjcyMS0uNjAyIDEuMTIyLS4yMDJsMi41NjMgMi41NjNjLjM5NC4zOTQuMzEuODkzLS4yMDMgMS4xMjJsLTQuOTQ1IDIuMjA5eiIvPjwvZz48L3N2Zz4=">
		    订单
		  </mt-tab-item>
		  <mt-tab-item id="发现">
		    <img slot="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzggMzgiPjxkZWZzPjxyZWN0IGlkPSJhIiB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHJ4PSIyIi8+PG1hc2sgaWQ9ImIiIHdpZHRoPSIzOCIgaGVpZ2h0PSIzOCIgeD0iMCIgeT0iMCIgZmlsbD0iI2ZmZiI+PHVzZSB4bGluazpocmVmPSIjYSIvPjwvbWFzaz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLXdpZHRoPSI0IiBtYXNrPSJ1cmwoI2IpIiB4bGluazpocmVmPSIjYSIvPjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyIiB4PSI3IiB5PSI4IiBmaWxsPSIjNjY2IiByeD0iMSIvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyIiB4PSI3IiB5PSIxNyIgZmlsbD0iIzY2NiIgcng9IjEiLz48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSIyIiB4PSI3IiB5PSIyNiIgZmlsbD0iIzY2NiIgcng9IjEiLz48L2c+PC9zdmc+">
		    发现
		  </mt-tab-item>
		  <mt-tab-item id="我的">
		    <img slot="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzggMzgiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNMTAgMTEuODMzVjguOTk5QTguOTk5IDguOTk5IDAgMCAxIDE5IDBjNC45NyAwIDkgNC4wNCA5IDguOTk5djIuODM0bC0uMDEzLjE5MUMyNy42NTcgMTYuOTgxIDIzLjM2NyAyMSAxOSAyMWMtNC42MTYgMC04LjY0LTQuMDItOC45ODctOC45NzZMMTAgMTEuODMzeiIvPjxtYXNrIGlkPSJjIiB3aWR0aD0iMTgiIGhlaWdodD0iMjEiIHg9IjAiIHk9IjAiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PHBhdGggaWQ9ImIiIGQ9Ik0wIDMyLjY3NUMwIDI2Ljc2MyAxMC4xMzkgMjIgMTkuMDI3IDIyIDI3LjkxNiAyMiAzOCAyNi43NjMgMzggMzIuNzU3djMuMzEyQzM4IDM3LjEzNiAzNy4wOTggMzggMzUuOTk3IDM4SDIuMDAzQy44OTcgMzggMCAzNy4xMzcgMCAzNi4wMzd2LTMuMzYyeiIvPjxtYXNrIGlkPSJkIiB3aWR0aD0iMzgiIGhlaWdodD0iMTYiIHg9IjAiIHk9IjAiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2IiLz48L21hc2s+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjQiPjx1c2UgbWFzaz0idXJsKCNjKSIgeGxpbms6aHJlZj0iI2EiLz48dXNlIG1hc2s9InVybCgjZCkiIHhsaW5rOmhyZWY9IiNiIi8+PC9nPjwvc3ZnPg==">
		    我的
		  </mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
	import * as type from '../../store/mutation-types.js'
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
			//获取店铺类型
			loadShopTypeList(){
				getShopTypeList().then((res) => {
					console.log(res);
					//将店铺类型分割成8个一组的多个数组
					for(let i = 0; i<res.data.data.length; i += 8){
						this.shopTypeList.push(res.data.data.slice(i,i+8));
					}
				})
				.catch((error) => {
					console.log(error)
				})
			},
			//获取所以店铺列表
			loadShopList(){
				getShopList().then((res) => {
					console.log(res);
					res.data.data.forEach((e) => {
						//计算评价平均值
						const {serveEvaluate,foodEvaluate} = e;
						let averageEvaluate = parseFloat(((serveEvaluate+foodEvaluate) / 2).toFixed(2));
						e.averageEvaluate = averageEvaluate;
						// 计算商家与用户之间的距离
						let {latitude:lat1,longitude:log1} = e;
						let {lat:lat2,lng:log2} = this.tempAddress.location;
						const distance = getGreatCircleDistance(lat1,log1,lat2,log2);
						e.distance = distance;
						// 计算配送时间
						let time = parseInt(parseFloat((e.distance/1000).toFixed(2)) * 15);
						if(time < 20) {
							time = 20;
						}
						e.time = time;
						this.shopList.push(e);
					});
					console.log(this.shopList)
				})
				.catch((error) => {
					console.log(error)
				})
			},
			toShopDetail(shop){
				this.$store.commit(type.ALERT_CURRENTSHOP,shop);
				this.$router.push('/shop');
			}
		},
		created(){
			this.loadShopTypeList();
			this.loadShopList();
		}
	}
</script>
<style lang='scss'>
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
				.shopList-header{
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
	.mint-tab-item{
		@include remCalc('padding',14px,0);
		&.active{
			color:$blue;
		}
		.mint-tab-item-icon{
			@include remCalc('width',60px);
			@include remCalc('height',60px);
			@include remCalc('margin-bottom',20px);
		}
		.mint-tab-item-label{
			@include remCalc('font-size',32px);
		}
	}
</style>
