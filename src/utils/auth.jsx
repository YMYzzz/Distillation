// 根据是否登陆从而决定是否需要重定向

import React from 'react'
import { Navigate } from 'react-router-dom'
import { isLogined } from './tools';

const RequireAuth = ({ children }) => {
    const authed = isLogined()

    return authed === 'true' ? (
        children
    ) : (
        <Navigate to="/login" replace /> // 跳转到登录
    );
};

export default RequireAuth;