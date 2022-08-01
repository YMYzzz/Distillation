// 用户个人主页以及修改密码上传头像
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Descriptions, Button, Modal, Input, message, Upload, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios'
import { getToken, removeToken, isLogined } from '../../utils/tools'
import { setUserIcon } from '../../actions';
import { connect } from 'react-redux'
import './UserInfo.css'

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    console.log(file)

    return false;
};

const UserInfo = ({ globalUserInfo, setUserIcon }) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [image, setImage] = useState(null);
    const [icon, setIcon] = useState('');
    const [userName, setUserName] = useState('');
    const [joinTime, setJoinTime] = useState('')
    const [phone, setPhone] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogined()) {
            const { icon, joinTime, phone, userName } = globalUserInfo
            setJoinTime(joinTime)
            setUserName(userName)
            setPhone(phone)
            setIcon(icon)
        } else {
            warning('用户未登录')
        }
        // axios.get('api/user/info', {
        //     headers: { 'Authorization': getToken() }
        // }).then((res) => {
        //     const data = res.data
        //     if (data.meta.status === 2000) {
        //         const userInfo = data.data.user
        //         const time = userInfo.join_time.split(" ")[0].split('-')
        //         setJoinTime(time[0] + " 年 " + time[1] + " 月 " + time[2] + " 日")
        //         setUserName(userInfo.username)
        //         setPhone(userInfo.phone)
        //         setIcon(userInfo.icon)
        //     }
        //     else {
        //         warning('用户未登录')
        //     }
        // })
    }, []);

    const handleChange = (info) => {
        setImage(info.file)
        getBase64(info.file, (url) => {
            setIcon(url);
        });
        return;
    };

    const uploadIcon = () => {
        if (image == null) {
            warning('请选择头像后点击上传')
            return
        }
        axios.post('api/user/icon', {
            image: image
        }, {
            headers: { 'Authorization': getToken(), 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
            const data = res.data
            console.log(data)
            if (data.meta.status === 2000) {
                success('头像上传成功')
                // 分别设置当前页面icon，redux中icon，头像预览
                setIcon(data.data.icon)
                setUserIcon(data.data.icon)
                setImage(null)
            }
        }).catch((err) => {
            console.log(err)
            setImage(null)
            warning('头像上传失败')
        });
    }

    const uploadButton = (
        <div>
            {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            {<UserOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                点击选择头像
            </div>
        </div>
    );

    const warning = (msg) => {
        message.warning(msg);
    };

    const success = (msg) => {
        message.success(msg);
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        // 发送修改密码的请求
        if (oldPwd.length === 0 || newPwd.length === 0) {
            warning("密码不可为空")
            return
        }
        if (newPwd.length < 6) {
            warning("密码长度至少为6位")
            return
        }
        if (newPwd == oldPwd) {
            warning("新旧密码一致")
            return
        }
        setConfirmLoading(true);
        axios.post('api/user/pwd', {
            password: oldPwd,
            new_password: newPwd
        }, {
            headers: { 'Authorization': getToken() }
        }).then((res) => {
            const data = res.data
            console.log(data)
            if (data.meta.status === 2000) {
                success('修改成功 请使用新密码登录')
                setTimeout(() => {
                    removeToken()
                    navigate("/login")
                }, 2000)
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setVisible(false);
            setConfirmLoading(false)
        });
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const myButtonStyle = {
        //marginTop: '.5em',
        //marginLeft: '1em',
        //fontSize: '1.2em',
        //display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //paddingLeft: '1.5rem',
        //paddingRight: '1.5rem',
        //paddingTop: '.75rem',
        //paddingBottom: '.75rem',
        borderRadius: '.25rem',
        border: 'none',
        color: '#fff',
        background: '#4299e1',
        outline: 'none',
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(90%)'
         },
         '&:focus': {
            outlineColor: 'rgba(0,0,0,0)',
            outlineOffset: '2px',
            outlineStyle: 'solid',
            borderColor: '#fff'
         }
    }

    return (
        <div
            className="site-layout-background"
            style={{
                margin: '16px 0',
                padding: 24,
                height: '100%',
                display: 'flex'
            }}
        >
            <div
                style={{
                    minWidth: '300px',
                    borderRight: 'solid',
                    borderWidth: '1px',
                    marginRight: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                {/* <Avatar style={{
                    margin: '20px 0'
                }} shape="square" size={128} /> */}
                <Tooltip title="点击选择头像">
                    <div
                        style={{
                            width: '104px',
                            // height: 'auto',
                            // minHeight: '104px',
                            marginBottom: '10px',
                        }}>
                        <Upload
                            name="image"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {icon ? (
                                <img
                                    src={icon}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </div>
                </Tooltip>
                <div>
                    <Button style={myButtonStyle} onClick={uploadIcon}>点击上传</Button>
                </div>
            </div >

            <div
                style={{
                    flex: '1 1 auto'
                }}>
                <Descriptions
                    title="用户信息"
                    bordered
                    column={1}
                >
                    <Descriptions.Item label="用户名">{userName}</Descriptions.Item>
                    <Descriptions.Item label="手机号">{phone}</Descriptions.Item>
                    <Descriptions.Item label="注册时间">{joinTime}</Descriptions.Item>
                    <Descriptions.Item label="修改密码"><Button type="dashed" style={{borderRadius: '.25rem',}} onClick={showModal} danger>
                        点击此处修改密码
                    </Button></Descriptions.Item>
                </Descriptions>

                <Modal
                    title="修改密码"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                    footer={[
                        <Button key="back" onClick={handleCancel} style={myButtonStyle}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" loading={confirmLoading} style={myButtonStyle} onClick={handleOk}>
                            确定
                        </Button>
                    ]}
                >
                    {/* <p>{modalText}</p> */}
                    <Input.Password addonBefore={<span style={{ display: 'inline-block', width: '50px' }}>旧密码：</span>}
                        style={{ minWidth: 200, width: '100% - 40px' }}
                        placeholder="请输入旧密码"
                        // value={oldPwd}
                        onChange={(e) => setOldPwd(e.target.value)} />
                    <br></br>
                    <br></br>
                    <Input.Password addonBefore={<span style={{ display: 'inline-block', width: '50px' }}>新密码：</span>}
                        style={{ minWidth: 200 }}
                        placeholder="请输入新密码"
                        // value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)} />
                </Modal>
            </div>
        </div >
    )
};


const mapStateToProps = (state) => {
    return {
        globalUserInfo: state.userInfo
    }
}

const mapDispatchToProps = { setUserIcon };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo);