// 用户编辑页面，默认状态下显示为主页
import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import TextLoader from '../TextLoader/index'
import ShowArea from '../ShowArea';
import { getToken } from '../../utils/tools'

const EditArea = () => {
	const [title, setTitle] = useState('')
	const [abstract, setAbstract] = useState('')
	const [text, setText] = useState('')
	const params = useParams();

	useEffect(() => {
		if (params.id) {
			axios.get('http://127.0.0.1:5000/api/article/detail/' + params.id, {
				headers: { 'Authorization': getToken() }
			}).then((res) => {
				const data = res.data
				console.log(data)
				const article = data.data.article
				setAbstract(article.abstract)
				setTitle(article.title)
				setText(article.text)
			}).catch((err) => {
				console.log(err)
			})
		}
	}, []);

	const saveRecord = () => {
		if (!text || !title || !abstract) {
			openNotification()
		}
		else {
			//保存当前历史记录
			axios.post('http://127.0.0.1:5000/api/article/save', {
				content: text,
				title: title,
				abstract: abstract
			}, {
				headers: { 'Authorization': getToken() }
			}).then((res) => {
				const data = res.data
				console.log(data)
			}).catch((err) => {
				console.log(err)
			})
		}

	}

	const openNotification = () => {
		notification.info({
			message: `有空白信息`,
			description:
				'您输入的文章或自动生成的摘要或标题中有空白，请检查后再保存'
		});
	};

	return (
		<div
			className="site-layout-background"
			style={{
				margin: '16px 0',
				padding: 24,
				height: '100%',
			}}
		>
			<div style={{
				height: '22%',
				width: '70%',
				margin: '0 auto',
				marginBottom:'2em'
			}}>
				<ShowArea title={title} abstract={abstract}></ShowArea>
			</div>
			<div style={{
				height: '73%',
				width: '70%',
				margin: '0 auto',
				borderRadius: '0.75em',
				boxShadow: '0px 5px 16px -2px rgb(42 115 217 / 20%)',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<TextLoader setTitle={setTitle} setAbstract={setAbstract} text={text} setText={setText} saveRecord={saveRecord}></TextLoader>
			</div>
		</div>
	);
};

export default EditArea;