import React, { useState, useEffect } from 'react';
import { Layout, Typography, Space, Button, Select, Col, Divider } from 'antd';

import { majorKeys, minorKeys, majorProgressions, minorProgressions, majorNashNumbers, minorNashNumbers } from '../../constants/data';
import ChordCard from '../../components/ChordCard/ChordCard';
import { SyncOutlined } from '@ant-design/icons';

import chordsApi from '../../services/chordsApi';
import "./ChordProgressionsPage.css";

const { Option } = Select;
const { Paragraph } = Typography;

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
        progSequence: "",
        progKeyIndex: 0,
        progNumbers: ["I", "IV", "V"],
    });
    const [chordProgression, setChordProgression] = useState(["A", "D", "E"]);
    //initial chord set data
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
    const [chordsError, setChordsError] = useState('');
//---------------------------USE EFFECTS------------------------------

    //sets the main "progressionData" state's chordProgression values for api call.
    useEffect(() => {
        setChordProgression(progressionData.progNumbers.map((element) => Object.values(progressionData.progQuality === "Major" ?
        majorKeys[progressionData.progKeyIndex] : 
        minorKeys[progressionData.progKeyIndex])[0][element])
        )    
    }, [progressionData]);

    useEffect(() => {
        setProgressionData((prevState) => ({
            ...prevState,
            progNumbers: chooseProgData.choiceArr
        }))
    }, [chooseProgData]);

