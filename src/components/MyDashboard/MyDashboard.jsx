import React from 'react';
import { Col } from 'antd';

import ProgressBar from '../../container/ProgressBar/ProgressBar';
import Tasks from '../../container/Tasks/Tasks';

const MyDashboard = ({theme}) => {
    return (
        <div className="dashboard-container">
            <Col span={12}>
                <ProgressBar theme={theme} />
            </Col>
            <div className='my-progress-bar center-items'>
                {/*insert progress bar here */}
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