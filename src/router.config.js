const Location = r => require.ensure([], () => r(require('./page/location/Location.vue')), 'Location');
const Home = r => require.ensure([], () => r(require('./page/home/Home.vue')), 'Home');
const Shop = r => require.ensure([], () => r(require('./page/shop/Shop.vue')), 'Shop');
const User = r => require.ensure([], () => r(require('./page/user/User.vue')), 'User');
const Login = r => require.ensure([], () => r(require('./page/user/Login.vue')), 'Login');
const Register = r => require.ensure([], () => r(require('./page/user/Register.vue')), 'Register');
const Address = r => require.ensure([], () => r(require('./page/user/children/address.vue')), 'Address');
const ForgetPassword = r => require.ensure([], () => r(require('./page/user/forgetPassword.vue')), 'ForgetPassword');
const confirmOrder = r => require.ensure([], () => r(require('./page/creatOrder/confirmOrder.vue')), 'confirmOrder');
const Order = r => require.ensure([], () => r(require('./page/order/Order.vue')), 'Order');
const OrderDetail = r => require.ensure([], () => r(require('./page/order/children/OrderDetail.vue')), 'OrderDetail');
const OrderSelectAddress = r => require.ensure([], () => r(require('./page/creatOrder/OrderSelectAddress.vue')), 'OrderSelectAddress');
const Redpacket = r => require.ensure([], () => r(require('./page/redpacket/Redpacket.vue')), 'Redpacket');
const OrderSelectPacket = r => require.ensure([], () => r(require('./page/creatOrder/OrderSelectRedPacket.vue')), 'OrderSelectRedPacket');
const Pay = r => require.ensure([], () => r(require('./page/pay/Pay.vue')), 'Pay');
const ActivityScore = r => require.ensure([], () => r(require('./page/activityScore/ActivityScore.vue')), 'ActivitScore');
const Filter = r => require.ensure([], () => r(require('./page/filter/Filter.vue')), 'Filter');

export default{
  mode: 'history',
  routes: [
    { path: '/', redirect: '/location' },
    { path: '/location', component: Location },
    { path: '/home', component: Home },
    { path: '/shop', component: Shop },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgetPassword', component: ForgetPassword },
    { path: '/pay', component: Pay },
    { path: '/filter', component: Filter },
    {
      path: '/order',
      component: Order,
      children: [
        {
          path: 'orderDetail',
          component: OrderDetail,
        },
      ],
    },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'address',
          component: Address,
        },
        {
          path: 'redpacket',
          component: Redpacket,
        },
        {
          path: 'activityScore',
          component: ActivityScore,
        },
      ],
    },
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
        {
          path: 'selectRedpacket',
          component: OrderSelectPacket,
        },
      ],
    },
    { path: '*', redirect: '/home' },
  ],
};
