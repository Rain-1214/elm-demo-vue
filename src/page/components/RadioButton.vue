<template>
  <button 
    @click="requestValue"
    :class="{
      'is-active':active,
      'disable': disable,
      }"
    class="radio-button">
    {{label}} 
  </button>
</template>
<script>
export default {
  data() {
    return {
      active: false,
    };
  },
  props: {
    label: String,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    requestValue() {
      if (this.active) {
        this.$parent.clearActive();
        this.$parent.responseValue('');
      } else if (!this.disable) {
        this.$parent.clearActive();
        this.$parent.responseValue(this.label);
        this.active = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>

  button{
    padding:5px 10px;
    background: none;
    outline: none;
    border: 1px solid #bfcbd9;
    border-left: none;
    transition: all .5s;
    font-size: 14px;
    &:hover{
      color: #20a0ff;
    }
    &.is-active{
      border-color: #20a0ff;
      background: #20a0ff;
      color: #fff;
    }
    &.disable{
      color: #bfcbd9;
      cursor: not-allowed;
      background-image: none;
      background-color: #eef1f6;
      border-color: #d1dbe5;
      box-shadow: none;
    }
  }

</style>


