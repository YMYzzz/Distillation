// 展示用户生成历史记录列表
import { Avatar, Button, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
const count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const HistoryList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get(fakeDataUrl).then((res) => {
      const data = res.data
      setInitLoading(false);
      setData(data.results);
      setList(data.results);
    })
  }, []);

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
    axios.get(fakeDataUrl).then((res) => {
      const newData = data.concat(res.data.results);
      setData(newData);
      setList(newData);
      setLoading(false); // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
      // In real scene, you can using public method of react-virtualized:
      // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized

      // window.dispatchEvent(new Event('resize'));
    })
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
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
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">点击编辑</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name?.last}</a>}
                description="这里会显示用户历史记录中由系统自动生成的文章标题"
              />
              <div>这里可以显示系统生成的时间</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>


  );
};

export default HistoryList;