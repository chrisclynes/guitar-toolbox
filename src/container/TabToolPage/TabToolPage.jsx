import React, { useState } from 'react';
import { 
    Layout, 
    Typography, 
    Space, 
    Select, 
    Image, 
    Button, 
    Divider,
    Modal 
    } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import ChordCard from '../../components/ChordCard/ChordCard';
import VoicingOption from '../../components/VoicingOption/VoicingOption';
import axios from 'axios';

import images from '../../constants/images';
import "./TabToolPage.css";
import convertTones from '../../services/convertTones';

const { example_search } = images;
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
        const URL = 'https://api.uberchord.com/v1/chords?voicing=';
        const chordToCall = `${URL}${voicingData.strings.join("-")}`;
        if(chordToCall === prevChordCalled) return
            try {
                const response = await axios.get(chordToCall)
                const apiData = response.data[0]
                if(voicingError !== "") setVoicingError("");
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
                    setVoicingError("Chord not found!")
                }
            }
    }
    
//----------------------Modal--------------------------------------------------
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
                A similar chord may be displayed.
              </div>
              <br/>
              <div>Chords tones will be displayed beneath the chord</div>
            </div>
          ),
          onOk() {},
        });
      };
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