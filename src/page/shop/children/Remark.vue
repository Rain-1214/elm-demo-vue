<template>
  <div id="remark">
    <mt-header title="确认订单">
      <section slot="left" @click="close()">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <h3>口味偏好</h3>
      <section class="selectRemark">
        <el-radio-group v-model="str1" size="small">
          <el-radio-button label="不要辣"></el-radio-button>
          <el-radio-button label="少点辣"></el-radio-button>
          <el-radio-button label="多点辣"></el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="str2" size="small">
          <el-radio-button label="不要香菜"></el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="str3" size="small">
          <el-radio-button label="不要洋葱"></el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="str4" size="small">
          <el-radio-button label="不要醋"></el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="str5" size="small">
          <el-radio-button label="多点葱"></el-radio-button>
        </el-radio-group>
      </section>
      <section>
        <el-input type="textarea" v-model="str6"></el-input>
      </section>
      <section>
        <el-button type="success">提交</el-button>
      </section>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    return {
      remarkString: '',
      str1: '',
      str2: '',
      str3: '',
      str4: '',
      str5: '',
      str6: '',
    };
  },
  methods: {
    close() {
      this.$emit('close', this.remarkString);
    },
  },
};
</script>
<style lang="scss">
  @import '../../../assets/css/common/tool';
  @import '../../../assets/css/common/responsive';

  #remark{
    height: 100vh;
    width: 100vw;
    article{
      @include remCalc('padding',5px);
      section{
        @include remCalc('margin-bottom',8px);
      }
      h3{
        font-weight: bold;
        @include remCalc('margin-bottom',10px);
      }
      .el-radio-group{
        @include remCalc('margin-right', 10px);
        @include remCalc('margin-bottom', 10px);
      }
    }
  }

</style>


