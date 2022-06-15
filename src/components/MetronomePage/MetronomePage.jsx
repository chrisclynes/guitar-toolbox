import React, { useState, useEffect } from 'react';
import { Typography, Space, Button, Select } from 'antd';

import Metronome from '../../container/Metronome/Metronome';

const MetronomePage = () => {
 
    return (
        <div className="metronome-main-container">
            <Metronome />
        </div>
        
    )
}

export default MetronomePage;