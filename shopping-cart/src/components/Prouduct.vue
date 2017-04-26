<template>
	<div id="product">
		<h1>产品列表</h1>
		<hr>
		<p v-for = '(v,i) in products'>
			{{ v.title }} - {{ v.price }} 剩余 {{ v.inventory }}
			<button :disable='v.inventory >= 1' @click='addToCart(v)'>添加到购物车</button>
		</p>
	</div>
</template>
<script type="text/javascript">
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {

			}
		},
		computed:{
			...mapGetters({
				products:'allProduct'
			})
		},
		methods:{
			...mapActions({
				addToCart:'addToCart'
			})
		},
		created(){
			this.$store.dispatch('getAllProduct')
		}

	}
</script>