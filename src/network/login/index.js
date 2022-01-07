import { zwRequest } from '..'

// 账号密码登录
export function accountLoginRequest(account) {
  return zwRequest.request({
    method: 'POST',
    url: '/login',
    data: account,
    showLoading: true
  })
}

// 请求用户菜单树
export function requestUserMenusByRoleId() {
  return zwRequest.request({
    method: 'GET',
    url: '/getDefaultMenuGroup'
  })
}
