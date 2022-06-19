import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, Button, Select, Col, List} from 'antd';

import { majorKeys, minorKeys, majorProgressions, minorProgressions, majorNashNumbers, minorNashNumbers } from '../../constants/data';
import ChordCard from '../../container/ChordCard/ChordCard';

import axios from 'axios';
import "./ChordProgressions.css";

const { Option } = Select;

const ChordProgressions = () => {
    //---------------------------USE STATES------------------------------

    const [toggleSelectors, setToggleSelectors] = useState(false);
    const [toggleGetProgBtn, setToggleGetProBtn] = useState(false);
    const [progressionData, setProgressionData] = useState({
        progQuality: "Major",
        progKey: "C Major",
        progKeyIndex: 0,
        progNumbers: ["I", "IV", "V"],
        chordProgression: ["C", "F", "G"]
    });
    const [chordData, setChordData] = useState([
            {title: "I", chordName: "C", strings: "X 3 2 0 1 0" }, 
            {title: "IV", chordName: "F", strings: "1 3 3 2 1 1" }, 
            {title: "V", chordName: "G", strings: "3 2 0 0 3 3" }]
        );
    const [chooseProgData, setChooseProgData] = useState({
        count: 1,
        choiceArr: []
    });
//---------------------------USE EFFECTS------------------------------

    //sets the main "progressionData" state's chordProgression values for api call.
    useEffect(() => {
        setProgressionData((prevState) => ({
            ...prevState,
            //gets the correct chords from progression numbers input
            chordProgression: progressionData.progNumbers.map((e) => Object.values(progressionData.progQuality === "Major" ? majorKeys[progressionData.progKeyIndex] : minorKeys[progressionData.progKeyIndex])[0][e])
        }))
    }, [progressionData]);

    useEffect(() => {
        setProgressionData((prevState) => ({
            ...prevState,
            progNumbers: chooseProgData.choiceArr
        }))
    }, [chooseProgData]);

//---------------------------EVENT HANDLERS------------------------------

    const handleChordData = async () => {
        const chords = progressionData.chordProgression.join(",");
        const URL = 'https://api.uberchord.com/v1/chords?names=';
        const chordToCall = `${URL}${chords}`;
        console.log(progressionData)
            try {
                const response = await axios.get(chordToCall)
                setChordData(response.data.map((item, i) => ({
                    //provides chordData with the progression nashville number for title on card
                    title: progressionData.progNumbers[i],
                    //replace URI code with # and remove underscore
                    chordName: item.chordName.replace(/(%23)/g, "#").replace(/(,)/g, ''),
                    strings: item.strings
                    })
                ));
                // console.log(response.data)
            }catch (error) {
                console.log(error)
            }
    }

    const handleProgressionArray = (value, index) => {
        if (chooseProgData.choiceArr.length > index) {
            let newArr = [...chooseProgData.choiceArr];
            newArr.splice(index, 1, value);
            setChooseProgData((prevState) => ({
                ...prevState,
                choiceArr: newArr
            }))
        }else {
            setChooseProgData((prevState) => (
                {
                //appends new selector up to eight total
                count: prevState.count < 8 ? prevState.count + 1 : prevState.count,
                choiceArr: [...prevState.choiceArr, value]
                }));
            }
        }
    
    const handleMajMinToggle = (val) => {
        setProgressionData((prevState) => ({
                    ...prevState, 
                    progQuality: val,
                    progKey: val === "Major" ? "C Major" : "C Minor",
                    progKeyIndex: 0,
                    progNumbers: val === "Major" ? ["I", "IV", "V"] : ["i", "iv", "v"],
                    chordProgression: val === "Major" ? ["C", "F", "G"] : ["Cm", "Fm", "Gm"]
                     }))
        setChooseProgData((prevState) => ({
                        ...prevState,
                        count: 1,
                        choiceArr: []
                    }))
        setToggleSelectors(false);
        setToggleGetProBtn(false)
            }

    const handleKeysSelector = (val, key) => {
        setProgressionData((prevState) => ({
            ...prevState, 
            progKey: val, progKeyIndex: parseInt(key.key)
        }))
    }

//---------------------------COMPONENT RENDER------------------------------

    return (
        <Layout>
            <div className='page-container'>
                <div className="progresssion-cards-containers">
                    <div className="progression-title-container center-items" style={{textAlign: "center"}}>
                        <Typography.Title level={1}>Chord Progression Generator</Typography.Title>
                        <h2>Choose a chord progression or create your own</h2>
                            <div className="progression-cards-container" style={{width: "100%"}}>
                            <Col span={12}>
                                <List
                                    grid={{
                                    gutter: 16,
                                    md: 1, lg: 2, xl: 3, xxl: 4
                                }}
                                dataSource={chordData}
                                renderItem={(item, i) => (
                                        <List.Item>
                                            <ChordCard key={i} title={item.title} chordName={item.chordName} strings={item.strings} /> 
                                        </List.Item>
                                    )}
                                />
                            </Col> 
                            </div>
                    </div>
                </div>
                <div className="progression-selectors-container center-items" style={{margin: "1rem"}}>
                <Space size="small">
                        <Select defaultValue="Major" style={{width: "80px"}} name="major-minor-selctor" onChange={(val) => handleMajMinToggle(val)}>
                            <Option value="Major">Major</Option>
                            <Option value="Minor">Minor</Option>
                        </Select>
                        {progressionData.progQuality === "Major" && (
                            <div className="major-selection-container">
                                <Space size="small">
                                    <Select defaultValue="C Major" style={{width: "100px"}} name="major-keys-selctor" onChange={(val, key) => handleKeysSelector(val, key)}>
                                        {majorKeys.map((item, i) => {
                                            return (
                                                <Option key={i} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</Option>
                                            )
                                        })}
                                    </Select>
                                    {!toggleSelectors &&
                                        <Select 
                                                style={{width: "150px"}} 
                                                name="major-progression-selctor"
                                                placeholder="Progression" 
                                                onChange={(val, key) => {
                                                    setProgressionData((prevState) => ({
                                                    ...prevState,
                                                    //pulls array value of progressions data from selected value 
                                                    progNumbers: Object.values(majorProgressions[parseInt(key.key)])[0],
                                                        }))
                                                    setToggleSelectors(false)
                                                    setToggleGetProBtn(true)
                                                    }}>
                                            {majorProgressions.map((item, i) => {
                                                    return (
                                                        <Option key={i} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</Option>
                                                    )
                                                })}
                                        </Select>
                                    }
                                </Space>
                            </div>)}
                        {progressionData.progQuality === "Minor" && (
                            <div className="minor-selection-container">
                                <Space size="small">
                                    <Select defaultValue="C Minor" style={{width: "100px"}} name="minor-keys-selctor" onChange={(val, key) => handleKeysSelector(val, key)}>
                                        {minorKeys.map((item, i) => {
                                            return (
                                                <Option key={i} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</Option>
                                            )
                                        })}
                                    </Select>
                                    {!toggleSelectors &&
                                        <Select  
                                                style={{width: "150px"}} 
                                                name="minor-progression-selctor"
                                                placeholder="Progression"  
                                                onChange={(val, key) => {
                                                    setProgressionData((prevState) => ({
                                                        ...prevState,
                                                        //pulls array value of progressions data from selected value 
                                                        progNumbers: Object.values(minorProgressions[parseInt(key.key)])[0],
                                                            }))
                                                    setToggleSelectors(false)
                                                    setToggleGetProBtn(true)
                                                }}>
                                            {minorProgressions.map((item, i) => {
                                                    return (
                                                        <Option key={i} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</Option>
                                                    )
                                                })}
                                        </Select>
                                    }
                                </Space>
                        </div>)}
                        
                    </Space>
                </div>
                {!toggleSelectors &&
                    <div className="choose-progression-label center-items" style={{width: "100%", textAlign: "center"}}>
                        <Typography.Paragraph type="secondary" >Or, make your own progression below</Typography.Paragraph>
                    </div>
                }
                <div className="chooseProgression-container center-items" id="chooseProgression">
                {!toggleSelectors &&
                    <Button type="primary" size="medium" onClick={() => {
                        setToggleSelectors(true)
                        setToggleGetProBtn(true)
                    }} >Create Your Own</Button>
                }
                {toggleSelectors &&
                <Space>
                        {/* if choice array.length == # of selectors, append new selector limit to 8 */}
                        {[...Array(chooseProgData.count)].map((_, index) => {
                            return (
                            <Select key={"selector" + index} defaultValue="" onChange={(val) => handleProgressionArray(val, index)}>
                            {(progressionData.progQuality === "Major" ? majorNashNumbers : minorNashNumbers).map((item, i) => {
                                return (
                                    <Option key={i} value={item}>{item}</Option>
                                )
                                })}
                        </Select>
                        )})}
                    </Space>
                }
                </div>
                {toggleGetProgBtn &&
                    <div className="get-progression-btn center-items" style={{margin: "1rem"}}>
                        <Button type="primary" size="medium" onClick={() => handleChordData()} >Get Progression</Button>
                    </div>
                }
            </div>
        </Layout>
    )
}

export default ChordProgressions;
