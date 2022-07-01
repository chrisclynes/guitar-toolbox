import React, { useState, useEffect } from 'react';
import { Col, Row, Typography, Modal, Input, Layout, Select } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

import ProgressBar from '../../container/ProgressBar/ProgressBar';
import Tasks from '../../container/Tasks/Tasks';

import "./MyDashboard.css";


const MyDashboard = ({ isMobile, userData, setUserData }) => {
    const [practiceData, setPracticeData] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [addPracticeData, setAddPracticeData] = useState();
    const { currentUser, addPractice, removePractice, updatePractice } = useAuth();
    
    const handleAddPractice = () => {
        setIsEditing(true)
      }

    const handleAdd = async (values) => {
        const dataToAdd = {
            id: 5,
            task: values.practice,
            time: values.time, 
            }
         try {
             await addPractice(dataToAdd)
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
            setPracticeData(docSnap.data().tasks);
            setUserData(docSnap.data().user);
          } catch (e) {
            console.log("Error getting cached document:", e);
          }
          
    }

    useEffect(() => {
        getFirestoreData()
    }, [])

    //used for rendering select option in add practice Modal
    const timeOptions = [];
    for(let i=5; i<=60; i+=5){
        timeOptions.push(i);
    }
    
    return (
        <Layout>
            <div className="dashboard-container" style={{overflowX: "hidden"}} >
                <div className="user-wrapper center-items" style={{flexDirection: "column"}}>
                    <div className="user-options">
                        <h3> Welcome {userData?.username}!</h3>
                    </div>
                    <Typography.Title 
                        level={2} 
                        style={{padding: "1.5rem 0rem 0rem 0rem"}} >
                        My Stats
                    </Typography.Title>
                    <div 
                        className='my-progress-bar center-items' 
                        style={isMobile ? {padding: "1rem 0"} : {padding: "0 2rem"}}>
                        <Row>
                        <Col span={12} >
                            <ProgressBar title="Tasks Completed" 
                                item={userData?.tasksCompleted} 
                                isMobile={isMobile}/>
                        </Col>
                        <Col span={12} >
                            <ProgressBar title="Time Practiced" item={
                                userData?.totalTaskTimeMins < 60 ?
                                `${userData?.totalTaskTimeMins} mins` : 
                                `${Math.round((userData?.totalTaskTimeMins / 60)*10)/10} hrs`
                                } 
                                isMobile={isMobile}
                            />
                        </Col>
                        </Row>
                    </div> 
                </div>
                <Modal
                    title="Add Practice"
                    visible={isEditing}
                    okText="Add"
                    onCancel={() => {
                        setIsEditing(false);
                    }}
                    onOk={() => {
                        if(addPracticeData.practice.length === 0){
                            return
                        }
                        handleAdd(addPracticeData);
                        setIsEditing(false);
                    }}
                >
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{width: "80%"}}>
                            <Typography.Paragraph>Practice Description</Typography.Paragraph>
                            <Input 
                                placeholder='add practice description'
                                required='true'
                                maxLength={100}
                                onChange={(e) => {  
                                setAddPracticeData((prev) => {
                                    return (
                                        {...prev,
                                            practice: e.target.value
                                        }
                                    )
                                })
                            }}/>
                        </div>
                        <div style={{width: "15%"}}>
                            <Typography.Paragraph>Minutes</Typography.Paragraph>
                            <Select 
                                title="Time" 
                                onChange={(val) => {
                                setAddPracticeData((prev) => {
                                    return (
                                        {...prev,
                                            time: val
                                        }
                                    )
                                })
                            }}>
                                {timeOptions.map((item, i) => {
                                    return (
                                        <Select.Option key={i} value={item}>{item}</Select.Option> 
                                        )
                                    })   
                                }
                            </Select>
                        </div>
                    </div>
                </Modal>
                <div className="main-content-container center-items" style={{margin: "1rem"}}>
                    <div className="task-container" style={isMobile ? {width: "100%"} : {width: "90%"}}>
                    <Typography.Title 
                        level={2} 
                        style={{padding: "1.5rem 0.5rem 0rem 0.5rem"}}>
                            Practice/Routines
                        </Typography.Title>
                    <Tasks 
                        practiceData={practiceData} 
                        isMobile={isMobile}  
                        handleAddPractice={handleAddPractice} 
                        handleDelete={handleDelete} 
                        handleComplete={handleComplete}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MyDashboard;