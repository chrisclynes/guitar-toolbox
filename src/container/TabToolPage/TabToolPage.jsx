import React, { useState } from 'react';
import { 
    Layout, 
    Typography, 
    Space, 
    Button, 
    Divider,
    } from 'antd';
import { InfoCircleOutlined, SyncOutlined } from '@ant-design/icons';
import ChordCard from '../../components/ChordCard/ChordCard';
import VoicingOption from '../../components/VoicingOption/VoicingOption';
import info from './modal';
import chordApi from '../../services/chordApi';

import "./TabToolPage.css";

const { Title, Paragraph } = Typography;

const ChordsPage = ({ isMobile }) => { 
    const [chordData, setChordData] = useState({chordName: " ", strings: "0 0 0 0 0 0", tones:"" });
    const [voicingData, setVoicingData] = useState({strings: ["0", "0", "0", "0", "0", "0"] });
    const [voicingError, setVoicingError] = useState("");
    //prevents mutiple api calls on unchanged data.
    const [prevChordCalled, setPrevChordCalled] = useState('');

    const stringSelector = ["E", "A", "D", "G", "B", "E"];

//----------------------Event Handlers--------------------------------------------------

    const handleVoicingData = async () => {
        if(prevChordCalled === voicingData.strings) return //prevents unnecessary api call

        const chordString = `?voicing=${voicingData.strings.join("-")}`;
        const chordResponse = await chordApi(chordString);
        if(chordResponse === "error"){
            setVoicingError("Chord not found or incorrect input!");     
        }else {
            setVoicingError('');
            setChordData(chordResponse);
            setPrevChordCalled(voicingData.strings);
        }
    }

    const handleResetSelectors = () => {
        setChordData({
            chordName: "", 
            strings: "0 0 0 0 0 0", 
            tones: "" 
        })
        setVoicingData({
            strings: ["0", "0", "0", "0", "0", "0"] 
        });
    }

    
//---------------------------COMPONENT RENDER---------------------------------
    return (
        <Layout>
            <div className="page-container">
                <div className="chords-title header-margin">
                    <Title>Tab Tool</Title>
                    <h2>Determine chords or notes by using tablature</h2>
                    <Divider />
                </div>
                <ChordCard 
                    chordName={chordData.chordName} 
                    strings={chordData.strings} 
                    tones={chordData.tones} />
            
                <Paragraph type="secondary" style={{margin: "1rem"}} >
                    Enter tab for corresponding strings to get information about notes or chords
                </Paragraph>
                    <Space>
                    <div className="chord-options-two-container">
                            {stringSelector.map((string, index) => {
                                return <VoicingOption
                                    voicingData={voicingData} 
                                    setVoicingData={setVoicingData}
                                    key={index} 
                                    stringIndex={index} 
                                    string={string} 
                                    isMobile={isMobile} 
                                    />
                            })}
                    </div>
                </Space>
                <div>
                    <Space>
                        <Button 
                            type="primary" 
                            size="medium" 
                            style={{marginTop: "1rem"}} 
                            onClick={() => handleVoicingData()} >
                                Get Note(s)
                        </Button>
                        <Button 
                            type="primary" 
                            size="medium" 
                            style={{marginTop: "1rem"}} 
                            onClick={() =>handleResetSelectors()} >
                                <SyncOutlined />
                        </Button>
                        <Button 
                            type="default" 
                            size="medium" 
                            style={{marginTop: "1rem"}} 
                            onClick={() => info()} >
                                <InfoCircleOutlined />
                        </Button>
                        <Paragraph type="danger" >
                            {voicingError}
                        </Paragraph>
                    </Space>
                </div>
            </div>
        </Layout>
    )   
}

export default ChordsPage;