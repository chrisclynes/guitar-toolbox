import React from 'react';


import GuitarChord from 'react-guitar-chords';

import "./ChordCard.css";

const ChordCard = ({chordData: {chordName, strings}}) => {
    return (
        <div className="chord-display-card" style={{margin: "1rem"}} >
            <GuitarChord 
                chordName={chordName} 
                frets= {strings.split(' ').map((item) => item.match(/[0-9]/) ? parseInt(item, 10): item.toLowerCase())}//convert string output from api to array of nums and string values
            />
        </div>
    )
}

export default ChordCard;