<template>
	<div id="list">
		<button @click = 'add'>Add</button>
		<button @click = 'remove'>Remove</button>
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
				item:[1,2,3,4,5,6,7,8,9],
				nextNum:10
			}
		},
		methods:{
			add(){
				var slot = this.randomNum();
				this.item.splice(slot,0,this.nextNum);
				this.nextNum ++; 
			},
			remove(){
				var slot = this.randomNum();
				this.item.splice(slot,1);
			},
			randomNum(){
				return Math.floor(Math.random()*this.item.length);
			},
			shuffle(){
				this.item.sort(function(){return 0.5 - Math.random()});
			}
		}
	}
</script>
<style lang='scss' scoped>
	.list-item{
		display: inline-block;
		margin-right: 10px;
	}
	.changeposition{
		position: absolute;
	}
	.list-move{
		transition: all 1s;
	}
</style>

