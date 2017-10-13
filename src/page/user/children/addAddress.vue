<template>
  <div id="addAddress">
    <mt-header title="添加地址">
      <section slot="left" @click="close()">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="userName" label="姓名" >
          <el-input v-model="form.userName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <div 
            v-for="(v,i) in sex" 
            @click="sexActive.fill(false).splice(i,1,true)"
            class="tagBox"
            :class="{'active':sexActive[i]}"
            :key="i">
              {{ v }}
          </div>
        </el-form-item>
        <el-form-item prop="phoneNumber" label="电话" >
          <el-input v-model="form.phoneNumber" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item prop="addressName" label="地址" >
          <el-input 
          v-model="form.addressName" 
          placeholder="请点击选择地址" 
          @click.native="popupVisible = true"
          readonly></el-input>
        </el-form-item>
        <el-form-item prop="addressDetail" label="详细地址" >
          <el-input v-model="form.addressDetail" placeholder="哪座、几层、门牌号等等"></el-input>
        </el-form-item>
        <el-form-item label="标签" >
          <div 
            class='tagBox'
            :class="{'active': tagActive[i]}" 
            :key="v"
            v-for='(v,i) in tag' 
            @click="tagActive[i] ? tagActive.splice(i,1,false) : tagActive.fill(false).splice(i,1,true)">
              {{ v }}
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="success" @click="submit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </article>
    <mt-popup
      v-model="popupVisible"
      :modal="false"
      position="right"
      popup-transition="popup-fade">
      <my-map @closeMap="responseAddress"></my-map>
    </mt-popup>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { Toast } from 'mint-ui';
  import { addAddress, editAddress } from '../../../api/user';
  import Map from './map.vue';

  export default {
    data() {
      const checkPhoneNumber = (rule, value, callback) => {
        const reg = /^1[34578][0-9]{9}$/;
        if (!reg.test(value)) {
          callback(new Error('手机号码不合法'));
        }
        callback();
      };
      return {
        form: {
          sex: 1,
          userName: '',
          phoneNumber: '',
          addressName: '',
          addressDetail: '',
          tag: '',
          lat: 0,
          lng: 0,
        },
        tag: ['家', '公司', '学校'],
        tagActive: [false, false, false],
        sex: ['先生', '女士'],
        sexActive: [true, false],
        popupVisible: false,
        rules: {
          userName: [
            { required: true, message: '姓名不能为空', trigger: 'blur,change' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur,change' },
          ],
          phoneNumber: [
            { required: true, message: '手机号码不能为空', trigger: 'blur,change' },
            { validator: checkPhoneNumber, trigger: 'blur,change' },
          ],
          addressName: [
            { required: true, message: '地址名称必须选择', trigger: 'blur,change' },
            { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur,change' },
          ],
          addressDetail: [
            { required: true, message: '地址详情不可为空', trigger: 'blur,change' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur,change' },
          ],
        },
        ajaxFlag: true,
      };
    },
    components: {
      myMap: Map,
    },
    props: ['currentAddress', 'addOrEdit'],
    watch: {
      currentAddress() {
        this.form = Object.assign({}, this.form, this.currentAddress);
        const sex = this.form.sex - 1;
        const tag = this.form.tag;
        const sexFlag = this.sexActive[sex] ? void 0 : this.sexActive.fill(false).splice(sex, 1, true);
        this.tag.forEach((e, i) => {
          if (e === tag) {
            this.tagActive.fill(false).splice(i, 1, true);
          }
        });
      },
    },
    computed: {
      ...mapGetters(['currentUser']),
    },
    methods: {
      close() {
        this.$emit('close');
      },
      // 接收已经选择的地址
      responseAddress(address) {
        this.popupVisible = false;
        if (address.city != null) {
          this.form.addressName = address.city + address.district + address.name;
          this.form.lat = address.location.lat;
          this.form.lng = address.location.lng;
        }
      },
      // 添加地址
      submit(formName) {
        if (this.ajaxFlag) {
          this.ajaxFlag = false;
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              const { id: userId } = this.currentUser; // 当前用户ID
              const data = this.form;
              const tagIndex = this.tagActive.includes(true) ? this.tagActive.indexOf(true) : false; // 判断是否选择了标签
              data.tag = (tagIndex || tagIndex === 0) ? this.tag[tagIndex] : '';
              data.sex = this.sexActive.includes(true) ? this.sexActive.indexOf(true) + 1 : 1; // 判断选择的性别
              data.userId = userId;
              try {
                const res = this.addOrEdit === 'add' ? await addAddress(data) : await editAddress(data);
                Toast({
                  message: res.data.message,
                  duration: 1500,
                  className: 'big-font',
                });
                if (res.data.stateCode) {
                  this.$emit('close');
                }
              } catch (error) {
                console.log(error);
              } finally {
                this.ajaxFlag = true;
              }
            } else {
              this.ajaxFlag = true;
            }
          });
        }
      },
    },

  };
</script>

<style lang="scss">
  
  @import '../../../assets/css/common/tool';
  @import '../../../assets/css/common/responsive';

  #addAddress{
    article{
      @include remCalc('padding',15px,10px);
      .el-form-item__error{
        @include remCalc('font-size',12px);
      }
      .tagBox,.el-input__inner{
        @include remCalc('height',36px);
        @include remCalc('line-height',22px);
      }
      .tagBox{
        display: inline-block;
        border: 1px solid #ccc;
        color: #ccc;
        @include remCalc('border-radius',5px);
        @include remCalc('padding',7px,12px);
        @include remCalc('margin-right',10px);
        &.active{
          border-color:$blue;
          color: $blue;
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