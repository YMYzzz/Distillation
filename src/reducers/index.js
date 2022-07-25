import { act } from 'react-dom/test-utils';
import { combineReducers } from 'redux'
// import todos from './todos'
// import visibilityFilter from './visibilityFilter'

// const distillation = combineReducers({
//   todos,
//   visibilityFilter
// })

const initialState = {
    userInfo: {
        userName: '',
        joinTime: '',
        phone: '',
        icon: '',
    },
    historyList: []
};

const distillation = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return { ...state, userInfo: action.userInfo }
        case 'SET_USER_ICON':
            return {
                ...state, userInfo: {
                    ...state.userInfo,
                    icon: action.icon
                }
            }
        case 'SET_HISTORY':
            return {
                ...state, historyList: action.history
            }
        default:
            return state
    }
}

export default distillation