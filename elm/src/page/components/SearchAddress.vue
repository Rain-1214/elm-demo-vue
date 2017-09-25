<template>
	<div id="SearchAddress">
		<mt-header>
      <section slot="left" @click="close()">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <div class="searchInput">
    	<input type="text" placeholder="请输入地址" v-model.trim="searchText" @input="search()">
    </div>
    <mt-cell title="当前定位城市" :value="currentLocation"></mt-cell>		
    <div class="list" v-for='(v,i) in addressArray' v-show="addressArray.length !== 0">
	    <mt-cell :title="v.name" is-link :label="v.city + ',' + v.district" :key="v.name" @click.native="toHome(v)"></mt-cell>		
    </div>
    <div class="list" v-show="addressArray.length === 0 && searchNum !== 0">
	    <mt-cell title="没有找到相关地址，请尝试更换关键词"></mt-cell>		
    </div>
	</div>
</template>
<script>
	import {searchAddress} from '../../api/location.js';
	import {throttle} from 'lodash'
	import * as types from '../../store/mutation-types.js';
	export default{
		data(){
			return {
				searchText:"",
				addressArray:[],
				searchNum:0,
			}
		},
		props:['currentLocation','latitude','longitude'],
		methods:{
			close(){
				this.$emit('close');
			},
			//函数节流
			search:throttle(function(){
				this.searchNum++;
				let data;
				if(this.latitude != "" && this.longitude != ""){
					//解构赋值
					let {searchText} = this.$data;
					let {currentLocation,latitude,longitude} = this;
					// 转码防止乱码
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
				// 请求解析地址
				searchAddress(data)
				.then((res) => {
					this.addressArray = JSON.parse(res.data.data).result;
				})
				.catch((error) => {
					console.log(error)
				})	
			},1000),
			toHome(address){
				this.$store.commit(types.ALERT_TEMPADDRESS,address);
				this.$router.push('/home')
			}
		},
		created(){
			
		}

	}
</script>
<style lang="scss" scoped>

  @import '../../assets/css/common/tool';
  @import '../../assets/css/common/responsive';

	.searchInput{
		background: $blue;
		padding:15px 0;
		input{
			width: 90%;
			display: block;
			margin: 0 auto;
			border:none;
			outline: none;
			@include remCalc('height',80px);
			@include remCalc('border-radius',40px);
			@include remCalc('padding',0px,30px);
		}
	}
</style>