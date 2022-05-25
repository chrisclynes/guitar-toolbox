import React from 'react';
import { Card } from "antd";


import GuitarChord from 'react-guitar-chords';

import "./ChordCard.css";

const ChordCard = ({chordData: {chordName, strings}}) => {
    return (
        <Card>
            <GuitarChord 
                chordName={chordName} 
                frets= {strings.split(' ').map((item) => item.match(/[0-9]/) ? parseInt(item, 10): item.toLowerCase())}//convert string output from api to array of nums and string values
            />
        </Card>
    )
}

export default ChordCard;