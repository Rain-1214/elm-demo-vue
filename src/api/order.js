import axios from 'axios';

export const creatOrder = (data) => axios.post('/ElmPro/order/createOrder.do', data);

export const checkOrder = (data) => axios.post('/ElmPro/order/checkOrder.do', data);

export const getOrder = (data) => axios.post('/ElmPro/order/getOrder.do', data);

export const getRedPacket = (data) => axios.post('/ElmPro/order/getHongbao.do', data);

export const pay = () => axios.post('/ElmPro/order/pay.do');

export const orderCompleted = (data) => axios.post('/ElmPro/order/orderCompleted.do', data);

export const cancleOrder = (data) => axios.post('/ElmPro/order/cancleOrder.do', data);
