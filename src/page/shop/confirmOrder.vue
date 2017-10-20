<template>
  <div id="confirmOrder">
    <mt-header title="确认订单">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <section class="address">
        <router-link to='/confirmOrder/selectAddress'>
          <template v-if="!Object.prototype.hasOwnProperty.call(order.address, 'id')">
            <h2>
              <svg>
                <use xlink:href="#addressIcon"></use>
              </svg>
              请选择地址
              <i class="el-icon-arrow-right"></i>
            </h2>
          </template>
          <template v-else>
            <h4>
              收货地址
            </h4>
            <p>
              <span class="name">{{order.address.userName}}</span>
              <span class="sex">{{order.address.sex === 1?"先生":order.address.sex === 2?"女士":"先生/女士"}}</span>
              <span class="phoneNumber">{{order.address.phoneNumber}}</span>
            </p>
            <p>
              {{order.address.addressName}} {{order.address.addressDetail}}
            </p>
            <i class="el-icon-arrow-right"></i>
          </template>
        </router-link>
      </section>
      <section class="arrived-time"  @click="showTimePicker()">
        <div>
          <h2>送达时间</h2>
        </div>
        <div>
          <p v-show="order.pickerValue == arrivedTime">尽快送达 | 预计 {{order.pickerValue}}</p>
          <p v-show="order.pickerValue != arrivedTime">预计 {{order.pickerValue}}</p>
          <p>
            <span class="blue-background">蜂鸟专送</span>
          </p>
        </div>
      </section>
      <section class="bill">
        <h2>{{shoppingCartProducts[currentShop.id].shopName}}</h2>
        <ul>
          <li
            :key="i" 
            v-for="(v,i) in shoppingCartProducts[currentShop.id].foodList">
            <div>
              {{v.foodName}}
            </div>
            <div>
              <span>x{{v.foodNum}}</span>
              <span>{{v.price * v.foodNum}}</span>
            </div>
          </li>
          <li class="orange">
            <div>
              满减优惠
            </div>
            <div>
              <span>{{`-${fullMinus}`}}</span>
            </div>
          </li>
          <li class="orange">
            <div>总计</div>
            <div>
              <span>￥{{order.payPrice}}</span>
            </div>
          </li>
        </ul>
      </section>
      <mt-cell title="红包"></mt-cell>
      <mt-cell title="添加备注"></mt-cell>
      <mt-cell 
        title="付款方式" 
        @click.native="payMethodVisible = true">
        <span>{{order.payMethod}}</span>
      </mt-cell>
      <mt-cell title="开是否需要发票"></mt-cell>
    </article>
    <aside>
      <div>
        <h3>
          待支付 ￥99999.99
        </h3>
      </div>
      <div>
        <el-button type="success">确认下单</el-button>
      </div>
    </aside>
    <mt-datetime-picker
      ref="picker"
      type="time"
      v-model="order.pickerValue"
      :startHour="startHour"
      @confirm="handleConfirm">
    </mt-datetime-picker>
    <mt-popup
      position="bottom"
      v-model="payMethodVisible"
      popup-transition="popup-slide">
        <ul>
          <li
            class="payMethod"
            :title="v"
            :key="i"
            @click="setPayMethod(v)"
            v-for="(v,i) in payMethodArray">
            {{v}}
          </li>
          <li class="payMethod" @click="setPayMethod()">取消</li>
        </ul>
    </mt-popup>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { Toast } from 'mint-ui';
import { floatComputeSuborDiv } from '../../tool/tool';

