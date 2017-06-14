import axios from 'axios';

export const analysisLocation = (location) => axios.post('/ElmPro/location/getLocation.do',location);