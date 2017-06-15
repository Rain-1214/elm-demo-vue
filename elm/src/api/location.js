import axios from 'axios';

export const analysisLocation = (location) => axios.post('/ElmPro/location/getLocation.do',location);

export const getHotCity = () => axios.post('/ElmPro/location/getHotCity.do');

export const getAllCity = () => axios.get('/src/assets/city.json');

export const searchAddress = (params) => axios.post('/ElmPro/location/searchAddress.do',params);