// import { iconPropType } from 'element-plus/es/utils/index.js'

export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登陆',
      hidden: true,
      icon: 'CircleCloseFilled',
    },
  },
  {
    path: '/homepage',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
      icon: 'CircleCloseFilled',
    },
    redirect: '/homepage',
    children: [
      {
        path: '/homepage',
        component: () => import('@/views/homepage/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '地图浏览',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/navigation',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
      icon: 'CircleCloseFilled',
    },
    redirect: '/navigation',
    children: [
      {
        path: '/navigation',
        component: () => import('@/views/navigation/index.vue'),
        meta: {
          title: '导航路线',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/nearbyfacilities',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
      icon: 'CircleCloseFilled',
    },
    redirect: '/nearbyfacilities',
    children: [
      {
        path: '/nearbyfacilities',
        component: () => import('@/views/nearbyfacilities/index.vue'),
        meta: {
          title: '附近设施',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/tourisminfo',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '旅游信息',
      hidden: false,
      icon: 'CircleCloseFilled',
    },
    redirect: '/scenicArea',
    children: [
      {
        path: '/scenicArea',
        component: () => import('@/views/scenicArea/index.vue'),
        meta: {
          title: '景区简介',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      {
        path: '/catering',
        component: () => import('@/views/catering/index.vue'),
        meta: {
          title: '餐饮美食',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      {
        path: '/traffic',
        component: () => import('@/views/traffic/index.vue'),
        meta: {
          title: '交通设施',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: 'CircleCloseFilled',
    },
  },

  //   {
  //     path: '/screen',
  //     component: () => import('@/views/screen/index.vue'),
  //     name: 'Screen',
  //     meta: {
  //       hidden: false,
  //       title: '数据大屏',
  //       icon: 'Platform',
  //     },
  //   },
  //   {
  //     path: '/acl',
  //     component: () => import('@/layout/index.vue'),
  //     name: 'Acl',
  //     meta: {
  //       title: '权限管理',
  //       hidden: false,
  //       icon: 'Key',
  //     },
  //     redirect:'/acl/user',
  //     children: [
  //       {
  //         path: '/acl/user',
  //         component: () => import('@/views/acl/user/index.vue'),
  //         name: 'User',
  //         meta: {
  //           title: '用户管理',
  //           hidden: false,
  //           icon: 'User',
  //         },
  //       },
  //       {
  //         path: '/acl/role',
  //         component: () => import('@/views/acl/role/index.vue'),
  //         name: 'Role',
  //         meta: {
  //           title: '角色管理',
  //           hidden: false,
  //           icon: 'UserFilled',
  //         },
  //       },
  //       {
  //         path: '/acl/permission',
  //         component: () => import('@/views/acl/permission/index.vue'),
  //         name: 'Permission',
  //         meta: {
  //           title: '菜单管理',
  //           hidden: false,
  //           icon: 'Tools',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     path: '/product',
  //     component: () => import('@/layout/index.vue'),
  //     name: 'Pruduct',
  //     meta: {
  //       title: '商品管理',
  //       icon: 'Goods',
  //       hidden: false,
  //     },
  //     redirect:'/product/trademark',
  //     children: [
  //       {
  //         path: '/product/trademark',
  //         component: () => import('@/views/product/trademark/index.vue'),
  //         name: 'Trademark',
  //         meta: {
  //           title: '品牌管理',
  //           icon: 'Document',
  //         },
  //       },
  //       {
  //         path: '/product/spu',
  //         component: () => import('@/views/product/spu/index.vue'),
  //         name: 'Spu',
  //         meta: {
  //           title: 'spu管理',
  //           icon: 'Notebook',
  //         },
  //       },
  //       {
  //         path: '/product/sku',
  //         component: () => import('@/views/product/sku/index.vue'),
  //         name: 'Sku',
  //         meta: {
  //           title: 'sku管理',
  //           icon: 'Tickets',
  //         },
  //       },
  //       {
  //         path: '/product/attr',
  //         component: () => import('@/views/product/attr/index.vue'),
  //         name: 'Attr',
  //         meta: {
  //           title: '属性管理',
  //           icon: 'StarFilled',
  //         },
  //       },
  //     ],
  //   },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'Operation',
    },
  },
];
