import request from './request'

export const load = (src: string, file: string) => {
  if (src == '/')
    return request({
      url: `data/${file}.json`,
      method: 'GET'
    })

  return request({
    url: `https://${src}.al.pelom.cn/assets/${file}.json`,
    method: 'GET'
  })
}