import React from 'react';


import GuitarChord from 'react-guitar-chord';

const ChordCard = ({chordData: {root, quality}}) => {
    return (
        <div className="chord-display-card">
            <GuitarChord chord={root} quality={quality} />
        </div>
    )
}

export default ChordCard;