import React from 'react';
import { Typography, Col, Button, Image, Carousel} from 'antd';
import { Link } from "react-router-dom";

import images from '../../constants/images';

import "./Homepage.css"; 

const { carousel_img1, carousel_img2, carousel_img3 } = images;


const { Title } = Typography;

const Homepage = ({ setMenuArray }) => {

    const contentStyle = {
        height: '100%',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: 'none',
      };
      const carouselStyle ={
        borderRadius:'20px',overflow:'hidden',
        height:'auto',
        background:'none',
    }

    return (
        <div className="homepage-container center-items">
            <div className="welcome-header">
                <Title>Welcome to Guitar Quest</Title>
                <h2>the app that helps guide you on your guitar journey</h2>
            </div>
            {/*IF PROGRESS STARTED, RENDER PROGRESS HERE */}
            <Col span={12}>
                <div className="hompage-content center items">
                        <Link to="/mydashboard">
                            <Button type="primary" size="medium" style={{margin: "1rem"}} onClick={(() => setMenuArray(["dashboard"]))} >Start</Button>
                        </Link>
                </div>
                
                <Carousel style={carouselStyle} autoplay>
                    <div style={contentStyle}>
                        <Image src={carousel_img1} />
                    </div>
                    <div style={contentStyle}>
                        <Image src={carousel_img2} />
                    </div>
                    <div style={contentStyle}>
                        <Image src={carousel_img3} />
                    </div>
                </Carousel>
                <div className="hompage-content center items" style={{marginTop: "2rem"}}>
                    <p>Or, jump right in to our guitar tools!</p>
                </div>

            </Col>
        </div>
    );
}

export default Homepage;
