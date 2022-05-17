import React from 'react';

import ProgressBar from '../../container/ProgressBar/ProgressBar';
import Tasks from '../../container/Tasks/Tasks';

const MyDashboard = ({theme}) => {
    return (
        <div className="dashboard-container">
            <ProgressBar theme={theme} />
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