<template>
  <div id="order">
    <mt-header title="我的订单"></mt-header>
    <article>
      <section 
        :key="i"
        v-for="(v,i) in orderList">
        <header>
          <div class="img">
            <img :src="v.shop.shopLogo" alt="">
          </div>
          <div class="name">
            {{v.shop.shopName}}
          </div>
          <div class="state">
            {{ computeOrderState(v.order.orderState) }}
          </div>
        </header>
        <main>
          <div>
            {{v.orderProduct[0].name}} 等 {{v.orderProduct.length}} 件商品
          </div>
          <div class="button">
            <router-link :to="{
              path: '/pay',
              query: {
                orderId: v.order.id,
                payPrice: v.order.payPrice,
              }
            }">
              <el-button 
                v-if="v.order.orderState == 1"
                type="success"
                size="small">
                去付款 
              </el-button>
            </router-link>
            <router-link :to="{
              path: '/pay',
              query: {
                orderId: v.order.id,
                payPrice: v.order.payPrice,
              }
            }">
              <el-button 
                v-if="v.order.orderState == 1"
                type="primary"
                size="small">
                取消订单 
              </el-button>
            </router-link>
            <el-button 
              type="primary"
              v-if="v.order.orderState == 3"
              size="small"
              @click.native="orderCpt(v.order.id)">
              确认收货 
            </el-button>
            <el-button 
              v-if="v.order.orderState !== 1 && v.order.orderState !== 3"
              size="small">
              再来一单 
            </el-button>
            <el-button 
              @click="showDetail(v)"
              v-if="v.order.orderState !== 1"
              size="small">
              查看详情 
            </el-button>
          </div>
        </main>
      </section>
    </article>
    <my-footer :active="2"></my-footer>
    <router-view></router-view>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { Message } from 'element-ui';
  import { getOrder, orderCompleted } from '../../api/order';
  import Footer from '../components/footer.vue';
  import { ALERT_CURRENTORDER } from '../../store/mutation-types';

  export default {
    data() {
      return {
        orderList: [],
        detailVisible: false,
        detailData: null,
      };
    },
    components: {
      'my-footer': Footer,
    },
    computed: {
      ...mapGetters(['currentUser']),
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
      showDetail(v) {
        this.$store.commit(ALERT_CURRENTORDER, v);
        this.$router.push('/order/orderDetail');
      },
      async orderCpt(orderId) {
        const res = await orderCompleted({ orderId });
        if (res.data.stateCode) {
          Message({
            message: '恭喜，订单已完成',
            type: 'success',
          });
          this.loadOrder();
        } else {
          Message({
            message: res.data.message,
            type: 'error',
          });
        }
      },
      async loadOrder() {
        const userId = this.currentUser.id;
        const res = await getOrder({ userId });
        if (res.data.stateCode) {
          this.orderList = res.data.data.reverse();
        }
      },
    },
    async created() {
      this.loadOrder();
    },
  };
</script>
<style lang="scss" scoped>

  @import '../../assets/css/common/tool';
  @import '../../assets/css/common/responsive';

  #order{
    article{
      @include remCalc('padding',20px,0px,40px);
      section{
        @include remCalc('margin-bottom',15px);
        @include remCalc('padding',0,10px);
        border-bottom: 1px solid #ccc;
        header{
          display: flex;
          justify-content: flex-start;
          .img{
            flex:0 0 10%;
            img{
              max-width: 100%;
            }
          }
          .name{
            flex:0 0 65%;
            @include remCalc('padding-left',5x);
            @include remCalc('font-size',16px);
            @include ellipsis;
          }
          .state{
            text-align: right;
            flex:0 0 25%;
            align-items: flex-end;
          }
        }
        main{
          padding-left:12%;
          div{
            @include remCalc('margin-bottom',10px);
          }
          .button{
            text-align: right;
            button{
              @include remCalc('padding',5px,10px);
            }
          }
        }
      }
    }
  }

</style>

