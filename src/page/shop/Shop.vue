<template>
  <div id="shop">
    <div class="shop-wrapper" @click='createBlueBall($event)'>
      <section class="shop-header ">
        <div class="back" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="shop-info">
          <div class="img">
            <img :src="currentShop.shopLogo">
          </div>
          <div class="txt">
            <h1>{{currentShop.shopName}}</h1>
            <p>
              {{currentShop.shopProperty.hummingbird?"蜂鸟专送":"商家派送"}}/{{currentShop.time}}分钟送达/配送费￥{{currentShop.deliveryCost}}
            </p>
            <p>公告：{{currentShop.shopNptice}}</p>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="activity">
          <p>
            <span class="green-background"> 新</span>新用户下单立减17.0元(不于其他活动叠加)
          </p>
        </div>
      </section>
      <section class="tag">
        <el-tabs v-model="tag" type="card" @tab-click="handleClick">
          <el-tab-pane label="商品" name="product">
             <section class="products" :style="{height:computedHeight}">
              <div class="list">
                <ul >
                  <li :class='{"active":i===activeIndex}' 
                  v-for = "(v,i) in shopFoods" 
                  :key="i"
                  @click='jumpToFood(i)'>
                    {{v.listName}}
                  </li>
                </ul>
              </div>
              <div class="product-wrapper" @scroll="productScroll($event)">
                <ul>

                  <li v-for ="(v,i) in shopFoods"
                      :key="i">
                    <p>{{v.listName}}<span>{{v.description}}</span></p>		
                    <ul>
                      <li v-for ="(item,index) in v.foodList"
                          :key="index">
                        <div class="food-img">
                          <img :src="item.foodPic">
                        </div>
                        <div class="food-detail">
                          <header>
                            {{item.foodName}} 
                            <span 
                            class="yellow-border" 
                            v-if="item.foodPropertyList.length != 0">
                              多规格
                            </span>
                          </header>
                          <section class="gray">月售{{item.countMonth}}份 好评率{{item.goodEvaluate * 100}}%</section>
                          <section>{{item.foodInfo}}</section>
                          <section class="price">
                            <span>￥{{item.price}}</span>
                            <div class="pull-right">
                              <div v-show="item.foodPropertyList.length === 0?true:
                                shoppingCartProducts[currentShop.id]?
                                shoppingCartProducts[currentShop.id].foodIdList?
                                shoppingCartProducts[currentShop.id].foodIdList.has(item.id):false:false
                                ">
                                <button class="minus"
                                v-show="shoppingCartProducts[currentShop.id]?
                                shoppingCartProducts[currentShop.id].foodIdList?
                                shoppingCartProducts[currentShop.id].foodIdList.has(item.id):false:false"
                                @click = "removeProduct(item,v,i)">-</button>

                                <span v-show="shoppingCartProducts[currentShop.id]?
                                shoppingCartProducts[currentShop.id].foodIdList?
                                shoppingCartProducts[currentShop.id].foodIdList.has(item.id):false:false">
                                  {{item.foodNum}}
                                </span>
                                <button class="plus" @click='showSelect(item,v,index)'>+</button>
                              </div>
                              <div v-show="item.foodPropertyList.length === 0?false:
                                shoppingCartProducts[currentShop.id]?
                                shoppingCartProducts[currentShop.id].foodIdList?
                                !shoppingCartProducts[currentShop.id].foodIdList.has(item.id):true:true">
                                <button class="blue-background" @click="showSelect(item,v,index)">选规格</button>
                              </div>
                            </div>
                          </section>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>	
          </el-tab-pane>
          <el-tab-pane label="评价" name="evaluate">
            <section class="evaluate" :style="{'height':computedHeight}">
              2222
            </section>
          </el-tab-pane>
        </el-tabs>
      </section>
      <section id="shoppingCart">
        <div class="shoppingcart-icon">
          <el-badge :value="currentShopSelectedNum" class="item">
            <span>
              <i></i>
            </span>
          </el-badge>
        </div>
        <div class="countPrice">
          <div class="price" @click="shoppingCartDetailShow = !shoppingCartDetailShow">
            <div class="tb-center">
              <h1>￥{{shoppingCartProducts[currentShop.id]?shoppingCartProducts[currentShop.id].totalPrice:0.00}}</h1>
              <p>配送费￥{{currentShop.deliveryCost}}</p>
            </div>
          </div>
          <button
            :class="{
              'green':shoppingCartProducts[currentShop.id]?
              shoppingCartProducts[currentShop.id].totalPrice >= currentShop.startCost:false,
              'deepgGrag':shoppingCartProducts[currentShop.id]?
              shoppingCartProducts[currentShop.id].totalPrice < currentShop.startCost:true,
            }"
          >
            {{
              shoppingCartProducts[currentShop.id]?
              shoppingCartProducts[currentShop.id].totalPrice < currentShop.startCost?
              `还差${shoppingCartProducts[currentShop.id].totalPrice - currentShop.startCost}元起送`:
              `去结算`:
              `还差${currentShop.startCost}元起送`
            }}
          </button>
        </div>
        <div class="shoppingcart-prodcut-wrapper" 
             v-show="shoppingCartDetailShow"
             @click="shoppingCartDetailShow = !shoppingCartDetailShow">
          <div class="shoppingcart-prodcut-list"
               @click.stop="/* eslint-disable */">
            <header>
              <h1>购物车</h1>	
              <span @click ="removeAllProducts()">
                清空
                <i class="el-icon-delete"></i>
              </span>
            </header>
            <article>	
              <ul>
                <template v-if="shoppingCartProducts[currentShop.id]">
                  <li v-for="(item,index) in shoppingCartProducts[currentShop.id].foodList" 
                      :key="index">
                    <div class="name">
                      {{item.foodName}} {{item.foodType}}
                    </div>
                    <div>
                      <span>￥{{item.price}}</span>
                      <span>
                        <button class="minus" @click="removeProduct(item)">-</button>
                        <span class="num">{{item.foodNum}}</span>
                        <button class="plus" @click="addToShopping(item)">+</button>
                      </span>
                    </div>
                  </li>
                </template>
                <li v-else>暂无商品</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
      <mt-popup
        v-model="selectFoodType"
        popup-transition="popup-fade">
        <div class="foodtype">
          <div class="close" @click = "selectFoodType = false">
            <i class="el-icon-close"></i>
          </div>
          <h1 class="text-center">{{foodType.foodName}}</h1>
          <template v-for="(v,i) in foodType.foodPropertyList" >
            <h2 :key="i">{{v.typeName}}</h2>
            <ul :key="i">
              <li :class="{'active':selectArray[i][index]}" 
              v-for="(item,index) in v.foodPropertyDetail"
              @click="changeSelect(i,index)"
              :key="index">
                {{item.name}}
              </li>
            </ul>
          </template>
          <div class="last-price">
            <span>￥ {{currentPopupProductPrice}}</span>
            <el-button type="primary" @click = 'addToShopping()'>添加到购物车</el-button>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  
  import Velocity from 'velocity-animate';
  import { throttle } from 'lodash';
  import { mapGetters } from 'vuex';
  import { Toast } from 'mint-ui';
  import * as type from '../../store/mutation-types';
  import { getShopFoodTypeList } from '../../api/shop';

  export default{
    name: 'shop',
    data() {
      return {
        tag: 'product', // 商品与评价切换
        computedHeight: '', // 商品组件高度
        shopFoods: [
          {
            description: '大家说好吃才好吃',
            foodList: [],
            listName: '热销',
          },
          {
            description: '便宜才好吃',
            foodList: [],
            listName: '优惠',
          },
        ], // 店铺所有食物
        selectFoodType: false, // 多规格商品弹出框显示控制变量
        selectArray: [], // 多规格商品的已选择状态数组
        foodType: {}, // 当前弹出的多规格商品的类型对象
        currentPopupProductPrice: 0.00, // 当前弹出框商品的价格
        activeIndex: 0, // 当前侧边栏active显示的标识
        foodTitleArray: [], // 食品title距离顶部的距离的数组
        shoppingCartDetailShow: false, // 购物车是否显示
        currentShopSelectedNum: 0, // 当前店铺已选择的物品数量
        shopHeaderShow: true, // 头部是否显示
        shopHeaderHeight: 0, // 头部组建高度
        createBlueBallFlag: false, // 什么时候点击可以产生蓝色球的添加动画
      };
    },
    computed: {
      ...mapGetters(['shoppingCartProducts', 'currentShop']),
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      productScroll: throttle(function (event) {
        // 判断是否需要隐藏头部
        if (event.srcElement.scrollTop > 100 && this.shopHeaderShow) {
          this.shopHeaderShow = !this.shopHeaderShow;
          this.leave();
        } else if (event.srcElement.scrollTop < 100 && !this.shopHeaderShow) {
          this.shopHeaderShow = !this.shopHeaderShow;
          this.enter();
        }

        // 滚动事件
        const tempArray = [...this.foodTitleArray];
        tempArray.push(event.srcElement.scrollTop);
        tempArray.sort((a, b) => a - b);
        this.activeIndex = tempArray.indexOf(event.srcElement.scrollTop) - 1;
        // 矫正相等时的错误
        if (tempArray[this.activeIndex + 1] === tempArray[this.activeIndex + 2]) {
          this.activeIndex += 1;
        }
      }, 60),
      jumpToFood(i) {
        /* eslint-disable no-undef */
        document.querySelector('.product-wrapper').scrollTop = this.foodTitleArray[i];
      },
      // 头部动画
      enter() {
        Velocity(document.querySelector('.tag'), 'stop');
        Velocity(
          document.querySelector('.tag'),
          { translateY: 0 },
          { duration: 1000, easing: 'ease' },
        );
      },
      leave() {
        Velocity(document.querySelector('.tag'), 'stop');
        Velocity(
          document.querySelector('.tag'),
          { translateY: -this.shopHeaderHeight },
          { duration: 1000, easing: 'ease' },
        );
      },
      // 添加时的动画
      createBlueBall(event) {
        if (this.createBlueBallFlag) {
          // 关闭可生成状态
          this.createBlueBallFlag = false;
          // 创建并添加蓝色球
          const blueBall = document.createElement('div');
          blueBall.className = 'blue-ball';
          blueBall.style.top = `${event.y}px`;
          blueBall.style.left = `${event.x}px`;
          const shop = document.querySelector('.shop-wrapper');
          shop.appendChild(blueBall);

          // 定位结束位置
          let endTop = document.documentElement.clientHeight || document.body.clientHeight;
          const shoppingcartIcon = document.querySelector('.shoppingcart-icon');

          endTop = endTop - shoppingcartIcon.offsetLeft - (shoppingcartIcon.offsetWidth / 2);
          const endLeft = shoppingcartIcon.offsetLeft + (shoppingcartIcon.offsetWidth / 2);

          // 创建球动画
          Velocity(
            blueBall,
            {
              top: [endTop, [0.800, 0.170, 0.730, 0.575]],
              left: [endLeft, [0.615, 0.800, 0.780, 0.915]],
            },
            {
              duration: 600,
              easing: 'linear',
              complete() {
                // 结束时 添加购物车抖一抖动画
                Velocity(document.querySelector('.shoppingcart-icon'), 'stop');
                Velocity(
                  document.querySelector('.shoppingcart-icon'),
                  { scale: [1, 0.8] },
                  {
                    duration: 1000,
                    easing: [100, 8],
                  },
                );
                shop.removeChild(blueBall);
              },
            },
          );
        }
      },
      showSelect(product, productList, productListIndex) {
        // 读取多规格商品的具体类型
        if (product.foodPropertyList.length !== 0) {
          this.selectArray.splice(0);
          product.foodPropertyList.forEach((e) => {
            const tempArray = new Array(e.foodPropertyDetail.length);
            tempArray.fill(false);
            tempArray[0] = true;
            this.selectArray.push(tempArray);
          });

          product.productListIndex = productListIndex;
          product.productList = productList;

          Object.assign(this.foodType, product);
          // 计算商品默认状态价格
          let productTypePrice = 0;
          this.foodType.foodPropertyList.forEach((e) => {
            productTypePrice += e.foodPropertyDetail[0].price;
          });
          this.currentPopupProductPrice = this.foodType.price + productTypePrice; 
          this.selectFoodType = true;
        } else {
          this.addToShopping(product);
        }
      },
      changeSelect(i, index) {
        // 多规格商品选择时 改变 选择状态
        if (!this.selectArray[i][index]) {
          // 改变选中状态
          const trueIndex = this.selectArray[i].indexOf(true);
          this.selectArray[i].splice(trueIndex, 1, false);
          this.selectArray[i].splice(index, 1, true);
          // 改变不同状态下的价格
          let productTypePrice = 0;
          this.foodType.foodPropertyList.forEach((e, i) => {
            const newtrueIndex = this.selectArray[i].indexOf(true);
            productTypePrice += e.foodPropertyDetail[newtrueIndex].price;
          });
          this.currentPopupProductPrice = this.foodType.price + productTypePrice;
        }
      },
      addToShopping(product = false) {
        // 判断商品是否 为多规格商品 以判断是否需要计算价格
        this.createBlueBallFlag = true;
        if (product) {
          // 判断是否从购物车添加
          if (Object.prototype.hasOwnProperty.call(product, 'foodType')) {
            product.foodNum += 1;
            const foodId = product.foodId;
            let tempFood;
            for (let i = 0; i < this.shopFoods.length; i += 1) {
              tempFood = this.shopFoods[i].foodList.find((value) => value.id === foodId);

              if (tempFood) {
                tempFood.foodNum += 1;
                break;
              }
            }
            this.createBlueBallFlag = false;
          } else {
            const foodType = '';
            const foodNum = 1;
            const { foodName, price, id: foodId } = product; // 食物名称 价格 ID
            const { shopName, id: shopId } = this.currentShop; // 当前店铺名称 店铺ID
            const Data = { foodName, shopId, price, shopName, foodType, foodId, foodNum };
            this.$store.commit(type.ADD_TO_SHOPPINGCART, Data);
            product.foodNum += 1;
            this.selectFoodType = false;
          }
        } else {
          // 判断购物车中是否存在 该店铺 及该食物
          let foodType = '';
          const foodNum = 1;
          this.foodType.foodPropertyList.forEach((element, index) => {
            const trueIndex = this.selectArray[index].indexOf(true);
            foodType += `[${element.foodPropertyDetail[trueIndex].name}]`;
          });
          const { foodName, id: foodId } = this.foodType; // 食物名称 食物ID
          const { shopName, id: shopId } = this.currentShop; // 当前店铺名称
          const price = this.currentPopupProductPrice; // 食物价格

          const Data = { foodName, shopId, price, shopName, foodType, foodId, foodNum };

          this.$store.commit(type.ADD_TO_SHOPPINGCART, Data);
          this.foodType.productList.foodList[this.foodType.productListIndex].foodNum += 1;
          this.selectFoodType = false;
        }
        this.currentShopSelectedNum += 1;
      },
      removeProduct(item, v, index) {
        // 如果是从购物车直接删除
        if (!Number.isInteger(index)) {
          const shopId = this.currentShop.id;
          const foodId = item.foodId;
          const foodType = item.foodType;
          const Data = { shopId, foodId, foodType };
          this.$store.commit(type.REMOVE_FORM_SHOPPINGCART, Data);
          this.currentShopSelectedNum -= 1;

          let tempFood;
          for (let i = 0; i < this.shopFoods.length; i += 1) {
            tempFood = this.shopFoods[i].foodList.find((value) => value.id === foodId);

            if (tempFood) {
              tempFood.foodNum -= 1;
              break;
            }
          }
          return;
        }
        // 检查要删除的商品是否是多规格商品并且在购物车当中并不是唯一一个件商品
        if (this.shoppingCartProducts[this.currentShop.id].foodList.filter((e) => e.foodId === item.id).length !== 1) {
          Toast({
            message: '多规格商品请到购物车删除',
            duration: 3000,
            className: 'big-font',
          });
          return;
        }

        const shopId = this.currentShop.id;
        const foodId = item.id;
        const foodType = 'always';
        const Data = { shopId, foodId, foodType };
        item.foodNum -= 1;
        this.$store.commit(type.REMOVE_FORM_SHOPPINGCART, Data);
        this.currentShopSelectedNum -= 1;
      },
      removeAllProducts() {
        const shopId = this.currentShop.id;
        this.$store.commit(type.REMOVE_ALL_PRODUCTS, shopId);
      },
    },
    async created() {
      // 初始化时 通过店铺ID获取店铺商品
      const id = this.currentShop.id;
      if (!id) {
        this.$router.push('/home');
        return;
      }
      try {
        const res = await getShopFoodTypeList({ id });
        res.data.data.forEach((e) => {
          e.foodList.forEach((e) => {
            if (this.shoppingCartProducts[this.currentShop.id] ?
              this.shoppingCartProducts[this.currentShop.id].foodIdList.has(e.id) : false) {
              e.foodNum = this.shoppingCartProducts[this.currentShop.id].foodIdList.get(e.id);
            } else {
              e.foodNum = 0;
            }
          });
        });

        let tempArray = [];
        res.data.data.forEach((e) => {
          tempArray = [...tempArray, ...e.foodList];
        });

        // 获取销量最多的5个 产品 推到热销里
        tempArray.sort((a, b) => b.countMonth - a.countMonth).splice(5);
        this.shopFoods[0].foodList = [...this.shopFoods[0].foodList, ...tempArray];

        this.shopFoods = [...this.shopFoods, ...res.data.data];

        // 如果没有优惠产品就讲优惠部分删除
        if (this.shopFoods[1].foodList.length === 0) {
          this.shopFoods.splice(1, 1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 计算 底部商品组件的高
    mounted() {
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const headerHeight = document.querySelector('.shop-header').offsetHeight;
      const tagHeight = document.querySelector('.el-tabs__header').offsetHeight;
      this.computedHeight = `${(windowHeight - tagHeight) - 100}px`;
      this.shopHeaderHeight = headerHeight;
      // 记录当前店铺中有多少商品在购物车当中
      let tempNumber = 0;
      if (this.shoppingCartProducts[this.currentShop.id]) {
        /* eslint-disable no-restricted-syntax */
        for (const [, value] of this.shoppingCartProducts[this.currentShop.id].foodIdList) {
          tempNumber += value;
        }
      }
      this.currentShopSelectedNum = tempNumber;
    },
    updated() {
      // 记录每一个title到组件顶部的距离
      this.foodTitleArray.splice(0);
      const foodTitles = document.querySelectorAll('.product-wrapper p');
      foodTitles.forEach((e) => {
        this.foodTitleArray.push(e.offsetTop);
      });
    },
  };

</script>
<style lang='scss'>
  
  @import '../../assets/css/common/tool';
  @import '../../assets/css/common/responsive';

  #shop{
    max-height: 100vh;
    position: relative;
    overflow: hidden;
    .shop-wrapper{
      position: relative;
    }
    .foodtype{
      min-width: 80vw;
      @include remCalc('padding',40px);
      .close{
        position: absolute;
        @include remCalc('right',31px);
        @include remCalc('top',30px);
      }
      h1{
        @include remCalc('font-size',60px);
      }
      h2{
        @include remCalc('font-size',50px);
        margin-bottom: 20px;
        margin-top: 20px;
      }
      ul{
        display: flex;
        li{
          @include remCalc('padding',15px,30px);
          @include remCalc('border-radius',50px);
          @include remCalc('margin-right',20px);
          &.active{
            color:$blue;
            border: 1px solid $blue;
          }
        }
      }
      .last-price{
        @include remCalc('padding',20px,0);
        display: flex;
        flex-direction:row;
        flex-wrap:nowrap;
        justify-content: space-between;
        >span{
          color:#f60;
          @include remCalc('font-size',60px);

        }
        button{
          @include remCalc('padding',30px)
        }
      }
    }		
    .shop-header{
      background: $blue;
      overflow: hidden;
      @include remCalc('height',407px);
      @include remCalc('padding',20px);
      .back{
        color: #fff;
        @include remCalc('margin-bottom',20px);
        i{
          @include remCalc('font-size',48px);
        }
      }
      .shop-info{
        display: flex;
        flex-direction:row;
        flex-wrap:nowrap;
        .img{
          @include remCalc('width',240px);
          img{
            width: 100%;
          }
        }
        .txt{
          display: flex;
          flex-direction:column;
          flex:1;
          color: #fff;
          position: relative;
          @include remCalc('padding-left',40px);
          h1,p{
            display: block;
          }
          h1{
            font-weight: bold;
            @include remCalc('font-size',52px);
            @include remCalc('margin-bottom',20px);
            @include ellipsis;
          }
          p{
            @include remCalc('font-size',30px);
            @include remCalc('margin',10px,0);
            @include ellipsis;
          }
          i{
            @include remCalc('right',20px);
            @include tb-center(absolute);
          }
        }
      }
      .activity{
        color: #fff;
        p{
          @include ellipsis;
          span{
            margin-right: 10px;
          }
        }
      }
    }
    .tag{
      background:#fff;
      .el-tabs__header{
        margin: 0;
      }
      .el-tabs__nav{
        float: none !important;
        width: 100% !important;
        .el-tabs__item{
          width: 50%;
          height: auto;
          line-height: 1;
          text-align: center;
          @include remCalc('font-size',42px);
          @include remCalc('padding',30px,0);
          &.is-active{
            &:after{
              content: "";
              display: block;
              background: $blue;
              @include lr-center-transform(absolute);
              @include remCalc('bottom',15px);
              @include remCalc('width',100px);
              @include remCalc('height',6px);
            }
          }
        }
      }
    }
    .products{
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
      .list{
        height: 100%;
        overflow-y: auto;
        background: #ededed;
        @include remCalc('width',240px);

        ul{
          li{
            @include remCalc('font-size',38px);
            @include remCalc('padding',40px,30px);
            border-left: 8px solid #ededed;
            &.active{
              background: #fff;
              border-left: 8px solid $blue;
            }
          }
        }
      }
      .product-wrapper{
        flex:1;
        height: 100%;
        overflow-y: auto;
        @include remCalc('padding-bottom',160px);
        >ul{
          >li{
            >p{
              background: #f1f1f1;
              @include remCalc('padding',26px,42px);
              @include remCalc('font-size',36px);
              span{
                color: #999;
                @include remCalc('font-size',28px);
              }
            }
            >ul{
              >li{
                display: flex;
                .food-img{
                  flex:2;
                  @include remCalc('padding',30px)
                }
                .food-detail{
                  flex:8;
                  @include remCalc('padding',30px,15px);
                  header{
                    font-weight: bold;
                    @include remCalc('font-size',48px);
                    span{
                      float: right;
                      @include remCalc('padding-left',30px);
                      @include remCalc('padding-right',30px);
                      @include remCalc('border-radius',30px);
                    }
                  }
                  section{
                    margin:10px 0;
                    &.gray{
                      color: #666;
                    }
                    >span{
                      color: #f60;
                      @include remCalc('font-size',42px);
                    }
                  }
                  .price{
                    display: flex;
                    justify-content: space-between;
                    >span{
                      display: block;
                    }
                    .pull-right{
                      display: flex;
                      span{
                        text-align: center;
                        overflow: hidden;
                        @include remCalc('line-height',58px);
                        @include remCalc('margin-left',25px);
                        @include remCalc('margin-right',25px);
                        @include remCalc('font-size',42px);
                        @include remCalc('min-width',40px);
                        @include remCalc('max-width',100px);
                      }
                      .minus{
                        background: #fff;
                        border-radius: 50%;				
                        border:1px solid $blue;
                        color: $blue;			
                        @include remCalc('width',58px);
                        @include remCalc('height',58px);
                      }
                      .plus{
                        background: $blue;
                        border-radius: 50%;
                        color: #fff;
                        border:none;
                        @include remCalc('width',58px);
                        @include remCalc('height',58px);	
                      }
                      .blue-background{
                        border:none;
                        outline: none;
                        @include remCalc('padding-left',30px);
                        @include remCalc('padding-right',30px);
                        @include remCalc('border-radius',30px);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    #shoppingCart{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #3d3d3f;
      z-index: 99;
      @include remCalc('height',160px);
      @include remCalc('padding-left',280px);
      .shoppingcart-icon{
        position: absolute;
        @include remCalc('left',50px);
        @include remCalc('top',-50px);
        div{
          display: block;
          background: #4a4a4a;
          border-radius:50%;
          @include remCalc('width',160px);
          @include remCalc('height',160px);
          @include remCalc('padding',20px);
          span{
            display: block;
            width:100%;
            height: 100%;
            border-radius:50%;
            background: $blue;
            &:before{
              content: "";
              display: block;
              width:40%;
              height: 40%;
              background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1OCA1OCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiIHg9Ii01MCUiIHk9Ii01MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxLjUiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4wOCAwIiBpbj0ic2hhZG93Qmx1ck91dGVyMSIgcmVzdWx0PSJzaGFkb3dNYXRyaXhPdXRlcjEiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48cGF0aCBpZD0iYiIgZD0iTTcuNjE0IDQuMDUxYy0xLjA2Ni4wODYtMS40NTItLjM5OC0xLjc1Mi0xLjU4NEM1LjU2MiAxLjI4LjMzIDUuODguMzMgNS44OGwzLjcxIDE5LjQ3NmMwIC4xNDgtMS41NiA3LjUxNS0xLjU2IDcuNTE1LS40ODkgMi4xOS4yOTIgNC4yNyAzLjU2IDQuMzIgMCAwIDM2LjkxNy4wMTcgMzYuOTIuMDQ3IDEuOTc5LS4wMTIgMi45ODEtLjk5NSAzLjAxMy0zLjAzOS4wMy0yLjA0My0xLjA0NS0yLjk3OC0yLjk4Ny0yLjk5M0w4LjgzIDMxLjE5MnMuODYtMy44NjUgMS4wNzctMy44NjVjMCAwLTUuNzg4LjEyMiAzMi4wNjUtMS45NTYuNjA2LS4wMzMgMi4wMTgtLjc2NCAyLjI5OC0xLjg0OCAxLjExMy00LjMxNyA0LjAwOC0xMy4yNiA0LjQ1OC0xNS42NC45MzItNC45MjUgMi4wNjEtOC41NTgtNC4yOC03LjQwNSAwIDAtMzUuNzY4IDMuNDg3LTM2LjgzMyAzLjU3M3oiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDM4IDcuODA4KSI+PG1hc2sgaWQ9ImMiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2IiLz48L21hc2s+PHVzZSBmaWxsPSIjRkZGIiB4bGluazpocmVmPSIjYiIvPjxwYXRoIGZpbGw9IiMyMDczQzEiIGQ9Ik01My45NjIgNy43NzRsLTUuNzAxIDE5LjMwNS00MC43OCAxLjU3NHoiIG9wYWNpdHk9Ii4xIiBtYXNrPSJ1cmwoI2MpIi8+PC9nPjxwYXRoIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSI2IiBkPSJNOS4zNzQgMTguNzIyUzcuODY4IDExLjI4MyA3LjMyMyA4LjcxQzYuNzc4IDYuMTM2IDUuODYgNS4zMyAzLjk3OCA0LjUyIDIuMDk2IDMuNzEzLjM2NyAyLjI4Ni4zNjcgMi4yODYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxjaXJjbGUgY3g9IjQ2IiBjeT0iNTEiIHI9IjQiIGZpbGw9IiNGRkYiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjUxIiByPSI0IiBmaWxsPSIjRkZGIi8+PC9nPjwvc3ZnPg==) 50%  no-repeat;

              @include all-center(absolute);
              
            }
          }
          .el-badge__content{
            @include remCalc('font-size',30px);
            @include remCalc('line-height',45px);
            @include remCalc('padding',0,12px);
            @include remCalc('height',45px);
            @include remCalc('right',60px);
            @include remCalc('top',20px);
            @include remCalc('border-radius',20px);
          }
        }
      }
      .countPrice{
        display: flex;
        .price{
          flex:1;
          .tb-center{
            @include tb-center(relative);
            h1{
              color:#fff;
            }
            p{
              color:#fff;
            }
          }
        }
        >button{
          @include remCalc('width',240px);
          @include remCalc('height',160px);
          outline: none;
          border:none;
          color: #fff;
          &.green{
            background: #4cd964;
          }
          &.deepgGrag{
            background:#535356;
          }
        }
      }
      .shoppingcart-prodcut-wrapper{
        height: 100vh;
        width: 100vw;
        background:rgba(0,0,0,0.4);
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
        .shoppingcart-prodcut-list{
          position: absolute;
          left: 0;
          background: #fff;
          width:100%;
          z-index: -1;
          @include remCalc('bottom',160px);
          header{
            background: #eceff1;
            display: flex;
            justify-content:space-between;
            @include remCalc('padding',15px,30px);
            h1{
              border-left: 6px solid $blue;
              @include remCalc('font-size',48px);
              @include remCalc('padding-left',30px);
            }
          }
          article{
            @include remCalc('padding',30px,30px,80px,30px);
            ul{
              li{
                display: flex;
                justify-content:space-between;
                .name{
                  max-width: 60%;
                  @include remCalc('font-size',52px);
                  @include remCalc('margin-bottom',20px);
                  @include ellipsis;
                }
                div{
                  >span{
                    color:$orange;
                    span{
                      text-align: center;
                      overflow: hidden;
                      @include remCalc('line-height',58px);
                      @include remCalc('margin-left',25px);
                      @include remCalc('margin-right',25px);
                      @include remCalc('font-size',42px);
                      @include remCalc('min-width',40px);
                      @include remCalc('max-width',100px);
                    }
                    .minus{
                      background: #fff;
                      border-radius: 50%;				
                      border:1px solid $blue;
                      color: $blue;			
                      @include remCalc('width',58px);
                      @include remCalc('height',58px);
                    }
                    .num{
                      color:#333;
                    }
                    .plus{
                      background: $blue;
                      border-radius: 50%;
                      color: #fff;
                      border:none;
                      @include remCalc('width',58px);
                      @include remCalc('height',58px);	
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .blue-ball{
      background:$blue;
      border-radius: 50%;
      @include remCalc('width',50px);
      @include remCalc('height',50px);
      position: fixed;
      z-index: 99;
    }
  }
  
</style>