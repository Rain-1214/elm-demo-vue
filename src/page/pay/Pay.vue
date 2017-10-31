<template>
  <div id="pay">
    <mt-header title="支付"></mt-header>
    <article>
      <section class="time">
        <h1>14:59</h1>
      </section>
      <section>
        <el-button
          size="small"
          type="success">去支付</el-button>
        <el-button
          size="small"
          type="primary">暂时挂起</el-button>
      </section>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
};
</script>
<style lang="scss" scoped>
  
  @import '../../assets/css/common/responsive';
  @import '../../assets/css/common/tool';

  #pay{
    article{
      .time{
        text-align: center;
        @include remCalc('padding',20px,10px);
        h1{
          @include remCalc('font-size',32px);
        }
      }
    }
  }

</style>
