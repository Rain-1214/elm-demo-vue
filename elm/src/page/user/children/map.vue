<template>
  <div id="map">
    <section class="baiduMap">
      <div id="baiduMap"></div>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      };
    },
    created() {
      /* eslint-disable no-undef */
      const script = document.createElement('script');
      const APPKEY = 'MEtzlp4Z676qc00i1YwWOv81nRlHsKt8';
      script.src = `http://api.map.baidu.com/api?v=2.0&ak=${APPKEY}`;
      script.type = 'text/javascript';
      document.querySelector('head').appendChild(script);
      const map = new BMap.Map('baiduMap');
      map.centerAndZoom('上海', 12);
    },
  };
</script>
<style lang="scss">

  @import '../../../assets/css/common/_tool.scss';
  @import '../../../assets/css/common/_responsive.scss';

  #map{

  }

</style>

