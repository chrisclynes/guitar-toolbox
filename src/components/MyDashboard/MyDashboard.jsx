import React, { useState } from 'react';
import { 
    Col, 
    Row, 
    Typography, 
    Modal, 
    Input, 
    Layout, 
    Select, 
    Divider 
    } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

import { nanoid } from 'nanoid';

import ProgressBar from '../../container/ProgressBar/ProgressBar';
import Tasks from '../../container/Tasks/Tasks';

import "./MyDashboard.css";


const MyDashboard = ({ isMobile, userData, practiceData, setFirestoreCall }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [addPracticeData, setAddPracticeData] = useState();
    const { addPractice, removePractice, updatePractice } = useAuth();
    
    const handleAddPractice = () => {
        setIsEditing(true)
      }

    const handleAdd = async (values) => {
        const dataToAdd = {
            key: nanoid(),
            task: values.practice,
            time: values.time, 
            }
         try {
             await addPractice(dataToAdd).then(() => setFirestoreCall(true))
         }catch {
             console.log('error updating data')
         } 
         
    }

    const handleDelete = (values) => {
        //prompt user to confirm to delete practice
        Modal.confirm({
            title:"Are you sure you want to delete this practice?",
            okText:"Yes",
            ofType: "danger",
            onOk: async () => {
                try {
                    await removePractice(values).then(() => setFirestoreCall(true))
                }catch {
                    console.log('error updating data')
                } 
                
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
                setFirestoreCall(true)
            }
        }) 
    } 

    

    //used for rendering select option in add practice Modal
    const timeOptions = [];
    for(let i=5; i<=60; i+=5){
        timeOptions.push(i);
    }

    const info = () => {
        Modal.info({
          title: 'Practice/Routines',
          content: (
            <div>
              <Divider />
              <div>
                    Use this tool to keep your guitar practice organized.
                </div>
                <br/>
                <div>
                    Allocate time to work on these task and help track your progress.
                </div>
                <br/>
              <div>
                You can use this tool to create routines, set practice segments, 
                or simply as notes to work on specific songs, solos...
              </div>
              <br/>
              <div>Once you complete a task, press the green checkmark to track your progress</div>
            </div>
          ),
          onOk() {},
        });
      };

 //---------------------------COMPONENT RENDER---------------------------------   
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
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                        <div style={{width: "75%"}}>
                            <Typography.Paragraph>Practice Description</Typography.Paragraph>
                            <Input 
                                placeholder='add practice description'
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
                        <div style={{width: "20%"}}>
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
                        info={info}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MyDashboard;