<template>
  <div id="app">
    <h1>一个商城</h1>
    <hr>
    <ul>
      <li>
        <router-link to='/product'>产品</router-link>
      </li>
      <li>
        <router-link to='/cart'>购物车</router-link>
      </li>
    </ul>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>
