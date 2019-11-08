import {request} from './requet'
// 多一层封装

export function getHomeMultidata(){
  return request({
    url : "/home/multidata"
  })
}

export function getHomeGoods(type,page){
  return request({
    url : "/home/data",
    params:{
      type,
      page
    }
  })
}