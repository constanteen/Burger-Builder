import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-tutorial-266014.firebaseio.com',  
})
export default instance