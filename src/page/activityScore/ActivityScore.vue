<template>
  <div id="activityScore">
    <mt-header title="我的积分">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <section class="activity-points">
        我的积分:
        <p>{{ currentUser.activityPoints }}</p>
      </section>
      <section class="activity-product">
        <div
          @click="createRedPacket('积分随机红包', 200, [15,30], [100,500])">
          <img src="../../assets/img/redpacket.png" alt="">
          <h3>需要积分: <span>200</span></h3>
          <h2>获取一个随机大小的红包</h2>
        </div>
        <div
          @click="createRedPacket('积分随机大红包', 400,[20,35], [500,1500])">
          <img src="../../assets/img/redpacket.png" alt="">
          <h3>需要积分: <span>400</span></h3>
          <h2>获取一个随机大小的大红包</h2>
        </div>
        <div
          @click="createRedPacket('积分随机超大红包', 800,[30,35],[1500,2500])">
          <img src="../../assets/img/redpacket.png" alt="">
          <h3>需要积分: <span>800</span></h3>
          <h2>获取一个随机大小的超大红包</h2>
        </div>
      </section>
      <section class="bottom">
        <el-button
          @click="addActivityPoint(1000)"
          size="small"
          type="success">
          获得1000积分
        </el-button>
      </section>
    </article>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { Toast } from 'mint-ui';
  import { randomNum } from '../../tool/tool';
  import { insertHongbaoToUser, addActivityPoint } from '../../api/user';
  import { AFRESH_HONGBAO, AFRESH_ACTIVITYSCORE } from '../../store/mutation-types';

  export default {
    data() {
      return {
        redPacket: {
          redPacketName: '',
          fillMoney: 0.00,
          minusMoney: 0.00,
          startTime: 0,
          endTime: 0,
          userId: -1,
          phoneNumber: null,
          shopTypeIdList: [],
          expendActivityPoint: 0,
        },
      };
    },
    computed: {
      ...mapGetters(['currentUser']),
    },
    methods: {
      getTodayTime(hourMinutesSecond) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        const currentDay = today.getDate();
        return new Date(`${currentYear}-${currentMonth}-${currentDay} ${hourMinutesSecond}`);
      },
      async createRedPacket(redpacketName, expendActivityPoint, fillMoneyArray, minusMoneyArray) {
        this.redPacket.redPacketName = redpacketName;
        this.redPacket.fillMoney = randomNum(...fillMoneyArray);
        this.redPacket.minusMoney = randomNum(...minusMoneyArray) / 100;
        this.redPacket.startTime = this.getTodayTime('00:00:00').getTime();
        this.redPacket.endTime = this.getTodayTime('23:59:59').getTime();
        this.redPacket.expendActivityPoint = expendActivityPoint;
        this.redPacket.userId = this.currentUser.id;
        const shopTypeIdListLength = randomNum(0, 3);
        this.redPacket.shopTypeIdList = [];
        for (let i = 0; i < shopTypeIdListLength; i += 1) {
          let random = randomNum(1, 16);
          while (this.redPacket.shopTypeIdList.includes(random)) {
            random = randomNum(1, 16);
          }
          this.redPacket.shopTypeIdList.push(random);
        }
        const res = await insertHongbaoToUser(this.redPacket);
        if (res.data.stateCode) {
          Toast('兑换成功');
          this.$store.commit(AFRESH_HONGBAO, res.data.data);
          this.$store.dispatch('afreshActicityPoint');
        } else {
          Toast(res.data.message);
        }
      },
      async addActivityPoint(activityPoint) {
        const userId = this.currentUser.id;
        const res = await addActivityPoint({ userId, activityPoint });
        if (res.data.stateCode) {
          Toast('添加成功');
          this.$store.commit(AFRESH_ACTIVITYSCORE, res.data.data);
        } else {
          Toast(res.data.message);
        }
      },
    },
    created() {
      this.$store.dispatch('afreshActicityPoint');
    },
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/css/common/tool";
  @import "../../assets/css/common/responsive";

  #activityScore{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fff;
    .activity-points{
      font-weight: bold;
      color: #fff;
      background-image: linear-gradient(90deg,#0af,#0085ff);
      @include remCalc('padding',20px);
      @include remCalc('font-size',20px);
      p{
        @include remCalc('font-size',20px);
      }
    }
    .activity-product{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      div{
        width:50%;
        @include remCalc('padding',10px);
        img{
          width:70%;
          @include lr-center-mar;
        }
        h2{
          text-align: center;
          @include remCalc('font-size',12px);
        }
        h3{
          text-align: center;
          @include remCalc('font-size',12px);
          span{
            color: red;
          }
        }
      }
    }
    .bottom{
      @include remCalc('padding',10px);
    }
  }
</style>


