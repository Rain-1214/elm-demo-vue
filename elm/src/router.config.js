import Location from './page/location/location.vue'

export default{
	mode: 'history',
	routes:[
		{ path: '/', redirect: '/home' },
		{ path: '/location', component: Location},
	]
}