<template>
  <div id="app">
    <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">

</style>
