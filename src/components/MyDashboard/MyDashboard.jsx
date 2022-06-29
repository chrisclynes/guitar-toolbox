import React, { useState, useEffect } from 'react';
import { Col, Button, Typography, Modal, Card, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

import ProgressBar from '../../container/ProgressBar/ProgressBar';
import Tasks from '../../container/Tasks/Tasks';

import "./MyDashboard.css";


const MyDashboard = ({ isMobile }) => {
    const [routineData, setRoutineData] = useState();
    const [userData, setUserData] = useState();
    const { currentUser, logout, addPractice, removePractice, updatePractice } = useAuth();
    const navigate = useNavigate();
    
    const handleAddPractice = async () => {
        const d = {
            id: 6,
            task: "Minor pentytu",
            time: 15, 
            description: "work on minor scale",
            }
         try {
             await addPractice(d)
         }catch {
             console.log('error updating data')
         } 
        getFirestoreData()  
      }

    const handleDelete = (values) => {
        //prompt user to confirm to delete practice
        Modal.confirm({
            title:"Are you sure you want to delete this practice?",
            okText:"Yes",
            ofType: "danger",
            onOk: async () => {
                try {
                    await removePractice(values)
                }catch {
                    console.log('error updating data')
                } 
                getFirestoreData()
            }
        }) 
    } 

    const handleComplete = (values) => {
        //prompt user to confirm to complete practice
        Modal.confirm({
            title:"Nice job! Press ok to move on to the next practice segment",
            onOk: async () => {
                try {
                    await updatePractice(
                        {
                            tasksCompleted: userData.tasksCompleted + 1,
                            totalTaskTimeMins: userData.totalTaskTimeMins + values.time
                        }
                    ).then(removePractice(values))
                }catch {
                    console.log('error updating data')
                } 
                getFirestoreData()
            }
        }) 
    } 

    const getFirestoreData = async () => { 
        const docRef = doc(db, "UserData", currentUser.uid);
        try {
            const docSnap = await getDoc(docRef);
            setRoutineData(docSnap.data().tasks);
            setUserData(docSnap.data().user);
          } catch (e) {
            console.log("Error getting cached document:", e);
          }
          
    }

    useEffect(() => {
        getFirestoreData()
    }, [], [routineData])

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
            <div className="user-wrapper" style={{flexDirection: "column"}}>
                <div className="user-options">
                    <h3> Welcome {userData?.username}!</h3>
                </div>
                
                <div className='my-progress-bar center-items' >
                    <Space>
                        <Card >
                            <Col span={12}>
                                <ProgressBar title="Tasks Completed" item={userData?.tasksCompleted}/>
                            </Col>
                        </Card>
                        <Card >
                            <Col span={12}>
                                <ProgressBar title="Total Practice Time" item={`${userData?.totalTaskTimeMins} mins`}/>
                            </Col>
                        </Card> 
                    </Space> 
                </div> 
               
            </div>
            <div className="main-content-container" style={{margin: "1rem"}}>
                <div className="task-container">
                <Typography.Title level={2} style={{padding: "1.5rem 0.5rem 0rem 0.5rem"}} >Practice/Routines</Typography.Title>
                <Tasks 
                    routineData={routineData} 
                    isMobile={isMobile}  
                    handleAddPractice={handleAddPractice} 
                    handleDelete={handleDelete} 
                    handleComplete={handleComplete}
                    />
                </div>
            </div>
        </div>
    )
}

export default MyDashboard;