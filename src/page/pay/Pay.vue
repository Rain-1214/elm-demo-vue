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
        <el-button
          size="small"
          type="success"
          @click.native="cancleOrder()">取消订单</el-button>
      </section>
      <section>
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
import { Message } from 'element-ui';

export default {
  data() {
    return {
      websocket: null, // websocket对象
      time: '15:00', // 剩余支付时间
      intervalId: -1, // 更新剩余时间定时器ID
      getTime: -1, // 心跳检测定时器id
      data: null, // 订单创建时间
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
    // 计算当前时刻到15分钟支付时限剩余的毫秒数
    surplusTime() {
      return (this.data.time + (15 * 60 * 1000)) - new Date().getTime();
    },
    // 设置剩余支付时间字符串
    setTime(time) {
      const minutes = new Date(time).getMinutes();
      const seconds = new Date(time).getSeconds();
      this.time = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    },
    // wesocket连接创建成功是触发的函数
    open() {
      const orderId = parseInt(this.$route.query.orderId, 10);
      const id = this.currentUser.id;
      const data = {
        message: 'init',
        orderId,
        id,
      };
      this.send(JSON.stringify(data));
    },
    // websocket连接关闭时候关闭的链接
    close() {
    },
    // websocket链接接收到信息的时候触发的函数
    message(event) {
      console.log(event.data);
      if (event.data === 'close') {
        Toast('您的订单支付已超时，交易已经关闭');
        this.closeWebsocket();
      } else if (event.data === 'paySuccess' || event.data === 'cancleSuccess') {
        const str = event.data === 'paySuccess' ? '支付成功' : '取消成功';
        Message({
          message: str,
          type: 'success',
        });
        this.closeWebsocket('/order');
      } else {
        this.data = { ...this.data, ...JSON.parse(event.data) };
      }
    },
    // websocket链接发生错误的时候触犯的函数   发生错误时 进行重新连接
    error() {
      this.creatWebSocket();
    },
    // 通过websocket向服务器发送信息
    send(message) {
      this.websocket.send(message);
    },
    // 创建websocket连接
    creatWebSocket() {
      // 因为我在电脑上用localhost:9000的域名 但是有时我会用手机测试 在局域网访问时候用 10.1.1.xx 访问 所以要获取一下当前域名
      const locHref = location.href;
      let domain = locHref.match(/\/\/.+?\//)[0];
      domain = domain.slice(2, domain.length - 1);
      domain = domain.replace('9000', '8080');
      const wsServer = `ws://${domain}/ElmPro/websocket`;
      const websocket = new WebSocket(wsServer);
      this.websocket = websocket;
      websocket.onopen = this.open;
      websocket.onclose = this.open;
      websocket.onmessage = this.message;
      websocket.onerror = this.error;
    },
    // 关闭websocket连接
    closeWebsocket(path = '/home') {
      this.websocket.close();
      clearInterval(this.intervalId);
      clearInterval(this.getTime);
      this.$router.push(path);
    },
    // 支付订单时候通过websocket向服务器发送支付的message
    payOrder() {
      const orderId = parseInt(this.$route.query.orderId, 10);
      const id = this.currentUser.id;
      this.send(JSON.stringify({
        message: 'pay',
        orderId,
        id,
      }));
    },
    // 点击取消订单的时候通过websocket向服务器发送取消订单的message
    cancleOrder() {
      const orderId = parseInt(this.$route.query.orderId, 10);
      const id = this.currentUser.id;
      this.send(JSON.stringify({
        message: 'cancle',
        orderId,
        id,
      }));
    },
  },
  // created钩子当中 需要创建websocket连接 启动时间更新定时器 启动心跳检测定时器
  created() {
    this.creatWebSocket();

    const intervalId = setInterval(() => {
      const time = this.surplusTime();
      if (time <= 0) {
        this.cancelOrder();
        this.closeWebsocket();
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
        &:last-child{
          @include remCalc('margin-top',10px);
        }
      }
    }
  }

</style>
