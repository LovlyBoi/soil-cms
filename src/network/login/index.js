import { zwRequest } from '..'

export function accountLoginRequest(account) {
  return zwRequest.request({
    method: 'POST',
    url: '/login',
    data: account
  })
}

export function requestUserMenusByRoleId() {
  return zwRequest.request({
    method: 'GET',
    url: '/getDefaultMenuGroup',
    showLoading: false
  })
}
