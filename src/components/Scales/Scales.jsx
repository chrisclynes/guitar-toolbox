import React, { useState, useEffect } from 'react';
import { Typography, Space, Button, Select, Row, Col, List} from 'antd';

import { guitarScalesData } from '../../constants/data';

import "./Scales.css";

const Scales = () => {
    return (
        <div className="chord-main-container">
            <div className="chords-title">
                <Typography.Title>Guitar Scale Lookup</Typography.Title>
                <h2>Learn new scales and practice with a metronome</h2>
            </div>
        </div>
    )
}

export default Scales;