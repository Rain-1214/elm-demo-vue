<template>
  <div id="home">
    <mt-header>
      <section class="headAddress " slot="left" @click="$router.push('/location')">
        {{tempAddress.city}} {{tempAddress.district}} {{tempAddress.name}} 
      </section>
    </mt-header>
    <section class="search">
      <input type="text" name="" placeholder="搜索店铺或者商家">
    </section>
    <section class="swiper-wrapper">
      <mt-swipe :auto="0">
        <mt-swipe-item v-for="(v,i) in shopTypeList" :key = 'i'>
          <div class="item-wrapper">
            <div class="item" v-for="obj in v" :key="obj.id">
              <img :src="obj.typeLogo">
              <p>{{obj.typeName}}</p>
            </div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </section>
    <section class="grayLine"></section>
    <section class="shop-wrapper">
      <div class="title">
        <h2>推荐商家</h2>
      </div>
      <div class="shop" v-for="(v,i) in shopList" 
      @click="toShopDetail(v)"
      :key="v.id">
        <div class="img">
          <img :src="v.shopLogo">
        </div>
        <div class="shop-detail">
          <div class="shopList-header">
            <h2 :class="{'isbrand':v.isBrand}">{{ v.shopName }}</h2>
            <div class="shop-type">
              <span v-show="v.shopProperty.safeguard">保</span>
              <span v-show="v.shopProperty.hummingbird">准</span>
              <span v-show="v.shopProperty.invoice">票</span>
            </div>
          </div>
          <div class="shop-info">
            <div>
              <el-rate
                v-model="v.averageEvaluate"
                disabled
                show-text
                text-color="#ff9900">
              </el-rate>
              <p>
                月销售{{v.countOrder}}单	
              </p>
            </div>
            <div>
              <span v-show="v.shopProperty.hummingbird" class="blue-border">准时达</span>
              <span v-show="v.shopProperty.hummingbird" class="blue-background">蜂鸟专送</span>
            </div>
          </div>
          <div class="shop-price">
            <div class="gray">
              ￥{{v.startCost}}元起送 / 配送费￥{{v.deliveryCost}} 
            </div>
            <div>
              <span class="gray">{{(v.distance/1000).toFixed(2) + "Km"}}</span> / <span class="blue">{{v.time}}分钟</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <my-footer :active="0"></my-footer>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import * as type from '../../store/mutation-types';
  import Footer from '../components/footer.vue';
  import { getShopTypeList, getShopList } from '../../api/shop';
  import getGreatCircleDistance from '../../tool/computdistance';

  export default{
    data() {
      return {
        shopTypeList: [],
        shopList: [],
      };
    },
    computed: {
      ...mapGetters(['tempAddress']),
    },
    methods: {
      // 获取店铺类型
      async loadShopTypeList() {
        try {
          const res = await getShopTypeList();
          // 将店铺类型分割成8个一组的多个数组
          for (let i = 0; i < res.data.data.length; i += 8) {
            this.shopTypeList.push(res.data.data.slice(i, i + 8));
          }
        } catch (e) {
          console.log(e);
        }
      },
      // 获取所以店铺列表
      async loadShopList() {
        try {
          const res = await getShopList();
          res.data.data.forEach((e) => {
            // 计算评价平均值
            const { serveEvaluate, foodEvaluate } = e;
            const averageEvaluate = parseFloat(((serveEvaluate + foodEvaluate) / 2).toFixed(2));
            e.averageEvaluate = averageEvaluate;
            // 计算商家与用户之间的距离
            const { latitude: lat1, longitude: log1 } = e;
            const { lat: lat2, lng: log2 } = this.tempAddress.location;
            const distance = getGreatCircleDistance(lat1, log1, lat2, log2);
            e.distance = distance;
            // 计算配送时间
            let time = parseInt(parseFloat((e.distance / 1000).toFixed(2)) * 15, 10);
            if (time < 20) {
              time = 20;
            }
            e.time = time;
            this.shopList.push(e);
          });
        } catch (e) {
          console.log(e);
        }
      },
      toShopDetail(shop) {
        this.$store.commit(type.ALERT_CURRENTSHOP, shop);
        this.$router.push('/shop');
      },
    },
    created() {
      this.loadShopTypeList();
      this.loadShopList();
    },
    components: {
      'my-footer': Footer,
    },
  };
