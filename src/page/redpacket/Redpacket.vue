<template>
  <div id="redpacket">
    <mt-header title="红包">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <section 
        class="redpacket"
        :key="i"
        v-for="(v,i) in currentUser.hongbao">
        <div>
          <div class="money">
            <span>￥</span>{{v.minusMoney}}
          </div>
          <p>满{{v.fillMoney}}可用</p>
        </div>
        <div>
          <h2>{{v.hongbaoName}}</h2>
          <ul>
            <li v-show="v.phoneNumber ? v.phoneNumber != '' : false">限{{v.phoneNumber}}手机号使用</li>
            <li>{{v.startTime}}到{{v.endTime}}可用</li>
            <li>
              限
              <span
                :key="index"
                v-for="(item,index) in v.shopTypeList">
                {{ index >= v.shopTypeList.length - 1 ? item : `${item}、` }}
              </span>
              类使用
            </li>
          </ul>
        </div>
      </section>
      <section class="empty" v-show="currentUser.hongbao.length == 0">
        暂无红包~~
      </section>
    </article>
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
    ...mapGetters(['currentUser']),
  },
};
</script>
<style lang="scss" scoped>

  @import '../../assets/css/common/responsive';
  @import '../../assets/css/common/tool';

  #redpacket{
    article{
      .empty{
        color: #b5b5b5;
        @include remCalc('padding',15px);
        @include remCalc('font-size',22px);
      }
      .redpacket{
        display: flex;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        @include remCalc('margin',15px);
        @include remCalc('padding',10px);
        >div{
          div{
            color: red;
            font-weight: bold;
            text-align: center;
            @include remCalc('font-size',25px);
            span{
              @include remCalc('font-size',14px);
            }
          }
          &:nth-child(1){
            flex: 0 0 30%;
            overflow: hidden;
          }
          &:nth-child(2){
            @include remCalc('padding-left',10px);
          }
          p{
            color: #b5b5b5;
            text-align: center;
            @include remCalc('font-size',12px);
          }
          h2{
            font-weight: bold;
            @include remCalc('margin-bottom',5px);
          }
        }
      }
    }
  }
</style>  

