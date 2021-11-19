import React from 'react';
import MyOrder from '../pages/myOrder';
import TestRedux from '../pages/myOrder/testRedux';
// import Home from '../modules/home/home';

const routerConfig = [
//   {
//     path: '/home', // 路由
//     component: Home, // 组件
//     exact: false, // 路由是否精确匹配
//     auth: true, // 是否验证登录
//     roles: ['all'], // 角色权限
//   },
  {
    path: '/myOrder',
    component: MyOrder,
    exact: true,
    auth: true,
    roles: 'all',
  },
  {
    path: '/myOrder/test',
    component: TestRedux,
    exact: true,
    auth: true,
    roles: 'all',
  }
];

// 是否有交集
function isIntersection(arr1, arr2) {
  const len = arr1.length + arr2.length;
  return len > new Set([...arr1, ...arr2]).size;
}

export function getRouterConifg() {
  
  let rootPath = '/';
  

  let roles = JSON.parse(window.localStorage.getItem('POS_USER_ROLE') || '[]');

  // 根据角色返回对应路由
  let routers = routerConfig.filter(
    router =>
      !Array.isArray(router.roles) ||
      (roles.length && isIntersection(router.roles, roles)) ||
      !router.auth ||
      router.path === rootPath ||
      router.roles === 'all'
  );

  return { routers, rootPath };
}
