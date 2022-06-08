import React, { useState, useEffect } from 'react';
import { Typography, Space, Button, Select } from 'antd';

import Metronome from '../../container/Metronome/Metronome';
import ScaleCard from '../../container/ScaleCard/ScaleCard';
import { guitarScalesData } from '../../constants/data';

import images from '../../constants/images';


const { Option } = Select;

const Scales = () => {
    const [scaleData, setScaleData] = useState({
        scaleFifthTitle: "Major Root on Fifth String",
        scaleSixthTitle: "Major Root on Sixth String",
        fifthRoot: images.Major5th,
        sixthRoot: images.Major6th
    })
    return (
        <div className="chord-main-container">
            <div className="chords-title">
                <Typography.Title>Guitar Scale Lookup</Typography.Title>
                <h2>Learn new scales and practice with a metronome</h2>
            </div>
            <div className="scales-container center-items">
                <ScaleCard title={scaleData.scaleSixthTitle} image={scaleData.sixthRoot} />
                <ScaleCard title={scaleData.scaleFifthTitle} image={scaleData.fifthRoot} />
            </div>
            <div>
                <Space>
                    <Select defaultValue="" style={{width: "150px"}} name="scales-selctor" onChange={() => {}}>
                            {guitarScalesData.map((item, i) => {
                                return (
                                    <Option key={i} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</Option>
                                )
                            })}
                    </Select>
                    <Button type="primary" size="medium" onClick={() => {}} >Get Scale</Button>
                </Space>
            </div>
            <Metronome/>
        </div>
    )
}

export default Scales;