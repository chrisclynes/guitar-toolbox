import React from 'react';
import { Typography, Col, Button} from 'antd';
import { Link } from "react-router-dom";

import "./Homepage.css"; 
const Homepage = () => {
    return (
        <div className="homepage-container center-items">
            <div className="welcome-header">
                <Typography.Title>Welcome to Guitar Quest</Typography.Title>
                <h2>the app that helps guide you on your guitar journey</h2>
            </div>
            {/*IF PROGRESS STARTED, RENDER PROGRESS HERE */}
            <Col span={12}>
                <div className="hompage-content center items">
                        <Link to="/mydashboard">
                            <Button type="primary" size="medium" style={{margin: "1rem"}} >Start</Button>
                        </Link>
                </div>
            </Col>
        </div>
    );
}

export default Homepage;
