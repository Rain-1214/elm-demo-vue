<template>
  <div id="redpacket-warpper">
    <section 
      :class = "{'canNotUse':canNotUse}"
      class="redpacket">
      <div>
        <div class="money">
          <span>￥</span>{{packet.minusMoney}}
        </div>
        <p>满{{packet.fillMoney}}可用</p>
      </div>
      <div>
        <h2>{{packet.hongbaoName}}</h2>
        <ul>
          <li v-show="packet.phoneNumber ? packet.phoneNumber != null : false">限{{packet.phoneNumber}}手机号使用</li>
          <li>
            {{serializeDate(packet.startTime)}}
            到
            {{serializeDate(packet.endTime)}}
            可用
          </li>
          <li v-if="packet.shopTypeList.length != 0">
            限
            <span
              :key="index"
              v-for="(item,index) in packet.shopTypeList">
              {{ index >= packet.shopTypeList.length - 1 ? item : `${item}、` }}
            </span>
            类使用
          </li>
        </ul>
      </div>
      <i v-if="iconShow" class="el-icon-circle-check"></i>
    </section>
    <div class="cause" v-if="canNotUseCause">
      不可用原因：{{canNotUseCause}}
    </div>
  </div>
</template>
<script>
export default {
  props: ['packet', 'canNotUse', 'canNotUseCause', 'iconShow'],
  methods: {
    serializeDate(dateTime) {
      const date = new Date(dateTime);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/common/responsive';
  @import '../../../assets/css/common/tool';

  #redpacket-warpper{
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
    @include remCalc('margin',15px,8px);
    @include remCalc('padding',10px);
    .redpacket{
      display: flex;
      position: relative;
      i{
        position: absolute;
        color: #76dc2c;
        @include remCalc('right',0px);
        @include remCalc('top',0px);
      }
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
    .canNotUse{
      >div{
        div{
          color: #ccc;
        }
        h2{
          color: #ccc;
        }
        li{
          color: #ccc;
        }
      }
    }
    .cause{
      @include remCalc('margin-top',5px);
    }
  }
</style>

