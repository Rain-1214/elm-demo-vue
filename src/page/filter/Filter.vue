<template>
  <div id="filter">
    <mt-header title="发现"></mt-header>
    <article>
      <section class="fliter-condition">
        <div>
          <el-dropdown
            :show-timeout="0"
            placement="bottom-start">
            <span class="el-dropdown-link">
              类别<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="dropdown-menu shop-type">
                <div 
                  :key="i"
                  v-for="(v,i) in shopTypeList">
                  <img :src="v.typeLogo" alt="">
                  {{v.typeName}}
                </div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-dropdown
            :show-timeout="0">
            <span class="el-dropdown-link">
              排序<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="dropdown-menu sort">
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
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-dropdown
            :show-timeout="0">
            <span class="el-dropdown-link">
              筛选<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu 
              class="cancle-margin"
              slot="dropdown">
              <div class="dropdown-menu condition-menu">
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
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </section>
      <section class="shop-wrapper">

      </section>
    </article>
    <my-footer :active="1"></my-footer>
  </div>
</template>
<script>
  import { getShopTypeList } from '../../api/shop';
  import Footer from '../components/footer.vue';

  export default {
    data() {
      return {
        shopTypeList: [],
      };
    },
    components: {
      'my-footer': Footer,
    },
    methods: {
      async loadShopTypeList() {
        const res = await getShopTypeList();
        console.log(res);
        if (res.data.stateCode) {
          this.shopTypeList = res.data.data;
        }
      },
    },
    created() {
      this.loadShopTypeList();
    },
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/css/common/responsive';
  @import '../../assets/css/common/tool';

  #filter{
    article{
      .fliter-condition{
        display: flex;
        div{
          flex: 1;
          text-align: center;
          .el-dropdown{
            width: 100%;
            .el-dropdown-link{
              display: block;
              @include remCalc('padding',5px,0);
            }
          }
        }
      }
    }
  }
  .el-dropdown-menu{
    width: 100vw;
    left: 0 !important;
    &.cancle-margin{
      padding-bottom: 0;
      margin-bottom: 0;
    }
    .dropdown-menu{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      @include remCalc('padding',0,10px);
      &.shop-type{
        >div{
          width: 33.3333%;
          @include remCalc('margin-bottom',3px);
        }
        img{
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
        padding: 0;
        .condition-wrapper{
          display: block;
          width: 100%;
          h3{
            @include remCalc('padding',0,10px);
          }
          .condition{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            @include remCalc('margin',5px,0);
            div{
              width: 33.333%;
              @include remCalc('padding',10px,10px);
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
</style>


