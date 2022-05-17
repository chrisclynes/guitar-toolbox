import React from 'react';


import GuitarChord from 'react-guitar-chords';

import "./ChordCard.css";

const ChordCard = ({chordData: {root, quality}}) => {
    return (
        <div className="chord-display-card" style={{margin: "1rem"}} >
            <GuitarChord 
                chordName='C Major' 
                frets={['x', 3, 2, 0, 1, 0]} 
            />
        </div>
    )
}

export default ChordCard;