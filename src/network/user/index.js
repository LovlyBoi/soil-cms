import {zwRequest} from '..'

function getTotal() {
  return zwRequest.request({
    method: 'GET',
    url: '/users/getTotal'
  })
}

function getUserList(pageNum, pageSize) {
  return zwRequest.request({
    method: 'GET',
    url: '/users/getByLimit',
    params: {
      page: pageNum,
      size: pageSize
    },
    showLoading: true
  })
}


export {
  getTotal,
  getUserList
}