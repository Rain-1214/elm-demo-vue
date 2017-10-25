<template>
  <div class="radio-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    value: String,
  },
  methods: {
    responseValue(value) {
      this.$emit('input', value);
      this.$emit('change', value);
    },
    clearActive() {
      this.$children.forEach((e) => {
        e.active = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped> 
  .radio-group{
    display: inline-block;
    font-size: 0;
    margin-right: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    .radio-button{
      &:first-child{
        border-left: 1px solid #bfcbd9;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-child{
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
</style>


