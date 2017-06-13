<template>
	<div id="location">
		<mt-cell title="当前定位城市" value="定位不准时请手动选择"></mt-cell>		
		<mt-cell title="标题文字" is-link></mt-cell>
		{{latitude}}<br>{{longitude}}
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex'
	import * as types from '../../store/mutation-types.js';
	export default{
		data(){
			return {

			}
		},
		computed:{
			...mapGetters([
				'latitude',
				'longitude'
			])
		},
		methods:{

		},
		mounted(){
			const _this = this;
			navigator.geolocation.getCurrentPosition((position) => {
				console.log(position)
				const {latitude,longitude} = position.coords
				_this.$store.commit(types.ALERT_LOCATION,{latitude,longitude});
			},(error) => {
				const [latitude,longitude] = [31.1697816,121.55880439999999]
				_this.$store.commit(types.ALERT_LOCATION,{latitude,longitude});
				console.log(error)		
			},{
			  enableHighAccuracy: true, // 是否获取高精度结果  
        timeout: 5000, //超时,毫秒  
        maximumAge: 0 //可以接受多少毫秒的缓存位置  
			});
		}
	}
</script>
<style lang='scss'>
	
</style>