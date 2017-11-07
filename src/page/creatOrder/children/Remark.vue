<template>
  <div id="remark">
    <mt-header title="确认订单">
      <section slot="left" @click="requestRemark()">
        <i class="el-icon-arrow-left"></i>
      </section>
    </mt-header>
    <article>
      <h3>口味偏好</h3>
      <section class="selectRemark">
        <radio-group v-model="str1">
          <radio-button label="不要辣"></radio-button>
          <radio-button label="少点辣"></radio-button>
          <radio-button label="多点辣"></radio-button>
        </radio-group>
        <radio-group v-model="str2">
          <radio-button label="不要香菜"></radio-button>
        </radio-group>
        <radio-group v-model="str3">
          <radio-button label="不要洋葱"></radio-button>
        </radio-group>
        <radio-group v-model="str4">
          <radio-button label="不要醋"></radio-button>
        </radio-group>
        <radio-group v-model="str5">
          <radio-button label="多点葱"></radio-button>
        </radio-group>
      </section>
      <section>
        <el-input 
          type="textarea" 
          v-model="str6" 
          placeholder="手动输入备注"></el-input>
      </section>
      <section>
        <el-button 
          size="small"
          @click="requestRemark()"
          type="success">提交</el-button>
      </section>
    </article>
  </div>
</template>
<script>
import RadioGroup from '../../components/RadioGroup.vue';
import RadioButton from '../../components/RadioButton.vue';

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
  components: {
    'radio-group': RadioGroup,
    'radio-button': RadioButton,
  },
  methods: {
    requestRemark() {
      const string = `${this.str1} ${this.str2} ${this.str3} ${this.str4} ${this.str5} ${this.str6}`;
      this.$emit('close', string);
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
    background: #fff;
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
      textarea{
        @include remCalc('min-height',100px);
      }
    }
  }

</style>


