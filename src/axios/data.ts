import request from './request'

export const load = (file: string) => {
  return request({
    url: `https://cdn.al.pelom.cn/data/${file}.json`,
    method: 'GET'
  })
}