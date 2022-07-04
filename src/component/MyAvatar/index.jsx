// 扩展头像功能，悬浮提醒，点击登录
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Popover, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { isLogined, removeToken } from '../../utils/tools'

const MyAvatar = () => {
    // 用于存储用户是否登录的状态，判断头像悬浮窗渲染样式
    const [isLogin, setIsLogin] = useState(isLogined())

    const navigate = useNavigate();
    const goUserInfo = () => {
        navigate("/user"); // 向 navigate 方法中传入要跳转的 path 路径
    }

    const goLogin = () => {
        navigate("/login");
    }

    const logOut = () => {
        removeToken()
        setIsLogin(false)
        navigate("/login")
    }

    const loginPopover = (
        <div>
            <p>登录后可保存生成记录</p>
            <p>点击立即登录</p>
        </div>
    );

    const userPopover = (
        <div>
            <Link to='/history'>历史记录</Link>
            <Divider style={{ margin: '12px 0' }} />
            <Link to='/user'>个人主页</Link>
            <Divider style={{ margin: '12px 0' }} />
            <label style={{
                color: '#1890ff',
                cursor: 'pointer'
            }}
                onClick={logOut}
            >退出账号</label>
        </div >
    );

    // const getAvatar = () => {
    //     axios.get('http://127.0.0.1:5000/api/user/info', {
    //         headers: { 'Authorization': getToken() }
    //     }).then((res) => {
    //         const data = res.data
    //         if (data.meta.status === 2000) {
    //             const userInfo = data.data.user
    //             setIcon(userInfo.icon)
    //         }
    //     }).catch((err) => {
	// 		setIcon(null)
	// 	})
    // }

    return (
        <>
            {/* 条件判断是否登录，若未登录则包裹popover，若已登录则不需要包裹并且头像图片显示用户头像 */}
            <Popover content={isLogin ? userPopover : loginPopover} trigger="hover" onClick={isLogin ? goUserInfo : goLogin}>
                <Avatar
                    style={{
                        backgroundColor: '#87d068',
                        cursor: "pointer"
                    }}
                    size={40}
                    // src={isLogin ? icon : null}
                    icon={<UserOutlined />} />
            </Popover>
        </>
    );
};

export default MyAvatar;