import { queryNotices } from '../services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
  },

  effects: {

  },
  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },

  },

  subscriptions: {
    setup({ history,dispatch }) {

      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {

        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
