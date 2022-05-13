import React, { useState, useEffect } from 'react';

import ChordCard from '../ChordCard/ChordCard';

import "./ChordsPage.css";

const ChordsPage = () => {
    const [chordData, setChordData] = useState({root: "A", quality: "MAJ"});
    
    

    const handleChordData = (chordSelect) => {
        const chordRoot = document.getElementById("chord-root-selector").value;
        const chordQuality = document.getElementById("chord-quality-selector").value;
       
        setChordData({root: chordRoot, quality: chordQuality});
    }

    return (
        
        <div className="chord-main-container">
            <ChordCard chordData={chordData} />
            <div className="chord-options-container">
                <select className="chord-option" name="Select Root" id="chord-root-selector" onChange={() => handleChordData()}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                </select>
                <select className="chord-option" name="Select Quality" id="chord-quality-selector" onChange={() => handleChordData()}>
                    <option value="MAJ">Major</option>
                    <option value="MIN">Minor</option>
                </select>
                <button className="chord-option" type="button" onClick={() => handleChordData()} >Get Chord</button>
            </div>
        </div>
    )   
}

export default ChordsPage;

