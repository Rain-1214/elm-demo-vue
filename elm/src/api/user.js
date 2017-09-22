import axios from 'axios';

export const userLogin = (data) => axios.post('/ElmPro/User/login.do',data); //用户登录

