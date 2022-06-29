import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd';
import RequireAuth from './utils/auth';
import MyAvatar from './component/MyAvatar';
import EditArea from './component/EditArea'
import HistoryList from './component/HistoryList'
import Register from './component/Register'
import Login from './component/Login'
import UserInfo from './component/UserInfo'


const { Header, Content, Footer } = Layout;

const App = () => {

	const [clientHeight, setClientHeight] = useState(document.body.scrollHeight)

	const handleClientHeightChange = () => {
		setClientHeight(document.body.scrollHeight)
	}

	// 监听页面高度变化，实现无限滚动背景统一
	useEffect(() => {
		window.addEventListener('scroll', handleClientHeightChange);
		return () => window.removeEventListener('scroll', handleClientHeightChange);
	}, [])

	const mainStyle = {
		height: clientHeight + 'px',
	}

	return (
		<Layout
			style={mainStyle}
		>
			<Header
				style={{
					position: 'fixed',
					zIndex: 1,
					width: '100%',
				}}
			>
				<div style={{ float: 'right' }}>
					<MyAvatar></MyAvatar>
				</div>
			</Header>
			<Content
				className="site-layout"
				style={{
					padding: '0 50px',
					marginTop: 64,
					minHeight: 'auto',
				}}
			>
				<Routes>
					<Route path="/" element={<EditArea />} />
					<Route path="/article/:id" element={<EditArea />} />
					<Route path="/history" element={
						<RequireAuth>
							<HistoryList />
						</RequireAuth>
					} />
					<Route path="/registration" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/user" element={<UserInfo />} />
				</Routes>
			</Content>
			<Footer
				style={{
					textAlign: 'center',
				}}
			>
				Distillation ©2022 Created by Truly Bai
			</Footer>
		</Layout>
	)
};

export default App;