<template>
	<div id="SearchAddress">
		<mt-header>
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <div class="searchInput">
    	<input type="text" placeholder="请输入地址" v-model.trim="searchText" @input="search()">
    </div>
    <mt-cell title="当前定位城市" :value="currentLocation"></mt-cell>		
    <div class="list" v-for='(v,i) in addressArray'>
	    <mt-cell :title="v.name" is-link :label="v.city + ',' + v.district" :key="v"></mt-cell>		
    </div>
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex';
	import {searchAddress} from '../../api/location.js';
	import _ from 'lodash'
	import * as types from '../../store/mutation-types.js';


	export default{
		data(){
			return {
				searchText:"",
				addressArray:[]
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
			search:_.throttle(function(){
				let data;
				const _this = this;
				if(this.latitude != "" && this.longitude != ""){
					let {searchText} = this.$data;
					let {currentLocation,latitude,longitude} = this;
					searchText = encodeURIComponent(searchText);
					currentLocation = encodeURIComponent(currentLocation);
					data = {searchText,currentLocation,latitude,longitude};
				}else{
					let {searchText} = this.$data;
					let {currentLocation} = this;
					searchText = encodeURIComponent(searchText);
					currentLocation = encodeURIComponent(currentLocation);
					data = {searchText,currentLocation}
				}
				searchAddress(data)
				.then((res) => {
					console.log(JSON.parse(res.data.data))
					_this.addressArray = JSON.parse(res.data.data).result;
					console.log(_this.addressArray)
				})
				.catch((error) => {
					console.log(error)
				})	
			},3000)
		},
		created(){
			this.$store.commit(types.ALERT_LOCATION,{currentLocation:this.$route.params.city})
		}

	}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/common/tool';
  header{

  }
	.searchInput{
		background: $blue;
		padding:15px 0;
		input{
			height: 40px;
			width: 90%;
			display: block;
			margin: 0 auto;
			border-radius: 20px ;
			padding:0 15px;
			border:none;
			outline: none;
		}
	}
</style>