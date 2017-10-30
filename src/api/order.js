import axios from 'axios';

export const creatOrder = (data) => axios.post('/ElmPro/order/createOrder.do', data);

export const checkOrder = (data) => axios.post('/ElmPro/order/checkOrder.do', data);
