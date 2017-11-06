<template>
  <div id="orderDetail">
    <mt-header title="订单详情">
      <section slot="left" @click="$router.push('/order')">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <header class="header">
      <section class="shopLogo">
        <div>
          <img :src="currentOrder.shop.shopLogo">
        </div>
      </section>
      <section>
        <h1 class="text-center">
          订单{{computeOrderState(currentOrder.order.orderState)}}
        </h1>
        <div class="text-center">
          <el-button
            @click="toShop()"
            size="small"
            type="primary">
            再来一单
          </el-button>
        </div>
      </section>
    </header>
    <article>
      <section>
        <h3 class="bottom-border">{{currentOrder.shop.shopName}}</h3>
        <ul>
          <li
            :key="i"
            v-for="(v,i) in currentOrder.orderProduct">
            <span class="name">
              {{v.name}} {{v.foodType}}
            </span>
            <span class="num">
              {{v.num}}
            </span>
            <span class="price">
              {{floatCompute('*',v.price,v.num)}}
            </span>
          </li>
          <li>
            <span class="name">配送费</span>
            <span class="only-price">
              {{currentOrder.order.deliveryCost}}
            </span>
          </li>
          <li>
            <span class="name">满减优惠</span>
            <span class="only-price text-red">
              -{{currentOrder.order.discounts}}
            </span>
          </li>
          <li>
            <span class="name">
              红包优惠
            </span>
            <span class="only-price text-red">
              -{{redPacket.minusMoney}}
            </span>
          </li>
          <li>
            <span class="name">
              支付
            </span>
            <span class="only-price">
              {{currentOrder.order.payPrice}}
            </span>
          </li>
        </ul>
      </section>
      <section>
        <h3 class="bottom-border">配送信息</h3>
        <ul>
          <li>
            <span class="name">
              配送时间
            </span>
            <span class="only-price">
              {{currentOrder.order.selectDeliveryTime}}
            </span>
          </li>
          <li>
            <span class="name-small">
              配送地址
            </span>
            <span class="only-price-large">
              <p>{{currentOrder.order.userAddressName}}</p>
              <p>{{currentOrder.order.userAddressDetail}}</p>
              <p>{{currentOrder.order.userName}} {{currentOrder.order.userPhoneNumber}}</p>
            </span>
          </li>
          <li>
            <span class="name">
              配送方式
            </span>
            <span class="only-price">
              {{currentOrder.order.deliveryMethod}}
            </span>
          </li>
        </ul>
      </section>
      <section>
        <h3 class="bottom-border">订单信息</h3>
        <ul>
          <li>
            <span class="name">支付方式</span>
            <span class="only-price">
              {{currentOrder.order.payMethod}}
            </span>
          </li>
          <li>
            <span class="name-small">下单时间</span>
            <span class="only-price-large">
              {{currentOrder.order.creatTime.slice(0,currentOrder.order.creatTime.length-2)}}
            </span>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { getRedPacket } from '../../../api/order';
  import { floatComputeAddorMul } from '../../../tool/tool';

  export default {
    data() {
      return {
        data: {},
        redPacket: {},
      };
    },
    computed: {
      ...mapGetters(['currentOrder']),
    },
    methods: {
      computeOrderState(stateCode) {
        switch (stateCode) {
          case 1: return '待付款';
          case 2: return '已取消';
          case 3: return '正在配送';
          default: return '已完成';
        }
      },
      floatCompute(sign, ...val) {
        return floatComputeAddorMul(sign, ...val);
      },
      toShop() {
        this.$store.commit('ALERT_CURRENTSHOP', this.currentOrder.shop);
        this.$router.push('/shop');
      },
    },
    async created() {
      if (this.currentOrder.order.redPacketId !== -1) {
        const redPacketId = this.currentOrder.order.redPacketId;
        const res = await getRedPacket({ redPacketId });
        if (res.data.stateCode) {
          this.redPacket = { ...this.redPacket, ...res.data.data };
        }
      }
    },
  };
</script>
<style lang="scss" scoped>

  @import '../../../assets/css/common/responsive';
  @import '../../../assets/css/common/tool';

  #orderDetail{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #f1f1f1;
    overflow-y: scroll;
    .header{
      background: #fff;
      @include remCalc('padding-bottom',15px);
      .shopLogo{
        display: flex;
        justify-content: center;
        @include remCalc('padding',10px,0);
        div{
          max-width: 25%;
          border-radius:50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      section{
        h1+div{
          @include remCalc('margin-top',10px);
        }
      }
    }
    article{
      @include remCalc('padding',10px);
      section{
        background: #fff;
        @include remCalc('margin-bottom',10px);
        @include remCalc('padding',8px);
        .bottom-border{
          border-bottom: 1px solid #e9e9e9;
          @include remCalc('padding',5px,0);
        }
        li{
          border-bottom: 1px solid #f1f1f1;
          display: flex;
          @include remCalc('padding',5px,0);
          .name{
            flex: 0 0 70%;
          }
          .num,.price{
            flex: 0 0 15%;
          }
          .only-price{
            text-align: right;
            flex: 0 0 30%;
          }
          .only-price-large{
            text-align: right;
            flex: 0 0 70%;
          }
          .name-small{
            flex: 0 0 30%;
          }
          .text-red{
            color: red;
          }
          .price{
            text-align: right;
          }
          span{
            @include ellipsis;
          }
        }
      }
    }
  }

</style>

