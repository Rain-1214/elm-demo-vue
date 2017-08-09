<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'app',
  computed:{
  	...mapGetters(['tempAddress'])
  },
  created(){
  	if(!this.tempAddress.name){
  		this.$router.push('/location')
  	}
  }
}
</script>

<style lang="scss">

</style>
