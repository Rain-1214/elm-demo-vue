<template>
	<div id="cart">
		<h1>购物车</h1>
		<hr>
		<p v-show='products.length == 0'>还没有商品</p>
		<input type="checkbox" v-model='allCheck' @click='allCheckEve' name="allCheck">全选
		<input type="checkbox" v-model='inverse' @click='inverseEve' name="inverse">反选
		<p v-for='(v,i) in products'>
			<input
				type="checkbox" name="deleCheck" 
				v-model='deleCheck' :value='v.id'>
			{{v.inventory}}
			{{v.title}} X {{v.quantity}} <br>
			{{v.price}} x {{v.quantity}} = {{ v.price * v.quantity}} <br>
		
			<button 
				@click = 'addProduct(i)'
				v-show='deleCheck.indexOf(v.id) != -1'
				>add</button>

			<input 
				type="number" step='1' min="0"
				:max="v.quantity"
				v-model.number='changeNum[i]'
				v-show='deleCheck.indexOf(v.id) != -1'>

			<button 
				:disabled = 'changeNum[i] === 0 || !changeNum[i]'
				@click = 'deleProduct(i)'
				v-show='deleCheck.indexOf(v.id) != -1'
				>delect</button>
		</p>
		<button @click='deleSele' :disabled = 'deleCheck.length === 0'>勾选删除</button>
		<p v-show='products.length != 0'>总价格: {{ total }}</p>
		<button v-show='products.length != 0' @click ='checkout'>checkout</button>
	</div>
	
</template>
<script type="text/javascript">
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				changeNum:[],
				deleCheck:[],
				selectProduct:[],
				allCheck:false,
				inverse:false
			}
		},
		computed:{
			total(){
				if (this.deleCheck.length === 0) {
					return 0
				}
				return this.selectProduct.reduce((total,p) => {
					return total + p.price * p.quantity
				},0)
			},
			...mapGetters({
				products:'cartProducts'
			})
		},
		watch:{
			deleCheck(){
				let vm = this;
				let temporaryArray = this.products;
				this.selectProduct = temporaryArray.filter(e => {
					return vm.deleCheck.indexOf(e.id) !== -1;
				});
				if (this.selectProduct.length === this.products.length) {
					this.allCheck = true;
				}else{
					this.allCheck = false;
				}
			}
		},
		methods:{
			checkout(){
				this.$store.dispatch('checkout',this.selectProduct)
			},
			deleProduct(i){
				if (this.changeNum[i] > this.products[i].quantity) {
					alert('删除的数量不能大于添加的数量')
					return 
				}

				const id = this.products[i].id 
				const quantity = this.changeNum[i]

				const deleObj ={	
					id,
					quantity,
				}
				console.log(deleObj)
				this.$store.dispatch('deleProduct',deleObj)
			},
			addProduct(i){
				const id = this.products[i].id 
				const inventory = this.products[i].inventory	
				const quantity = this.changeNum[i]

				const deleObj ={	
					id,
					quantity,
					inventory,
				}
				this.$store.dispatch('addToCart',deleObj)
			},
			deleSele(){

			},
			allCheckEve(){
				let vm = this;
				if (this.allCheck) {	
					this.products.forEach(e => {
						if (vm.deleCheck.indexOf(e.id) === -1) {
							vm.deleCheck.push(e.id)
						}
					})
				}else{
					this.deleCheck = [];
				}
			},
			inverseEve(){
				let vm = this;
				let temporaryArray_por = this.products;
				let temporaryArray_sele = this.deleCheck;
				let temporaryArray = [];
				temporaryArray_por.forEach(e => {
					if (temporaryArray_sele.indexOf(e.id) === -1) {
						temporaryArray.push(e.id)
					}
				});
				this.deleCheck = temporaryArray; 				
			}
		}
	}
</script>