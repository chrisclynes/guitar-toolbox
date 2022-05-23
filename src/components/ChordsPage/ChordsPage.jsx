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
    
    const chordKeySelectors = ["A_", "Ab_", "A%23_", "B_", "Bb_", "C_", "C%23_", "D_", "Db_", "D%23_", "E_", "Eb_", "F_", "F%23_", "G_", "Gb_", "G%23_"];
    const chordQualitySelectors = ["", "major", "m", "dim"];

    const handleSelectorsInput = (value) => {
        setSelectorVals((prevState) => ({...prevState, root: value}))
    }

    const handleChordData = async () => {
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
                        <Select defaultValue="A" style={{width: "60px"}} name="chord-root-selector" onChange={(val) => handleSelectorsInput(val)}>
                            {chordKeySelectors.map((item, i) => {
                                   return <Option key={i} value={item}>{item.replace(/(%23)/g, "#").replace(/(_)/g, '')}</Option>
                               })}
                        </Select>
                        <Select defauleValue="" style={{width: "80px"}} name="chord-quality-selector" onChange={(e) => console.log(e)}>
                            {chordQualitySelectors.map((item, i) => {
                                   return <Option key={i} value={item}>{item}</Option>
                               })}
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

