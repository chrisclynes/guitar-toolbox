import React, { useState } from 'react';
import { Typography, Space, Button, Select} from 'antd';

import { majorKeys, minorKeys, majorProgressions, minorProgressions } from '../../constants/data';
import ChordCard from '../../container/ChordCard/ChordCard';

import axios from 'axios';
import "./ChordProgressions.css";

const { Option } = Select;



const ChordProgressions = () => {
    const [progression, setProgression] = useState("Major");
    const [progressionData, setProgressionData] = useState({
        chordQuality: "Major",
        chordKey: "C Major",
        chordProgression: ["C", "F", "G"]
    })
    const [chordData, setChordData] = useState([{title: "I", chordName: "C", strings: "X 0 2 2 2 0" }, {title: "IV", chordName: "F", strings: "1 3 3 2 1 X" }, {title: "V", chordName: "G", strings: "3 2 0 0 0 3" }]);

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

    const handleTest = () => {
        console.log(majorKeys)
    }

    const handleProgressionInput = (val) => {
        const valToArr = val.split("-")
        console.log(valToArr)

        setProgressionData(prevState => ({
            ...prevState,
            chordProgression: valToArr
        }))
    }

    return (
        <div>
            <div className="progresssion-cards-containers">
                <div className="progression-title-container center-items" style={{textAlign: "center"}}>
                    <Typography.Title>Choose a progression or create your own</Typography.Title>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dolor purus non enim praesent elementum facilisis leo vel fringilla.</p>
                        <div className="progression-cards-container center-items">
                            <Space size="small">
                                {chordData.map((item, i) => {
                                    return (
                                            <ChordCard key={i} title={item.title} chordName={item.chordName} strings={item.strings} />   
                                    )
                                })}
                            </Space>
                        </div>
                </div>
            </div>
            <div className="progression-selectors-container center-items" style={{margin: "1rem"}}>
            <Space size="small">
                    <Select defaultValue="Major" style={{width: "80px"}} name="major-minor-selctor" onChange={(val) => setProgressionData((prevState) => ({...prevState, chordQuality: val}))}>
                        <Option value="Major">Major</Option>
                        <Option value="Minor">Minor</Option>
                    </Select>
                    {progressionData.chordQuality === "Major" && (
                        <div className="major-selection-container">
                            <Space size="small">
                                <Select defaultValue="C Major" style={{width: "100px"}} name="major-keys-selctor" onChange={(val) => setProgressionData((prevState) => ({...prevState, chordProgression: val}))}>
                                    {majorKeys.map((item) => {
                                        return (
                                            <Option key={Object.keys(item)[0]} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</Option>
                                        )
                                    })}
                                </Select>
                                <Select defaultValue="" style={{width: "150px"}} name="major-progression-selctor" >
                                    {majorProgressions.map((item, i) => {
                                            return (
                                                <Option key={i} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</Option>
                                            )
                                        })}
                                </Select>
                            </Space>
                        </div>)}
                    {progressionData.chordQuality === "Minor" && (
                        <div className="minor-selection-container">
                            <Space size="small">
                                <Select defaultValue="" style={{width: "100px"}} name="minor-keys-selctor" onChange={(val) => setProgressionData((prevState) => ({...prevState, chordKey: val}))}>
                                    {minorKeys.map((item) => {
                                        return (
                                            <Option key={Object.keys(item)[0]} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</Option>
                                        )
                                    })}
                                </Select>
                                <Select defaultValue="" style={{width: "150px"}} name="minor-progression-selctor" onChange={(val) => setProgressionData((prevState) => ({...prevState, chordProgression: val}))}>
                                    {minorProgressions.map((item, i) => {
                                            return (
                                                <Option key={i} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</Option>
                                            )
                                        })}
                                </Select>
                            </Space>
                    </div>)}
                </Space>
            </div>
        </div>
    )
}

export default ChordProgressions;