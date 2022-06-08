import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd';
import MyAvatar from './component/MyAvatar';
import EditArea from './component/EditArea'
import HistoryList from './component/HistoryList'


const { Header, Content, Footer } = Layout;

const App = () => {

  const [clientHeight, setClientHeight] = useState(document.body.scrollHeight)

  const handleClientHeightChange = () => {
    setClientHeight(document.body.scrollHeight)
  }

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
          <Route path="/history" element={<HistoryList />} />
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