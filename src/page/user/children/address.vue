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
        <i class="el-icon-delete2" @click="removeAddress(v)"></i>
        <i class="el-icon-edit" @click="editAddress(v)"></i>
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
      :addOrEdit = "addOrEdit"
      @close="afreshAddress()"></add-address>
    </mt-popup>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { Toast, MessageBox } from 'mint-ui';
  import { deleteAddress } from '../../../api/user';
  import addAddress from './addAddress.vue';

  export default {

    data() {
      return {
        addressWrapperHeight: 0,
        popupVisible: false,
        currentAddress: {},
        addOrEdit: 'add',
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
      afreshAddress() {
        this.popupVisible = false;
        this.addOrEdit = 'add';
        this.$store.dispatch('afreshAddress');
      },
      editAddress(address) {
        this.currentAddress = { ...this.currentAddress, ...address };
        this.addOrEdit = 'edit';
        this.popupVisible = true;
      },
      removeAddress(address) {
        MessageBox.confirm('是否要删除当前地址?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
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
        }).catch((e) => {
          console.log(e);
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
    },
  };
</script>

<style lang="scss">
  
  @import '../../../assets/css/common/tool';
  @import '../../../assets/css/common/responsive';

  #address{
    background:#f4f4f4;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    >article{
      overflow-y: scroll;
      section{
        background:#fff;
        position: relative;
        @include remCalc('padding',10px);
        @include remCalc('margin-bottom',5px);
        h1{
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
        i{
          color: #bdbcbc;
          position: absolute;
          right: 10px;
          @include remCalc('font-size',18px);
          @include tb-center(absolute);
          &.el-icon-delete2{
            color: red;
            @include remCalc('right',30px);
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
      @include remCalc('height',50px);
      p{
        display: block;
        width: 100%;
        text-align: center;
        color: $blue;
        @include remCalc('font-size',20px);
        @include tb-center(absolute);
      }
    }
    .mint-popup{
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      position: fixed;
      transform:none;
    }
  }

</style>