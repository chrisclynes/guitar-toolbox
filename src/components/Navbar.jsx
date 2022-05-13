import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';



import logo from '../images/guitarlogo.png';


const Navbar = () => {
    
    return (
        <div className="navbar-container">
           <div className="logo-container">
                <img className="guitar-logo" src={logo} />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Guitar Quest</Link>
                </Typography.Title>
            </div>
            <Menu theme="dark">
                <Menu.Item key={1} icon={<HomeOutlined />} >
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key={3}>
                    <Link to="/mydashboard">My Dashboard</Link>
                </Menu.Item>
                <Menu.Item key={2}>
                    <Link to="/chords">Chords</Link>
                </Menu.Item>
            </Menu>
        </div>   
       
    );        
}

export default Navbar;
