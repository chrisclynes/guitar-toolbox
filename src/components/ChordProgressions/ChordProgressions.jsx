import React, { useState } from 'react';
import { Typography } from 'antd';

import { majorKeys, minorKeys, majorProgressions, minorProgressions } from '../../constants/data';
import "./ChordProgressions.css";

const ChordProgressions = () => {
    const [majorMinor, setMajorMinor] = useState("Major");
    const [progression, setprogression] = useState("Major");
    const [progressionData, setprogressionData] = useState({
        chordQuality: "Major",
        chordKey: "C Major",
        chordProgression: ["1", "IV", "V"]
    })


    return (
        <div>
            <div className="progresssion-cards-containers">
                <div className="progression-title-container center-items" style={{textAlign: "center"}}>
                    <Typography.Title>Choose a progression or create your own</Typography.Title>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dolor purus non enim praesent elementum facilisis leo vel fringilla.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dolor purus non enim praesent elementum facilisis leo vel fringilla.</p>
                </div>
            </div>
            <div className="progression-selectors-container center-items">
                <select className="major-minor-selction" name="Major Minor" id="major-minor-selctor" onChange={(e) => setMajorMinor(e.target.value)}>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                </select>
                {majorMinor === "Major" && (
                    <div>
                        <select className="major-keys-selction" name="Major Keys" id="major-keys-selctor" >
                            {majorKeys.map((item) => {
                                return (
                                    <option key={Object.keys(item)} value={Object.keys(item)}>{Object.keys(item)}</option>
                                )
                            })}
                        </select>
                        <select className="major-progressions-selction" name="Major Progressions" id="major-progression-selctor" >
                            {majorProgressions.map((item) => {
                                    return (
                                        <option key={Object.keys(item)} value={Object.keys(item)}>{Object.keys(item)}</option>
                                    )
                                })}
                        </select>
                    </div>)}
                {majorMinor === "Minor" && (
                    <div className="minor-selection-container">
                        <select className="minor-keys-selction" name="Minor Keys" id="minor-keys-selctor" >
                            {minorKeys.map((item) => {
                                return (
                                    <option key={Object.keys(item)} value={Object.keys(item)}>{Object.keys(item)}</option>
                                )
                            })}
                        </select>
                        <select className="minor-progressions-selction" name="Minor Progressions" id="minor-progression-selctor" >
                            {minorProgressions.map((item) => {
                                    return (
                                        <option key={Object.keys(item)} value={Object.keys(item)}>{Object.keys(item)}</option>
                                    )
                                })}
                        </select>
                    </div>)}
            </div>
        </div>
    )
}

export default ChordProgressions;