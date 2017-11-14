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
        v-for="(v,i) in canUse">
      </redpacket-wrapper>
      <section class="empty" v-show="canUse.length == 0">
        暂无可用红包~~
      </section>
      <section>
        <redpacket-wrapper
        :canNotUse = "true"
        :canNotUseCause = "'aaa'"
        :key="i"
        :packet='v'
        v-for="(v,i) in canNotUse">
      </redpacket-wrapper>
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
      canUse: [],
      canNotUse: [],
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  components: {
    'redpacket-wrapper': RedpacketWrapper,
  },
  methods: {
    checkRedPacket(redPacket) {
      // 检测红包状态
      if (redPacket.hongbaoState !== 2) {
        return redPacket.hongbaoState === 1 ? '红包已使用' : '红包已过期';
      }
      return true;
    },
  },
  created() {
    this.$store.dispatch('afreshHongbao');
    this.currentUser.hongbao.forEach((e) => {
      if (this.checkRedPacket(e)) {
        this.canUse.push(e);
      } else {
        this.canNotUse.push(e);
      }
    });
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

