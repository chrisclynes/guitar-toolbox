import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, Button, Select } from 'antd';

import Metronome from '../../container/Metronome/Metronome';
import './MetronomePage.css';

const MetronomePage = ({metronomeInterval, isPlaying, setIsPlaying}) => {
 
    return (
        <Layout>
            <div className="metronomePage-container">
                <div className="metronomePage-title">
                        <Typography.Title>Metronome</Typography.Title>
                        <h2>Work on mastering timing and groove</h2>
                    </div>
                <div className="metronome-main-container">
                    <Metronome metronomeInterval={metronomeInterval} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                </div>
            </div>
        </Layout>  
    )
}

export default MetronomePage;