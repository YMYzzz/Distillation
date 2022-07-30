// 展示用户生成历史记录列表
import { Avatar, List, Skeleton, Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios'
import { getToken } from '../../utils/tools'
import { setHistory } from '../../actions';
import { connect } from 'react-redux'
import './HistoryList.css'

const HistoryList = ({ history, icon, setHistory }) => {
	const [list, setList] = useState(history);

	const deleteRecord = (id, title) => {
		// 删除历史记录
		console.log(id);
		axios.get('api/article/delete/' + id, {
			headers: { 'Authorization': getToken() }
		}).then((res) => {
			const data = res.data
			console.log(data)
			if (data.meta.status === 2000) {
				openNotification(title)
				const articles = data.data.articles
				// 分别更新当前页面列表和redux列表
				setList(articles);
				setHistory(articles)
			}

		}).catch((err) => {
			console.log(err)
		})
	}

	const openNotification = (title) => {
		const args = {
			message: '删除成功',
			description:
				`标题为 ${title} 的生成记录已经删除成功`,
			duration: 2.8,
		};
		notification.open(args);
	};

	return (
		<div
			style={{
				margin: '16px 0',
				padding: 24,
				height: '100%',
				background: '#fff',
			}}
		>
			<List
				className="demo-loadmore-list"
				itemLayout="horizontal"
				dataSource={list}
				renderItem={(item) => (
					<List.Item
						actions={[
							<Link to={'/article/' + item.id}>点击编辑</Link>,
							<Button onClick={(e) => deleteRecord(item.id, item.title)} >删除记录</Button>
						]}
					>
						<Skeleton avatar title={false} loading={item.loading} active>
							<List.Item.Meta
								avatar={<Avatar src={icon} icon={<UserOutlined />} />}
								title={<span style={{
									fontSize: "16px",
									fontWeight: "bold"
								}}>{item.title}</span>}
								description={item.abstract}
							/>
							<div>{item.join_time}</div>

						</Skeleton>

					</List.Item>
				)}
			/>
		</div>


	);
};

const mapStateToProps = (state) => {
	return {
		history: state.historyList,
		icon: state.userInfo.icon
	}
}

const mapDispatchToProps = { setHistory };
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HistoryList);