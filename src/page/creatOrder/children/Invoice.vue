<template>
  <div class="invoice">
    <mt-header title="确认订单">
      <section slot="left" @click="requestValue">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <head>
      选择是否需要发票
    </head>
    <mt-cell
      v-if="currentShop.shopProperty.invoice == 1"
      @click.native="companyInfoVisible = true"
      title="需要">
      <i 
        v-show="companyInfoVisible == true"
        class="el-icon-circle-check"></i>
    </mt-cell>
    <mt-cell
      @click.native="close()"
      title="不需要">
      <span v-if="currentShop.shopProperty.invoice != 1">
        该店铺不支持开发票
      </span>
      <i 
        v-show="companyInfoVisible == false"
        class="el-icon-circle-check"></i>
    </mt-cell>
    <article>
      <section 
        v-if="currentShop.shopProperty.invoice == 1"
        v-show="companyInfoVisible">
        <el-form ref="form" :model="form">
          <el-form-item 
            :rules="[
              { required: true, message: '请填写好完整的公司名称' }
            ]"
            prop="companyNmae">
            <el-input 
              v-model="form.companyNmae" 
              placeholder="公司名称"></el-input>
          </el-form-item>
          <el-form-item 
            :rules="[
              { required: true, message: '请填写好完整的信息' }
            ]"
            prop="code">
            <el-input 
              v-model="form.code" 
              placeholder="纳税人识别码"></el-input>
          </el-form-item>
          <el-form-item> 
            <el-button
              @click="submit('form')"
              type="success">
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </section>
    </article>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      form: {
        companyNmae: '',
        code: '',
      },
      companyInfoVisible: false,
    };
  },
  computed: {
    ...mapGetters(['currentShop']),
  },
  methods: {
    requestValue(value) {
      this.$emit('close', value);
    },
    close() {
      this.companyInfoVisible = false;
      this.requestValue(false);
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.requestValue(this.form);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/css/common/responsive';
  @import '../../../assets/css/common/tool';

  .invoice{
    width: 100vw;
    height: 100vh;
    background: #fff;
    article{
      border-top: 1px solid #d9d9d9;
      @include remCalc('padding',10px);
    }
    .el-icon-circle-check{
      color: #76dc2c;
    }
  }
</style>

