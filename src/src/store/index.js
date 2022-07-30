import { createStore } from 'redux';
import distillation from '../reducers'
const store = createStore(distillation);
// console.log(store.getState())
// const unsubscribe = store.subscribe(() =>
//     console.log(store.getState())
// )

// // 停止监听 state 更新
// unsubscribe();
export default store;