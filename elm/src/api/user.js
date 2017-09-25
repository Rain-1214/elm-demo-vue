import axios from 'axios';

export const userLogin = (data) => axios.post('/ElmPro/User/login.do',data); //用户登录
export const checkUserName = (data) => axios.post('/ElmPro/User/checkUserName.do',data); //检测用户名是否已经存在
export const register = (data) => axios.post('/ElmPro/User/register.do',data); //注册用户
