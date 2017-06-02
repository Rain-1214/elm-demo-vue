import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'

export default{
	mode: 'history',
	routes:[
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: Home},
		{ path: '/login', component: Login},
		{ path: '/register', component: Register}
	]
}