import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { 
    Homepage, 
    ChordsPage,
    TabToolPage,
    MyDashboard, 
    ChordProgressionsPage, 
    ScalesPage, 
    MetronomePage, 
    Signup, 
    Login, 
    ForgotPassword, 
    UpdateProfile 
    } from './container';
import ScrollToTop from './services/ScrollToTop.js';
import { useAuth } from './contexts/AuthContext';
import PrivateRoute from './container/PrivateRoute';

import { 
    Layout, 
    Typography, 
    Menu, 
    Button, 
    Drawer, 
    Divider, 
    Avatar 
    } from 'antd';

import { 
    HomeOutlined, 
    DashboardOutlined, 
    MenuOutlined, 
    UserOutlined 
    } from '@ant-design/icons';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

import logo from './images/guitarlogo.png';

import './App.css';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
    const [userData, setUserData] = useState();
    const [firestoreCall, setFirestoreCall] = useState(true);
    const [practiceData, setPracticeData] = useState();
    const [isMobile, setIsMobile] = useState(null);
    //mobile menu drawer
    const [visible, setVisible] = useState(false);
    //set highlighted menu option
    const [menuArray, setMenuArray] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    //useRef setsInterval for metronome to be controlled outside of the metronome component pages
    const metronomeInterval = useRef();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    //----------------------Mobile check-------------------
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
      }
        //isMobile set
    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    //-------------------------firestore----------------
    
    //request data if current user logged in and firestoreCall state is true
    useEffect(() => {
        async function getFirestoreData() { 
            if(currentUser && firestoreCall){
                const docRef = doc(db, "UserData", currentUser.uid);
                try {
                    const docSnap = await getDoc(docRef);
                    setPracticeData(docSnap.data().tasks);
                    setUserData(docSnap.data().user);
                  } catch (e) {
                    console.log("Error getting cached document:", e);
                  }
            } 
        }
        getFirestoreData()
        return setFirestoreCall(false)
        
    }, [currentUser, firestoreCall])
    //-----------------------------------------
  
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

    const handleLogout = async () => {
        try {
            await logout();
                handleMenuHighlight(["home"]);
                setUserData(null);
                setPracticeData(null);
                navigate("/");
        } catch {
            console.log("failed to logout")
        }
    }

    const { Item } = Menu;
    const { Title } = Typography;
    const navLinks = [ 
        {name: "Chords", link: "chords" }, 
        {name: "Tab Tool", link: "tabtool" }, 
        {name: "Chord Progressions", link: "chord-progressions" }, 
        {name: "Scales", link: "scales" }, 
        {name: "Metronome", link: "metronome" }, 
        ];

    return (
        <div className="app">
            <ScrollToTop />
            {!isMobile &&
            //-----------------DESKTOP MENU-------------------
                <Sider theme='light' >
                    <Menu 
                        theme='light'
                        selectedKeys={menuArray}
                        defaultSelectedKeys={["home"]}
                        mode="inline"
                        //set highlighted sider menu item, array will always only contain a single value
                        onClick={((item) => setMenuArray([item.key]))}
                        >
                            <Link 
                                to="/" 
                                onClick={() => handleMenuHighlight(["home"])}>
                                 <div className="guitar-logo">
                                    <img src={logo} alt="logo" />
                                </div>
                            </Link>
                        <div className="sider-menu-title">
                            Guitar Toolbox
                        </div>
                        <Divider />
                        <Item key="home" icon={<HomeOutlined />} >
                            <Link 
                                to="/" 
                                onClick={() => handleMenuHighlight(["home"])}>
                                Home
                            </Link>
                        </Item>
                        {currentUser &&
                            <Item key="dashboard" icon={<DashboardOutlined />}>
                                <Link 
                                    to="/mydashboard" 
                                    onClick={() => handleMenuHighlight(["dashboard"])}>
                                    My Dashboard
                                </Link>
                            </Item>
                        }
                        <Divider />
                        {navLinks.map((item) => {
                            return (
                                <Item key={item.link}>
                                    <Link 
                                        to={`/${item.link}`}
                                        onClick={() => handleMenuHighlight([item.link])}>
                                        {item.name}
                                    </Link>
                                </Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>
            }
            <div className="main">
                <Layout style={{ height: "100vh", position: "relative", overflow: "hidden"}}  >
                    <Header>
                        <div className="header-btn-container">
                            {isPlaying && !isMobile &&
                                    <div className='metro-stop-btn'>
                                        <Button 
                                            type="danger" 
                                            label="stop" 
                                            onClick={() => handleClearMetronome()}>
                                                Stop
                                        </Button>
                                    </div>
                                }
                            {!currentUser && !isMobile &&
                                <div className='user-avatar'>
                                    <Link to="/login">
                                        <Button type="default" >Log In</Button>
                                    </Link>
                                </div>
                            }
                            {currentUser && !isMobile && 
                                <div className='user-avatar'>
                                    <Link to="/update-profile" onClick={() => handleMenuHighlight([""])}>
                                        <Avatar icon={<UserOutlined />} />
                                    </Link>
                                </div>
                            }
                        </div>
                        {isMobile &&
                        <div className="header-container">
                            <div className="mobile-title-container">
                                <div className='mobile-title'>Guitar Toolbox</div>
                            </div> 
                            {isPlaying &&
                                <div className='mobile-metro-stop-btn'>
                                        <Button 
                                            type="danger" 
                                            label="stop" 
                                            onClick={() => handleClearMetronome()}>
                                                Stop
                                        </Button>
                                </div>
                            }
                            <div className="mobile-menu-btn">
                                <Button 
                                    type="icon" 
                                    label="menu" 
                                    onClick={showDrawer}>
                                        <MenuOutlined />
                                </Button>
                            </div>
                        </div>
                        }
                    </Header>
                {isMobile &&
                //-----------------MOBILE MENU-------------------
                    <Drawer 
                        title="Menu" 
                        placement="right" 
                        width={"60%"} 
                        onClose={closeDrawer} 
                        visible={visible}>
                            <Menu>
                                <Item key="home" icon={<HomeOutlined />} >
                                    <Link 
                                        to="/" 
                                        onClick={() => handleMenuHighlight(["home"])}>
                                        Home
                                    </Link>
                                </Item>
                                {!currentUser &&
                                        <Item key="login" >
                                            <Link 
                                                to="/login" 
                                                onClick={() => handleMenuHighlight([""])}>
                                                Log In
                                            </Link>
                                        </Item>
                                }
                                {currentUser &&
                                    <>
                                        <Item key="dashboard" icon={<DashboardOutlined />}>
                                            <Link 
                                                to="/mydashboard" 
                                                onClick={() => handleMenuHighlight(["dashboard"])}>
                                                My Dashboard
                                            </Link>
                                        </Item>
                                        <Item key="logout" onClick={() => handleLogout()}>
                                            Log Out
                                        </Item>
                                        <Item key="profile" >
                                            <Link 
                                                to="/update-profile" 
                                                onClick={() => handleMenuHighlight([""])}>
                                                My Profile
                                            </Link>
                                        </Item>
                                    </>
                                }
                                <Divider />
                                {navLinks.map((item) => {
                                    return (
                                        <Item key={item.link}>
                                            <Link 
                                                to={`/${item.link}`}
                                                onClick={() => handleMenuHighlight([item.link])}>
                                                {item.name}
                                            </Link>
                                        </Item>
                                    )
                                  })
                                }
                            </Menu>
                    </Drawer>
                    //------------------------------------------
                }
                    <div 
                        className="main-view" 
                        style={{ height: "100%", position: "relative", overflowY: "auto"}}>
                        <Content style={{paddingBottom: "60px"}}>
                            <Routes>
                                <Route 
                                    path="/" 
                                    element={<Homepage 
                                        setMenuArray={setMenuArray} 
                                        isMobile={isMobile} 
                                        userData={userData}
                                        practiceData={practiceData}
                                    />} 
                                />
                                <Route 
                                    path="/mydashboard" 
                                    element={
                                            <PrivateRoute>
                                                <MyDashboard 
                                                    isMobile={isMobile} 
                                                    userData={userData} 
                                                    practiceData={practiceData} 
                                                    setFirestoreCall={setFirestoreCall}
                                                />
                                            </PrivateRoute>
                                        } 
                                />
                                <Route 
                                    path="/update-profile" 
                                    element={
                                            <PrivateRoute>
                                                <UpdateProfile 
                                                    isMobile={isMobile} 
                                                    handleLogout={handleLogout} 
                                                />
                                            </PrivateRoute>
                                        } 
                                />
                                <Route path="/signup" element={
                                        <Signup 
                                            setMenuArray={setMenuArray} 
                                            setFirestoreCall={setFirestoreCall}
                                        />
                                    } 
                                />
                                <Route path="/login" element={
                                        <Login 
                                            setMenuArray={setMenuArray} 
                                            setFirestoreCall={setFirestoreCall}
                                        />
                                     } 
                                />
                                <Route path="/forgot-password" element={
                                        <ForgotPassword setMenuArray={setMenuArray}/>
                                    } 
                                />
                                <Route path="/chords" element={
                                        <ChordsPage isMobile={isMobile}/>
                                    } 
                                />
                                <Route path="/tabtool" element={
                                        <TabToolPage isMobile={isMobile}/>
                                    } 
                                />
                                <Route path="/chord-progressions" element={
                                        <ChordProgressionsPage isMobile={isMobile}/>
                                    } 
                                />
                                <Route path="/scales" element={
                                        <ScalesPage metronomeInterval={metronomeInterval} 
                                        isPlaying={isPlaying} setIsPlaying={setIsPlaying} 
                                        isMobile={isMobile}/>
                                    } 
                                />
                                <Route path="/metronome" element={
                                        <MetronomePage 
                                            metronomeInterval={metronomeInterval} 
                                            isPlaying={isPlaying} 
                                            setIsPlaying={setIsPlaying} 
                                        />
                                    } 
                                />
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
                            2022 Guitar Toolbox
                        </Title>
                    </Footer>
                </Layout>
            </div>
        </div>
    )
}

export default App;