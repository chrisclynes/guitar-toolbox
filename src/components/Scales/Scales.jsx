import React, { useState, useEffect } from 'react';
import { Typography, Space, Button, Select, Row, Col, List} from 'antd';

import Metronome from '../../container/Metronome/Metronome';
import { guitarScalesData } from '../../constants/data';


const Scales = () => {
    return (
        <div className="chord-main-container">
            <div className="chords-title">
                <Typography.Title>Guitar Scale Lookup</Typography.Title>
                <h2>Learn new scales and practice with a metronome</h2>
            </div>
            <Metronome/>
        </div>
    )
}

export default Scales;