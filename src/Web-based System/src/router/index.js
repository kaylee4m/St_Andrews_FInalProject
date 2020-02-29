import Vue from 'vue'
import Router from 'vue-router'
import routeArr from '../const/menu.js'


Vue.use(Router)

const getRoutes = (routeArr = []) => {
  var arr = []
  routeArr.forEach(r => {
    arr.push({
      path: r.link,
      // name: r.link.replace(/\//g, '-'), //  Replace '-' as name in route '/'
      name: r.title,
      component: () => import('@/views' + r.link + '/'),        //Prefetch these routing files by default and preload the required files
      // A subpath redirects to the first subpath
      redirect: r.children && r.children.length ? r.children[0].link : null,     //Recursively get the subpath
      children: r.children && r.children.length ? getRoutes(r.children) : null
    })
  })
  return arr
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/'),
    },
    ...getRoutes(routeArr),     //Navigation menu related to routing
    {
      path: '/chart/item',
      name: 'chartItem',
      component: () => import('@/views/chart/item')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

