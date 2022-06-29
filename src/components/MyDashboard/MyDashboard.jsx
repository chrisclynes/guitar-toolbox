import React, { useState, useEffect } from 'react';
import { Col, Button, Typography } from 'antd';
import { useNavigate } from "react-router-dom";
import { useAuth, currentUser } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

import ProgressBar from '../../container/ProgressBar/ProgressBar';
import Tasks from '../../container/Tasks/Tasks';

import "./MyDashboard.css";


const MyDashboard = ({ isMobile }) => {
    const [routineData, setRoutineData] = useState();
    const [username, setUsername] = useState();
    const { currentUser, logout, addPractice } = useAuth();
    const navigate = useNavigate();
    
    const handleAddPractice = () => {
        const d = {
            id: 4,
            task: "Minor pent",
            time: 15, 
            description: "work on minor scale",
            }
        addPractice(d)
      }
    const getFirestoreData = async () => { 
        const docRef = doc(db, "UserData", currentUser.uid);
        try {
            const docSnap = await getDoc(docRef);
            setRoutineData(docSnap.data().tasks);
            setUsername(docSnap.data().user.username);
          } catch (e) {
            console.log("Error getting cached document:", e);
          }
          
    }

    useEffect(() => {
        getFirestoreData()
    }, [])

    const handleLogout = async () => {

        try {
            await logout();
                navigate("/");
        } catch {
            console.log("logout failed")
        }
    }

    return (
        <div className="dashboard-container">
            <div className="user-wrapper">
                <div className="user-options">
                    <h3> Welcome {username}!</h3>
                    {!isMobile &&
                        <Button type="primary" onClick={handleLogout}>
                            Log out
                        </Button>
                    }
                </div>
            </div>
            <div className='my-progress-bar center-items'>
                <Col span={12}>
                    <ProgressBar />
                </Col>
            </div>
            <div className="main-content-container" style={{margin: "1rem"}}>
                <div className="task-container">
                <Typography.Title level={2} style={{padding: "1.5rem 0.5rem 0rem 0.5rem"}} >Practice Routines</Typography.Title>
                <Tasks routineData={routineData} isMobile={isMobile}  handleAddPractice={handleAddPractice}/>
                </div>
            </div>
        </div>
    )
}

export default MyDashboard;