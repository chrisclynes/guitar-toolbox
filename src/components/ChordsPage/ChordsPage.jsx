import React, { useState, useEffect } from 'react';
import { Layout , Typography, Space, Select, Input, Button } from 'antd';

import ChordCard from '../../container/ChordCard/ChordCard';


import axios from 'axios';

import "./ChordsPage.css";

const { Header, Sider } = Layout;
const { Option } = Select;

const ChordsPage = ({theme}) => {
    const [chordData, setChordData] = useState({chordName: "A", strings: "X 0 2 2 2 0" });
    const [selectorVals, setSelectorVals] = useState({root: "A", quality: "", alterations: ""})
    

    const handleChordData = async () => {
        // const chordRoot = document.getElementById("chord-root-selector").value;
        // const chordQuality = document.getElementById("chord-quality-selector").value;
        // const chordAlternative = document.getElementById("chord-alterations").value;
        const URL = 'https://api.uberchord.com/v1/chords/';

        const chordToCall = `${URL}${selectorVals.root}${selectorVals.quality}${selectorVals.alterations}`;

       console.log(chordToCall)

            try {
                const response = await axios.get(chordToCall)
                const chordData = response.data[0]
                const chord = `${selectorVals.root}${selectorVals.quality}${selectorVals.alterations}`
                setChordData({
                    chordName: chord.replace(/(%23)/g, "#").replace(/(_)/g, ''),//replace URI code with # and remove underscore
                    strings: chordData.strings
                });
                console.log(response.data)
            }catch (error) {
                console.log(error)
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
                        <Select defaultValue="A" style={{width: "60px"}} name="chord-root-selector" onChange={(e) => {setSelectorVals(selectorVals.root = e.target.value)}}> 
                            <Option value="A_">A</Option>
                            <Option value="Ab_">Ab</Option>
                            <Option value="A%23_">A#</Option>
                            <Option value="B_">B</Option>
                            <Option value="Bb_">Bb</Option>
                            <Option value="C_">C</Option>
                            <Option value="C%23_">C#</Option>
                            <Option value="D_">D</Option>
                            <Option value="Db_">Db</Option>
                            <Option value="D%23_">D#</Option>
                            <Option value="E_">E</Option>
                            <Option value="Eb_">Eb</Option>
                            <Option value="F_">F</Option>
                            <Option value="F%23_">F#</Option>
                            <Option value="G_">G</Option>
                            <Option value="Gb_">Gb</Option>
                            <Option value="G%23_">G#</Option>
                        </Select>
                        <Select defauleValue="" style={{width: "70px"}} name="chord-quality-selector" onChange={(e) => {setSelectorVals(selectorVals.quality = e.target.value)}}>
                            <Option value=""></Option>
                            <Option value="maj">maj</Option>
                            <Option value="m">m</Option>
                            <Option value="dim">dim</Option>
                            <Option value="%235">#5</Option>
                        </Select>
                        <Input style={{ width: "100px" }} name="chord-alterations" placeholder="sus2, maj9..." onChange={(e) => {setSelectorVals(selectorVals.alterations = e.target.value)}}/>
                        <Button type="primary" size="medium" onClick={() => handleChordData()} >Get Chord</Button>
                    </Space>
                </div>
            </div>
        </Layout>
    )   
}

export default ChordsPage;

