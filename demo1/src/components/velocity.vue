<template>
	<div id="velocity">
		<button @click = 'show = !show'>velocity</button>
		<transition
			appear
			@before-enter = 'beforeEnter'	
			@enter = 'enter'
			@leave = 'leave'
			:css = 'false'
		>
			<p v-show='show'>Hellow</p>
		</transition>
	</div>
</template>
<script type="text/javascript">
	var Velocity = require("../../node_modules/velocity-animate/velocity.js");
	require("../../node_modules/velocity-animate/velocity.ui.js"); 
	export default{
		name:'velocity',
		data(){
			return {
				show:true
			}
		},
		methods:{
			beforeEnter(el){
				el.style.opacity = 0;
				el.style.transformOrigin = 'left';
			},
			enter(el,done){
				Velocity(el,{opacity:1,fontSize:"1.4rem"},{duration:300});
				Velocity(el,{fontSize:"1.2rem"},{duration:300,complete:done});
			},
			leave(el,done){
				Velocity(el,{opacity:1,fontSize:"1.4rem"},{duration:300});
				Velocity(el,{fontSize:"1.2rem"},{duration:300,complete:done});	
			}
		}
	}
</script>