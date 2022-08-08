import request from './request'

export const rank = (data: {}) => {
  return request({
    url: 'api/rank',
    method: 'POST',
    data
  })
}