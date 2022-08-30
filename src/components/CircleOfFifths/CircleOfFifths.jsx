import React from 'react';
import { Card } from 'antd';


import './CircleOfFifths.css';
const circleOutside = ["C", "G", "D", "A", "E", "B", "Gb", "Db", "Ab", "Eb", "Bb", "F"];


const CircleOfFifths = ({ title, image}) => {
    return (
        <Card title={title} style={{ margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="outer-circle">
                {circleOutside.map((item, i) => {
                    return (
                        <div key={i} className={`outsideSlice${i}`}>{item}</div>
                    )
                })}
            </div>
            <div className="inner-circle"></div>
        </Card>
    )
}

export default CircleOfFifths;