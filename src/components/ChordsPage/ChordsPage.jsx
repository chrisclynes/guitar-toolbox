import React, { useState, useEffect } from 'react';
import { Layout , Typography, Space, Select, Input, Button } from 'antd';

import ChordCard from '../../container/ChordCard/ChordCard';


import axios from 'axios';

import "./ChordsPage.css";

const { Header, Sider } = Layout;

const ChordsPage = ({theme}) => {
    const [chordData, setChordData] = useState({chordName: "A", strings: "X 0 2 2 2 0" });
    
    

    const handleChordData = async () => {
        const chordRoot = document.getElementById("chord-root-selector").value;
        const chordQuality = document.getElementById("chord-quality-selector").value;
        const chordAlternative = document.getElementById("chord-alterations").value;
        const URL = 'https://api.uberchord.com/v1/chords/';

        const chordToCall = `${URL}${chordRoot}${chordQuality}${chordAlternative}`;

       console.log(chordToCall)

            try {
                const response = await axios.get(chordToCall)
                const chordData = response.data[0]
                const chord = `${chordRoot}${chordQuality}${chordAlternative}`
                setChordData({
                    chordName: chord.replace(/(%23)/g, "#").replace(/(_)/g, ''),//replace URI code with # remove underscore
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
                        <Select defaultValue="A" id="chord-root-selector" >
                            <option value="A_">A</option>
                            <option value="Ab_">Ab</option>
                            <option value="A%23_">A#</option>
                            <option value="B_">B</option>
                            <option value="Bb_">Bb</option>
                            <option value="C_">C</option>
                            <option value="C%23_">C#</option>
                            <option value="D_">D</option>
                            <option value="Db_">Db</option>
                            <option value="D%23_">D#</option>
                            <option value="E_">E</option>
                            <option value="Eb_">Eb</option>
                            <option value="F_">F</option>
                            <option value="F%23_">F#</option>
                            <option value="G_">G</option>
                            <option value="Gb_">Gb</option>
                            <option value="G%23_">G#</option>
                        </Select>
                        <Select defauleValue="" id="chord-quality-selector" >
                            <option value=""></option>
                            <option value="maj">maj</option>
                            <option value="m">m</option>
                            <option value="dim">dim</option>
                            <option value="%235">#5</option>
                        </Select>
                        <Input style={{ width: "100px" }} id="chord-alterations" placeholder="sus2, maj9..." />
                        <Button type="primary" size="medium" onClick={() => handleChordData()} >Get Chord</Button>
                    </Space>
                </div>
            </div>
        </Layout>
    )   
}

export default ChordsPage;

