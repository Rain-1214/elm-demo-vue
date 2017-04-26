<template>
	<div id="transformStyle">
		<transition
			mode='out-in'
			name="custom-classes-transition"
		    enter-active-class="animated fadeInRight"
		    leave-active-class="animated fadeOutLeft" 
		>
			<button v-if='show' @click = 'change' :key='1'>on</button>
			<button v-else @click = 'change' :key='2'>off</button>	
		</transition>
		
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'transformStyle',
		data(){
			return {
				show:true
			}
		},
		methods:{
			change(){
				this.show = !this.show;
			}
		}

	}
</script>
<style type="text/css"></style>