<template>
  <div id="confirmOrder">
    <mt-header title="确认订单">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <section class="address">
        <h2>
          <router-link to='/shop/selectAddress'>
            <svg>
              <use xlink:href="#addressIcon"></use>
            </svg>
            请选择地址
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </h2>
      </section>
      <section class="arrived-time">
        <div>
          <h2>送达时间</h2>
        </div>
        <div>
          <p>尽快送达 | 预计 12:00</p>
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
              商品名
            </div>
            <div>
              <span>个数</span>
              <span>价格</span>
            </div>
          </li>
          <li class="orange">
            <div>总计</div>
            <div>
              <span>￥99999.99</span>
            </div>
          </li>
        </ul>
      </section>
      <mt-cell title="添加备注">
        
      </mt-cell>
      <mt-cell title="开发票">
        
      </mt-cell>
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
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['currentShop', 'shoppingCartProducts']),
  },
  created() {
    const hasOwn = Object.prototype.hasOwnProperty;
    if (!hasOwn.call(this.currentShop, 'id') || !hasOwn.call(this.shoppingCartProducts, this.currentShop.id)) {
      this.$router.push('/home');
    }
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
      h2{
        position: relative;
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