//---------------------------EVENT HANDLERS------------------------------

    const handleChordData = async () => {
        if(prevChordsCalled === chordData) return //prevents unnecessary api call
       
        const chordsString = `?names=${chordProgression.join(",")}`
        const chordResponse = await chordsApi(chordsString)
        if(chordResponse === "error"){
            setChordsError("Error getting chord information");     
        }else {
            setChordsError('')
            setChordData(chordResponse.map((item, i) => ({
                            //provides chordData with the progression nashville number for title on card
                            title: progressionData.progNumbers[i],
                            //remove underscore and determine if chord has an enharmonic name
                            chordName: chordProgression[i].replace(/(%23)/g, "#").replace(/(_)/g, ''),
                            strings: item.strings,
                            })))
            //set to show progression chords onscreen in readable format
            setProgTextDisplay(chordProgression.join(", ").replace(/(%23)/g, "#").replace(/(_)/g, ''));
            setPrevChordsCalled(chordData);
        }    
    }

    const handleProgressionArray = (value, index) => {
        if (chooseProgData.choiceArr.length > index) {
            let newArr = [...chooseProgData.choiceArr];
            newArr.splice(index, 1, value);
            setChooseProgData((prevState) => ({
                ...prevState,
                choiceArr: newArr
            }));
        }else {
            setChooseProgData((prevState) => (
                {
                //appends new selector up to eight total
                count: prevState.count < 8 ? prevState.count + 1 : prevState.count,
                choiceArr: [...prevState.choiceArr, value]
                }));
            }
        }
    
    const handleQualitySelector = (val) => {
        const progressionKey = val === "Major" ? "A Major" : "A Minor";
        setProgressionData((prevState) => ({
            ...prevState,
            progQuality: val,
            progKey: progressionKey,
            progSequence: "",
        }));
        setChooseProgData({
            count: 1,
            choiceArr: []
        });
    }

    const handleKeysSelector = (val, key) => {
        setProgressionData((prevState) => ({
            ...prevState, 
            progKey: val, 
            progKeyIndex: parseInt(key.key)
        }));
    }

    const handleProgressionSelector = (val, key) => {
        const progressionNumbers = Object.values((progressionData.progQuality === "Major" ? majorProgressions : minorProgressions)[parseInt(key.key)])[0];
        setProgressionData((prevState) => ({
            ...prevState,
            //pulls array value of progressions data from selected value 
            progSequence: val,
            progNumbers: progressionNumbers
                }));
            setToggleChoiceProgBtn(false);
            setToggleGetProgBtn(true);
    }


    const handleResetSelectors = () => {
        setProgressionData({
            progQuality: "Major",
            progKey: "A Major",
            progSequence: "",
            progKeyIndex: 0,
            progNumbers: ["I", "IV", "V"],
        });
        setChordData([
            {title: "I", chordName: "A", strings: "X 0 2 2 2 0" }, 
            {title: "IV", chordName: "D", strings: "X X 0 2 3 2" }, 
            {title: "V", chordName: "E", strings: "0 2 2 1 0 0" }
        ]);
        setChooseProgData({
            count: 1,
            choiceArr: []
        });   
        setProgTextDisplay('A, D, E');
        setToggleChoiceProgBtn(false);
        setToggleGetProgBtn(false);  
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
                                className="center-items flex-center" > 
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
                                    value={progressionData.progQuality} 
                                    style={{width: "80px"}} 
                                    name="major-minor-selctor" 
                                    onChange={(val) => handleQualitySelector(val)}>
                                        <Option value="Major">
                                            Major
                                        </Option>
                                        <Option value="Minor">
                                            Minor
                                        </Option>
                                </Select>
                                <div className="major-selection-container">
                                    <Space size="small">
                                        <Select 
                                            getPopupContainer={trigger => trigger.parentNode}
                                            value={progressionData.progKey} 
                                            style={{width: "100px"}} 
                                            name="major-keys-selctor" 
                                            onChange={(val, key) => handleKeysSelector(val, key)}>
                                                {(progressionData.progQuality === "Major" ? majorKeys : minorKeys).map((item, i) => {
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
                                                value={progressionData.progSequence}
                                                style={{width: "150px"}} 
                                                name="major-progression-selctor"
                                                placeholder="Progression" 
                                                onChange={(val, key) => handleProgressionSelector(val, key)}>
                                                {(progressionData.progQuality === "Major" ? majorProgressions : minorProgressions).map((item, i) => {
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
                            </div>
                        </Space>
                </div>

    {/*----------------------------------------SWITCH PROGRESSION TYPE----------------------------------------- */}

                <div className="chooseProgression-container center-items" id="chooseProgression">
                    {toggleSelectors &&
                        <Space wrap className="center-items">
                                {/* if choice array.length == # of selectors, append new selector limit to 8 */}
                                {[...Array(chooseProgData.count)].map((_, index) => {
                                    return (
                                    <Select 
                                        getPopupContainer={trigger => trigger.parentNode}
                                        key={"selector" + index} 
                                        value={chooseProgData.choiceArr[index]} 
                                        onChange={(val) => {
                                            handleProgressionArray(val, index)
                                            setToggleGetProgBtn(true)
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
                <div className="get-progression-btn center-items" style={{marginTop: "1rem"}}>
                    <Space>
                        <Button 
                            type="primary" 
                            size="medium"
                            disabled={!toggleGetProgBtn}
                            onClick={() => handleChordData()} >
                                Get Progression
                        </Button>
                        <Button 
                            type="primary" 
                            size="medium" 
                            disabled={!toggleGetProgBtn}
                            onClick={() => handleResetSelectors()} >
                                <SyncOutlined />
                        </Button>
                    </Space>
                </div>
                <div className='center-items' style={{flexDirection: "column", marginTop: "2rem"}}>
                    <div className="choose-progression-label center-items" style={{width: "100%", textAlign: "center"}}>
                        <Typography.Paragraph type="secondary" >
                        {toggleSelectors ? "return to standard mode" : "or, make your own progression"}
                        </Typography.Paragraph>
                    </div>
                    <div className="get-progression-btn center-items">
                        <Space>
                            <Button type="default" size="medium" onClick={() => {
                                setToggleSelectors(!toggleSelectors)
                                setToggleChoiceProgBtn(!toggleChoiceProgBtn)
                                setToggleGetProgBtn(false)
                            }} >
                                {toggleSelectors ? "Go back" : "Create Your Own"}
                            </Button>
                        </Space>
                    </div>
                </div>
                {isMobile &&
                //on mobile view switch layout of cards to 1 column, dynamic wraping
                <div>
                    <Paragraph type="danger" >{chordsError}</Paragraph>
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
            <Paragraph type="danger" >{chordsError}</Paragraph>
        </Layout>
    )
}

export default ChordProgressions;
