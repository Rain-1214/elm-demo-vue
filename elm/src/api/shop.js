import axios from 'axios';

export const getShopTypeList = () => axios.post('/ElmPro/shop/shopTypeList.do');