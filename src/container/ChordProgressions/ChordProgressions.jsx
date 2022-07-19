import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, Button, Select, Col, Divider} from 'antd';

import { majorKeys, minorKeys, majorProgressions, minorProgressions, majorNashNumbers, minorNashNumbers } from '../../constants/data';
import ChordCard from '../../components/ChordCard/ChordCard';

import axios from 'axios';
import "./ChordProgressions.css";

const { Option } = Select;

const ChordProgressions = ({isMobile}) => {
    //---------------------------USE STATES------------------------------

    const [toggleSelectors, setToggleSelectors] = useState(false);
    //set for user data selected for standard progressions
    const [toggleGetProgBtn, setToggleGetProgBtn] = useState(false);
    //set for user data selected for created progressions
    const [toggleChoiceProgBtn, setToggleChoiceProgBtn] = useState(false);
    const [progressionData, setProgressionData] = useState({
        progQuality: "Major",
        progKey: "A Major",
        progKeyIndex: 0,
        progNumbers: ["I", "IV", "V"],
        chordProgression: ["A", "D", "E"]
    });
    const [chordData, setChordData] = useState([
            {title: "I", chordName: "A", strings: "X 0 2 2 2 0" }, 
            {title: "IV", chordName: "D", strings: "X X 0 2 3 2" }, 
            {title: "V", chordName: "E", strings: "0 2 2 1 0 0" }]
        );
    const [chooseProgData, setChooseProgData] = useState({
        count: 1,
        choiceArr: []
    });
    const [progTextDisplay, setProgTextDisplay] = useState('A, D, E');
    //prevents mutiple api calls.
    const [prevChordsCalled, setPrevChordsCalled] = useState('');
//---------------------------USE EFFECTS------------------------------

    //sets the main "progressionData" state's chordProgression values for api call.
    useEffect(() => {
        setProgressionData((prevState) => ({
            ...prevState,
            //gets the correct chords from progression numbers input
            chordProgression: progressionData.progNumbers.map((e) => Object.values(progressionData.progQuality === "Major" ?
             majorKeys[progressionData.progKeyIndex] : 
             minorKeys[progressionData.progKeyIndex])[0][e])
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
        if(chords === prevChordsCalled) return
            try {
                const response = await axios.get(chordToCall)
                setChordData(response.data.map((item, i) => ({
                    //provides chordData with the progression nashville number for title on card
                    title: progressionData.progNumbers[i],
                    //remove underscore and determine if chord has an enharmonic name
                    chordName: progressionData.chordProgression[i].replace(/(%23)/g, "#").replace(/(_)/g, ''),
                    strings: item.strings,
                    })
                ));
                //set to show progression chords onscreen in readable format
                setProgTextDisplay(progressionData.chordProgression.join(", ").replace(/(%23)/g, "#").replace(/(_)/g, ''));
                setPrevChordsCalled(chords);
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
                    progKey: val === "Major" ? "A Major" : "A Minor",
                    progKeyIndex: 0,
                    progNumbers: val === "Major" ? ["I", "IV", "V"] : ["i", "iv", "v"],
                    chordProgression: val === "Major" ? ["A", "D", "E"] : ["Am", "Dm", "Em"]
                     }))
        setChooseProgData((prevState) => ({
                        ...prevState,
                        count: 1,
                        choiceArr: []
                    }))
        setToggleSelectors(false);
        setToggleGetProgBtn(false)
        setToggleChoiceProgBtn(false)
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
                        <div className="header-margin">
                            <Typography.Title level={1}>Progression Generator</Typography.Title>
                            <h2>
                                Choose a chord progression or create your own
                            </h2>
                            {isMobile &&
                                <Divider />
                            }
                            </div>
                            {!isMobile &&
                        <div>
                            <Divider>
                                <div>{progTextDisplay}</div>
                            </Divider>
                            <div 
                                className="center-items" 
                                style={{width: "100%", flex: 1, flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start"}}> 
                                    {chordData.map((item, i) => {
                                        return (
                                            <Col  key={i}>
                                                <ChordCard 
                                                    key={i} 
                                                    title={item.title} 
                                                    chordName={item.chordName} 
                                                    strings={item.strings} />
                                            </Col> 
                                        )
                                    })}        
                            </div>
                        </div>
                        }       
                    </div>
                </div>
                <div className="progression-selectors-container center-items" style={{margin: "1rem"}}>
                <Space size="small">
                        <Select 
                            getPopupContainer={trigger => trigger.parentNode}
                            defaultValue="Major" style={{width: "80px"}} 
                            name="major-minor-selctor" 
                            onChange={(val) => handleMajMinToggle(val)}>
                                <Option value="Major">
                                    Major
                                </Option>
                                <Option value="Minor">
                                    Minor
                                </Option>
                        </Select>
                        {progressionData.progQuality === "Major" && (
                            <div className="major-selection-container">
                                <Space size="small">
                                    <Select 
                                        getPopupContainer={trigger => trigger.parentNode}
                                        defaultValue="A Major" 
                                        style={{width: "100px"}} 
                                        name="major-keys-selctor" 
                                        onChange={(val, key) => handleKeysSelector(val, key)}>
                                            {majorKeys.map((item, i) => {
                                                return (
                                                    <Option 
                                                        key={i} 
                                                        value={Object.keys(item)[0]}>
                                                            {Object.keys(item)[0]}
                                                    </Option>
                                                )
                                            })}
                                    </Select>
                                    {!toggleSelectors &&
                                        <Select 
                                                getPopupContainer={trigger => trigger.parentNode}
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
                                                    setToggleChoiceProgBtn(false)
                                                    setToggleGetProgBtn(true)
                                                    }}>
                                            {majorProgressions.map((item, i) => {
                                                    return (
                                                        <Option 
                                                            key={i} 
                                                            value={Object.keys(item)[0]}>
                                                                {Object.keys(item)[0]}
                                                        </Option>
                                                    )
                                                })}
                                        </Select>
                                    }
                                </Space>
                            </div>)}
                        {progressionData.progQuality === "Minor" && (
                            <div className="minor-selection-container">
                                <Space size="small">
                                    <Select 
                                        getPopupContainer={trigger => trigger.parentNode}
                                        defaultValue="A Minor" 
                                        style={{width: "100px"}} 
                                        name="minor-keys-selctor" 
                                        onChange={(val, key) => handleKeysSelector(val, key)}>
                                        {minorKeys.map((item, i) => {
                                            return (
                                                <Option 
                                                    key={i} 
                                                    value={Object.keys(item)[0]}>
                                                        {Object.keys(item)[0]}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                    {!toggleSelectors &&
                                        <Select 
                                                getPopupContainer={trigger => trigger.parentNode} 
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
                                                    setToggleGetProgBtn(true)
                                                }}>
                                            {minorProgressions.map((item, i) => {
                                                    return (
                                                        <Option 
                                                            key={i} 
                                                            value={Object.keys(item)[0]}>
                                                                {Object.keys(item)[0]}
                                                        </Option>
                                                    )
                                                })}
                                        </Select>
                                    }
                                </Space>
                        </div>)}
                        
                    </Space>
                </div>
                {toggleGetProgBtn &&
                    <div className="get-progression-btn center-items" style={{margin: "1rem"}}>
                        <Button 
                            type="primary" 
                            size="medium" 
                            onClick={() => handleChordData()} >
                                Get Progression
                        </Button>
                    </div>
                }
                {!toggleSelectors &&
                    <div className="choose-progression-label center-items" style={{width: "100%", textAlign: "center"}}>
                        <Typography.Paragraph type="secondary" >
                            Or, make your own progression below
                        </Typography.Paragraph>
                    </div>
                }
                <div className="chooseProgression-container center-items" id="chooseProgression">
                {!toggleSelectors &&
                    <Button type="primary" size="medium" onClick={() => {
                        setToggleSelectors(true)
                        setToggleGetProgBtn(false)
                    }} >Create Your Own</Button>
                }
                {toggleSelectors &&
                    <Space wrap className="center-items">
                            {/* if choice array.length == # of selectors, append new selector limit to 8 */}
                            {[...Array(chooseProgData.count)].map((_, index) => {
                                return (
                                <Select 
                                    getPopupContainer={trigger => trigger.parentNode}
                                    key={"selector" + index} 
                                    defaultValue="" onChange={(val) => {
                                        handleProgressionArray(val, index)
                                        setToggleChoiceProgBtn(true)
                                        }
                                    }>
                                    {(progressionData.progQuality === "Major" ? majorNashNumbers : minorNashNumbers).map((item, i) => {
                                        return (
                                            <Option key={i} value={item}>{item}</Option>
                                        )
                                        })}
                                </Select>
                                )})
                            }
                    </Space>
                }
                </div>
                {toggleChoiceProgBtn &&
                    <div className="get-progression-btn center-items" style={{margin: "1rem"}}>
                        <Button 
                            type="primary" 
                            size="medium" 
                            onClick={() => handleChordData()} >
                                Get Progression
                        </Button>
                    </div>
                }
                {isMobile &&
                //on mobile view switch layout of cards to 1 column, dynamic wraping
                <div>
                    <Divider>
                        <div>{progTextDisplay}</div>
                    </Divider>
                    <div className="center-items" style={{width: "100%", flexDirection: "column"}}>
                            {chordData.map((item, i) => {
                                return (
                                    <Col flex="none" key={i}>
                                        <ChordCard 
                                            key={i} 
                                            title={item.title} 
                                            chordName={item.chordName} 
                                            strings={item.strings} />
                                    </Col> 
                                )
                            })}      
                    </div>
                    </div>
                }   
            </div>
        </Layout>
    )
}

export default ChordProgressions;
