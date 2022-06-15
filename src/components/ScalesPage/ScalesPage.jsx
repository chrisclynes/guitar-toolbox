import React, { useState, useEffect } from 'react';
import { Typography, Space, Button, Select } from 'antd';

import Metronome from '../../container/Metronome/Metronome';
import ScaleCard from '../../container/ScaleCard/ScaleCard';

import images from '../../constants/images';
import { guitarScalesData } from '../../constants/data';


const { Option } = Select;

const ScalesPage = () => {
    const [scaleData, setScaleData] = useState({
        scaleFifthTitle: "Major Scale, 5th String Root",
        scaleSixthTitle: "Major Scale, 6th String Root",
        fifthRoot: images.Major5th,
        sixthRoot: images.Major6th
    });

     const scaleSelectHandler = (scale, index) => {
        setScaleData((prevState) => ({
            ...prevState,
            scaleFifthTitle: `${scale}, 5th String Root`,
            scaleSixthTitle: `${scale}, 6th String Root`,
            fifthRoot: guitarScalesData[index][scale].fifth,
            sixthRoot: guitarScalesData[index][scale].sixth
        }))
     }
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
            <div className="scale-selector-container">
                <Typography.Paragraph type="secondary"  >choose a scale to start practicing</Typography.Paragraph>
                <Space>
                    <Select defaultValue="Major Scale" style={{width: "220px"}} name="scales-selctor" onChange={(val, key) => scaleSelectHandler(val, key.key)}>
                            {guitarScalesData.map((item, i) => {
                                return (
                                    <Option key={i} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</Option>
                                )
                            })}
                    </Select>
                </Space>
            </div>
            <Metronome/>
        </div>
    )
}


export default ScalesPage;