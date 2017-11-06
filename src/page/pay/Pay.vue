<template>
  <div id="pay">
    <mt-header title="支付"></mt-header>
    <article>
      <section class="time">
        <h3>剩余支付时间</h3>
        <h1>{{ time }}</h1>
      </section>
      <section>
        <img src="../../assets/img/pay.png" alt="">
        <p>支付金额：￥{{ $route.query.payPrice }}</p>
        <p>请在规定时间内支付</p>
        <p class="small">大胆的付吧，反正我不会还给你 (๑•̀ㅂ•́)و✧</p>
      </section>
      <section>
        <el-button
          size="small"
          type="success"
          @click.native="payOrder()">(假装)已支付</el-button>
        <router-link
          to="/order">
          <el-button
            size="small"
            type="primary">返回</el-button>
        </router-link>
      </section>
    </article>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { Toast } from 'mint-ui';
import { isPc } from '../../tool/tool';
import { pay } from '../../api/order';

export default {
  data() {
    return {
      websocket: null,
      time: '15:00',
      intervalId: -1,
      getTime: -1,
      data: null,
    };
  },
  watch: {
    data() {
      const time = this.surplusTime();
      this.setTime(time);
    },
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    surplusTime() {
      return (this.data.time + (15 * 60 * 1000)) - new Date().getTime();
    },
    setTime(time) {
      const minutes = new Date(time).getMinutes();
      const seconds = new Date(time).getSeconds();
      this.time = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    },
    open() {
      const orderId = this.$route.query.orderId;
      const id = this.currentUser.id;
      const data = {
        message: 'init',
        orderId,
        id,
      };
      this.send(JSON.stringify(data));
    },
    close() {
    },
    message(event) {
      if (event.data === 'close') {
        Toast('您的订单支付已超时，交易已经关闭');
        this.cancelOrder();
      } else {
        this.data = { ...this.data, ...JSON.parse(event.data) };
      }
    },
    error() {
      this.creatWebSocket();
    },
    send(message) {
      this.websocket.send(message);
    },
    creatWebSocket() {
      let wsServer;
      if (isPc()) {
        wsServer = 'ws://localhost:8080/ElmPro/websocket';
      } else {
        wsServer = 'ws://10.1.1.35:8080/ElmPro/websocket';
      }
      const websocket = new WebSocket(wsServer);
      this.websocket = websocket;
      websocket.onopen = this.open;
      websocket.onclose = this.open;
      websocket.onmessage = this.message;
      websocket.onerror = this.error;
    },
    cancelOrder() {
      this.websocket.close();
      clearInterval(this.intervalId);
      clearInterval(this.getTime);
      this.$router.push('/home');
    },
    async payOrder() {
      const res = await pay();
      if (res.data.stateCode) {
        this.$router.push('/order');
      }
    },
  },
  created() {
    this.creatWebSocket();
    const intervalId = setInterval(() => {
      const time = this.surplusTime();
      if (time <= 0) {
        const orderId = this.$route.query.orderId;
        const id = this.currentUser.id;
        const data = {
          message: 'cancle',
          orderId,
          id,
        };
        this.websocket.send(JSON.stringify(data));
        this.cancelOrder();
      }
      this.setTime(time);
    }, 1000);
    const id = this.currentUser.id;
    const data = {
      message: 'getTime',
      id,
    };
    const getTime = setInterval(() => {
      this.send(JSON.stringify(data));
    }, 6000);
    this.intervalId = intervalId;
    this.getTime = getTime;
  },
  beforeDestroy() {
    this.websocket.close();
    clearInterval(this.intervalId);
    clearInterval(this.getTime);
  },
};
</script>
<style lang="scss" scoped>
  
  @import '../../assets/css/common/responsive';
  @import '../../assets/css/common/tool';

  #pay{
    article{
      .time{
        @include remCalc('padding',20px,10px);
        h1{
          @include remCalc('font-size',32px);
        }
      }
      section{
        text-align: center;
        img{
          max-width: 50%;
        }
        .small{
          color: #ccc;
          @include remCalc('margin',12px,0);
        }
      }
    }
  }

</style>
