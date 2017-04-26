<template>
	<div id="listtwo">
		<button @click = 'shuffle'>shuffle</button>
		<transition-group
			name='list'
			tag='p'
			enter-active-class = 'animated bounceInUp'
			leave-active-class = 'animated fadeOutDown changeposition'
		>
			<span v-for='(v,i) in item' :key='v' class="list-item">
				{{v}}
			</span>
		</transition-group>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'list',
		data(){
			return {
				item:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
				nextNum:10
			}
		},
		methods:{
			shuffle(){
				this.item.sort(function(){return 0.5 - Math.random()});
			}
		}
	}
</script>
<style lang='scss' scoped>
	.list-item{
		display: block;
		float: left;
		padding:10px;
		border: 1px solid #ccc;
	}
	.changeposition{
		position: absolute;
	}
	.list-move{
		transition: all 1s;
	}
	p{
		&::after{
			content: "";
			display: block;
			clear: both
		}
	}
</style>