export default {
  data() {
    return {
      arrivedTime: '',
      startHour: 0,
      startMinute: 0,
      timeInterval: {},
      payMethodVisible: false,
      payMethodArray: ['在线支付', '货到付款'],
      redPacket: 0,
      OtherDiscounts: [],
      order: {
        pickerValue: '',
        address: {},
        payMethod: '在线支付',
        time: 0,
        shopId: 0,
        userId: 0,
        deliveryMethod: '',
        payPrice: 0,
      },
    };
  },
  computed: {
    fullMinus() {
      const totalPrice = this.shoppingCartProducts[this.currentShop.id].totalPrice;
      const tempFullMinusArray = [...this.currentShop.shopFullMinus];
      tempFullMinusArray.push({ full: totalPrice });
      tempFullMinusArray.sort((a, b) => a.full - b.full);
      let discounts = 0;
      console.log(tempFullMinusArray);
      tempFullMinusArray.forEach((e, i) => {
        if (e.full === totalPrice && i !== 0) {
          discounts = tempFullMinusArray[i - 1].minus;
        }
      });
      return discounts;
    },
    ...mapGetters(['currentShop', 'currentUser', 'shoppingCartProducts']),
  },
  watch: {
    $route() {
      const hasOwn = Object.prototype.hasOwnProperty;
      if (hasOwn.call(this.$route.query, 'addressIndex')) {
        this.order.address = { ...this.order.address, ...this.currentUser.address[this.$route.query.addressIndex] };
      }
    },
  },
  methods: {
    computedArrivedTime() {
      const { time: tempTime } = this.currentShop;
      const minute = tempTime % 60;
      const hour = (tempTime - minute) / 60;
      const currentHour = new Date().getHours();
      const currentMnute = new Date().getMinutes();
      this.startHour = currentMnute + minute >= 60 ? currentHour + hour + 1 : currentHour + hour;
      this.startHour = this.startHour >= 24 ? this.startHour - 24 : this.startHour;
      this.startMinute = currentMnute + minute >= 60 ? (currentMnute + minute) - 60 : currentMnute + minute;
      const startHourString = this.startHour < 10 ? `0${this.startHour}` : `${this.startHour}`;
      const startMinuteString = this.startMinute < 10 ? `0${this.startMinute}` : `${this.startMinute}`;
      this.order.pickerValue = `${startHourString}:${startMinuteString}`;
      this.arrivedTime = this.order.pickerValue;
    },
    handleConfirm(value) {
      const minute = value.split(':')[1];
      if (minute < this.startMinute) {
        Toast(`选择配送时间不能小于${this.arrivedTime}`);
        this.order.pickerValue = this.arrivedTime;
      }
    },
    showTimePicker() {
      this.$refs.picker.open();
    },
    setPayMethod(method) {
      this.payMethodVisible = false;
      if (method) {
        this.order.payMethod = method;
      }
    },
    computedPayPrice() {
      const totalPrice = this.shoppingCartProducts[this.currentShop.id].totalPrice;
      this.order.payPrice = floatComputeSuborDiv('-', totalPrice, this.redPacket, this.fullMinus, ...this.OtherDiscounts);
    },
  },
  created() {
    const hasOwn = Object.prototype.hasOwnProperty;
    if (!hasOwn.call(this.currentShop, 'id') || !hasOwn.call(this.shoppingCartProducts, this.currentShop.id)) {
      this.$router.push('/home');
    }
    this.computedArrivedTime();

    const time = setInterval(this.computedArrivedTime, 30000);
    this.timeInterval = time;

    this.computedPayPrice();
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
};
</script>
<style lang="scss">
  @import '../../assets/css/common/tool';
  @import '../../assets/css/common/responsive';
  
  #confirmOrder{
    .address{
      border-bottom: 1px solid #ccc;
      @include remCalc('padding',5px);
      position: relative;
      h2{
        position: relative;
        color: $blue;
        @include remCalc('padding',20px,10px);
        svg{
          position: relative;
          @include remCalc('top',4px);
          @include remCalc('width',20px);
          @include remCalc('height',20px);
        }
        i{
          @include remCalc('right',10px);
          @include tb-center(absolute);
        }
      }
      h4{
        font-weight: bold;
        color: #333;
      }
      p{
        color: #333;
        span.name{
          @include remCalc('font-size',16px);
          font-weight: bold;
        }
        .sex,.phoneNumber{
          color: #333;
        } 
      }
      i{
        right: 10px;
        @include tb-center(absolute);
      }
    }
    .arrived-time{
      display: flex;
      justify-content: space-between;
      position: relative;
      border-bottom: 1px solid #ccc;
      @include remCalc('padding',10px);
      &::before{
        content:'';
        display: block;
        height: 100%;
        width: 4px;
        background: $blue;
        position: absolute;
        top: 0;
        left: 0;
      }
      >div:first-child{
        display: flex;
        align-items: center;
      }
      p{
        text-align:right;
        @include remCalc('margin-bottom',4px);
      }
    }
    .bill{
      @include remCalc('padding',10px);
      h2{
        @include remCalc('margin-bottom',5px);
      }
      ul{
        li{
          display: flex;
          justify-content: space-between;
          div{
            span{
              &:last-child{
                display: inline-block;
                text-align: right;
                @include remCalc('width',70px);
              }
            }
          }
          &.orange{
            span{
              color: #f60;
            }
          }
        }
      }
    }
    .mint-cell-wrapper{
      background-position-x: -10px;
    }
    .payMethod{
      width: 100vw;
      text-align: center;
      border-bottom: 1px solid #ccc;
      @include remCalc('font-size',18px);
      @include remCalc('padding',10px,0);
    }
    aside{
      position:fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      background: #3c3c3c;
      @include remCalc('height',50px);
      div{
        color: #fff;
        font-size: 16px;
        height: 100%;
        display: flex;
        &:first-child{
          align-items: center;
          @include remCalc('padding',0,10px);
          @include remCalc('max-width',180px);
          h3{
            @include ellipsis;
          }
        }
      }
      button{
        border-radius:0%;
      }
    }
  }
</style>


