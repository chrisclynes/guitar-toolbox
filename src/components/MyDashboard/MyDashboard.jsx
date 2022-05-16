import React from 'react';

import Tasks from '../../container/Tasks/Tasks'

const MyDashboard = () => {
    return (
        <div className="dashboard-container">
            

            <div className='my-progress-bar center-items'>
                {/*insert progress bar here */}
            </div>
            <div className="main-content-container">
                <Tasks />
                <div className="schedule-container">
                    {/*leftside  */}
                </div>
            </div>
        </div>
    )
}

export default MyDashboard;