import { ZwRequest } from '../network/request'
import { BASE_URL, TIME_OUT } from '../network/request/config'
import router from '../router'
import message from '../utils/message'
import { cache } from '../utils/cache'

const zwRequest = new ZwRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors(config) {
      // console.log('实例请求成功拦截器')
      const token = cache.getCache('token')
      if (token) {
        config.headers.token = token ?? ''
        // config.headers.token = ''
      }
      return config
    },
    requestInterceptorsCatch(config) {
      // console.log('实例请求失败拦截器')
      message("error", "请求发送失败")
      return config
    },
    responseInterceptors(res) {
      // console.log('实例响应成功拦截器')
      const data = res.data
      if(data.code == 556){
        message('error', '登录信息过期，请重新登录')
        router.push('/login')
      }
      return data
    },
    responseInterceptorsCatch(error) {
      console.log('实例响应失败拦截器', error.response)
      if(error.response.status >= 400 && error.response.status < 500){
        message('error', '请求响应错误 ' + error.response.status)
      }
      else if(error.response.status >= 500 && error.response.status < 600){
        message('error', '服务器出错 ' + error.response.status)
      }
      return Promise.reject(error)
    }
  }
})

export { zwRequest }
