<template>
  <div id="forgetPassword">
    <mt-header title="忘记密码">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <el-steps :space="100" :active="1" finish-status="success" center='true'>
        <el-step title="已完成"></el-step>
        <el-step title="进行中"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
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
<style lang="scss">

  @import '../../assets/css/common.scss';

  #forgetPassword{
    .el-step{
      zoom:2;
    }
  }
</style>


