import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from 'antd';
import { Navbar, Homepage, ChordsPage, MyDashboard } from './components';

import './App.css';

const App = () => {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
            <Layout>
                    <div className="routes">
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/mydashboard" element={<MyDashboard />} />
                            <Route path="/chords" element={<ChordsPage />} />
                        </Routes>
                    </div>
                </Layout>
                <div className="footer">
                    <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                        2022 Guitar Quest
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App;