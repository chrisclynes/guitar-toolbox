import React from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';


const App = () => {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                {/* Routes can go here */}
                <Home />
            </div>
            <div className="footer">
                <Footer />
            </div>

        </div>
    )
}

export default App;