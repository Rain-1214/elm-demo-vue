import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import ForgetPassword from './components/Forgetpassword.vue'

export default{
	mode: 'history',
	routes:[
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: Home},
		{ path: '/login', component: Login},
		{ path: '/register', component: Register},
		{ path: '/forgetPassword', component: ForgetPassword}
	]
}