</script>
<style lang='scss'>
  @import '../../assets/css/common/tool';
  @import '../../assets/css/common/responsive';
  @import '../../assets/css/common/public';
  .headAddress{
    @include remCalc("padding",2px,4px);
    @include ellipsis;
  }
  .search{
    background: $blue;
    @include remCalc("padding",10px,10px);
    input{
      width: 100%;
      border: none;
      @include remCalc("height",30px);
      @include remCalc("border-radius",30px);
      @include remCalc("padding",0,25px);
    }
  }
  .swiper-wrapper{
    @include remCalc("height",150px);
    .mint-swipe-indicator.is-active{
      opacity: 1;
      background: #000;
    }
    .item-wrapper{
      display: flex;
      flex-direction:row;
      flex-wrap:wrap;
      padding-top: 4px;
      // flex-flow:row wrap;
      // justify-content:flex-start;
      .item{
        width: 25%;
        p{
          text-align: center;
          @include remCalc("margin",5px,0);
        }
        img{
          display: block;
          margin: 0 auto;
          width: 50%;
        }
      }
    }
  }
  .grayLine{
    width: 100%;
    background: #e5e5e5;
    @include remCalc("height",15px);
  }
  .shop-wrapper{
    .title{
      border-bottom: 1px solid #e5e5e5;
      h2{
        font-weight: bold;
        @include remCalc("padding",5px,10px);
      }
    }
    .shop{
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
      justify-content: space-between;
      .img{
        padding:5px;
        img{
          @include remCalc('height',60px);
          @include remCalc('width',60px);
        }
      }
      .shop-detail{
        flex:1;
        @include remCalc('padding-right',10px);
        .shopList-header{
          display: flex;
          justify-content:space-between;
          align-items:center;
          h2{
            font-weight: bold;
            @include ellipsis;
            @include remCalc('height',30px);
            @include remCalc('line-height',30px);
            @include remCalc("font-size",14px);
            @include remCalc("max-width",160px);
            &.isbrand{
              position: relative;
              @include remCalc('padding-left',30px);
              &:before{
                content:"品牌";
                display: inline-block;
                left:0;
                vertical-align: middle;
                @extend .yellow-background;
                @include remCalc('font-size',12px);
                @include remCalc('line-height',12px);
                @include tb-center(absolute);
              }
            }
          }
          div{
            display: flex;
            span{
              display: inline-block;
              color:#c1c1c1;
              border: 1px solid #c1c1c1;
              text-align: center;
              vertical-align: middle;
              @include remCalc('border-width',1px);
              @include remCalc('height',18px);
              @include remCalc('width',18px);
              @include remCalc('border-radius',5px);
              @include remCalc('margin-right',2.5px);
              @include remCalc('font-size',12px);
            }
          }
        }
        .shop-info{
          display: flex;
          flex-direction:row;
          flex-wrap:nowrap;
          justify-content: space-between;
          .el-rate__icon{
            @include remCalc('font-size',12px);
            @include remCalc('margin-right',0);
          }
          .el-rate__text{
            @include remCalc('font-size',12px);
            vertical-align:middle;
          }
          >div{
            display: flex;
            >p{
              display: flex;
              transform:scale(0.8);
              align-items: start;
              @include remCalc('font-size',12px);
            }
            .blue-border{
              @include remCalc('margin-right',2px)
            }
            &:first-child{
              display: flex;
              transform: scale(0.9);
              margin-left: -0.4rem;
            }
            &:last-child{
              display: flex;
              transform: scale(0.7);
              margin-right: -0.8rem;
            }
          }
        }
        .shop-price{
          display: flex;
          justify-content:space-between;
          >div,>div span{
            @include remCalc('font-size',12px);
          }
          >div{
            &:first-child{
              display: flex;
              transform: scale(0.7);
              margin-left: -1rem;
            }
            &:last-child{
              display: flex;
              transform: scale(0.7);
              margin-right: -0.8rem;
            }
          }
        }
      }
    }
  }
  
</style>
