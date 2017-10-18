import Location from './page/location/Location.vue';
import Home from './page/home/Home.vue';
import Shop from './page/shop/Shop.vue';
import User from './page/user/User.vue';
import Login from './page/user/Login.vue';
import Register from './page/user/Register.vue';
import Address from './page/user/children/address.vue';
import ForgetPassword from './page/user/forgetPassword.vue';
import confirmOrder from './page/shop/confirmOrder.vue';
import Order from './page/order/Order.vue';
import OrderSelectAddress from './page/shop/OrderSelectAddress.vue';

export default{
  mode: 'history',
  routes: [
    { path: '/', redirect: '/location' },
    { path: '/location', component: Location },
    { path: '/home', component: Home },
    { path: '/shop', component: Shop },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'address',
          component: Address,
        },
      ],
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgetPassword', component: ForgetPassword },
    {
      path: '/confirmOrder',
      component: confirmOrder,
      children: [
        {
          path: 'selectAddress',
          component: OrderSelectAddress,
          children: [
            {
              path: 'addAddress',
              component: Address,
            },
          ],
        },
      ],
    },
    { path: '/order', component: Order },
    { path: '*', redirect: '/home' },
  ],
};
