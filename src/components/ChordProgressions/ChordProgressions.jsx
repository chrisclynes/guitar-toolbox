import React, { useState } from 'react';
import { Typography, Space, Button, Select} from 'antd';

import { majorKeys, minorKeys, majorProgressions, minorProgressions } from '../../constants/data';
import "./ChordProgressions.css";

const { Option } = Select;

const ChordProgressions = () => {
    const [majorMinor, setMajorMinor] = useState("Major");
    const [progression, setprogression] = useState("Major");
    const [progressionData, setprogressionData] = useState({
        chordQuality: "Major",
        chordKey: "C Major",
        chordProgression: ["1", "IV", "V"]
    })


    return (
        <div>
            <div className="progresssion-cards-containers">
                <div className="progression-title-container center-items" style={{textAlign: "center"}}>
                    <Typography.Title>Choose a progression or create your own</Typography.Title>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dolor purus non enim praesent elementum facilisis leo vel fringilla.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dolor purus non enim praesent elementum facilisis leo vel fringilla.</p>
                </div>
            </div>
            <div className="progression-selectors-container center-items">
                <Space size="small">
                    <Select defaultValue="Major" style={{width: "80px"}} name="major-minor-selctor" onChange={(e) => setMajorMinor(e.target.value)}>
                        <Option value="Major">Major</Option>
                        <Option value="Minor">Minor</Option>
                    </Select>
                    {majorMinor === "Major" && (
                        <div>
                            <Select defaultValue="" style={{width: "100px"}} name="major-keys-selctor" >
                                {majorKeys.map((item) => {
                                    return (
                                        <Option key={Object.keys(item)} value={Object.keys(item)}>{Object.keys(item)}</Option>
                                    )
                                })}
                            </Select>
                            <Select defaultValue="" style={{width: "150px"}} name="major-progression-selctor" >
                                {majorProgressions.map((item, i) => {
                                        return (
                                            <Option key={i} value={Object.keys(item)}>{Object.keys(item)}</Option>
                                        )
                                    })}
                            </Select>
                        </div>)}
                    {majorMinor === "Minor" && (
                        <div className="minor-selection-container">
                            <Select defaultValue="" style={{width: "100px"}} name="minor-keys-selctor" >
                                {minorKeys.map((item) => {
                                    return (
                                        <Option key={Object.keys(item)} value={Object.keys(item)}>{Object.keys(item)}</Option>
                                    )
                                })}
                            </Select>
                            <Select defaultValue="" style={{width: "150px"}} name="minor-progression-selctor" >
                                {minorProgressions.map((item, i) => {
                                        return (
                                            <Option key={i} value={Object.keys(item)}>{Object.keys(item)}</Option>
                                        )
                                    })}
                        </Select>
                    </div>)}
                </Space>
            </div>
        </div>
    )
}

export default ChordProgressions;