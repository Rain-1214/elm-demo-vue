<template>
  <div id="map">
    <mt-header>
      <section slot="left" @click="close()">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <div id="baiduMap"></div>
    <section class="search">
      <input type="text">
      <ul>
        <li>结果</li>
      </ul>
    </section>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters(['tempAddress']),
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
    created() {
      /* eslint-disable no-undef */
      const script = document.createElement('script');
      const APPKEY = 'MEtzlp4Z676qc00i1YwWOv81nRlHsKt8';
      script.src = `http://api.map.baidu.com/api?v=2.0&ak=${APPKEY}`;
      script.id = 'script1';
      script.type = 'text/javascript';
      document.querySelector('head').appendChild(script);
      window.BMap_loadScriptTime = new Date().getTime();
      const newScript = document.createElement('script');
      newScript.src = `http://api.map.baidu.com/getscript?v=2.0&ak=${APPKEY}`;
      document.querySelector('head').appendChild(newScript);
      /* eslint-disable no-multi-assign */
      newScript.onload = newScript.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          const map = new BMap.Map('baiduMap');
          map.centerAndZoom('上海', 12);
          map.enableDragging();
          newScript.onload = newScript.onreadystatechange = null;
        }
      };
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
    .search{
      position: fixed;
      width: 90%;
      z-index: 9999;
      left: 0;
      @include lr-center-transform('fixed');
      @include remCalc('top',180px);
      input{
        width: 100%;
      }
    }
  }

</style>

