<template>
	<div id="cart">
		<h1>购物车</h1>
		<hr>
		<p v-show='products.length == 0'>还没有商品</p>
		<template v-if='products.length !== 0'>
			<input type="checkbox" v-model='allCheck' @click='allCheckEve' name="allCheck">全选
			<input type="checkbox" v-model='inverse' @click='inverseEve' name="inverse">反选
		</template>
		<p v-for='(v,i) in products'>
			<input
				type="checkbox" name="deleCheck" 
				v-model='deleCheck' :value='v.id'>
			{{v.title}} X {{v.quantity}} <br>
			{{v.price}} x {{v.quantity}} = {{ v.price * v.quantity}} <br>
		
			<button 
				:disabled = 'changeNum[i] === 0 || !changeNum[i]'
				@click = 'addProduct(i)'
				>add</button>
			<input 
				type="text" 
				:value.number = '11111'
				v-model.number='changeNum[i]'
				@input = 'notMinus(i)'>
			<button 
				:disabled = 'changeNum[i] === 0 || !changeNum[i]'
				@click = 'deleProduct(i)'>delect</button>
		</p>
		<template v-if='products.length !== 0'>
			<button @click='deleSele' :disabled = 'deleCheck.length === 0'>勾选删除</button>{{deleStateus}}
		</template>
		<p v-show='products.length != 0'>总价格: {{ total }}</p>
		<button :disabled='selectProduct.length === 0' v-show='products.length != 0' @click ='checkout'>checkout</button>
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
				products:'cartProducts',
				deleStateus:'deleStateus'
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
			},
			products(){
				let vm = this;
				let temporaryArray = this.products;
				this.selectProduct = temporaryArray.filter(e => {
					return vm.deleCheck.indexOf(e.id) !== -1;
				});
			}
		},
		methods:{
			notMinus(i){
				if (this.changeNum[i] < 0) {
					this.changeNum[i] = 0
				}
			},
			checkout(){
				this.$store.dispatch('checkout',this.selectProduct)
			},
			deleProduct(i){
				if (typeof this.changeNum[i] != 'number') {
					alert('输入正确格式的数字')
					return 
				}
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
				this.$store.dispatch('deleProduct',deleObj)
			},
			addProduct(i){
				if (typeof this.changeNum[i] != 'number') {
					alert('输入正确格式的数字')
					return 
				}
				if (this.changeNum[i] > this.products[i].inventory) {
					alert('没有足够的存货了')
					return 
				}
				const id = this.products[i].id 
				const inventory = this.products[i].inventory	
				const quantity = this.changeNum[i]

				const deleObj ={	
					id,
					quantity,
					inventory,
				}
				this.$store.dispatch('addToCart',deleObj);
				
			},
			deleSele(){
				let vm = this;
				this.selectProduct.forEach(e=>{
					vm.$store.dispatch('deleProduct',e)
				});
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
				let temporaryArray_sele = this.deleCheck;
				let temporaryArray = [];
				this.products.forEach(e => {
					if (temporaryArray_sele.indexOf(e.id) === -1) {
						temporaryArray.push(e.id)
					}
				});
				this.deleCheck = temporaryArray; 				
			}
		}
	}
</script>