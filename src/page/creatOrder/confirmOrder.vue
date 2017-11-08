<template>
  <div id="confirmOrder">
    <mt-header title="确认订单">
      <section slot="left" @click="$router.push('/shop')">
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
          <template v-if="Object.prototype.hasOwnProperty.call(order.address, 'id')">
            <p v-show="order.pickerValue == arrivedTime">尽快送达 | 预计 {{order.pickerValue}}</p>
            <p v-show="order.pickerValue != arrivedTime">预计 {{order.pickerValue}}</p>
            <p>
              <span class="blue-background">蜂鸟专送</span>
            </p>
          </template>
          <template v-else>
            <p>
              请先选择地址
            </p>
          </template>
        </div>
      </section>
      <section class="bill">
        <h2>{{shoppingCartProducts[currentShop.id].shopName}}</h2>
        <ul>
          <li
            :key="i" 
            v-for="(v,i) in shoppingCartProducts[currentShop.id].foodList">
            <div>
              {{v.foodName}}{{v.foodType}}
            </div>
            <div>
              <span>x{{v.foodNum}}</span>
              <span>{{v.price * v.foodNum}}</span>
            </div>
          </li>
          <li>
            <div>配送费</div>
            <div>
              <span>{{currentShop.deliveryCost}}</span>
            </div>
          </li>
          <li 
            v-if="fullMinus != 0"
            class="orange">
            <div>
              满减优惠
            </div>
            <div>
              <span>{{`-${fullMinus}`}}</span>
            </div>
          </li>
          <li 
            v-if="order.redPacketId != -1"
            class="orange">
            <div>
              红包优惠
            </div>
            <div>
              <span>{{`-${redPacket}`}}</span>
            </div>
          </li>
          <li class="orange">
            <div>总计</div>
            <div>
              <span>
                ￥{{order.payPrice}} 
              </span>
            </div>
          </li>
          <li>
            <span v-if="order.payPrice == 1">
              (优惠最多只能到1元哦)
            </span>
          </li>
        </ul>
      </section>
      <mt-cell 
        @click.native="showRedPacker()"
        title="红包">
        <span v-if="canUserRedPackedNum != 0 && order.redPacketId == -1">
          有{{canUserRedPackedNum}}个红包可用
        </span>
        <span v-else>
          <span v-if="order.redPacketId != -1">
            红包已优惠 {{redPacket}} 元
          </span>
          <span v-else-if="order.address.id == undefined">
            请先选择地址
          </span>
          <span v-else>
            没有可用红包
          </span>
        </span>
      </mt-cell>
      <mt-cell 
        @click.native="remarkVisible = true"
        title="添加备注">
        {{order.remarkString}}
      </mt-cell>
      <mt-cell 
        title="付款方式" 
        @click.native="payMethodVisible = true">
        <span>{{order.payMethod}}</span>
      </mt-cell>
      <mt-cell 
        @click.native="invoiceVisible = true"
        title="开是否需要发票">
        <span 
          v-if="currentShop.shopProperty.invoice != 1">
          商家不支持开发票
        </span>
        <span v-else>
          <span v-show="order.needInvoice">
            需要开发票
          </span>
          <span v-show="!order.needInvoice">
            不需要开发票
          </span>
        </span>
      </mt-cell>
    </article>
    <aside>
      <div>
        <h3>
          待支付 ￥{{order.payPrice}}
        </h3>
      </div>
      <div>
        <el-button 
          @click.native="submit()"
          type="success">确认下单</el-button>
      </div>
    </aside>
    <mt-popup
      position="bottom"
      v-model="arrivedTimeVisible"
      popup-transition="popup-slide">
        <time-picker
          :start-hour="this.startHour"
          :start-minut="this.startMinute"
          @requestValue="handleConfirm"
          @cancle="arrivedTimeVisible = false"></time-picker>
    </mt-popup>
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
    <mt-popup
      position="right"
      v-model="remarkVisible"
      popup-transition="popup-slide">
      <my-remark
        @close='responseRemark'
        ></my-remark>
    </mt-popup>
    <mt-popup
      position="right"
      v-model="invoiceVisible"
      popup-transition="popup-slide">
      <my-invoice
        @close="responseInvoice"></my-invoice>
    </mt-popup>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { Toast } from 'mint-ui';
import { floatComputeAddorMul, floatComputeSuborDiv } from '../../tool/tool';
import { checkOrder } from '../../api/order';
import TimePicker from '../components/TimePicker.vue';
import computDistance from '../../tool/computdistance';
import Remark from './children/Remark.vue';
import Invoice from './children/Invoice.vue';

