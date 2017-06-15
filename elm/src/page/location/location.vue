<template>
	<div id="location">
		<mt-header title="选择城市">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
		<mt-cell title="当前定位城市" value="定位不准时请手动选择"></mt-cell>		
		<mt-cell :title="currentLocation" is-link :to="'/searchAddress/' + currentLocation">
			<i v-show="loadShow" slot="icon" class="el-icon-loading"></i>
		</mt-cell>

		<div class="allCity">
			<div class="title">
				<p>热门城市</p>
			</div>
			<ul class="hot">
				<router-link v-for="(e,i) in hotCity" tag="li" :to="'/searchAddress/' + e.name"  :key="e">
					{{e}}
				</router-link>
			</ul>		
		</div>
		
		<div class="allCity" v-for='(v,k) in allCity' v-show="v.length != 0">
			<div class="title">
				{{k}}
			</div>
			<ul>
				<router-link v-for="(e,i) in v" tag="li" :to="'/searchAddress/' + e.name" :key="e">
					{{e.name}}
				</router-link>
			</ul>
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex'
	import * as types from '../../store/mutation-types.js';
	import {getHotCity,getAllCity} from '../../api/location.js'

	export default{
		data(){
			return {
				loadShow:true,
				hotCity:[],
				allCity:{
					'A':[],
					'B':[],
					'C':[],
					'D':[],
					'E':[],
					'F':[],
					'G':[],
					'H':[],
					'I':[],
					'J':[],
					'K':[],
					'L':[],
					'M':[],
					'N':[],
					'O':[],
					'P':[],
					'Q':[],
					'R':[],
					'S':[],
					'T':[],
					'U':[],
					'V':[],
					'W':[],
					'X':[],
					'Y':[],
					'Z':[],
				}
			}
		},
		computed:{
			...mapGetters([
				'currentLocation'
			])
		},
		methods:{
			loadLocation(){
				const _this = this;
				if(this.currentLocation == ""){
					//从浏览器获取地理位置
					navigator.geolocation.getCurrentPosition((position) => {

						const {latitude,longitude} = position.coords
						_this.$store.dispatch('getLocation',{latitude,longitude})
						_this.loadShow = false;

					},(error) => {
						//没获取到用一个默认地址
						const [latitude,longitude] = [31.1697816,121.55880439999999]//上海市浦东新区
						_this.$store.dispatch('getLocation',{latitude,longitude})
						_this.loadShow = false;

					},{
					  enableHighAccuracy: true, // 是否获取高精度结果  
		        timeout: 5000, //超时,毫秒  
		        maximumAge: 0 //可以接受多少毫秒的缓存位置  
					});		
				}else{
					this.loadShow = false;
				}
				
			},
			loadHotCity(){
				//从后台获取热门城市列表
				const _this = this;
				getHotCity().then((res) => {
					_this.hotCity = res.data.data;
				})
				.catch((error) => {
					console.log(error);
				})
			},
			loadAllCity(){
				//从json问价获取所有城市信息并按拼音首字母分割
				const _this = this;
				getAllCity().then((res) => {
					console.log(res)
					res.data.forEach((e) => {
						_this.allCity[e.pinyin[0]].push(e);
					});
				})
				.catch((error) => {
					console.log(error)
				})
			}
		},
		created(){
			this.loadLocation();
			this.loadHotCity();
			this.loadAllCity();
		}
	}
</script>
<style lang='scss' scope>
	@import "../../assets/css/common/tool";
	.mint-cell-wrapper{
		border-bottom: 1px solid #e5e5e5;
	}
	.allCity{
		margin-top: 20px;
		.title{
			border-top: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
			padding:5px 10px;
		}
		ul{
			@include clear;
			&.hot{
				li{
					color: $blue;
				}
			}
			li{
				width: 20%;
				float: left;
				padding:15px 0; 
				text-align: center;
				border-right:1px solid #e5e5e5;
				border-bottom:1px solid #e5e5e5;
				@include ellipsis;
				&:nth-child(5n){
					border-right:none;
				}
			}
		}
	}
</style>