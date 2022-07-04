import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd';

const HomeButton = () => {
    const navigate = useNavigate();

    const homePopver = (
        <div>
            <label>
                点击回到主页
            </label>
        </div>
    );

    const goHome = () => {
        navigate("/")
    }

    return (
        <>
            <Popover content={homePopver} trigger="hover" onClick={goHome}>
                <Avatar
                    style={{
                        backgroundColor: '#87d068',
                        cursor: "pointer",
                        marginRight: '1em'
                    }}
                    size={40}
                    icon={<HomeOutlined />} />
            </Popover>
        </>
    );
};

export default HomeButton;