<template>
  <div id="user">
    <mt-header title="我的"></mt-header>
    <section class="login">
      <template v-if="!Object.hasOwnProperty.call(currentUser,`userName`)">
        <div class="header-img">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
          </svg>
        </div>
        <div class="user-info">
          <div class="center">
            <router-link to="/login">
              <h1>登录/注册</h1>
              <h2>
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                </svg>	
                登录后享受更多权限
              </h2>
            </router-link>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="header-img">
          <template v-if="!currentUser.userImg && currentUser.userImg == ''">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
            </svg>
          </template>
          <template v-else>
            <img :src="currentUser.userImg">
          </template>
        </div>
        <div class="user-info">
          <div class="center">
            <h1>{{currentUser.userName}}</h1>
            <h2>
              <template v-if="currentUser.phoneNumber === ''">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                </svg>	
                绑定手机后享受更多权限
              </template>
              <template v-else>
                {{currentUser.phoneNumber}}
              </template>
            </h2>
          </div>
        </div>
      </template>
    </section>
    <section class="hongbao">
      <div>
        <router-link to="/user/redpacket">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#luckybag"></use>
          </svg>	
          <h2>优惠</h2>
        </router-link>
      </div>
      <div>
        <router-link to="/user/activityScore">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profile-coins"></use>
          </svg>
          <h2>积分</h2>
        </router-link>
      </div>
    </section>
    <section class="list">
      <mt-cell
        title="我的地址"
        is-link
        @click.native= "showAddress()">
        <svg slot='icon'>
          <use xlink:href="#addressIcon"></use>
        </svg>
      </mt-cell>
      <mt-cell
        to="/user/activityScore"
        title="积分商城"
        is-link>
        <svg slot='icon'>
          <use xlink:href="#point"></use>
        </svg>
      </mt-cell>
      <mt-cell
        @click.native="showAppAddress()"
        title="下载饿了么APP"
        is-link>
        <svg slot='icon'>
          <use xlink:href="#download"></use>
        </svg>
      </mt-cell>
      <mt-cell
        title="绑定手机"
        is-link
        v-if="currentUser.phoneNumber === ``">
        <svg slot='icon'>
          <use xlink:href="#download"></use>
        </svg>
      </mt-cell>
      <mt-cell title="退出登录" 
        v-if="Object.hasOwnProperty.call(currentUser,`userName`)" @click.native = "logout()">
        <svg slot='icon'>
          <use xlink:href="#download"></use>
        </svg>
      </mt-cell>
    </section>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <img src="//shadow.elemecdn.com/faas/desktop/media/img/appqc.95e532.png" alt="">
    </mt-popup>
    <my-footer :active="3"></my-footer>
    <router-view></router-view>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { Toast, MessageBox } from 'mint-ui';
  import Footer from '../components/footer.vue';
  import * as type from '../../store/mutation-types';

  export default {
    data() {
      return {
        popupVisible: false,
      };
    },
    components: {
      'my-footer': Footer,
    },
    computed: {
      ...mapGetters(['currentUser']),
    },
    methods: {
      logout() {
        MessageBox.confirm('是否要退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$store.commit(type.REMOVE_CURRENT_USER);
          Toast({
            message: '退出成功',
            duration: 1500,
          });
        }).catch((e) => {
          console.log(e);
        });
      },
      showAddress() {
        if (!this.currentUser.userName) {
          Toast({
            message: '请先登录',
            duration: 1500,
            className: 'big-font',
          });
          return;
        }
        this.$router.push('/user/address');
      },
      showAppAddress() {
        this.popupVisible = !this.popupVisible;
      },
    },
    created() {
      if (!this.currentUser.userName) {
        /* eslint-disable no-undef */
        if (localStorage.getItem('User') !== null) {
          const User = JSON.parse(localStorage.getItem('User'));
          this.$store.commit(type.SAVE_CURRENT_USER, User);
        }
      }
    },
  };
</script>
<style lang="scss">
  @import '../../assets/css/common/tool';
  @import '../../assets/css/common/responsive';

  #user{
    .login{
      background-image: linear-gradient(90deg,#0af,#0085ff);
      color: #fff;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
      @include remCalc('padding',10px);	    
      .header-img{
        background:#fff;
        border-radius: 50%;
        overflow: hidden;
        @include remCalc('width',80px);
        @include remCalc('height',80px);
        svg{
          width: 100%;
          height: 100%;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
      .user-info{
        .center{
          @include remCalc('padding-left',10px);
          @include remCalc('padding-top',15px);
          h1{
            font-weight: bold;
            color: #fff;
            @include remCalc('font-size',20px);
          }									
          h2{
            color: #fff;
            svg{
              margin-right: 5px;
              position: relative;
              top: 5px;
              @include remCalc('width',12px);
              @include remCalc('height',18px);
            }
            @include remCalc('font-size',14px);
          }
        }
      }
    }
    .hongbao{
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
      @include remCalc('padding',5px,0);
      >div{
        width: 50%;
        svg{
          display: block;
          margin: 0 auto;
          @include remCalc('width',30px);
          @include remCalc('height',30px);
        }
        h2{
          text-align: center;
          color: #333;
          @include remCalc('font-size',14px);
          @include remCalc('margin-top',5px);
        }
      }
    }
    .list{
      .mint-cell-wrapper{
        background:none;
      }
      .mint-cell{
        border-bottom: 1px solid #ccc;
        max-height: 100%;
        &:last-child{
          background:none;
        }
      }
      svg{
        position: relative;
        @include remCalc('top',5px);
        @include remCalc('width',16px);
        @include remCalc('height',16px);
      }
    }
    .mint-popup{
      max-width: 60%;
      img{
        width: 100%;
      }
    }
  }
</style>