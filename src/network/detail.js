import {request} from './requet'
export function getDetail(iid){
  return request({
    url : '/detail',
    params :{
      iid
    }
  })
}