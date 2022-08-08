import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  timeout: 5000
})

service.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data
  } else {
    return Promise.reject(new Error())
  }
}, error => {
  return Promise.reject(error)
})

export default service