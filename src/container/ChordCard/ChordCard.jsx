import React from 'react';
import { Card } from "antd";


import GuitarChord from 'react-guitar-chords';
import { useEffect } from "react";

const ChordCard = ({chordName, strings, title, tones}) => {
    return (
        <Card title={title} style={{width: "190px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="center-items" style={{flexDirection: "column"}}>
                <GuitarChord 
                    chordName={chordName}
                    //convert string output from api to array of nums and string values 
                    frets= {strings.split(' ').map((item) => item.match(/[0-9]/) ? parseInt(item, 10): item.toLowerCase())}
                />
                <span style={{letterSpacing: ".15rem"}}>{tones}</span>
            </div> 
        </Card>
    )
}

export default ChordCard;