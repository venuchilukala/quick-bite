import axios from 'axios';
import React from 'react'

const axiosPublic = axios.create({
    baseURL: 'https://quick-bite-server-38rl.onrender.com'
});

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic


