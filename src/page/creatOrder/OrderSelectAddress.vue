<template>
  <div id="orderAddress">
    <mt-header title="选择地址">
      <section slot="left" @click="$router.push('/confirmOrder')">
        <i class="el-icon-arrow-left"></i>
      </section>
      <section slot="right" @click="$router.push('/confirmOrder/selectAddress/addAddress')">
        添加新地址
      </section>
    </mt-header>
    <article>
      <section v-for="(v,i) in currentUser.address" :key="v.id">
        <router-link :to="{ path:'/confirmOrder', query: { addressIndex: i }}">
          <h1>
            <span class="name">{{v.userName}}</span>
            <span class="sex">{{v.sex === 1?"先生":v.sex === 2?"女士":"先生/女士"}}</span>
            <span class="phoneNumber">{{v.phoneNumber}}</span>
          </h1>
          <h2>
            <span 
            class="tag" 
            :style="tagBackGround(v.tag)"
            v-show="v.tag !== ''">{{v.tag}}</span>
            <p :class="{'hastag':v.tag !== ''}">{{v.addressName}} {{v.addressDetail}}</p>
          </h2>
        </router-link>
      </section>
    </article>
    
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
    ...mapGetters(['currentShop', 'currentUser']),
  },
  methods: {
    tagBackGround(tag) {
      switch (tag) {
        case '家': return {
          backgroundColor: '#26a2ff',
        };
        case '公司': return {
          backgroundColor: '#70bc46',
        };
        default : return {
          backgroundColor: '#f60',
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '../../assets/css/common/responsive';
  @import '../../assets/css/common/tool';

  #orderAddress{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #FFF;
    >article{
      overflow-y: scroll;
      section{
        background:#fff;
        position: relative;
        @include remCalc('padding',10px);
        @include remCalc('margin-bottom',5px);
        h1{
          color: #333;
          @include remCalc('margin-bottom',5px);
          .name{
            font-weight: bold;
            @include remCalc('font-size',16px);
          }
          .sex{
            color: #bdbcbc;
            @include remCalc('font-size',14px);
          }
          .phoneNumber{
            color: #bdbcbc;
          }
        }
        h2{
          position: relative;
          color: #333;
          
          p{
            max-width: 90%;
            @include ellipsis;
            &.hastag{
              @include remCalc('padding-left',35px);
            }
          }
          .tag{
            position: absolute;
            background:red;
            color: #fff;
            text-align: center;
            @include remCalc('font-size',12px);
            @include remCalc('padding',0,2px);
            @include remCalc('width',30px);
          }
        }
      }
    }
  }
</style>


