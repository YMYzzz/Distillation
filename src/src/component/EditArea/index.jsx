// 用户编辑页面，默认状态下显示为主页
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import TextLoader from '../TextLoader'
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
				height: '20%',
				width: '70%',
				margin: '0 auto',
			}}>
				<ShowArea title={title} abstract={abstract}></ShowArea>
			</div>
			<div style={{
				height: '75%',
				width: '70%',
				margin: '0 auto',
				borderRadius: '0.75em',
				boxShadow: '0px 5px 16px -2px rgb(42 115 217 / 20%)',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<TextLoader setTitle={setTitle} setAbstract={setAbstract} text={text}></TextLoader>
			</div>
		</div>
	);
};

export default EditArea;