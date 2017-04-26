<template>
  <div id="app">
   <!--  <my-one></my-one>
    <my-animate></my-animate>
    <my-velocity></my-velocity>
    <my-transfrom></my-transfrom>
    <my-list></my-list>
    <my-listtwo></my-listtwo>
    <list-input></list-input>
    <Tween></Tween> -->
    <div class="tag">
    	<ul>
    		<li>
    			<router-link to='/one/alisa'>onealisa</router-link>
    		</li>
    		<li>
    			<router-link to='/one/rain'>onerain</router-link>
    		</li>
    		<li>
    			<router-link to='/animate'>animate</router-link>
    		</li>	
        <li>
          <router-link to='/velocity/rain'>animate</router-link>
        </li> 
    	</ul>
    </div>
    <div class="view">
    	<router-view></router-view>
    </div>
    <div class="router-push">
      <button @click = "change">animate</button>
    </div>
    <!-- <div class="router-regexp">
      <h1>Route Matching</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/params/foo/bar">/params/foo/bar</router-link></li>
        <li><router-link to="/optional-params">/optional-params</router-link></li>
        <li><router-link to="/optional-params/foo">/optional-params/foo</router-link></li>
        <li><router-link to="/params-with-regex/123">/params-with-regex/123</router-link></li>
        <li><router-link to="/params-with-regex/abc">/params-with-regex/abc</router-link></li>
        <li><router-link to="/asterisk/foo">/asterisk/foo</router-link></li>
        <li><router-link to="/asterisk/foo/bar">/asterisk/foo/bar</router-link></li>
        <li><router-link to="/optional-group/bar">/optional-group/bar</router-link></li>
        <li><router-link to="/optional-group/foo/bar">/optional-group/foo/bar</router-link></li>
      </ul>
      <p>Route context</p>
      <pre>{{ $route }}</pre>
    </div> -->
  </div>
</template>

<script>
import Tween from './components/tween.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    change(){
      this.$router.push('/animate')
    }
  },
  components:{
  	Tween
  }
}
</script>

<style lang="scss">

</style>
