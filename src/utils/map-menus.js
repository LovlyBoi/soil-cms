export default function mapMenusToRoutes(userMenus){
  const routes = []
  const allRoutes = []

  const routeFile = require.context('../router/main', true, /\.js$/)
  routeFile.keys().forEach((key) => {
    // 将所有的路由模块放入allRoutes中
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 递归的解析映射
  function _recurseGetRoute(menus) {
    for (const item of menus) {
      if (item.type == 2) {
        // 解析路径
        const route = allRoutes.find((route) => route.path == item.url)
        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoute(item.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}