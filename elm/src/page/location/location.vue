<template>
	<div id="location">
		<mt-header title="选择城市">
    </mt-header>
		<mt-cell title="当前定位城市" value="定位不准时请手动选择"></mt-cell>		
		<mt-cell :title="currentLocation" @click.native="popupVisible=true">
			<i v-show="loadShow" slot="icon" class="el-icon-loading"></i>
		</mt-cell>

		<div class="allCity">
			<div class="title">
				<p>热门城市</p>
			</div>
			<ul class="hot">
				<li v-for="(e,i) in hotCity" :key="e" @click="toSearchAddress(e)">
					{{e}}
				</li>
			</ul>		
		</div>
		
		<div class="allCity" v-for='(v,k) in allCity' v-show="v.length != 0">
			<div class="title">
				{{k}}
			</div>
			<ul>
				<li v-for="(e,i) in v" :key="e" @click="toSearchAddress(e.name)">
					{{e.name}}
				</li>
			</ul>
		</div>

		<mt-popup
		  v-model="popupVisible"
		  position="right"
		  popup-transition="popup-fade">
		  <search-Address 
		  	:currentLocation="currentLocation"
		  	:latitude="latitude"
		  	:longitude="longitude"
		  	@close="afreshDate()"></search-Address>
		</mt-popup>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	import {getHotCity,getAllCity} from '../../api/location.js'
	import * as types from '../../store/mutation-types.js'
	import SearchAddress from '../components/SearchAddress.vue'

	export default{
		data(){
			return {
				loadShow:true,
				popupVisible:false,
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
				'currentLocation',
				'latitude',
				'longitude'
			])
		},
		methods:{
			toSearchAddress(address){
				console.log(address)
				this.$store.commit(types.ALERT_LOCATION,{currentLocation:address,latitude:"",longitude:""});
				this.popupVisible=true;
			},
			afreshDate(){
				this.$store.commit(types.ALERT_LOCATION,{currentLocation:"",latitude:"",longitude:""});
				this.popupVisible = false;
				this.loadShow = true;
				this.loadLocation();
			},
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
				//从json文件获取所有城市信息并按拼音首字母分割
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
		},
		components:{
			'search-Address':SearchAddress,
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
	.mint-popup{
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
	}
</style>