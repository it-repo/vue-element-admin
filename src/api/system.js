import request from '@/utils/request'
import { boxURL } from './config'

// === Log ===

export function fetchLogList(query) {
  return request({
    url: `${boxURL}/sys/log`,
    method: 'get',
    params: query,
  })
}

// === Access Control ===

const acBaseURL = `${boxURL}/user`

// --- User ---

const userBaseURL = `${acBaseURL}/user`

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

// --- Role ---

const roleBaseURL = `${acBaseURL}/role`

export function fetchRoleList(query) {
  return request({
    url: roleBaseURL,
    method: 'get',
    params: query,
  })
}

export function fetchRole(id) {
  return request({
    url: `${roleBaseURL}/${id}`,
    method: 'get',
  })
}

export function deleteRole(ids) {
  return request({
    url: `${roleBaseURL}/${ids}`,
    method: 'delete',
  })
}

export function createRole(data) {
  window.request = request
  return request({
    url: roleBaseURL,
    method: 'post',
    data,
  })
}

export function updateRole(data) {
  return request({
    url: roleBaseURL,
    method: 'put',
    data,
  })
}

// --- Perm ---

const permBaseURL = `${acBaseURL}/perm`

export function fetchPermList(query) {
  return request({
    url: permBaseURL,
    method: 'get',
    params: query,
  })
}

export function fetchPerm(id) {
  return request({
    url: `${permBaseURL}/${id}`,
    method: 'get',
  })
}

export function deletePerm(ids) {
  return request({
    url: `${permBaseURL}/${ids}`,
    method: 'delete',
  })
}

export function createPerm(data) {
  return request({
    url: permBaseURL,
    method: 'post',
    data,
  })
}

export function updatePerm(data) {
  return request({
    url: permBaseURL,
    method: 'put',
    data,
  })
}
