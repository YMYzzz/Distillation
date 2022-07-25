// 用于用户上传文本或使用上传文档或使用图片OCR功能的入口文件

import React, { useState } from 'react';
import { Upload, Modal, Input, Button, Tooltip } from 'antd';
import axios from 'axios'
import { PlusOutlined } from '@ant-design/icons';
import './TextLoader.css'

const { TextArea } = Input;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

const TextLoader = (props) => {
    const { setTitle, setAbstract, text, setText, saveRecord } = props

    const [uploading, setUploading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([])
    const [picList, setPicList] = useState([])

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleFileChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const handlePicChange = ({ fileList: newPicList }) => setPicList(newPicList);

    const uploadFileButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传文件
            </div>
        </div>
    );

    const uploadPicButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传图片
            </div>
        </div>
    );

    const handleUpload = () => {
        if (fileList.length) {
            const doc = { 'doc': fileList[0].originFileObj }
            setUploading(true); // You can use any AJAX library you like

            axios.post('api/article/doc', doc,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((res) => {
                    const data = res.data
                    console.log(data)
                    if (data.meta.status === 2000) {
                        setText(data.data.content)
                    }
                }).catch((err) => {
                    console.log(err)
                }).finally(() => {
                    setUploading(false);
                });
        }
        if (picList.length) {
            const formData = new FormData();
            picList.forEach((pic) => {
                formData.append('image[]', pic.originFileObj);
            });
            setUploading(true); // You can use any AJAX library you like

            axios.post('api/article/ocr', formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            ).then((res) => {
                const data = res.data
                console.log(data)
                if (data.meta.status === 2000) {
                    setText(data.data.content)
                }
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setUploading(false);
            });
        }

    };

    const upLoadText = () => {
        setGenerating(true);
        // 上传文本文档并获取返回值（标题、摘要）
        axios.post('api/article/generate', {
            content: text
        }).then((res) => {
            const data = res.data
            console.log(data)
            if (data.meta.status === 2000) {
                setTitle(data.data.title)
                setAbstract(data.data.abstract)
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setGenerating(false);
        });
    }

    const beforeDocUpload = (file) => {
        setFileList([...fileList, file]);
        return false;
    }

    const beforePicUpload = (file) => {
        setPicList([...picList, file]);
        return false;
    }

    const onChange = (e) => {
        console.log(e.target.value)
        setText(e.target.value)
    }

    return (
        <>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '.7em'
                }}>
                    <Tooltip title=".doc / .docx / .txt / .pdf">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleFileChange}
                            accept=".doc,.docx,.txt,.pdf"
                            beforeUpload={beforeDocUpload}
                        >
                            {(fileList.length >= 1 || picList.length) ? null : uploadFileButton}
                        </Upload>
                    </Tooltip>
                    <Tooltip title=".png / .jpg / .jpeg / .bmp">
                        <Upload
                            listType="picture-card"
                            // 多选的情况下可能会造成个别图片上传错误，并且如果用户上传超过上限的图片需要做额外限制
                            multiple={true}
                            fileList={picList}
                            onPreview={handlePreview}
                            onChange={handlePicChange}
                            accept=".png,.jpg,.jpeg,.bmp"
                            beforeUpload={beforePicUpload}
                        >
                            {(picList.length >= 5 || fileList.length) ? null : uploadPicButton}
                        </Upload>
                    </Tooltip>
                </div>
                <div>
                    <Modal maskTransitionName="" transitionName="" visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </div>
            </div>

            <TextArea
                showCount
                maxLength={10000}
                value={text}
                onChange={onChange}
                style={{
                    height: '70%',
                    width: '80%',
                    margin: '0 auto'
                }}
            />
            <div>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0 && picList.length === 0}
                    loading={uploading}
                    style={{
                        marginTop: 16,
                    }}
                >
                    {uploading ? '提取中...' : '立刻提取'}
                </Button>
                <Button
                    style={{ marginTop: '.7em', marginLeft: '1em' }}
                    disabled={text.length === 0}
                    loading={generating}
                    onClick={upLoadText}
                    type="primary"
                >
                    {generating ? '正在生成...' : '自动生成'}
                </Button>
                <Button style={{ marginTop: '.7em', marginLeft: '1em' }} onClick={saveRecord} type="primary">保存记录</Button>

            </div>
        </>
    );
};

export default TextLoader;