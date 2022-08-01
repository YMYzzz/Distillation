// 扩展头像功能，悬浮提醒，点击登录
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Popover, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { isLogined, removeToken, getToken } from '../../utils/tools'
import { connect } from 'react-redux'

const MyAvatar = ({ icon }) => {
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

    const unLoginStyle = {
        border: 'solid',
        borderWidth: '0.1em',
        borderColor: 'white',
        backgroundColor: 'rgb(0,21,41)',
        cursor: "pointer"
    }

    const LoginStyle = {
        ursor: "pointer"
    }

    return (
        <>
            {/* 条件判断是否登录，若未登录则包裹popover，若已登录则不需要包裹并且头像图片显示用户头像 */}
            <Popover content={isLogin ? userPopover : loginPopover} trigger="hover" onClick={isLogin ? goUserInfo : goLogin}>
                <Avatar
                    style={isLogin ? LoginStyle : unLoginStyle}
                    size={40}
                    src={isLogin ? icon : null}
                    icon={<UserOutlined />} />
            </Popover>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        icon: state.userInfo.icon
    }
}
export default connect(
    mapStateToProps,
    null
)(MyAvatar);