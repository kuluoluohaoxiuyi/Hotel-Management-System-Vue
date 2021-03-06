import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','student']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '首页', icon: 'dashboard' }
      },
      {
        path: 'profile',
        name: 'Profile',
        hidden: true,
        component: () => import('@/views/profile'),
        meta: {
          title: '个人信息'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 管理员路由
  {
    path: '/admin/people_info',
    component: Layout,
    name: 'people_infos',
    redirect: 'noRedirect',
    meta: { title: '人员信息', icon: 'peoples', roles: ['admin'] },
    children: [
      {
        path: 'check_customer_info',
        name: 'check_customer_info',
        component: () => import('@/views/hotel-admin/check-customer-info'),
        meta: { title: '入住顾客信息' }
      },
      {
        path: 'register_info',
        name: 'register_info',
        component: () => import('@/views/hotel-admin/register-info'),
        meta: { title: '注册会员信息' }
      },
      {
        path: 'waiter_info',
        name: 'waiter_info',
        component: () => import('@/views/hotel-admin/waiter-info'),
        meta: { title: '服务员信息' }
      },
      {
        path: 'admin_info',
        name: 'admin_info',
        component: () => import('@/views/hotel-admin/admin-info'),
        meta: { title: '管理员信息' }
      }
    ]
  },
  {
    path: '/admin/property_info',
    component: Layout,
    name: 'property_infos',
    redirect: 'noRedirect',
    meta: { title: '物业信息', icon: 'finance', roles: ['admin'] },
    children: [
      {
        path: 'order_info',
        name: 'order_info',
        component: () => import('@/views/hotel-admin/order-info'),
        meta: { title: '订单信息' }
      },
      {
        path: 'room_info',
        name: 'room_info',
        component: () => import('@/views/hotel-admin/room-info'),
        meta: { title: '房间信息' }
      },
      {
        path: 'room_type_info',
        name: 'room_type_info',
        component: () => import('@/views/hotel-admin/room-type-info'),
        meta: { title: '房型信息' }
      }
    ]
  },
  {
    path: '/admin/message_root',
    name: 'message_root',
    redirect: 'noRedirect',
    component: Layout,
    meta: { title: '公告信息', icon: 'message', roles: ['admin'] },
    children: [
      {
        path: 'message_info',
        name: 'message_info',
        component: () => import('@/views/hotel-admin/message-info'),
        meta: { title: '公告信息' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
