<template>
  <div id="pay">
    <mt-header title="支付"></mt-header>
    <article>
      <section class="time">
        <h3>剩余支付时间</h3>
        <h1>14:59</h1>
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
          type="success">(假装)已支付</el-button>
        <router-link
          to="/order">
          <el-button
            size="small"
            type="primary">返回</el-button>
        </router-link>
      </section>
      <br>
      <section>
        <el-button
          @click.native = "send()"
          type="success">
          send
        </el-button>
      </section>
    </article>
  </div>
</template>
<script>
import { isPc } from '../../tool/tool';

export default {
  data() {
    return {
      websocket: null,
    };
  },
  methods: {
    open(event) {
      console.log('Connected to WebSocket server.');
    },
    close(event) {
      console.log('Disconnected');
    },
    message(event) {
      console.log(JSON.parse(event.data));
      console.log('Retrieved data from server: ' + event);
    },
    error(event) {
      console.log('Error occured: ' + event);
    },
    send() {
      try {
        this.websocket.send(JSON.stringify({ a: 1 }));
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    try {
      let wsServer;
      if (isPc()) {
        wsServer = 'ws://localhost:8080/ElmPro/websocket';
      } else {
        wsServer = 'ws://10.1.1.35:8080/ElmPro/websocket';
      }
      console.log(wsServer);
      const websocket = new WebSocket(wsServer);
      this.websocket = websocket;
      websocket.onopen = this.open;
      websocket.onclose = this.open;
      websocket.onmessage = this.message;
      websocket.onerror = this.error;
    } catch (e) {
      alert(e)
    }
  },
  beforeDestroy() {
    alert(1);
    this.websocket.close();
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
