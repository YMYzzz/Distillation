import { Descriptions, Button, Avatar } from 'antd';

const UserInfo = () => (
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
            <Avatar style={{
                margin: '20px 0'
            }} shape="square" size={128} />
            <div>
                <Button>点击修改头像</Button>
            </div>
        </div>

        <div
            style={{
                flex: '1 1 auto'
            }}>
            <Descriptions
                title="用户信息"
                bordered
                column={1}
            >
                <Descriptions.Item label="用户名">Cloud Database</Descriptions.Item>
                <Descriptions.Item label="手机号">Prepaid</Descriptions.Item>
                <Descriptions.Item label="注册时间">18:00:00</Descriptions.Item>
                <Descriptions.Item label="修改密码">$80.00</Descriptions.Item>
            </Descriptions>
        </div>
    </div>
);

export default UserInfo;