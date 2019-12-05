import request from '@/utils/request'
import { boxURL } from './config'

export function fetchLogList(query) {
  return request({
    url: `${boxURL}/sys/log`,
    method: 'get',
    params: query,
  })
}

const userBaseURL = `${boxURL}/user/user`

export function fetchUserList(query) {
  return request({
    url: userBaseURL,
    method: 'get',
    params: query,
  })
}

export function fetchUser(id) {
  return request({
    url: `${userBaseURL}/${id}`,
    method: 'get',
  })
}

export function deleteUser(ids) {
  return request({
    url: `${userBaseURL}/${ids}`,
    method: 'delete',
  })
}

export function createUser(data) {
  return request({
    url: userBaseURL,
    method: 'post',
    data,
  })
}

export function updateUser(data) {
  return request({
    url: userBaseURL,
    method: 'put',
    data,
  })
}
