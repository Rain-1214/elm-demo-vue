import axios from 'axios';

export const userLogin = (data) => axios.post('/ElmPro/User/login.do', data); // 用户登录

export const checkUserName = (data) => axios.post('/ElmPro/User/checkUserName.do', data); // 检测用户名是否已经存在

export const register = (data) => axios.post('/ElmPro/User/register.do', data); // 注册用户

export const addAddress = (data) => axios.post('/ElmPro/User/addAddress.do', data); // 添加地址

export const getUserAddress = (data) => axios.post('/ElmPro/User/findAddressByUserId.do', data); // 获取用户的所有地址

export const deleteAddress = (data) => axios.post('/ElmPro/User/deleteAddressById.do', data); // 删除地址 

export const editAddress = (data) => axios.post('/ElmPro/User/editAddressById.do', data); // 修改地址

export const getUserSafetyQuestion = (data) => axios.post('/ElmPro/User/getUserSafetyQuestion.do', data); // 获取安全问题

export const checkUserSafetyQuestion = (data) => axios.post('/ElmPro/User/checkUserSafetyQuestion.do', data); // 对比安全问题答案

export const setNewPassword = (data) => axios.post('/ElmPro/User/setNewPassword.do', data); // 设置新密码

export const getUserHongbao = (data) => axios.post('/ElmPro/User/findHongbaoByUserId.do', data); // 获取用户所有红

export const getUserActivityScore = (data) => axios.post('/ElmPro/User/getUserActivityScore.do', data); // 获取用户积分

export const insertHongbaoToUser = (data) => axios.post('/ElmPro/User/creatHongbao.do', data); // 给某个用户添加一个红包
