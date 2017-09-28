<template>
  <div id="addAddress">
    <mt-header title="添加地址">
      <section slot="left" @click="close()">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <section>
        <div class="text">
          姓名
        </div>
        <div class="input-wrapper">
          <input type="text" v-model="form.userName" placeholder="姓名">
        </div>
      </section> 
      <section>
        <div class="text">
          性别
        </div>
        <div class="input-wrapper">
          <div class="active">先生</div>
          <div>女士</div>
        </div>
      </section>
      <section>
        <div class="text">
          电话
        </div>
        <div class="input-wrapper">
          <input type="text" v-model="form.phoneNumber" placeholder="电话">
        </div>
      </section>
      <section>
        <div class="text">
          地址
        </div>
        <div class="input-wrapper">
          <input type="text" v-model='form.addressName' placeholder="点击选择地址">
        </div>
      </section>
      <section>
        <div class="text">
          门牌号
        </div>
        <div class="input-wrapper">
          <input type="text" v-model='form.addressDetail' placeholder="输入详细地址">
        </div>
      </section>
      <section>
        <div class="text">
          标签
        </div>
        <div class="input-wrapper">
          <div v-for='v in tag' :key="v">{{v}}</div>
        </div>
      </section>
    </article>
    <mt-popup
      v-model="popupVisible"
      position="right"
      :modal="false"
      popup-transition="popup-fade">
      <my-map @close="popupVisible = false"></my-map>
    </mt-popup>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import Map from './map.vue';

  export default {

    data() {
      return {
        form: {
          userName: '',
          sex: '1',
          phoneNumber: '',
          addressName: '',
          addressDetail: '',
          tag: '',
          lat: 0,
          lon: 0,
        },
        tag: ['家', '公司', '学校'],
        popupVisible: true,
      };
    },
    components: {
      myMap: Map,
    },
    props: ['currentAddress'],
    computed: {
      ...mapGetters(['currentUser']),
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
    created() {
    },
    mounted() {
    },
  };
</script>

<style lang="scss">
  
  @import '../../../assets/css/common/tool';
  @import '../../../assets/css/common/responsive';

  #addAddress{
    article{
      section{
        display: flex;
        border-bottom: 1px solid #ccc;
        @include remCalc('padding',40px);
        .text{
          @include remCalc('width',240px);
          @include remCalc('font-size',58px);
        }
        .input-wrapper{
          flex:1;
          input{
            display: block;
            width: 100%;
            border: none;
            line-height: 1;
            height: 100%;
            @include remCalc('font-size',48px);
            @include remCalc('padding',0,15px);
          }
          div{
            display: inline-block;
            border: 1px solid #ccc;
            @include remCalc('font-size',42px);
            @include remCalc('padding',15px,30px);
            @include remCalc('border-radius',5px);
            @include remCalc('margin-right',30px);
            &.active{
              border-color:$blue;
              color: $blue;
            }
          }
        }
      }
    }
    .mint-popup{
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      transform: none;
    }
  }

</style>