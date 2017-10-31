<template>
  <div id="orderSelectRedPacket">
    <mt-header title="选择红包">
      <section slot="left" @click="$router.push('/confirmOrder')">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <router-link
        :to="{ 
          path: '/confirmOrder',
          query: {
            redPacketIndex: -1,
          }, }">
        <section
          class="noUse">
          不使用红包
          <i 
            v-show="$route.query.redPacketId === -1"
            class="el-icon-circle-check"></i>
        </section>
      </router-link>
      <redpacket-wrapper
        :canNotUse="canUseArray[i].flag"
        :canNotUseCause="canUseArray[i].string"
        :packet="v"
        :key="i"
        :icon-show="v.id === $route.query.redPacketId"
        @click.native="addRedPacket(i)"
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
      canUseArray: [],
    };
  },
  computed: {
    ...mapGetters(['currentUser', 'currentShop']),
  },
  components: {
    'redpacket-wrapper': RedPacketWrapper,
  },
  methods: {
    computedRedPacket() {
      const currentPhoneNumber = this.$route.query.phoneNumber;
      this.currentUser.hongbao.forEach((e, i) => {
        // 检测红包状态
        if (e.hongbaoState !== 2) {
          this.writeRedPacketType(i, true, e.hongbaoState === 0 ? '红包已过期' : '红包已使用');
          return;
        }
        // 检测是否有手机号码限制
        if (e.phoneNumber != null && e.phoneNumber !== currentPhoneNumber) {
          this.writeRedPacketType(i, true, `红包仅限收货电话为${e.phoneNumber}使用`);
          return;
        }
        // 检测是否处于红包限制时间内
        const nowTime = new Date().getTime();
        if (nowTime <= e.startTime || nowTime >= e.endTime) {
          this.writeRedPacketType(i, true, '红包不在使用时间内');
          return;
        }
        // 检测店铺类型是否符合红包限制
        if (e.shopTypeList.length !== 0) {
          let checkShopTypeFlag = true;
          let shopTypeString = '';
          e.shopTypeList.forEach((ele, index, array) => {
            shopTypeString += (index === array.length ? `${ele}` : `${ele}、`);
            if (this.currentShop.shopPropertyType.includes(ele)) {
              checkShopTypeFlag = false;
            }
          });
          if (checkShopTypeFlag) {
            this.writeRedPacketType(i, true, `红包仅限${shopTypeString}类型的店铺使用`);
            return;
          }
        }
        this.writeRedPacketType(i, false, '');
      });
    },
    writeRedPacketType(index, flag, string) {
      this.canUseArray.splice(index, 1, { flag, string });
    },
    addRedPacket(index) {
      if (!this.canUseArray[index].flag) {
        this.$router.push({
          path: '/confirmOrder',
          query: {
            redPacketIndex: index,
          },
        });
      }
    },
  },
  created() {
    const arrayLength = this.currentUser.hongbao.length;
    this.canUseArray = Array(arrayLength);
    this.computedRedPacket();
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
    article{
      .noUse{
        box-shadow:0 0 15px rgba(0,0,0,0.4);
        border-radius: 8px;
        color: #333;
        display: flex;
        justify-content: space-between;
        @include remCalc('margin',10px);
        @include remCalc('padding',10px);
        @include remCalc('font-size',16px);
      }
      i{
        color: #76dc2c;
      }
    }
  }
</style>

