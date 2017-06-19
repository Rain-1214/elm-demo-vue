<template>
	<div id="home">
		<mt-header>
      <section class="headAddress " slot="left">
      	{{tempAddress.city}} {{tempAddress.district}} {{tempAddress.name}} 1111111
      </section>
    </mt-header>
    <section class="search">
    	<input type="text" name="" placeholder="搜索店铺或者商家">
    </section>
    <section class="swiper-wrapper">
    	<mt-swipe :auto="0">
			  <mt-swipe-item>
			  	<div class="item-wrapper">
				  	<div class="item">
				  		<img src="//fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/">
				  		<p>美食</p>
				  	</div>
				  	<div class="item">
				  		<img src="//fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/">
				  		<p>美食</p>
				  	</div>
				  	<div class="item">
				  		<img src="//fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/">
				  		<p>美食</p>
				  	</div>
				  	<div class="item">
				  		<img src="//fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/">
				  		<p>美食</p>
				  	</div>
				  	<div class="item">
				  		<img src="//fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/">
				  		<p>美食</p>
				  	</div>
				  	<div class="item">
				  		<img src="//fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/">
				  		<p>美食</p>
				  	</div>
				  	<div class="item">
				  		<img src="//fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/">
				  		<p>美食</p>
				  	</div>
				  	<div class="item">
				  		<img src="//fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/">
				  		<p>美食</p>
				  	</div>	
			  	</div>
			  </mt-swipe-item>
			  <mt-swipe-item>2</mt-swipe-item>
			  <mt-swipe-item>3</mt-swipe-item>
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
    				<h2>店铺名称</h2>
    				<div class="shop-type">
    					<span>保</span>
    					<span>准</span>
    					<span>票</span>
    				</div>
    			</div>
    		</div>
    	</div>
    </section>
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex';
	export default{
		data(){
			return {

			}
		},
		computed:{
			...mapGetters([
				'tempAddress'
				])
		},

	}
</script>
<style lang='scss' scope>
  @import '../../assets/css/common/tool';
	.headAddress{
		max-width: 180px;
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
			// flex-flow:row wrap;
			// justify-content:flex-start;
			.item{
				width: 25%;
				p{
					text-align: center;
				}
				img{
					display: block;
					margin: 0 auto;
					max-width: 70%;
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
			flex-wrap:wrap;
			.img{
				width: 120px;
				padding:15px;
				img{
					width: 100%;
				}
			}
		}
	}
</style>