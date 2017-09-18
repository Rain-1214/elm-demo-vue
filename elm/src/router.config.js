import Location from './page/location/Location.vue'
import Home from './page/home/Home.vue'
import Shop from './page/shop/Shop.vue'

export default{
	mode: 'history',
	routes:[
		{ path: '/', redirect: '/location' },
		{ path: '/location', component: Location},
		{ path: '/home', component: Home},
		{ path: '/shop', component: Shop},
	]
}