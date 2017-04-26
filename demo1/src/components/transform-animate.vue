<template>
	<div id="animate">
		<button @click='show = !show'>transform-animate</button>
		
		<transition
		    name='custom-classes-transition'
			enter-active-class='animated tada'
			leave-active-class='animated bounceOutRight'
		>
			<p v-show='show'>Hellow</p>
		</transition>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'animate',
		data(){
			return {
				show:true
			}
		}
	}
</script>
<style type="text/css">
	
</style>