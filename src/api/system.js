import request from '@/utils/request'
import { boxURL } from './config'

export function fetchLogList(query) {
  return request({
    url: boxURL + '/sys/log',
    method: 'get',
    params: query,
  })
}
