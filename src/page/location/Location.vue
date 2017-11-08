<template>
  <div id="location">
    <mt-header title="选择城市"></mt-header>
    <mt-cell title="当前定位城市" value="定位不准时请手动选择"></mt-cell>		
    <mt-cell :title="currentLocation" @click.native="popupVisible=true">
      <i v-show="loadShow" slot="icon" class="el-icon-loading"></i>
    </mt-cell>

    <div class="allCity">
      <div class="title">
        <p>热门城市</p>
      </div>
      <ul class="hot">
        <li v-for="(e,i) in hotCity" :key="i" @click="toSearchAddress(e)">
          {{e}}
        </li>
      </ul>		
    </div>
    
    <div class="allCity" v-for='(v,k) in allCity' :key="k">
      <div class="title">
        {{k}}
      </div>
      <ul>
        <li v-for="(e,i) in v" :key="e.name" @click="toSearchAddress(e.name)">
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
  import { mapGetters } from 'vuex';
  import { getHotCity, getAllCity } from '../../api/location';
  import * as types from '../../store/mutation-types';
  import SearchAddress from './children/SearchAddress.vue';

  export default{
    data() {
      return {
        loadShow: true, // 获取定位过程的显示的loading
        popupVisible: false, // 搜索地址页是否显示
        hotCity: [], // 热门城市数据
        allCity: {}, // 全部城市数据
        getLocationFromBrowser: true, // 判断用户是否在等待获取地址
      };
    },
    computed: {
      ...mapGetters([
        'currentLocation',
        'latitude',
        'longitude',
      ]),
    },
    methods: {
      toSearchAddress(address) {
        this.$store.commit(types.ALERT_LOCATION, { currentLocation: address, latitude: '', longitude: '' });
        this.getLocationFromBrowser = false;
        this.popupVisible = true;
      },

      afreshDate() {
        this.$store.commit(types.ALERT_LOCATION, { currentLocation: '', latitude: '', longitude: '' });
        this.popupVisible = false;
        this.getLocationFromBrowser = true;
        this.loadShow = true;
        this.loadLocation();
      },

      loadLocation() {
        if (this.currentLocation === '') {
          // 从浏览器获取地理位置
          /* eslint-disable no-undef */
          navigator.geolocation.getCurrentPosition((position) => {
            if (this.getLocationFromBrowser) {
              const { latitude, longitude } = position.coords;
              this.$store.dispatch('getLocation', { latitude, longitude });
              this.loadShow = false;
            }
          }, () => {
            // 没获取到用一个默认地址
            if (this.getLocationFromBrowser) {
              const [latitude, longitude] = [31.1697816, 121.55880439999999]; // 上海市浦东新区
              this.$store.dispatch('getLocation', { latitude, longitude });
              this.loadShow = false;
            }
          }, {
            enableHighAccuracy: true, // 是否获取高精度结果  
            timeout: 3000, // 超时,毫秒  
            maximumAge: 0, // 可以接受多少毫秒的缓存位置  
          });
        } else {
          this.loadShow = false;
        }
      },

      async loadHotCity() {
        // 从后台获取热门城市列表
        try {
          const res = await getHotCity();
          this.hotCity = res.data.data;
        } catch (e) {
          console.log(e);
        }
      },
      async loadAllCity() {
        // 从json文件获取所有城市信息并按拼音首字母分割
        try {
          const res = await getAllCity();
          const data = {};
          res.data.forEach((e) => {
            if (data[e.pinyin[0]]) {
              data[e.pinyin[0]].push(e);
            } else {
              const pinyinFirst = e.pinyin[0];
              data[pinyinFirst] = [];
              data[e.pinyin[0]].push(e);
            }
          });
          const newKeys = Object.keys(data).sort();
          const newData = {};
          newKeys.forEach((e) => {
            newData[e] = data[e];
          });
          this.allCity = { ...this.allCity, ...newData };
        } catch (e) {
          console.log(e);
        }
      },
    },
    created() {
      this.loadLocation();
      this.loadHotCity();
      this.loadAllCity();
    },
    components: {
      'search-Address': SearchAddress,
    },
  };
</script>
<style lang='scss' scoped>
  @import "../../assets/css/common/tool";
  @import "../../assets/css/common/responsive";
  .allCity{
    @include remCalc('margin-top',10px);
    .title{
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      @include remCalc('padding',5px,10px);
      @include remCalc('font-size',16px);
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
        text-align: center;
        border-right:1px solid #e5e5e5;
        border-bottom:1px solid #e5e5e5;
        @include remCalc('padding',8px,0px);
        @include remCalc('font-size',12px);
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
    top: 0;
    left: 0;
    transform:none;
  }
</style>