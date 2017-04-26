import Product from './components/Prouduct.vue'
import Cart from './components/Cart.vue'

export default{
	mode: 'history',
	routes:[
		{path:'/product',component:Product},
		{path:'/cart',component:Cart}
	]
}