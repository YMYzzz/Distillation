// 设置用户信息
export const setUserInfo = userInfo => {
    return {
        type: 'SET_USER_INFO',
        userInfo
    }
}

// 修改头像
export const setUserIcon = icon => {
    return {
        type: 'SET_USER_ICON',
        icon
    }
}

// 获取历史信息
export const setHistory = history => {
    return {
        type: 'SET_HISTORY',
        history
    }
}