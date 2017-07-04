import axios from 'axios';

export const getShopTypeList = () => axios.post('/ElmPro/shop/shopTypeList.do');

export const getShopList = () => axios.post('/ElmPro/shop/shopList.do');

export const getShopFoodTypeList = (data) => axios.post('/ElmPro/shop/shopFoodTypeList.do',data);