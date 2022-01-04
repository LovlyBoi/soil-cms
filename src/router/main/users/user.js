const user = () => import('@/views/main/users/user/user.vue')
export default {
  path: '/users/user',
  name: 'user',
  component: user,
  children: []
}
