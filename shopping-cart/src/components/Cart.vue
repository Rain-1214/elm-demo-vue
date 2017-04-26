<template>
	<div id="cart">
		<h1>购物车</h1>
		<hr>
		<p v-show='products.length == 0'>还没有商品</p>
		<p v-for='(v,i) in products'>
			<input type="checkbox" name="deleCheck" v-model='deleCheck'>
			{{v.title}} X {{v.quantity}} <br>
			{{v.price}} x {{v.quantity}} = {{ v.price * v.quantity}} <br>
			<input type="number" step='1' min="0" max="" v-model.number='deleNum[i]'>
			<button @click = 'deleProduct(i)'>delect</button>
		</p>
		<p v-show='products.length != 0'>总价格: {{ total }}</p>
		<button v-show='products.length != 0' @click ='checkout'>checkout</button>
	</div>
	
</template>
<script type="text/javascript">
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				deleNum:[],
				deleCheck:[]
			}
		},
		computed:{
			total(){
				return this.products.reduce((total,p) => {
					return total + p.price * p.quantity
				},0)
			},
			...mapGetters({
				products:'cartProducts'
			})
		},
		methods:{
			checkout(){
				this.$store.dispatch('checkout',this.products)
			},
			deleProduct(i){
				if (this.deleNum[i] > this.products[i].quantity) {
					alert('删除的数量不能大于添加的数量0')
					return 
				}

				const id = this.products[i].id 
				const quantity = this.deleNum[i]

				const deleObj ={	
					id,
					quantity,
				}

				this.$store.dispatch('deleProduct',deleObj)
			}
		}
	}
</script>