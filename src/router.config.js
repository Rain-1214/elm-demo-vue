import Location from './page/location/Location.vue';
import Home from './page/home/Home.vue';
import Shop from './page/shop/Shop.vue';
import User from './page/user/User.vue';
import Login from './page/user/Login.vue';
import Register from './page/user/Register.vue';
import Address from './page/user/children/address.vue';

export default{
  mode: 'history',
  routes: [
    { path: '/', redirect: '/location' },
    { path: '/location', component: Location },
    { path: '/home', component: Home },
    { path: '/shop', component: Shop },
    { path: '/user', component: User },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/user/address', component: Address },
  ],
};
