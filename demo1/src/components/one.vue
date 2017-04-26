<template>
  <div id="one">
    <button @click = 'show = !show'>change</button>
    <transition-group name='bounce'>
      <p :class='{"blue":$route.params.id != "alisa"}' v-if= 'show' :key='1'>hellow: {{ $route.params.id }}</p>
      <p :key='2'><router-link to='/one/rain/detail'>detail</router-link></p>
      <p :key='3'><router-link to='/one/rain/job'>job</router-link></p>
      <router-view :key='4'></router-view>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'one',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show:true
    }
  },
  mounted(){
    // alert(1) 同组件切换路由组件复用不再触发生命周期钩子
  },
  watch:{
    "$route"(to,from){
      //同组件切换路由可以用这个方法代替生命周期钩子触发
    }
  }
}
</script>

<style lang="scss">
.bounce-move{
  transition:all 1s;
}
.blue{
  color:blue;
}
.fade-enter-active,.fade-leave-active{
  transition: all 1s;
}
.fade-enter{
  color: red;
  opacity: 0;
}
.fade-leave-active{
  color: blue;
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 4s;
  position: absolute;
}
.bounce-leave-active {
  animation: bounce-out 4s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
</style>
