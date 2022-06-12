import React, { startTransition, useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Homepage, ChordsPage, MyDashboard, ChordProgressions, Scales } from './components';

import { Layout , Typography, Space, Menu, Switch, } from 'antd';

import { HomeOutlined, DashboardOutlined } from '@ant-design/icons';

import logo from './images/guitarlogo.png';


import './App.css';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
    const [theme, setTheme] = useState('light');
    const [menuArray, setMenuArray] = useState(["home"])

    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
      };


    return (
        <div className="app">
            <Sider theme={theme}>
                <Menu 
                    theme={theme}
                    selectedKeys={menuArray}
                    defaultSelectedKeys={["home"]}
                    mode="inline"
                    >
                    <img src={logo} className="guitar-logo"/>
                    <Typography.Title level={3} style={{ margin: "0rem 1rem 1rem 1rem"}}>
                        Guitar Quest
                    </Typography.Title>
                    <Menu.Item key="home" icon={<HomeOutlined />} >
                        <Link to="/" >Home</Link>
                    </Menu.Item>
                    <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                        <Link to="/mydashboard" >My Dashboard</Link>
                    </Menu.Item>
                    <Menu.SubMenu key="training-sub" title="Training">
                            <Menu.Item key="chords">
                                <Link to="/chords">Chords</Link>
                            </Menu.Item>
                            <Menu.Item key="chord-progressions">
                                <Link to="/chord-progressions">Chord Progressions</Link>
                            </Menu.Item>
                            <Menu.Item key="scales">
                                <Link to="/scales">Scales</Link>
                            </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
                <div className="theme-container center-items">Light<Switch onChange={changeTheme} className="center-items" style={{margin: "0.5rem"}}></Switch>Dark</div>
            </Sider>
            <div className="main">
                <Layout theme={theme} style={{ height: "100vh", position: "relative", overflow: "hidden"}} >
                <Header theme={theme}/>
                    <div style={{ height: "100%", position: "relative", overflowY: "auto"}}>
                        <Content theme={theme} style={{paddingBottom: "60px"}}>
                            <Routes>
                                <Route path="/" element={<Homepage />} />
                                <Route path="/mydashboard" element={<MyDashboard theme={theme} />} />
                                <Route path="/chords" element={<ChordsPage theme={theme} />} />
                                <Route path="/chord-progressions" element={<ChordProgressions />} />
                                <Route path="/scales" element={<Scales />} />
                            </Routes>
                        </Content>
                        </div>
                    <Footer theme={theme} style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        right: 0
                    }}>
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