<template>
  <div id="map">
    <mt-header>
      <section slot="left" @click="goBack()">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <div id="baiduMap"></div>
    <section class="mapSearch">
      <input type="text"
             v-model="searchText"
             placeholder="输入搜索地址"
             @focus="btnShow = false"
             @blur="btnShow = true">
      <ul v-show="searchResult.length !== 0">
        <li v-for="(v,i) in searchResult" :key="i" @click="showAddressOnMap(v)">
          {{v.name}}
          <p>{{v.city}}，{{ v.district }}</p>
        </li>
      </ul>
    </section>
    <section class="btn" v-show="btnShow">
      <el-button type="success" @click="goBack()">就是这</el-button>
    </section>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { searchAddress } from '../../../api/location';

  export default {
    data() {
      return {
        searchText: '',
        searchResult: [],
        selectAddress: {},
        map: {},
        btnShow: false,
      };
    },
    computed: {
      ...mapGetters(['tempAddress']),
    },
    watch: {
      async searchText() {
        let currentLocation = this.tempAddress.city;
        currentLocation = encodeURIComponent(currentLocation);
        const searchText = encodeURIComponent(this.searchText);
        const data = { currentLocation, searchText };
        try {
          const res = await searchAddress(data);
          this.searchResult = JSON.parse(res.data.data).result;
        } catch (e) {
          console.log(e);
        }
      },
    },
    methods: {
      goBack() {
        this.$emit('closeMap', this.selectAddress);
      },
      showAddressOnMap(v) {
        this.map.clearOverlays();
        const point = new BMap.Point(v.location.lng, v.location.lat);
        this.map.centerAndZoom(point, 20);
        const marker = new BMap.Marker(point);
        const addressText = v.name;
        const label = new BMap.Label(addressText);
        marker.setLabel(label);
        this.map.addOverlay(marker);
        this.selectAddress = { ...this.selectAddress, ...v };
        this.searchResult.splice(0);
        this.btnShow = true;
      },
    },
    created() {
      /* eslint-disable no-undef */
      const script = document.createElement('script');
      const APPKEY = 'MEtzlp4Z676qc00i1YwWOv81nRlHsKt8';
      script.src = `http://api.map.baidu.com/api?v=2.0&ak=${APPKEY}`;
      script.id = 'map1';
      script.type = 'text/javascript';
      document.querySelector('head').appendChild(script);
      window.BMap_loadScriptTime = new Date().getTime();
      const newScript = document.createElement('script');
      newScript.src = `http://api.map.baidu.com/getscript?v=2.0&ak=${APPKEY}`;
      newScript.id = 'map2';
      document.querySelector('head').appendChild(newScript);
      /* eslint-disable no-multi-assign */
      const that = this;
      newScript.onload = newScript.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          const map = new BMap.Map('baiduMap');
          map.centerAndZoom(that.tempAddress.city, 12);
          map.enableDragging();
          that.map = map;
          newScript.onload = newScript.onreadystatechange = null;
        }
      };
    },
    destroyed() {
      const map1 = document.querySelector('#map1');
      const map2 = document.querySelector('#map2');
      const head = document.querySelector('head');
      head.removeChild(map1);
      head.removeChild(map2);
    },
  };
</script>
<style lang="scss">

  @import '../../../assets/css/common/_tool.scss';
  @import '../../../assets/css/common/_responsive.scss';

  #map{
    width: 100%;
    height: 100%;
    
    #baiduMap{
      width: 100%;
      height: 100%;
    }
    .mapSearch{
      width: 90%;
      z-index: 9999;
      left: 0;
      @include lr-center-transform(fixed);
      @include remCalc('top',60px);
      input{
        width: 100%;
        border:none;
        @include remCalc('border-radius',40px);
        @include remCalc('height',40px);
        @include remCalc('padding',0,20px);
      }
      ul{
        display: block;
        width: 100%;
        background: #fff;
        @include remCalc('height',350px);
        overflow-y: scroll;
        li{
          border-bottom:1px solid #ccc;
          @include remCalc('padding',5px,10px);
          p{
            color: #ccc;
          }

        }
      }
    }
    .btn{
      position: fixed;
      width: 90%;
      z-index: 9999;
      left: 0;
      @include lr-center-transform(fixed);
      @include remCalc('bottom',40px);
      button{
        @include remCalc('padding',10px,40px);
        @include remCalc('border-radius',102px);
        @include lr-center-transform(relative);
        span{
          @include remCalc('font-size',20px);
        }
      }
    }
  }

</style>

