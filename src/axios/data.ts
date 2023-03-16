import request from './request'

export const load = (file: string) => {
  return request({
    url: `${import.meta.env.VITE_CDN}/data/${file}.json`,
    method: 'GET'
  })
}