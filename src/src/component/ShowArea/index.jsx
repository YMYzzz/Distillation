// 用于展示自动生成的标题和摘要的文件

import React from 'react';
import { Input, Divider } from 'antd';
const { TextArea } = Input;

const ShowArea = (props) => {
    const { title, abstract } = props
    return (
        <>
            <Input addonBefore="文章标题：" value={title} placeholder="这里是自动生成的文章标题" disabled={false} />
            <Divider />
            {/* <Input addonBefore="文章摘要：" value={abstract} placeholder="这里是自动生成的文章摘要" disabled={false} /> */}
            <div
                className='ant-input-wrapper ant-input-group'
            >
                <span className='ant-input-group-addon'>文章摘要：</span> <TextArea style={{ resize: "none" }} value={abstract} placeholder="这里是自动生成的文章摘要" rows={3} />
            </div>

        </>
    );
};

export default ShowArea;