let BASE_URL, TIME_OUT;

if (process.env.NODE_ENV == 'development') {
  // 开发版本 baseURL
  BASE_URL = "/api"
  TIME_OUT = 100000
}
else if (process.env.NODE_ENV == 'production') {
  // 生产版本 baseURL
  BASE_URL = "http://semghh.xyz:8088/content1-2.0"
  TIME_OUT = 100000
}

export {
  BASE_URL,
  TIME_OUT
}