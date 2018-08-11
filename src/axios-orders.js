import axios from 'axios';

const inatance = axios.create({
    baseURL: 'https://react-my-burger-9263a.firebaseio.com/'
});

export default instance;