<template>
	<div id="tween">
		<input type="number" v-model.number='number' step="20">
		<p>{{ animateNumber }}</p>
	</div>
</template>
<script type="text/javascript">
	var TWEEN = require('../../node_modules/tween.js/src/Tween.js')
	export default{
		name:'tween',
		data(){
			return {
				number:0,
				animateNumber:0
			}
		},
		watch:{
			number(newvalue,oldvalue){
				function animate(time){
					requestAnimationFrame(animate)
					TWEEN.update(time)
				}
				var vm = this;
				new TWEEN.Tween({tweeningNumber:oldvalue})
				.easing(TWEEN.Easing.Quadratic.Out)
				.to({tweeningNumber:newvalue},500)
				.onUpdate(function(){
					vm.animateNumber = this.tweeningNumber.toFixed(2);
				})
				.start()

				animate();

			}
		}
	}
</script>
<style type="text/css" lang='scss' scoped>
	
</style>