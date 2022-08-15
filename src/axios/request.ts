import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: '/',
  timeout: 5000
})

const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await instance.request<T>(config)
  return data
}

export default request