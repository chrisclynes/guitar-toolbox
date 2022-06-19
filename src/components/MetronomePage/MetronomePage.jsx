import React from 'react';
import { Layout, Typography } from 'antd';

import Metronome from '../../container/Metronome/Metronome';

const { Title } = Typography;

const MetronomePage = ({ metronomeInterval, isPlaying, setIsPlaying}) => {
 
    return (
        <Layout>
            <div className="page-container">
                <div className="metronomePage-title">
                        <Title>Metronome</Title>
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