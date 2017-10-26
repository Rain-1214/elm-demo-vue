<template>
  <div
    :style="styleObject"
    class="drag"
    @touchstart='openMoveState($event)'
    @touchmove='move($event)'
    @touchend='closeMoveState($event)'>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      moveState: false, // 是否可以滚动
      startY: 0, // 事件起始时的坐标
      startX: 0, // 事件起始时的坐标
      startTime: 0, // 事件起始时的时间
      currentY: 0, // 拖动时实时更新的坐标
      currentX: 0, // 拖动时实时更新的坐标
      offsetTop: 0, // 向上的偏移量
      divHeight: 0, // 组件高度
      endOffsetTop: 0, // 最大结束时的位置
      timer: [], // 定时器数组
    };
  },
  props: {
    startOffsetTop: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    styleObject() {
      return {
        transform: `translateY(${this.offsetTop + this.startOffsetTop}px)`,
      };
    },
  },
  methods: {
    openMoveState(event) {
      if (event.touches.length === 1) {
        this.clearTime();
        this.moveState = true;
        const { clientX: x, clientY: y } = event.touches[0];
        this.startX = x;
        this.startY = y;
        this.currentX = x;
        this.currentY = y;
        this.startTime = new Date().getTime();
      }
    },
    move(event) {
      if (this.moveState) {
        const { clientX: X, clientY: Y } = event.touches[0];
        this.offsetTop += Y - this.currentY;
        this.currentX = X;
        this.currentY = Y;
      }
    },
    closeMoveState() {
      this.moveState = false;
      this.clearTime();
      const tempY = this.offsetTop;
      const speed = this.computSpeed(Math.abs(this.currentY - this.startY), this.startTime);
      const offsetPx = this.currentY - this.startY > 0 ? speed * 200 : -speed * 200;
      if (this.checkConfine()) {
        this.intertiaMove(tempY, offsetPx, 200);
      }
    },
    clearTime() {
      if (this.timer.length != 0) {
        this.timer.forEach((e) => {
          clearInterval(e);
        });
      }
    },
    moveTo(value) {
      const tempOffset = this.offsetTop;
      this.intertiaMove(tempOffset, value, 200);
    },
    intertiaMove(startY, offsetPx, duration) {
      let currentTime = 0;
      const timer = setInterval(() => {
        currentTime += 10;
        if (currentTime >= duration) {
          const timerIndex = this.timer.findIndex((value) => value === timer);
          if (timerIndex !== -1) {
            this.timer.splice(timerIndex, 1);
          }
          clearInterval(timer);
          if (this.checkConfine()) {
            this.$emit('moveComplete', this, this.offsetTop);
          }
        } else {
          this.offsetTop = parseInt(this.easeOut(currentTime, startY, offsetPx, duration), 10);
        }
      }, 10);
      this.timer.push(timer);
    },
    checkConfine() {
      if (this.offsetTop > 1) {
        this.moveTo(-this.offsetTop);
        return false;
      } else if (this.offsetTop < -this.endOffsetTop) {
        this.moveTo(-this.offsetTop - this.endOffsetTop);
        return false;
      }
      return true;
    },
    computSpeed(length, startTime) {
      const currentTime = new Date().getTime();
      return length / ((currentTime - startTime) * 3);
    },
    easeOut(t, b, c, d) {
      const temp = (-c * (t /= d) * (t - 2)) + b;
      return temp;
    },
  },
  updated() {
    this.divHeight = this.$el.offsetHeight;
    this.endOffsetTop = this.divHeight - 30;
  },
};
</script>
