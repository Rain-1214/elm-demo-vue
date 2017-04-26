<template>
	<div id="listInput">
		<input type="text" v-model='search'>
		<transition-group
			name='fade'
			tag='ul'
			enter-active-class = 'animated fadeInUp'
			leave-active-class = 'animated fadeOutDown changeposition'
		>
			<li v-for = '(v,i) in resultList' :key='v'>
				{{v}}
			</li>		
		</transition-group>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'listInput',
		data(){
			return {
				search:'',
				msg:["google","baidu","alibaba","jidnong"]
			}
		},
		computed:{
			resultList(){
				return this.msg.filter(function(e,i,a) {
					return e.indexOf(this.search.toLowerCase()) !== -1;
				}.bind(this));
			}
		}
	}
</script>
<style type="text/css" lang="scss" scoped>
	.changeposition{
		position: absolute;
	}
	.fade-move{
		transition: all 1s;
	}
</style>