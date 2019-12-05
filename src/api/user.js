import request from '@/utils/request'
import { boxURL } from './config'

export function login(data) {
  return request({
    url: `${boxURL}/user/login`,
    method: 'post',
    data,
  })
}

export function getInfo(token) {
  return request({
    url: `${boxURL}/user/info`,
    method: 'get',
    params: { token },
  })
}

export function logout() {
  return request({
    url: `${boxURL}/user/logout`,
    method: 'post',
  })
}
