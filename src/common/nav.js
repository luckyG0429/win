import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '用户管理',
        path: 'userlist',
        icon: 'user',
        children: [
          {
            name: '用户列表',
            path: 'list',
            component: dynamicWrapper(app, ['eventlist'], () => import('../routes/GameManage/eventlist')),
          }
          ]
      },
      {
        name: '支付管理',
        path: 'trade',
        icon: 'pay-circle-o',
        children: [
          {
            name: '交易流水',
            path: 'list',
            component: dynamicWrapper(app, ['eventlist'], () => import('../routes/GameManage/eventlist')),
          },
        ],
      },
      {
        name: '赛事管理',
        path: 'listgame',
        icon: 'api',
        children: [
          {
            name: '赛事列表',
            path: 'eventlist',
            component: dynamicWrapper(app, ['eventlist'], () => import('../routes/GameManage/eventlist')),
          },
          // {
          //   name: '比赛列表',
          //   path: 'gamelist',
          //   component: dynamicWrapper(app, ['gamelist'], () => import('../routes/GameManage/gamelist')),
          // },
        ],
      },
      {
        name: '竞猜管理',
        path: 'quiz',
        icon: 'appstore',
        children: [
          {
            name: '竞猜列表',
            path: 'quizlist',
            component: dynamicWrapper(app, ['quizlist'], () => import('../routes/QuizManage/list')),
          },
        ],
      },
      {
        name: '系统管理',
        path: 'system',
        icon: 'setting',
        children: [
          {
            name: '参数配置',
            path: 'param',
            component: dynamicWrapper(app, ['quizlist'], () => import('../routes/QuizManage/list')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
          },
        ],
      },
    ],
  },
  // {
  //   component: dynamicWrapper(app, [], () => import('../layouts/BlankLayout')),
  //   layout: 'BlankLayout',
  //   children: {
  //     name: '使用文档',
  //     path: 'http://pro.ant.design/docs/getting-started',
  //     target: '_blank',
  //     icon: 'book',
  //   },
  // },
];
