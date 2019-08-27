import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: '/supnuevo_ventas/func', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {

    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
