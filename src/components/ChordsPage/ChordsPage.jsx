import React, { useState, useEffect } from 'react';
import { Layout , Typography, Space, Select, Input, Button } from 'antd';

import ChordCard from '../../container/ChordCard/ChordCard';
import VoicingOption from '../../container/VoicingOption/VoicingOption';


import axios from 'axios';

import "./ChordsPage.css";

const { Header, Sider } = Layout;
const { Option } = Select;

const ChordsPage = ({theme}) => {
    const [chordData, setChordData] = useState({chordName: "A", strings: "X 0 2 2 2 0" });
    const [voicingData, setVoicingData] = useState({strings: ["X", "0", "2", "2", "1", "0"] });
    const [selectorVals, setSelectorVals] = useState({root: "A_", quality: "", alterations: ""});
    
    const [chordError, setChordError] = useState("");
    const [voicingError, setVoicingError] = useState("");

    const chordKeySelectors = ["A_", "Ab_", "A%23_", "B_", "Bb_", "C_", "C%23_", "D_", "Db_", "D%23_", "E_", "Eb_", "F_", "F%23_", "G_", "Gb_", "G%23_"];
    const stringSelector = ["E", "A", "D", "G", "B", "E"];

    const handleChordData = async () => {
        const URL = 'https://api.uberchord.com/v1/chords/';
        const chordToCall = `${URL}${selectorVals.root}${selectorVals.quality}${selectorVals.alterations}`;

       console.log(selectorVals.root)

            try {
                const response = await axios.get(chordToCall)
                const apiData = response.data[0]
                if(chordError !== "") setChordError("");
                setChordData({
                    chordName: apiData.chordName.replace(/(%23)/g, "#").replace(/(,)/g, ''),//replace URI code with # and remove underscore
                    strings: apiData.strings
                });
                console.log(response.data)
            }catch (error) {
                console.log(error)
                if(error){
                    setChordError("Chord not found or incorrect input!")
                }
            }
    }

    const handleVoicingData = async () => {
        const URL = 'https://api.uberchord.com/v1/chords?voicing=';
        const chordToCall = `${URL}${voicingData.strings.join("-")}`;

            try {
                const response = await axios.get(chordToCall)
                const apiData = response.data[0]
                if(voicingError !== "") setVoicingError("");
                setChordData({
                    chordName: apiData.chordName.replace(/(%23)/g, "#").replace(/(,)/g, ''),//replace URI code with # and remove underscore
                    strings: apiData.strings
                });
                console.log(response.data)
            }catch (error) {
                console.log(error)
                if(error){
                    setVoicingError("Chord not found!")
                }
            }
    }

    return (
        <Layout theme={theme}>
            
            <div className="chord-main-container">
                <div className="chords-title">
                    <Typography.Title>Welcome to Chord Search</Typography.Title>
                    <h2>Your tool to mastering new chords!</h2>
                </div>
                <ChordCard chordData={chordData} />
                <div className="chord-options-container">
                    <Space size="small">
                        <div>
                            <Typography.Paragraph>Root</Typography.Paragraph>
                            <Select style={{width: "80px"}} defaultValue="A" name="chord-root-selector" onChange={(val) => setSelectorVals((prevState) => ({...prevState, root: val}))}>
                                {chordKeySelectors.map((item, i) => {
                                    return <Option key={i} value={item}>{item.replace(/(%23)/g, "#").replace(/(_)/g, '')}</Option>
                                    })}
                            </Select>
                        </div>
                        <div>
                            <Typography.Paragraph>Quality</Typography.Paragraph>
                            <Select defaultValue="" style={{width: "80px"}} name="chord-quality-selector" onChange={(val) => setSelectorVals((prevState) => ({...prevState, quality: val}))}>
                                <Option value="">Major</Option>
                                <Option value="m">Minor</Option>
                                <Option value="dim">dim</Option>
                            </Select>
                        </div>
                        <div>
                            <Typography.Paragraph>Alterations</Typography.Paragraph>
                                <Input style={{ width: "100px" }} name="chord-alterations" defaultValue="" placeholder="sus2, maj9..." onChange={(val) => setSelectorVals((prevState) => ({...prevState, alterations: val.target.value}))}/>
                        </div>
                        <div>
                            <Typography.Paragraph>"</Typography.Paragraph>
                                <Button type="primary" size="medium" onClick={() => handleChordData()} >Get Chord</Button>
                        </div>
                    </Space>
                </div>
                <Typography.Paragraph type="danger" >{chordError}</Typography.Paragraph>
                <Typography.Paragraph type="secondary" style={{margin: "1rem"}} >Or, get the name of a chord</Typography.Paragraph>
                    <Space>
                    <div className="chord-options-two-container">
                            {stringSelector.map((string, i) => {
                                return <VoicingOption voicingData={voicingData} setVoicingData={setVoicingData} key={i} string={string}/>
                            })}
                    </div>
                </Space>
                <div>
                        <Button type="primary" size="medium" style={{margin: "1rem"}} onClick={() => handleVoicingData()} >Get Chord</Button>
                        <Typography.Paragraph type="danger" >{voicingError}</Typography.Paragraph>
                </div>
            </div>
        </Layout>
    )   
}

export default ChordsPage;

