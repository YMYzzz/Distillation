// 扩展头像功能，悬浮提醒，点击登录

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Popover, Modal, Button, Input, message, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Login from '../Login'

const MyAvatar = () => {
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
        </div>
    );

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    // 用于存储用户是否登录的状态，判断头像悬浮窗渲染样式
    const [isLogin, setIsLogin] = useState(false);

    const showLoginModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        // 提交登录信息，判断是否登录成功，若成功调用下面函数
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        // 如果登录信息错误，调用下面方法
        message.error('登录错误 请检查账号或密码！');
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setPassword("");
        setUserName("");
        setVisible(false);
    };

    const handleRegist = () => {
        // 跳转注册页面，可用路由
        navigate("/registration");
    }

    const navigate = useNavigate();
    const goUserInfo = () => {
        // navigate("/history"); // 向 navigate 方法中传入要跳转的 path 路径
    }

    const goLogin = () => {
        navigate("/login"); 
    }

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
                    icon={<UserOutlined />} />
            </Popover>
            <Modal
                title="登录账号"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            // footer={[
            //     <Button key="back" onClick={handleCancel} style={{ marginRight: '3em' }}>
            //         取消
            //     </Button>,
            //     <Button
            //         key="link"
            //         type="primary"
            //         onClick={handleRegist}
            //     >
            //         去注册
            //     </Button>,
            //     <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            //         登录
            //     </Button>
            // ]}
            >
                {/* <p>{modalText}</p> */}
                {/* <Input addonBefore={<span style={{ display: 'inline-block', width: '50px' }}>用户名：</span>}
                    style={{ minWidth: 200, width: '100% - 40px' }}
                    placeholder="请输入用户名"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} />
                <br></br>
                <br></br>
                <Input.Password addonBefore={<span style={{ display: 'inline-block', width: '50px' }}>密码：</span>}
                    style={{ minWidth: 200 }}
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} /> */}
                <Login></Login>
            </Modal>
        </>
    );
};

export default MyAvatar;