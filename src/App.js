import './App.css';
import { Layout, Space } from 'antd';
import BussesList from './Pages/BussesList';

const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#1D5B79',
};

const contentStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#97FEED',
  minHeight: '85vh'
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#1D5B79',
};

function App() {
  return (
    <div className="App">
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout>
          <Header style={headerStyle}><h2>Travel Yetra</h2></Header>
          <Content style={contentStyle}>
            <BussesList />
          </Content>
          <Footer style={footerStyle}>@Copyright: All rights reserved to Travel Yetra@2023</Footer>
        </Layout>
      </Space>
    </div>
  );
}

export default App;
