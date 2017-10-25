<template>
  <div id="app">
    <router-view></router-view>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from './store/mutation-types';
import svg from './page/components/svg.vue';
import Loading from './page/components/Loading.vue';

export default {
  name: 'app',
  computed: {
    ...mapGetters(['tempAddress']),
  },
  components: {
    svgIcon: svg,
    myLoading: Loading,
  },
  created() {
    /* eslint-disable no-undef */
    const tempAddress = JSON.parse(sessionStorage.getItem('tempAddress'));
    if (tempAddress) {
      this.$store.commit(types.ALERT_TEMPADDRESS, tempAddress);
    }
    const User = JSON.parse(localStorage.getItem('User'));
    if (User) {
      this.$store.commit(types.SAVE_CURRENT_USER, User);
    }
    if (!this.tempAddress.name) {
      this.$router.push('/location');
    }
  },
};
</script>

<style lang="scss">
</style>
