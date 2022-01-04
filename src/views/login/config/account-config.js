const rules = {
  name: [
    {
      required: true,
      message: '必须填写用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/i,
      message: '用户名需5-10位字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '必须填写密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,16}$/i,
      message: '密码需6-16位字母或数字',
      trigger: 'blur'
    }
  ]
}
export { rules }
