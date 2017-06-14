<template>
	<div id="location">
		<mt-cell title="当前定位城市" value="定位不准时请手动选择"></mt-cell>		
		<mt-cell :title="currentLocation" is-link to='/searchAddress'>
			<i v-show="loadShow" slot="icon" class="el-icon-loading"></i>
		</mt-cell>

		<div class="allCity">
			<div class="title">
				<p>热门城市</p>
			</div>
			<ul>
				<router-link v-for="(e,i) in hotCity" tag="li" to="/searchAddress">
					{{e}}
				</router-link>
			</ul>		
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex'
	import * as types from '../../store/mutation-types.js';
	import axios from 'axios'

	export default{
		data(){
			return {
				loadShow:true,
				hotCity:[]
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
					navigator.geolocation.getCurrentPosition((position) => {

						const {latitude,longitude} = position.coords
						_this.$store.dispatch('getLocation',{latitude,longitude})
						_this.loadShow = false;

					},(error) => {

						const [latitude,longitude] = [31.1697816,121.55880439999999]
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
				const _this = this;
				axios.post('/ElmPro/location/getHotCity.do').then((res) => {
					_this.hotCity = res.data.data;
				})
				.catch((error) => {
					console.log(error);
				})

			}
		},
		created(){
			this.loadLocation();
			this.loadHotCity();
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
			li{
				width: 20%;
				float: left;
				padding:15px;
				color: $blue;
				text-align: center;
				border-right:1px solid #e5e5e5;
				border-bottom:1px solid #e5e5e5;
				&:nth-child(5n){
					border-right:none;
				}
			}
		}
	}
</style>