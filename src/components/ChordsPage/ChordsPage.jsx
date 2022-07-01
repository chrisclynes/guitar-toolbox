import React, { useState } from 'react';
import { 
    Layout, 
    Typography, 
    Space, 
    Select, 
    Input,
    Image, 
    Button, 
    Divider,
    Modal 
    } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import ChordCard from '../../container/ChordCard/ChordCard';
import VoicingOption from '../../container/VoicingOption/VoicingOption';
import axios from 'axios';

import images from '../../constants/images';
import "./ChordsPage.css";

const { example_search } = images;
const { Option } = Select;
const { Title, Paragraph } = Typography;

const ChordsPage = ({ isMobile }) => {
    const [chordData, setChordData] = useState({chordName: "A", strings: "X 0 2 2 2 0", tones: "A, C#, E" });
    const [voicingData, setVoicingData] = useState({strings: ["X", "X", "X", "X", "X", "X"] });
    const [selectorVals, setSelectorVals] = useState({root: "A_", quality: "", alterations: ""});
    const [chordError, setChordError] = useState("");
    const [voicingError, setVoicingError] = useState("");
    //prevents mutiple api calls on unchanged data.
    const [prevChordCalled, setPrevChordCalled] = useState('');

    const chordKeySelectors = ["A_", "Ab_", "A%23_", "B_", "Bb_", "C_", "C%23_", "D_", "Db_", "D%23_", "E_", "Eb_", "F_", "F%23_", "G_", "Gb_", "G%23_"];
    const stringSelector = ["E", "A", "D", "G", "B", "E"];


//----------------------Event Handlers--------------------------------------------------
    const handleChordData = async () => {
        const URL = 'https://api.uberchord.com/v1/chords/';
        const chordToCall = `${URL}${selectorVals.root}${selectorVals.quality}${selectorVals.alterations}`;
        if(chordToCall === prevChordCalled) return 
            try {
                const response = await axios.get(chordToCall)
                const apiData = response.data[0]
                if(chordError !== "") setChordError("");
                setChordData({
                    //replace URI code with # and remove underscore
                    chordName: apiData.chordName.replace(/(%23)/g, "#").replace(/(,)/g, ''),
                    strings: apiData.strings,
                    tones: apiData.tones
                });
                setPrevChordCalled(chordToCall);
                // console.log(response.data)
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
        if(chordToCall === prevChordCalled) return
            try {
                const response = await axios.get(chordToCall)
                const apiData = response.data[0]
                if(voicingError !== "") setVoicingError("");
                setChordData({
                    //replace URI code with # and remove underscore
                    chordName: apiData.chordName.replace(/(%23)/g, "#").replace(/(,)/g, ''),
                    strings: apiData.strings,
                    tones: apiData.tones
                });
                setPrevChordCalled(chordToCall);
                // console.log(response.data)
            }catch (error) {
                console.log(error)
                if(error){
                    setVoicingError("Chord not found!")
                }
            }
    }

    const handleAlterationsInput = (val) => {
        setSelectorVals((prevState) => ({
            ...prevState, 
            alterations: val.toLowerCase()
        }))
    }

    const handleChordInfo = () => {
        info()
    }

    const info = () => {
        Modal.info({
          title: 'How to Serach for Chords',
          content: (
            <div>
              <Divider />
              <div>
                    Select your basic options first, 
                    then add additional chord information in the input box.
                </div>
                <br/>
                <div>
                    You can chain additional chord infomation together.
                </div>
            <br/>
              <Typography.Title level={5}>
                Examples:
              </Typography.Title>
              <div style={{paddingLeft: "2rem"}}>
                <ul>
                    <li>7</li>
                    <li>dim</li>
                    <li>aug</li>
                    <li>7b5</li>
                    <li>713</li>
                    <li>maj79(add11)</li>
                </ul>
              </div>
              <Image src={example_search} alt="search example" />
              <br/>
              <div>
                If a match is not found, 
                it will try to find a similar chord.
              </div>
              <br/>
              <div>Chords tones will be displayed beneath the chord</div>
            </div>
          ),
          onOk() {},
        });
      };
//---------------------------COMPONENT RENDER----------------------------------------------------
    return (
        <Layout>
            <div className="page-container">
                <div className="chords-title header-margin">
                    <Title>Chord Search</Title>
                    <h2>Your tool to mastering new chords!</h2>
                    <Divider />
                </div>
                <ChordCard 
                    chordName={chordData.chordName} 
                    strings={chordData.strings} 
                    tones={chordData.tones} />
                <div>
                    <Paragraph type="secondary" style={{margin: "1rem"}} >
                        Select root note, quality, add any optional alterations
                    </Paragraph>
                </div>
                <div className="chord-options-container">
                    <Space size="small">
                        <div>
                            <Select 
                                style={{width: "80px"}} 
                                defaultValue="A" 
                                name="chord-root-selector" 
                                onChange={(val) => setSelectorVals((prevState) => ({...prevState, root: val}))}>
                                    {chordKeySelectors.map((item, i) => {
                                        return <Option key={i} value={item}>{item
                                                .replace(/(%23)/g, "#")
                                                .replace(/(_)/g, '')}
                                            </Option>
                                        })}
                            </Select>
                        </div>
                        <div>
                            <Select 
                                defaultValue="" 
                                style={{width: "80px"}} 
                                label="Quality" 
                                name="chord-quality-selector" 
                                onChange={(val) => setSelectorVals((prevState) => ({...prevState, quality: val}))}>
                                    <Option value="">Major</Option>
                                    <Option value="m">Minor</Option>
                            </Select>
                        </div>
                        <div>
                                <Input 
                                    style={{ width: "100px" }} 
                                    name="chord-alterations" 
                                    defaultValue="" 
                                    placeholder="sus2, maj7..." 
                                    onChange={(e) => handleAlterationsInput(e.target.value)}
                                />
                        </div>
                        <div>
                        <Button 
                            type="default" 
                            size="medium" 
                            onClick={() => handleChordInfo()} >
                                <InfoCircleOutlined />
                        </Button>
                    </div> 
                    </Space>
                </div>
                <Space>
                    <div>
                        <Button 
                            type="primary" 
                            size="medium" 
                            style={{margin: "1rem"}} 
                            onClick={() => handleChordData()} >
                                Get Chord
                        </Button>
                    </div>
                </Space>
                <Paragraph type="danger" >{chordError}</Paragraph>
                <Paragraph type="secondary" style={{margin: "1rem"}} >
                    Or, learn a new chord by using tab below
                </Paragraph>
                    <Space>
                    <div className="chord-options-two-container">
                            {stringSelector.map((string, index) => {
                                return <VoicingOption 
                                    setVoicingData={setVoicingData} 
                                    key={index} 
                                    stringKey={index} 
                                    string={string} 
                                    isMobile={isMobile} 
                                    />
                            })}
                    </div>
                </Space>
                <div>
                        <Button 
                            type="primary" 
                            size="medium" 
                            style={{margin: "1rem"}} 
                            onClick={() => handleVoicingData()} >
                                Get Chord
                            </Button>
                        <Paragraph type="danger" >
                            {voicingError}
                        </Paragraph>
                </div>
            </div>
        </Layout>
    )   
}

export default ChordsPage;

