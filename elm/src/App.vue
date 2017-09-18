<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import * as types from './store/mutation-types.js';

export default {
  name: 'app',
  computed:{
  	...mapGetters(['tempAddress'])
  },
  created(){
    let tempAddress = JSON.parse(sessionStorage.getItem('tempAddress'));
    if (tempAddress) {
      this.$store.commit(types.ALERT_TEMPADDRESS,tempAddress);
    }
  	if(!this.tempAddress.name){
  		this.$router.push('/location')
  	}
  }
}
</script>

<style lang="scss">
</style>
