import React from 'react';
import { Typography, Col} from 'antd';

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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dolor purus non enim praesent elementum facilisis leo vel fringilla.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dolor purus non enim praesent elementum facilisis leo vel fringilla.</p>
                </div>
            </Col>
        </div>
    );
}

export default Homepage;
