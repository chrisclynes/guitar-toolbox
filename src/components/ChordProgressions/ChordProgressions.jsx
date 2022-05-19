import React, { useState } from 'react';

import { majorKeys, minorKeys } from '../../constants/data';
import "./ChordProgressions.css";

const ChordProgressions = () => {
    const [majorMinor, setMajorMinor] = useState("Major");


    return (
        <div>
            <select className="major-minor-selction" name="Major Minor" id="major-minor-selctor" onChange={(e) => setMajorMinor(e.target.value)}>
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
            </select>
            {majorMinor === "Major" && (
                <select className="major-keys-selction" name="Major Keys" id="major-keys-selctor" >
                    {majorKeys.map((item) => {
                        return (
                            <option key={Object.keys(item)} value={Object.keys(item)}>{Object.keys(item)}</option>
                        )
                    })}
                </select>)}
            {majorMinor === "Minor" && (
                <select className="minor-keys-selction" name="Minor Keys" id="minor-keys-selctor" >
                    {minorKeys.map((item) => {
                        return (
                            <option key={Object.keys(item)} value={Object.keys(item)}>{Object.keys(item)}</option>
                        )
                    })}
                </select>)}
        </div>
    )
}

export default ChordProgressions;