import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Homepage, ChordsPage, MyDashboard } from './components';

import { Typography, Space, Menu } from 'antd';
import { Layout } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import logo from './images/guitarlogo.png';


import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
    return (
        <div className="app">
            <Sider>
                <Menu theme="dark">
                    <img className="guitar-logo" src={logo} />
                    <Typography.Title level={2} style={{color: "white"}}>
                        Guitar Quest
                    </Typography.Title>
                    <Menu.Item key={1} icon={<HomeOutlined />} >
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key={3}>
                        <Link to="/mydashboard">My Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <Link to="/chords">Chords</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <div className="main">
                <Layout>
                        <Content>
                            <Routes>
                                <Route path="/" element={<Homepage />} />
                                <Route path="/mydashboard" element={<MyDashboard />} />
                                <Route path="/chords" element={<ChordsPage />} />
                            </Routes>
                        </Content>
                    <Footer>
                        <Typography.Title level={5} style={{ textAlign: 'center' }}>
                            2022 Guitar Quest
                        </Typography.Title>
                    </Footer>
                </Layout>
            </div>
        </div>
    )
}

export default App;