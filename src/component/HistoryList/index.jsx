// 展示用户生成历史记录列表
import { Avatar, List, Skeleton, Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios'
import { getToken } from '../../utils/tools'
const count = 5;
const dataUrl = `api/article/history`;

const HistoryList = () => {
	const [initLoading, setInitLoading] = useState(true);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [list, setList] = useState([]);
	useEffect(() => {
		axios.get(dataUrl, {
			headers: { 'Authorization': getToken() }
		}).then((res) => {
			const data = res.data
			const articles = data.data.articles
			setInitLoading(false);
			setData(articles);
			setList(articles);
			console.log(articles)
		})
	}, []);

	const deleteRecord = (id, title) => {
		// delete
		console.log(id);
		axios.get('api/article/delete/' + id, {
			headers: { 'Authorization': getToken() }
		}).then((res) => {
			const data = res.data
			console.log(data)
			if (data.meta.status === 2000) {
				openNotification(title)
			}
			const articles = data.data.articles
			setInitLoading(false);
			setData(articles);
			setList(articles);
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

	const onLoadMore = () => {
		setLoading(true);
		setList(
			data.concat(
				[...new Array(count)].map(() => ({
					loading: true,
					name: {},
					picture: {},
				})),
			),
		);
		axios.get(dataUrl).then((res) => {
			const newData = data.concat(res.data.results);
			setData(newData);
			setList(newData);
			setLoading(false); // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
			// In real scene, you can using public method of react-virtualized:
			// https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized

			// window.dispatchEvent(new Event('resize'));
		})
	};

	// const loadMore =
	// 	!initLoading && !loading ? (
	// 		<div
	// 			style={{
	// 				textAlign: 'center',
	// 				marginTop: 12,
	// 				height: 32,
	// 				lineHeight: '32px',
	// 			}}
	// 		>
	// 			<Button onClick={onLoadMore}>loading more</Button>
	// 		</div>
	// 	) : null;

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
				loading={initLoading}
				itemLayout="horizontal"
				// loadMore={loadMore}
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
								// avatar={<Avatar src={item.picture.large} />}
								avatar={<Avatar icon={<UserOutlined />} />}
								title={<a href="https://ant.design">{item.title}</a>}
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

export default HistoryList;