<template>
  <div id="loading">
    <div>
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
      <h2>拼命加载中...</h2>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  @import '../../assets/css/common/tool';

  #loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255,255,255,0.8);
    z-index: 99;
    div{
      @include all-center(absolute);
      h2{
        color: $blue;
      }
    }
  }
  @keyframes loading-dash{
    0%{stroke-dasharray:1,200;stroke-dashoffset:0}
    50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}
    to{stroke-dasharray:90,150;stroke-dashoffset:-120px}
  }
  @keyframes loading-rotate{
    to{transform:rotate(1turn)}
  }
  .circular {
    width: 42px;
    height: 42px;
    margin: 0 auto;
    display: block;
    animation: loading-rotate 2s linear infinite;
  }
  .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90,150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #20a0ff;
    stroke-linecap: round;
  }
</style>

