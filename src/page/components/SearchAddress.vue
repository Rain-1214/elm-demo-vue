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
    <div class="list" v-for='(v,i) in addressArray' 
    v-show="addressArray.length !== 0"
    :key="v.name">
      <mt-cell :title="v.name" is-link :label="v.city + ',' + v.district" :key="v.name" @click.native="toHome(v)"></mt-cell>		
    </div>
    <div v-show="addressArray.length === 0 && searchNum !== 0">
      <mt-cell title="没有找到相关地址，请尝试更换关键词"></mt-cell>		
    </div>
  </div>
</template>
<script>
  import { throttle } from 'lodash';
  import { searchAddress } from '../../api/location';
  import * as types from '../../store/mutation-types';

  export default{
    data() {
      return {
        searchText: '',
        addressArray: [],
        searchNum: 0,
      };
    },
    props: ['currentLocation', 'latitude', 'longitude'],
    methods: {
      close() {
        this.$emit('close');
      },
      // 函数节流
      search: throttle(async function () {
        this.searchNum += 1;
        let data;

        if (this.latitude !== '' && this.longitude !== '') {
          // 解构赋值
          let { searchText } = this.$data;
          let { currentLocation } = this;
          const { latitude, longitude } = this;
          // 转码防止乱码
          searchText = encodeURIComponent(searchText);
          currentLocation = encodeURIComponent(currentLocation);

          data = { searchText, currentLocation, latitude, longitude };
        } else {
          let { searchText } = this.$data;
          let { currentLocation } = this;

          searchText = encodeURIComponent(searchText);
          currentLocation = encodeURIComponent(currentLocation);

          data = { searchText, currentLocation };
        }
        // 请求解析地址
        try {
          const res = await searchAddress(data);
          this.addressArray = JSON.parse(res.data.data).result;
        } catch (e) {
          console.log(e);
        }
      }, 1000),
      toHome(address) {
        this.$store.commit(types.ALERT_TEMPADDRESS, address);
        this.$router.push('/home');
      },
    },
    created() {
    },
  };
</script>
<style lang="scss" scoped>

  @import '../../assets/css/common/tool';
  @import '../../assets/css/common/responsive';

  .searchInput{
    background: $blue;
    @include remCalc('padding',10px,0);
    input{
      width: 90%;
      display: block;
      margin: 0 auto;
      border:none;
      outline: none;
      @include remCalc('height',30px);
      @include remCalc('border-radius',20px);
      @include remCalc('padding',0px,15px);
    }
  }
  .mint-cell:last-child{
    background: none !important;
  }
</style>