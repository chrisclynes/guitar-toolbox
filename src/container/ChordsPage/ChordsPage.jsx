import React, { useState } from 'react';
import { 
    Layout, 
    Typography, 
    Space, 
    Select, 
    Input,
    Button, 
    Divider,
    } from 'antd';
import { InfoCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { chordKeySelectors } from '../../constants/data';
import ChordCard from '../../components/ChordCard/ChordCard';
import axios from 'axios';
import info from './modal';
import convertTones from '../../services/convertTones';

import "./ChordsPage.css";

const { Option } = Select;
const { Title, Paragraph } = Typography;

const ChordsPage = ({ isMobile }) => {
    const [chordData, setChordData] = useState({chordName: "A", strings: "X 0 2 2 2 0", tones: "A, C#, E" });
    const [selectorVals, setSelectorVals] = useState({root: "A", quality: "Major", alterations: ""});
    const [chordError, setChordError] = useState("");
    //prevents mutiple api calls on unchanged data.
    const [prevChordCalled, setPrevChordCalled] = useState("");

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
                    //remove underscore and determine if chord has an enharmonic name
                    chordName: `${apiData.chordName.replace(/(,)/g, '')}${apiData.enharmonicChordName !== apiData.chordName ? ` or ${apiData.enharmonicChordName.replace(/(,)/g, '')}` : ""}`,
                    strings: apiData.strings,
                    tones: `${apiData.tones}${apiData.enharmonicChordName !== apiData.chordName ? ` or ${convertTones(apiData.tones)}` : ""}`
                });
                setPrevChordCalled(chordToCall);
            }catch (error) {
                console.log(error)
                if(error){
                    setChordError("Chord not found or incorrect input!")
                }
            }
    }

    const handleRootSelect = (val) => {
        setSelectorVals((prevState) => ({
            ...prevState,
            root: val
        }))
        //`${val.replace(/(#)/g, "%23")}_`
    }

    const handleQualitySelect = (val) => {
        setSelectorVals((prevState) => ({
            ...prevState,
            quality: val
        }))
        //Minor ? "m" : ""
    }

    const handleAlterationsInput = (val) => {
        setSelectorVals((prevState) => ({
            ...prevState, 
            alterations: val
        }))
        //.toLowerCase()
    }

    

    const handleResetSelectors = () => {
        setSelectorVals({
            root: "A", 
            quality: "Major", 
            alterations: ""
        });
    }
    
//---------------------------COMPONENT RENDER---------------------------------
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
                        Select root note, quality, and add any optional alterations
                    </Paragraph>
                </div>
                <div className="chord-options-container">
                    <Space size="small">
                        <div>
                        
                            <Select 
                                getPopupContainer={trigger => trigger.parentNode}
                                style={{width: "80px"}} 
                                value={selectorVals.root} 
                                name="rootSelect" 
                                onChange={(val) => handleRootSelect(val)}>{/*setSelectorVals((prevState) => ({...prevState, root: val}))*/}
                                    {chordKeySelectors.map((item, i) => {
                                        return <Option key={i} value={item}>
                                                    {item}
                                                </Option>
                                        })}
                            </Select>
                            
                        </div>
                        <div>
                            <Select 
                                getPopupContainer={trigger => trigger.parentNode}
                                value={selectorVals.quality} 
                                style={{width: "80px"}} 
                                label="Quality" 
                                name="chord-quality-selector" 
                                onChange={(val) => handleQualitySelect(val)}>{/*setSelectorVals((prevState) => ({...prevState, quality: val}))*/}
                                    <Option value="Major">Major</Option>
                                    <Option value="Minor">Minor</Option>
                            </Select>
                        </div>
                        <div>
                                <Input 
                                    style={{ width: "100px" }} 
                                    name="chord-alterations" 
                                    value={selectorVals.alterations} 
                                    placeholder="sus2, maj7..." 
                                    onChange={(e) => handleAlterationsInput(e.target.value)}
                                />{/*handleAlterationsInput(e.target.value)*/}
                        </div>
                        <div>
                        <Button 
                            type="default" 
                            size="medium" 
                            onClick={() => info()} >
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
                        <Button 
                            type="primary" 
                            size="medium" 
                            onClick={() => handleResetSelectors()} >
                                <SyncOutlined />
                        </Button>
                    </div>
                </Space>
                <Paragraph type="danger" >{chordError}</Paragraph>
            </div>
        </Layout>
    )   
}

export default ChordsPage;

