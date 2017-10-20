import axios from 'axios';

export const creatOrder = (data) => axios.post('/ElmPro/order/createOrder.do', data);

export const creatOrder2 = (data) => axios.post('/ElmPro/order/createOrder.do', data);
