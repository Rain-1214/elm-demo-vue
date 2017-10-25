<template>
  <div id="redpacket">
    <mt-header title="红包">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <redpacket-wrapper
        :key="i"
        :packet='v'
        v-for="(v,i) in currentUser.hongbao">
      </redpacket-wrapper>
      <section class="empty" v-show="currentUser.hongbao.length == 0">
        暂无红包~~
      </section>
    </article>
  </div>  
</template>
<script>
import { mapGetters } from 'vuex';
import RedpacketWrapper from './children/RedpacketWrapper.vue';

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  components: {
    'redpacket-wrapper': RedpacketWrapper,
  },
};
</script>
<style lang="scss" scoped>

  @import '../../assets/css/common/responsive';
  @import '../../assets/css/common/tool';

  #redpacket{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fff;
    article{
      .empty{
        color: #b5b5b5;
        @include remCalc('padding',15px);
        @include remCalc('font-size',22px);
      }
    }
  }
</style>  

