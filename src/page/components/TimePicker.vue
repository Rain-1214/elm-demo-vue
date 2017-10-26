<template>
  <div id="timePicker">
    <div 
      v-if="model"
      class="model">
    </div>
    <div class="picker-wrapper">
      <header>
        <button @click="cancel()">取消</button>
        <button @click="submit()">确定</button>
      </header>
      <article>
        <section>
          <my-drag
            :startOffsetTop="65"
            @moveComplete="hourMethod">
            <ul>
              <li
                :key="i"
                v-for="(v,i) in hourArray">
                {{v}}
              </li>
            </ul>
          </my-drag>
        </section>
        <section>
          <my-drag
            :startOffsetTop="65"
            @moveComplete="minutMethod">
            <ul>
              <li
                :key="i"
                v-for="(v,i) in minutArray">
                {{v}}
              </li>
            </ul>
          </my-drag>
        </section>
        <div class="selected-wrapper">:</div>
      </article>
    </div>
  </div>
</template>
<script>
import Drag from './Drag.vue';

export default {
  data() {
    return {
      moveState: false,
      hourArray: [],
      minutArray: [],
      selectHour: '',
      selectMinut: '',
    }
  },
  props: {
    model: {
      type: Boolean,
      defualt: true,
    },
    startHour: {
      type: Number,
      validator(value) {
        return value >= 0 && value <= 23
      }
    },
    startMinut: {
      type: Number,
      validator(value) {
        return value >= 0 && value <= 59
      }
    },
    value: Boolean,
  },
  components: {
    'my-drag': Drag,
  },
  methods: {
    dragMoveComplete(target, currentOffset) {
      const index = Math.round(Math.abs(currentOffset / 30));
      if (Math.abs(currentOffset - (-30 * index)) <= 1) {
        return index;
      } else {
        target.moveTo(- 30 * index - currentOffset);
        return false;
      }
    },
    minutMethod(target, currentOffset) {
      const index = this.dragMoveComplete(target, currentOffset);
      if (typeof index === 'number') {
        this.selectMinut = this.minutArray[index];
      }
    },
    hourMethod(target, currentOffset) {
      const index = this.dragMoveComplete(target, currentOffset);
      if (typeof index === 'number') {
        this.selectHour = this.hourArray[index];
      }
    },
    cancel() {
      this.$emit('cancle')
    },
    submit() {
      const str = `${this.selectHour}:${this.selectMinut}`;
      this.$emit('requestValue', str);
    }
  },
  mounted() {
    let i = this.startHour || 0;
    this.selectHour = this.startHour;
    for (;i <= 23; i += 1) {
      this.hourArray.push(i);
    }
    let j = this.startMinut || 0;
    this.selectMinut = this.startMinut;
    for (;j <= 59; j += 1) {
      this.minutArray.push(j);
    }
  },
};
</script>
<style lang="scss" scoped>
  #timePicker{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2016;
    .picker-wrapper{
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2017;
      background: #fff;
      width: 100%;
      header{
        display: flex;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        button{
          padding: 6px 0;
          background: none;
          outline: none;
          border: none;
          color: #20a0ff;
          flex: 1;
          &:first-child{
            border-right: 1px solid #ccc;
          }
        }
      }
      article{
        display: flex;
        position: relative;
        section{
          flex: 1;
          height: 160px;
          overflow: hidden;
          ul{
            list-style-type: none;
            -webkit-margin-before: 0em;
            -webkit-margin-after: 0em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            -webkit-padding-start: 0px;
            li{
              text-align: center;
              font-size: 18px;
              height: 30px;
              line-height: 30px;
            }
          }
        }
        .selected-wrapper{
          text-align: center;
          line-height: 30px;
          width: 100%;
          height: 30px;
          position: absolute;
          top: 50%;
          transform:translateY(-50%);
          border-top:1px solid #ccc;
          border-bottom:1px solid #ccc;
          z-index: -1;
        }
      }
    }
  }
</style>


