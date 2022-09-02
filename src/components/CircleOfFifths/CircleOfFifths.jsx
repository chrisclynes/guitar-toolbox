import React from 'react';
import { Card } from 'antd';


import './CircleOfFifths.css';
const circleOutside = ["G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F", "C"];
const circleInside = ["Em", "Bm", "F#m", "C#m", "G#m", "D#m", "Bbm", "Fm", "Cm", "Gm", "Dm", "Am"];


const CircleOfFifths = ({ title }) => {
    return (
        <Card title={title} style={{ margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="outer-cricle">
                <ul className="notes">
                    {circleOutside.map((item, i) => {
                        return (
                            <li className="main-note" key={i}>
                                <span>{item}</span>
                            </li>
                        )
                    })}
                    </ul>
                    <div className="inner-cricle">
                        <ul className="notes rel-notes">
                            {circleInside.map((item, i) => {
                                return (
                                    <li className="rel-note" key={i}>
                                        <span>{item}</span>
                                    </li>
                                )
                            })}
                            <div className="center-circle"></div>
                        </ul>
                    </div>
                
            </div>
        </Card>
    )
}

export default CircleOfFifths;