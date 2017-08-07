import Location from './page/location/location.vue'
import Home from './page/home/Home.vue'
import Shop from './page/shop/shop.vue'

export default{
	mode: 'history',
	routes:[
		{ path: '/', redirect: '/location' },
		{ path: '/location', component: Location},
		{ path: '/home', component: Home},
		{ path: '/shop', component: Shop},
	]
}