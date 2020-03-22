// source: https://hackernoon.com/110percent-complete-jwt-authentication-with-django-and-react-2020-iejq34ta

import axios from 'axios'

const axiosWithJWT = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export default axiosWithJWT;