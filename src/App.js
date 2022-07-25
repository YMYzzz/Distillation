import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd';
import axios from 'axios'
import RequireAuth from './utils/auth';
import MyAvatar from './component/MyAvatar';
import HomeButton from './component/HomeButton';
import EditArea from './component/EditArea'
import HistoryList from './component/HistoryList'
import Register from './component/Register'
import Login from './component/Login'
import UserInfo from './component/UserInfo'
import { getToken, isLogined } from './utils/tools'
import { setUserInfo, setHistory } from './actions';
import { connect } from 'react-redux'



axios.defaults.baseURL = "http://10.15.20.228:5000";
const { Header, Content, Footer } = Layout;

const App = ({ globalUserInfo, setUserInfo, setHistory }) => {
	// const [clientHeight, setClientHeight] = useState(document.body.clientHeight)
	const [clientHeight, setClientHeight] = useState(document.body.offsetHeight)
	// const [clientHeight, setClientHeight] = useState(document.body.scrollHeight)
	// const [minHeight, setMinHeight] = useState(document.documentElement.clientHeight)

	const handleClientHeightChange = () => {
		setClientHeight(document.body.scrollHeight)
	}
	const [loading, setLoading] = useState(true)

	// 监听页面高度变化，实现无限滚动背景统一
	useEffect(() => {
		window.addEventListener('scroll', handleClientHeightChange);
		return () => window.removeEventListener('scroll', handleClientHeightChange);
	})

	useEffect(() => {
		if (isLogined()) {
			setLoading(false)
			axios.get('api/user/info', {
				headers: { 'Authorization': getToken() }
			}).then((res) => {
				const data = res.data
				if (data.meta.status === 2000) {
					const userInfo = data.data.user
					const time = userInfo.join_time.split(" ")[0].split('-')
					setUserInfo({
						'userName': userInfo.username,
						'joinTime': time[0] + " 年 " + time[1] + " 月 " + time[2] + " 日",
						'phone': userInfo.phone,
						'icon': userInfo.icon,
					})
				}
			})
			axios.get('api/article/history', {
				headers: { 'Authorization': getToken() }
			}).then((res) => {
				const data = res.data
				if (data.meta.status === 2000) {
					const articles = data.data.articles
					setHistory(articles)
				}
				setLoading(true)
			})
		}
	}, [])

	const mainStyle = {
		height: clientHeight + 'px',
		// minHeight: '100%',
	}

	return (
		< Layout
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
					<HomeButton></HomeButton>
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
			>{
					loading &&
					<Routes>
						<Route path="/" element={<EditArea />} key='home' />
						<Route path="/article/:id" element={<EditArea key='detail' />} />
						<Route path="/history" element={
							<RequireAuth>
								<HistoryList />
							</RequireAuth>
						} />
						<Route path="/registration" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/user" element={
							<RequireAuth>
								<UserInfo />
							</RequireAuth>
						} />
					</Routes>
				}
			</Content>
			<Footer
				style={{
					textAlign: 'center',
				}}
			>
				Distillation ©2022 Created by Truly Bai
			</Footer>
		</Layout >
	)
};

const mapStateToProps = (state) => {
	return {
		globalUserInfo: state.userInfo
	}
}

const mapDispatchToProps = { setUserInfo, setHistory };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);