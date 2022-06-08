// 用户编辑页面，默认状态下显示为主页
import React, { useState } from 'react';
import TextLoader from '../TextLoader'
import ShowArea from '../ShowArea';

const EditArea = () => {
  const [title, setTitle] = useState('')
  const [abstract, setAbstract] = useState('')

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
        <TextLoader setTitle={setTitle} setAbstract={setAbstract}></TextLoader>
      </div>
    </div>
  );
};

export default EditArea;