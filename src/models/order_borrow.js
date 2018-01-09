/**
 * model  借款订单状态管理
 */
import { queryBorrowOrder, queryBorrowOrderDetail} from '../services/ordermanage';

export default {
    namespace:'borroworder',
    state:{
      data:{
        list:[],
        page:{}
      },
      loading:false,
      modal:false,
      modalrecord:{},
      modallist:[],
    },
    effects:{
      *fetch({payload},{call, put}){
          yield put({
            type: 'changeLoading',
            payload: true,
          });
          const result = yield call(queryBorrowOrder,payload);
          yield put({
             type: 'setListdata',
              payload: result
          });
          yield  put({
            type:'changeLoading',
            payload: false
          })
      },
      *modalrecordfetch({payload},{call,put}){
          yield put({
            type:'changeModal',
            payload:true,
          })
         const resultmodalrecord = yield  call(queryBorrowOrderDetail,payload);
          yield  put({
             type: 'setModalRecord',
             payload: resultmodalrecord
          })
      },
      *modallistfetch({payload},{call,put}){
         const resultmodallist = yield  call(queryBorrowOrderDetail,payload);
         yield  put({
           type: 'setModalList',
           payload: resultmodallist
         })
      }
     },
     reducers:{
        changeLoading(state, action){
           return {
             ...state,
             loading:action.payload
           }
        },
       setListdata(state, action){
          return {
            ...state,
            data:action.payload
          }
       },
       changeModal(state,action) {
          return {
            ...state,
            modal:action.payload
          }
       },
       setModalRecord(state, action){
         return {
           ...state,
           modalrecord:action.payload
         }
       },
       setModalList(state, action){
         return {
           ...state,
           modallist:action.payload
         }
       },
     }
}
