<template>
  <div id="address">
    <mt-header title="我的地址">
      <section slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article :style="{'height':addressWrapperHeight + 'px'}">
      <section v-for="v in currentUser.address" :key="v.id">
        <h1>
          <span class="name">{{v.userName}}</span>
          <span class="sex">{{v.sex === 1?"先生":v.sex === 2?"女士":""}}</span>
          <span class="phoneNumber">{{v.phoneNumber}}</span>
        </h1>
        <h2>
          <span class="tag" v-show="v.tag !== ''">{{v.tag}}</span>
          <p :class="{'hastag':v.tag !== ''}">{{v.addressName}} {{v.addressDetail}}</p>
        </h2>
        <i class="el-icon-delete2" @click="removeAddress(v)"></i>
        <i class="el-icon-edit"></i>
      </section>
    </article>
    <aside @click ="popupVisible = true">
      <p>添加新地址</p>
    </aside>
    <mt-popup
      v-model="popupVisible"
      position="right"
      :modal="false"
      popup-transition="popup-fade">
      <add-address 
      :currentAddress = "currentAddress"
      @close="afreshAddress()"></add-address>
    </mt-popup>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { MessageBox } from 'element-ui';
  import { Toast } from 'mint-ui';
  import addAddress from './addAddress.vue';
  import { deleteAddress } from '../../../api/user';

  export default {

    data() {
      return {
        addressWrapperHeight: 0,
        popupVisible: false,
        currentAddress: {},
      };
    },
    computed: {
      ...mapGetters(['currentUser']),
    },
    components: {
      'add-address': addAddress,
    },
    methods: {
      close() {
        this.$emit('close');
      },
      async afreshAddress() {
        this.popupVisible = false;
        this.$store.dispatch('afreshAddress');
      },
      removeAddress(address) {
        MessageBox.confirm('是否要删除当前地址?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const data = { addressId: address.id };
          try {
            const res = await deleteAddress(data);
            Toast({
              message: res.data.message,
              duration: 1500,
              className: 'big-font',
            });
            if (res.data.stateCode) {
              this.$store.dispatch('afreshAddress');
            }
          } catch (error) {
            console.log(error);
          }
        });
      },
    },
    created() {
      if (!this.currentUser.userName) {
        this.$router.push('/user');
      }
    },
    mounted() {
      /* eslint-disable no-undef */
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const headerHeight = document.querySelector('.mint-header').offsetHeight;
      const bottomHeight = document.querySelector('aside').offsetHeight;
      this.addressWrapperHeight = windowHeight - headerHeight - bottomHeight;
      console.log(this.currentUser);
    },
  };
</script>

<style lang="scss">
  
  @import '../../../assets/css/common/tool';
  @import '../../../assets/css/common/responsive';

  #address{
    background:#f4f4f4;
    >article{
      overflow-y: scroll;
      section{
        background:#fff;
        position: relative;
        @include remCalc('padding',30px);
        @include remCalc('margin-bottom',5px);
        h1{
          @include remCalc('margin-bottom',5px);
          .name{
            font-weight: bold;
            @include remCalc('font-size',56px);
          }
          .sex{
            color: #bdbcbc;
            @include remCalc('font-size',48px);
          }
          .phoneNumber{
            color: #bdbcbc;
          }
        }
        h2{
          position: relative;
          p{
            max-width: 90%;
            @include ellipsis;
            &.hastag{
              @include remCalc('padding-left',85px);
            }
          }
          .tag{
            position: absolute;
            background:red;
            color: #fff;
            @include remCalc('font-size',30px);
            @include remCalc('padding',5px);
          }
        }
        i{
          color: #bdbcbc;
          position: absolute;
          right: 10px;
          @include remCalc('font-size',55px);
          @include tb-center(absolute);
          &.el-icon-delete2{
            @include remCalc('right',100px);
          }
        }
      }
    }
    aside{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      border-top: 1px solid #ccc;
      @include remCalc('height',200px);
      p{
        display: block;
        width: 100%;
        text-align: center;
        color: $blue;
        @include remCalc('font-size',60px);
        @include tb-center(absolute);
      }
    }
    .mint-popup{
      width: 100vw;
      height: 100vh;
    }
  }

</style>