export default {
  data() {
    return {
      enterTime: 0, // 订单超时检测
      arrivedTime: '', // 计算的预计到达时间字符串
      startHour: 0, // 预计到达时间的小时
      startMinute: 0, // 预计到达时间的分钟
      arrivedTimeVisible: false, // 控制显示送达时间部分
      timeInterval: false, // 更新预计到达时间的定时器
      payMethodVisible: false, // 控制改变付款方式上拉显示
      payMethodArray: ['在线支付', '货到付款'], // 付款方式数组
      remarkVisible: false, // 控制备注信息显示
      redPacket: 0, // 红包优惠金额`
      canUserRedPackedNum: 0, // 可用红包数量
      OtherDiscounts: [], // 其他优惠金额
      invoiceVisible: false, // 选择发票界面显示
      ajaxFlag: true, // 防止多次提交
      order: {
        pickerValue: '', // 选择的派送时间
        deliveryTime: '', // 配送需要多长时间
        address: {}, // 选择的派送地址
        payMethod: '在线支付', // 支付方式
        time: 0, // 下单时间
        shopId: 0, // 店铺ID
        userId: 0, // 用户id
        deliveryMethod: '蜂鸟专送', // 配送方式
        payPrice: 0, // 支付金额
        redPacketId: -1, // 选择的红包ID
        remarkString: '', // 备注
        needInvoice: false, // 是否需要发票
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
      tempFullMinusArray.forEach((e, i) => {
        if (e.full === totalPrice && i !== 0) {
          discounts = tempFullMinusArray[i - 1].minus;
        }
      });
      return discounts;
    },
    ...mapGetters(['currentShop', 'currentUser', 'shoppingCartProducts']),
  },
  methods: {
    // 计算到达时间
    computedArrivedTime() {
      const { lat: addressLat, lng: addressLng } = this.order.address;
      const { latitude: shopLat, longitude: shopLng } = this.currentShop;
      const distance = computDistance(addressLat, addressLng, shopLat, shopLng);
      this.order.deliveryTime = Math.ceil(distance / 1000) * 20;
      const minute = this.order.deliveryTime % 60;
      const hour = (this.order.deliveryTime - minute) / 60;
      const currentHour = new Date().getHours();
      const currentMnute = new Date().getMinutes();
      this.startHour = currentMnute + minute >= 60 ? currentHour + hour + 1 : currentHour + hour;
      this.startHour = this.startHour >= 24 ? this.startHour - 24 : this.startHour;
      this.startMinute = currentMnute + minute >= 60 ? (currentMnute + minute) - 60 : currentMnute + minute;
      const startHourString = this.startHour < 10 ? `0${this.startHour}` : `${this.startHour}`;
      const startMinuteString = this.startMinute < 10 ? `0${this.startMinute}` : `${this.startMinute}`;
      this.order.pickerValue = `${startHourString}:${startMinuteString}`;
      this.arrivedTime = this.order.pickerValue;
      console.log(this.arrivedTime, this.order.pickerValue);
      this.startInterval();
    },
    // 接受用户选择的时间
    handleConfirm(value) {
      this.computedArrivedTime();
      const minute = value.split(':')[1];
      const hour = value.split(':')[0];
      if (minute < this.startMinute || hour < this.startHour) {
        Toast(`选择配送时间不能小于${this.arrivedTime}`);
        this.arrivedTimeVisible = false;
      } else {
        this.order.pickerValue = value;
        this.arrivedTimeVisible = false;
      }
    },
    // 显示用户时间选择并停止时间更新
    showTimePicker() {
      if (this.order.address.id) {
        clearInterval(this.timeInterval);
        this.arrivedTimeVisible = true;
      }
    },
    // 显示选择红包
    showRedPacker() {
      if (this.order.address.id) {
        const redPacketId = this.order.redPacketId;
        this.$router.push({
          path: '/confirmOrder/selectRedpacket',
          query: { phoneNumber: this.order.address.phoneNumber, redPacketId },
        });
      }
    },
    // 开始时间更新
    startInterval() {
      if (!this.timeInterval) {
        const time = setInterval(() => {
          this.computedArrivedTime();
        }, 30000);
        this.timeInterval = time;
      }
    },
    // 设置付款方式
    setPayMethod(method) {
      this.payMethodVisible = false;
      if (method) {
        this.order.payMethod = method;
      }
    },
    // 计算总价格
    computedPayPrice() {
      let totalPrice = this.shoppingCartProducts[this.currentShop.id].totalPrice;
      totalPrice = floatComputeAddorMul('+', totalPrice, this.currentShop.deliveryCost);
      this.order.payPrice = floatComputeSuborDiv('-', totalPrice, this.redPacket, this.fullMinus, ...this.OtherDiscounts);
      this.order.payPrice = this.order.payPrice < 1 ? 1 : this.order.payPrice;
    },
    // 计算红包优惠
    computedRedPacket(redPacketIndex) {
      this.redPacket = this.currentUser.hongbao[redPacketIndex].minusMoney;
    },
    // 检测红包是否可用
    checkRedPacket() {
      this.canUserRedPackedNum = 0;
      if (Object.prototype.hasOwnProperty.call(this.order.address, 'id')) {
        this.currentUser.hongbao.forEach((e) => {
          // 检测红包状态
          if (e.hongbaoState !== 2) {
            return;
          }
          // 检测是否有手机号码限制
          if (e.phoneNumber != null && e.phoneNumber !== this.order.address.phoneNumber) {
            return;
          }
          // 检测是否处于红包限制时间内
          const nowTime = new Date().getTime();
          if (nowTime <= e.startTime || nowTime >= e.endTime) {
            return;
          }
          // 检测店铺类型是否符合红包限制
          if (e.shopTypeList.length !== 0) {
            let checkShopTypeFlag = true;
            e.shopTypeList.forEach((ele) => {
              if (this.currentShop.shopPropertyType.includes(ele)) {
                checkShopTypeFlag = false;
              }
            });
            if (checkShopTypeFlag) {
              return;
            }
          }
          this.canUserRedPackedNum += 1;
        });
      }
    },
    // 接收备注信息
    responseRemark(remarkString) {
      this.remarkVisible = false;
      this.order.remarkString = remarkString;
    },
    // 接收发票信息
    responseInvoice(invoice) {
      if (!invoice) {
        this.order.needInvoice = false;
      } else {
        this.order = { ...this.order, ...invoice };
        this.order.needInvoice = true;
      }
      this.invoiceVisible = false;
    },
    // 提交订单
    async submit() {
      if (this.ajaxFlag) {
        this.ajaxFlag = false;
        if (!Object.prototype.hasOwnProperty.call(this.order.address, 'id')) {
          Toast('请先选择地址');
          this.ajaxFlag = true;
          return;
        }
        try {
          const tempDate = new Date();
          this.order.time = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
          this.order.shopId = this.currentShop.id;
          this.order.userId = this.currentUser.id;
          const data = this.order;
          const res = await checkOrder(data);
          if (res.data.stateCode) {
            const shopId = this.currentShop.id;
            this.$store.commit('REMOVE_ALL_PRODUCTS', { shopId });
            this.$store.dispatch('afreshHongbao');
            this.$router.push({
              path: '/pay',
              query: {
                payPrice: res.data.payPrice,
                orderId: res.data.orderId,
              },
            });
          } else {
            Toast(res.data.message);
          }
          console.log(res);
        } catch (error) {
          console.log(error.message);
        } finally {
          this.ajaxFlag = true;
        }
      }
    },
  },
  components: {
    'my-remark': Remark,
    'time-picker': TimePicker,
    'my-invoice': Invoice,
  },
  created() {
    this.enterTime = new Date().getTime();
    this.computedPayPrice();
    if (this.currentShop.shopProperty.hummingbird !== 1) {
      this.order.deliveryMethod = '商家自送';
    }
  },
  beforeRouteUpdate(to, from, next) {
    const hasOwn = Object.prototype.hasOwnProperty;
    if (hasOwn.call(to.query, 'addressIndex')) {
      this.order.address = { ...this.order.address, ...this.currentUser.address[to.query.addressIndex] };
      this.checkRedPacket();
      this.computedArrivedTime();
    }
    if (hasOwn.call(to.query, 'redPacketIndex')) {
      if (to.query.redPacketIndex !== -1) {
        this.order.redPacketId = this.currentUser.hongbao[to.query.redPacketIndex].id;
        this.computedRedPacket(to.query.redPacketIndex);
      } else {
        this.order.redPacketId = -1;
        this.redPacket = 0;
      }
      this.computedPayPrice();
    }
    next();
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
};
</script>
<style lang="scss" scoped>
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
    .mint-cell-value{
      max-width: 60%;
      display: block;
      @include ellipsis;
    }
    .mint-popup{
      background: none;
    }
    .payMethod{
      width: 100vw;
      text-align: center;
      border-bottom: 1px solid #ccc;
      background: #fff;
      @include remCalc('font-size',18px);
      @include remCalc('padding',10px,0);
    }
    article{
      @include remCalc('padding-bottom',50px);
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


