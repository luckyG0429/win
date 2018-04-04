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
        name: '赛事管理',
        path: 'eventlist',
        icon: 'api',
        component: dynamicWrapper(app, ['eventlist'], () => import('../routes/GameManage/eventlist')),
      },
      {
        name: '比赛管理',
        path: 'gamelist',
        icon: 'bars',
        component: dynamicWrapper(app, ['eventlist','gamelist'], () => import('../routes/GameManage/gamelist')),
      },
      {
        name: '上架审核列表',
        path: 'audit_gamelist',
        icon: 'pushpin-o',
        component: dynamicWrapper(app, ['gameauditlist'], () => import('../routes/GameManage/auditGameList')),
      },
      {
        name: '竞猜情况',
        path: 'quizlist',
        icon: 'calculator',
        component: dynamicWrapper(app, ['quizlist'], () => import('../routes/QuizManage/list')),
      },
      {
        name: '竞猜结果审核',
        path: 'audit_quizlist',
        icon: 'check-square-o',
        component: dynamicWrapper(app, ['userlist'], () => import('../routes/QuizManage/auditList')),
      },
      {
        name: '战队管理',
        path: 'teamlist',
        icon: 'usergroup-add',
        component: dynamicWrapper(app, ['teamlist'], () => import('../routes/TeamManage/list')),
      },
      {
        name: '系统管理',
        path: 'system',
        icon: 'setting',
        children: [
          {
            name: '参数配置',
            path: 'param',
            component: dynamicWrapper(app, ['systemlist'], () => import('../routes/SystemManage/list')),
          },{
            name: '资源配置',
            path: 'resource',
            component: dynamicWrapper(app, ['systemresource'], () => import('../routes/SystemManage/resourceList')),
          },{
            name: '权限设置',
            path: 'permission',
            component: dynamicWrapper(app, ['systempermiss'], () => import('../routes/SystemManage/permissList')),
          }
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
