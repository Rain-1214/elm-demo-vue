import Location from './page/location/location.vue'
import SearchAddress from './page/location/SearchAddress.vue'

export default{
	mode: 'history',
	routes:[
		{ path: '/', redirect: '/home' },
		{ path: '/location', component: Location},
		{ path: '/searchAddress/:city', component: SearchAddress},
	]
}