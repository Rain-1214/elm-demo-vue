<template>
  <div id="filter">
    <mt-header title="发现"></mt-header>
    <article>
      <section class="fliter-condition">
        <div
          @click="showCondition(0)">
          <span class="el-dropdown-link">
            类别<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <div 
            v-show="conditionShow[0]"
            class="dropdown-menu shop-type">
            <div>
              <img src="//fuss10.elemecdn.com/c/3c/0184f5b3fa72f295fc01864734218jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/" alt="">
              全部
              <i class="el-icon-check"></i>
            </div>
            <div 
              :key="i"
              v-for="(v,i) in shopTypeList">
              <img :src="v.typeLogo" alt="">
              {{v.typeName}}
              <i class="el-icon-check"></i>
            </div>
          </div>
        </div>
        <div @click="showCondition(1)">
          <span class="el-dropdown-link">
            排序<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <div 
            v-show="conditionShow[1]"
            class="dropdown-menu sort">
            <ul>
              <li>
                <div>
                  <svg>
                    <use xlink:href="#hot"></use>
                  </svg>
                  销量最高
                </div>
                <div>
                  <i class="el-icon-check"></i>
                </div>
              </li>
              <li>
                <div>
                  <svg>
                    <use xlink:href="#price"></use>
                  </svg>
                  起送价最低
                </div>
                <div>
                  <i class="el-icon-check"></i>
                </div>
              </li>
              <li>
                <div>
                  <svg>
                    <use xlink:href="#speed"></use>
                  </svg>
                  配送最快
                </div>
                <div>
                  <i class="el-icon-check"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div @click="showCondition(2)">
          <span class="el-dropdown-link">
            筛选<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <div 
            v-show="conditionShow[2]"
            class="dropdown-menu condition-menu">
            <div class="condition-wrapper">
              <h3>配送方式</h3>
              <div class="condition">
                <div>
                  <i class="el-icon-check"></i>
                  蜂鸟专送
                </div>
              </div>
            </div>
            <div class="condition-wrapper">
              <h3>人均消费</h3>
              <div class="condition">
                <div class="is-active">
                  <i class="el-icon-check"></i>
                  10元以内
                </div>
                <div>
                  <i class="el-icon-check"></i>
                  10-30
                </div>
                <div>
                  <i class="el-icon-check"></i>
                  30元以上
                </div>
              </div>
            </div>
            <div class="condition-wrapper">
              <h3>商家属性(可多选)</h3>
              <div class="condition">
                <div>
                  <i class="el-icon-check"></i>
                  <span class="font-icon">
                    保
                  </span>
                  外卖保
                </div>
                <div>
                  <i class="el-icon-check"></i>
                  <span class="font-icon">
                    票
                  </span>
                  提供发票
                </div>
                <div class="is-active">
                  <i class="el-icon-check"></i>
                  <span class="font-icon">
                    准
                  </span>
                  准时达
                </div>
                <div>
                  <i class="el-icon-check"></i>
                  <span class="font-icon">
                    品
                  </span>
                  品牌商家
                </div>
              </div>
            </div>
            <div class="submit">
              <el-button
                size="small">
                清空
              </el-button>
              <el-button 
                size="small"
                type="success">
                确定
              </el-button>
            </div>
          </div>
        </div>
      </section>
      <section v-show="blackModelShow" class="block-model"></section>
      <section class="shop-wrapper">
        <div 
          class="shop" 
          @click="toShopDetail(v)"
          v-for="(v,i) in showShopList" 
          :key="v.id">
          <div class="img">
            <img :src="v.shopLogo">
          </div>
          <div class="shop-detail">
            <div class="shopList-header">
              <h2 :class="{'isbrand':v.isBrand}">{{ v.shopName }}</h2>
              <div class="shop-type">
                <span v-if="v.shopProperty.safeguard">保</span>
                <span v-if="v.shopProperty.hummingbird">准</span>
                <span v-if="v.shopProperty.invoice">票</span>
              </div>
            </div>
            <div class="shop-info">
              <div>
                <el-rate
                  v-model="v.averageEvaluate"
                  disabled
                  show-score
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
    </article>
    <my-footer :active="1"></my-footer>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { getShopTypeList, getShopList } from '../../api/shop';
  import getGreatCircleDistance from '../../tool/computdistance';
  import Footer from '../components/footer.vue';

  export default {
    data() {
      return {
        shopTypeList: [],
        shopList: [],
        showShopList: [],
        conditionShow: [false, false, false],
        blackModelShow: false,
        sortBy: [
          {
            name: 'filterByShopType',
            value: [],
          },
        ],
      };
    },
    components: {
      'my-footer': Footer,
    },
    computed: {
      ...mapGetters(['tempAddress']),
    },
    methods: {
      async loadShopTypeList() {
        const res = await getShopTypeList();
        if (res.data.stateCode) {
          this.shopTypeList = res.data.data;
        }
      },
      async loadShopList() {
        const res = await getShopList();
        if (res.data.stateCode) {
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
            this.showShopList.push(e);
          });
        }
      },
      showCondition(index) {
        this.conditionShow.fill(false);
        this.conditionShow.splice(index, 1, true);
        this.blackModelShow = true;
      },
      closeCondition() {
        this.conditionShow.fill(false);
      },
      sortShop() {

      },
      filterByShopType(shopTypeName) {

      },
    },
    created() {
      this.loadShopTypeList();
      this.loadShopList();
    },
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/css/common/responsive';
  @import '../../assets/css/common/tool';
  @import '../../assets/css/common/public';

  #filter{
    article{
      .fliter-condition{
        display: flex;
        position: relative;
        z-index: 11;
        background: #fff;
        >div{
          flex: 1;
          text-align: center;
          @include remCalc('padding',5px,0);
          .dropdown-menu{
            position: absolute;
            width: 100vw;
            left:0;
            background: #fff;
            @include remCalc('padding',0,10px);
            &.shop-type{
              >div{
                text-align: left;
                width: 33.3333%;
                float: left;
                position: relative;
                @include remCalc('margin-bottom',3px);
                &.is-active{
                  i{
                    display: block;
                  }
                }
                i{
                  display: none;
                  color: $blue;
                  @include tb-center(absolute);
                  @include remCalc('right',5px);
                }
              }
              img{
                vertical-align: middle;
                @include remCalc('width',15px);
              }
            }
            &.sort{
              ul{
                display: block;
                width: 100%;
                li{
                  display: flex;
                  justify-content: space-between;
                  @include remCalc('padding',8px,0);
                  div{
                    min-width: 50%;
                    text-align: left;
                    @include remCalc('font-size',15px);
                    &:last-child{
                      text-align: right;
                    }
                  }
                  svg{
                    position: relative;
                    @include remCalc('width',15px);
                    @include remCalc('height',15px);
                    @include remCalc('top',2px);
                  }
                }
              }
            }
            &.condition-menu{
              padding: 10px 0 0;
              .condition-wrapper{
                display: block;
                width: 100%;
                text-align: left;
                h3{
                  @include remCalc('font-size',13px);
                  @include remCalc('padding',0,10px);
                }
                .condition{
                  display: flex;
                  justify-content: flex-start;
                  flex-wrap: wrap;

                  @include remCalc('margin',5px,0);
                  div{
                    width: 33.333%;
                    @include remCalc('padding',5px);
                    i{
                      display: none;
                      color: $blue;
                    }
                    .font-icon{
                      display: inline-block;
                      border: 1px solid #ccc;
                      border-radius: 3px;
                      color: #ccc;
                      text-align: center;
                      @include remCalc('line-height',17px);
                      @include remCalc('width',17px);
                      @include remCalc('height',17px);
                    }
                    &.is-active{
                      background: #edf5ff;
                      color: $blue;
                      i{
                        display: inline-block;
                      }
                      .font-icon{
                        border-color:$blue;
                        color: $blue;
                      }
                    }
                  }
                }
              }
              .submit{
                display: flex;
                width: 100%;
                button{
                  width: 50%;
                  margin-left:0;
                  border-left: 0;
                  border-radius: 0;
                }
              }
            }
          }
        }
      }
      .block-model{
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 8;
      }
      .shop-wrapper{
        .shop{
          display: flex;
          flex-direction:row;
          flex-wrap:nowrap;
          justify-content: space-between;
          .img{
            padding:5px;
            img{
              @include remCalc('height',55px);
              @include remCalc('width',55px);
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
    }
  }
  
</style>


