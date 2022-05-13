import React from 'react';

import "./Homepage.css"; 
const Homepage = () => {
    return (
        <div className="homepage-container">
            <div className="welcome-header">
                <h1>Welcome to Guitar Quest</h1>
                <h2>the app that helps guide you on your guitar journey</h2>
            </div>
            {/*IF PROGRESS STARTED, RENDER PROGRESS HERE */}
            <div className="hompage-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dolor purus non enim praesent elementum facilisis leo vel fringilla.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dolor purus non enim praesent elementum facilisis leo vel fringilla.</p>
            </div>
        </div>
    );
}

export default Homepage;
