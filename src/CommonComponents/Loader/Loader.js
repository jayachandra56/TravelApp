import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Space, Spin } from 'antd';
import './Loader.css'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;



const Loader = (props) => (
  <div className="loader">
    <Space size="middle">
      <Spin size="large" />
    </Space>
    <p className='loader-msg'>Loading...</p>
  </div>
);

export default Loader;
