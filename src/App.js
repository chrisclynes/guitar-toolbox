import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Homepage, ChordsPage, MyDashboard, ChordProgressions, ScalesPage, MetronomePage } from './components';

import { Layout , Typography, Menu, Button, Drawer } from 'antd';

import { HomeOutlined, DashboardOutlined, MenuOutlined } from '@ant-design/icons';

import logo from './images/guitarlogo.png';
import logoWhite from './images/guitarlogoWhite.png';

import './App.css';

const { Header, Footer, Sider, Content } = Layout;


const App = () => {
    const [isMobile, setIsMobile] = useState(null)
    const [visible, setVisible] = useState(false);
    const [menuArray, setMenuArray] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    //useRef setsInterval for metronome to be controlled outside of the metronome component pages
    const metronomeInterval = useRef()

    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
      }
    
    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const showDrawer = () => {
        setVisible(true);
      };
    
      const closeDrawer = () => {
        setVisible(false);
      };

    const handleClearMetronome = () => {
        clearInterval(metronomeInterval.current)
        setIsPlaying(false)
    }

    const handleMenuHighlight = (val) => {
        if(visible) closeDrawer();
        setMenuArray(val)
    }

    const { Item } = Menu;
    const { Title } = Typography;

    return (
        <div className="app">
            {!isMobile &&
                <Sider theme='light' >
                    <Menu 
                        theme='light'
                        selectedKeys={menuArray}
                        defaultSelectedKeys={["home"]}
                        mode="inline"
                        onClick={((item) => setMenuArray([item.key]))}//set highlighted sider menu item, array will always only contain a single value.
                        >
                        <div className="guitar-logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="sider-menu-title">
                            Guitar Quest
                        </div>
                        <Item key="home" icon={<HomeOutlined />} >
                            <Link to="/" onClick={() => handleMenuHighlight(["home"])}>
                                Home
                            </Link>
                        </Item>
                        <Item key="dashboard" icon={<DashboardOutlined />}>
                            <Link to="/mydashboard" onClick={() => handleMenuHighlight(["dashboard"])}>
                                My Dashboard
                            </Link>
                        </Item>
                        <Menu.SubMenu key="training-sub" title="Training">
                                <Item key="chords">
                                    <Link to="/chords" onClick={() => handleMenuHighlight(["chords"])}>
                                        Chords
                                    </Link>
                                </Item>
                                <Item key="chord-progressions">
                                    <Link to="/chord-progressions" onClick={() => handleMenuHighlight(["chord-progressions"])}>
                                        Chord Progressions
                                    </Link>
                                </Item>
                                <Item key="scales">
                                    <Link to="/scales"onClick={() => handleMenuHighlight(["scales"])}>
                                        Scales
                                    </Link>
                                </Item>
                                <Item key="metronome">
                                    <Link to="/metronome" onClick={() => handleMenuHighlight(["metronome"])}>
                                        Metronome
                                    </Link>
                                </Item>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
            }
            <div className="main">
                <Layout style={{ height: "100vh", position: "relative", overflow: "hidden"}}  >
                <Header>
                    {isMobile &&
                    <div className="mobile-title">
                        <img src={logoWhite} alt="logo" className="guitar-logo-white"/>
                        <p>Guitar Quest</p>
                    </div>   
                    }
                    {isPlaying &&
                        <div className='mobile-stop-btn'>
                            <Button type="danger" label="stop"  onClick={() => handleClearMetronome()}>{isMobile ? "Stop" : "Stop Metronome"}</Button>
                        </div>
                    }
                    {isMobile &&
                        <div className="mobile-menu-btn">
                            <Button type="icon" label="menu" onClick={showDrawer}><MenuOutlined /></Button>
                        </div>
                    }
                </Header>
                {isMobile &&
                    <Drawer title="Menu" placement="right" width={"60%"} onClose={closeDrawer} visible={visible}>
                        <Menu>
                            <Item key="home" icon={<HomeOutlined />} >
                                <Link to="/" onClick={() => handleMenuHighlight(["home"])}>
                                    Home
                                </Link>
                            </Item>
                            <Item key="dashboard" icon={<DashboardOutlined />}>
                                <Link to="/mydashboard" onClick={() => handleMenuHighlight(["dashboard"])}>
                                    My Dashboard
                                </Link>
                            </Item>
                            <Item key="chords">
                                <Link to="/chords" onClick={() => handleMenuHighlight(["chords"])}>
                                    Chords
                                </Link>
                            </Item>
                            <Item key="chord-progressions">
                                <Link to="/chord-progressions" onClick={() => handleMenuHighlight(["chord-progressions"])}>
                                    Chord Progressions
                                </Link>
                            </Item>
                            <Item key="scales">
                                <Link to="/scales" onClick={() => handleMenuHighlight(["scales"])}>
                                    Scales
                                </Link>
                            </Item>
                            <Item key="metronome">
                                <Link to="/metronome" onClick={() => handleMenuHighlight(["metronome"])}>
                                    Metronome
                                </Link>
                            </Item>
                        </Menu>
                    </Drawer>
                }
                    <div style={{ height: "100%", position: "relative", overflowY: "auto"}}>
                        <Content style={{paddingBottom: "60px"}}>
                            <Routes>
                                <Route path="/" element={<Homepage setMenuArray={setMenuArray}/>} />
                                <Route path="/mydashboard" element={<MyDashboard />} />
                                <Route path="/chords" element={<ChordsPage />} />
                                <Route path="/chord-progressions" element={<ChordProgressions />} />
                                <Route path="/scales" element={<ScalesPage metronomeInterval={metronomeInterval} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>} />
                                <Route path="/metronome" element={<MetronomePage metronomeInterval={metronomeInterval} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />} />
                            </Routes>
                        </Content>
                        </div>
                    <Footer style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        right: 0
                    }}>
                        <Title level={5} style={{ textAlign: 'center' }}>
                            2022 Guitar Quest
                        </Title>
                    </Footer>
                </Layout>
            </div>
        </div>
    )
}

export default App;