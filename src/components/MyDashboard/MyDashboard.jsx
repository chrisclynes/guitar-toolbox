import React, { useState } from 'react';
import { Col, Button, Affix } from 'antd';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

import ProgressBar from '../../container/ProgressBar/ProgressBar';
import Tasks from '../../container/Tasks/Tasks';

import "./MyDashboard.css";

const MyDashboard = () => {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogout = async () => {

        try {
            await logout();
                navigate("/");
        } catch {
            console.log("failed")
            setError('Log out failed');
        }
    }

    return (
        <div className="dashboard-container">
            <div className="user-wrapper">
                <div className="user-options">
                    <h3> Welcome {currentUser.email}!</h3>
                        <Button type="primary" onClick={handleLogout}>
                            Log out
                        </Button>
                </div>
            </div>
            <div className='my-progress-bar center-items'>
            <Col span={12}>
                <ProgressBar />
            </Col>
            </div>
            <div className="main-content-container" style={{margin: "1rem"}}>
                <div className="task-container">
                    <Tasks />
                </div>
            </div>
        </div>
    )
}

export default MyDashboard;