<template>
  <div id="orderSelectRedPacket">
    <mt-header title="选择红包">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <redpacket-wrapper 
        :packet="v"
        :key="i"
        v-for="(v,i) in currentUser.hongbao">

      </redpacket-wrapper>
    </article>
  </div>  
</template>
<script>
import { mapGetters } from 'vuex';
import RedPacketWrapper from '../redpacket/children/RedpacketWrapper.vue';

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  components: {
    'redpacket-wrapper': RedPacketWrapper,
  },
};
</script>
<style lang="scss" scoped>
  @import '../../assets/css/common/responsive';
  @import '../../assets/css/common/tool';

  #orderSelectRedPacket{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fff;
  }
</style>

