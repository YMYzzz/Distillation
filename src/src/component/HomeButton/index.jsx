import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined,HomeTwoTone } from '@ant-design/icons';
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
                        border:'solid',
                        borderWidth:'0.1em',
                        borderColor:'white',
                        backgroundColor: 'rgb(0,21,41)',
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