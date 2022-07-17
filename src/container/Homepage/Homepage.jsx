import React from 'react';
import { Layout, Typography, Col, Button, Image, Carousel, Divider, Card } from 'antd';
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

import images from '../../constants/images';

import "./Homepage.css"; 

const { carousel_img1, carousel_img2, carousel_img3 } = images;


const { Title } = Typography;
const { Content } = Layout;


const Homepage = ({ setMenuArray, isMobile, userData, practiceData }) => {
    const { currentUser } = useAuth();
    const contentStyle = {
        height: 'auto',
        width: 'auto',
        color: '#fff',
        lineHeight: '160px',
        background: 'none', 
      };

      const carouselStyleMobile ={
        width: "500px",
        overflow:'hidden',
        height:'330px',
        background:'black',
      }

      const carouselStyle ={
        width: "800px",
        borderRadius:'15px',
        overflow:'hidden',
        height:'500px',
        background:'black',
      }
      

    const getRandomPractice = () => {
        if(practiceData && practiceData.length > 0){
            const len = practiceData.length
            const randomPractice = practiceData[Math.floor(Math.random()*len)]
            return `Try working on: ${randomPractice.task}`
        }
    }

//---------------------------COMPONENT RENDER---------------------------------
    return (
        <Layout>
            <div className="page-container center-items" style={{overflowX: "hidden"}}> 
                <div className="welcome-header header-margin">
                    <Title>Welcome to Guitar Toolbox</Title>
                </div>
                {/*IF PROGRESS STARTED, RENDER PROGRESS HERE */}
                <Content>
                    <Col span={16} offset={4}>
                        <div className="hompage-content">
                            <div className="center-items" style={{width: "100%"}}>
                                {!currentUser &&
                                    <Card style={{maxWidth: "500px"}}>
                                        <h3>
                                            To create practice segments/routines and track your progress, 
                                            sign up today!
                                        </h3>
                                        <Link to="/signup">
                                            <Button 
                                                type="primary" 
                                                style={{margin: "1rem"}} 
                                                size="large" >
                                                    Get Started
                                            </Button>
                                        </Link>
                                    </Card>
                                }
                                {currentUser &&
                                    <Card style={{maxWidth: "500px"}}>
                                        <h2>
                                            {`Welcome ${userData?.username}`}
                                        </h2>
                                        <Divider />
                                            <h3>
                                                {getRandomPractice()}
                                            </h3>
                                        <Link to="/mydashboard">
                                            <Button 
                                                type="primary" 
                                                style={{margin: "1rem"}} 
                                                size="large" 
                                                onClick={() => setMenuArray(['dashboard'])}>
                                                    My Dashboard
                                            </Button>
                                        </Link>
                                    </Card>
                                }
                                </div>
                                    <Divider />
                                    <div className="home-about-content" style={{margin: "2rem 0rem"}}>
                                        <p>
                                            Guitar Toolbox is perfect for creating practice routines, 
                                            learning chords and chord progressions, 
                                            new scales, and practicing rhythm. 
                                            With the provided tools, you can master the art of guitar.
                                        </p>
                                </div>
                                <div className="center-items">
                                    <Carousel 
                                        style={isMobile ? carouselStyleMobile : carouselStyle} 
                                        autoplay
                                        dots={false}
                                        >
                                        <div style={contentStyle}>
                                            <Image src={carousel_img1} alt="guitar_img1"/>
                                        </div>
                                        <div style={contentStyle}>
                                            <Image src={carousel_img2} alt="guitar_img2"/>
                                        </div>
                                        <div style={contentStyle}>
                                            <Image src={carousel_img3} alt="guitar_img3"/>
                                        </div>
                                    </Carousel>
                                </div>
                                <div className="hompage-content center items" style={{marginTop: "2rem"}}>
                                    <p>Or, jump right in and start practicing!</p>
                                    <Link to="/chords">
                                        <Button 
                                            type="default" 
                                            size="large" 
                                            style={{margin: "1rem"}} 
                                            onClick={(() => setMenuArray(["chords"]))} >
                                                Guitar Tools
                                        </Button>
                                    </Link>
                                </div>
                        </div>
                    </Col>
                </Content>
            </div>
        </Layout>
    );
}

export default Homepage;
