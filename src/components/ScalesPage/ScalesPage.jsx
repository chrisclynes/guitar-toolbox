import React, { useState } from 'react';
import { Layout, Typography, Space, Select, Divider } from 'antd';

import Metronome from '../../container/Metronome/Metronome';
import ScaleCard from '../../container/ScaleCard/ScaleCard';

import images from '../../constants/images';
import { guitarScalesData } from '../../constants/data';

import "./ScalesPage.css";

const { Option } = Select;
const { Title, Paragraph } = Typography;

const ScalesPage = ({ metronomeInterval, isPlaying, setIsPlaying, isMobile }) => {
    //store and update scale title info and images to render
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
        <Layout>
            <div className="page-container">
                <div className="scales-title header-margin">
                    <Title>Guitar Scales</Title>
                    <h2>
                        Learn new scales and practice with a metronome
                    </h2>
                    <Divider/>
                </div>
                {isMobile &&
                    <div className="scale-selector-container">
                    <Paragraph type="secondary"  >
                            choose a scale to start practicing
                    </Paragraph>
                        <Space>
                            <Select 
                                getPopupContainer={trigger => trigger.parentNode}
                                defaultValue="Major Scale" 
                                style={{width: "220px"}} 
                                name="scales-selctor" 
                                onChange={(val, key) => scaleSelectHandler(val, key.key)}>
                                    {guitarScalesData.map((item, i) => {
                                        return (
                                            <Option 
                                                key={i} 
                                                value={Object.keys(item)[0]}
                                            >
                                                {Object.keys(item)[0]}
                                            </Option>
                                        )
                                    })}
                            </Select>
                        </Space>
                    </div>
                }
                <div className="scales-container center-items">
                    <ScaleCard 
                        title={scaleData.scaleSixthTitle} 
                        image={scaleData.sixthRoot} 
                    />
                    <ScaleCard 
                        title={scaleData.scaleFifthTitle} 
                        image={scaleData.fifthRoot} 
                    />
                </div>
                {!isMobile &&
                    <div className="scale-selector-container">
                    <Paragraph type="secondary"  >
                            choose a scale to start practicing
                    </Paragraph>
                        <Space>
                            <Select 
                                getPopupContainer={trigger => trigger.parentNode}
                                defaultValue="Major Scale" 
                                style={{width: "220px"}} name="scales-selctor" 
                                onChange={(val, key) => scaleSelectHandler(val, key.key)}>
                                    {guitarScalesData.map((item, i) => {
                                        return (
                                            <Option 
                                                key={i} 
                                                value={Object.keys(item)[0]}
                                            >
                                                {Object.keys(item)[0]}
                                            </Option>
                                        )
                                    })}
                            </Select>
                        </Space>
                    </div>
                }
                <Metronome 
                    metronomeInterval={metronomeInterval}  
                    isPlaying={isPlaying} 
                    setIsPlaying={setIsPlaying} 
                />
            </div>
        </Layout>
    )
}


export default ScalesPage;