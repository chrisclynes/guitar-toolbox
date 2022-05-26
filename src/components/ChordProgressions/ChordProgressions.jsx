import React, { useState } from 'react';
import { Typography, Space, Button, Select} from 'antd';

import { majorKeys, minorKeys, majorProgressions, minorProgressions } from '../../constants/data';
import ChordCard from '../../container/ChordCard/ChordCard';

import axios from 'axios';
import "./ChordProgressions.css";

const { Option } = Select;



const ChordProgressions = () => {
    const [majorMinor, setMajorMinor] = useState("Major");
    const [progression, setprogression] = useState("Major");
    const [progressionData, setprogressionData] = useState({
        chordQuality: "Major",
        chordKey: "C Major",
        chordProgression: ["C", "F", "G"]
    })
    const [chordData, setChordData] = useState([{chordName: "C", strings: "X 0 2 2 2 0" }, {chordName: "F", strings: "1 3 3 2 1 X" }, {chordName: "G", strings: "3 2 0 0 0 3" }]);

    const handleChordData = async (chord) => {
        const URL = 'https://api.uberchord.com/v1/chords/';
        const chordToCall = `${URL}${chord}`;
    
            try {
                const response = await axios.get(chordToCall)
                const apiData = response.data[0]
                setChordData({
                    chordName: apiData.chordName.replace(/(%23)/g, "#").replace(/(,)/g, ''),//replace URI code with # and remove underscore
                    strings: apiData.strings
                });
                console.log(response.data)
            }catch (error) {
                console.log(error)
                if(error){
                }
            }
    }

    return (
        <div>
            <div className="progresssion-cards-containers">
                <div className="progression-title-container center-items" style={{textAlign: "center"}}>
                    <Typography.Title>Choose a progression or create your own</Typography.Title>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dolor purus non enim praesent elementum facilisis leo vel fringilla.</p>
                    <Space size="large">
                        <div className="progression-cards-container center-items">
                            {chordData.map((item, i) => {
                                return (
                                        <ChordCard chordName={item.chordName} strings={item.strings} />   
                                )
                            })}
                        </div>
                    </Space>
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