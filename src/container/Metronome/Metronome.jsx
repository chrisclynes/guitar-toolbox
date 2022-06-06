import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Select, Slider} from 'antd';

import clickSound from '../../Sounds/clickSound.wav';
import beatSound from '../../Sounds/beatSound.wav';

const click = new Audio(clickSound);
const beat = new Audio(beatSound);

const Metronome = () => {
    const [metronomeData, setMetronomeData] = useState({
        bpm: 90,
        count: 0,
        measure: 4
    });
    const [isPlaying, setIsPlaying] = useState(false); 
    const { bpm, count, measure } = metronomeData;//destructure state

    const playClick = () => {
        if(count % measure === 0) {
            beat.play();
        }else {
            click.play();
        }
        setMetronomeData((prevState) => ({
            ...prevState,
            count: (prevState.count + 1) % prevState.measure
        }))
    }

    const handleStartStopClick = (startStop) => {
        if(!isPlaying) {
            setIsPlaying(startStop);
            this.timer = setInterval(playClick(), (60 / metronomeData.bpm) * 1000);
            setMetronomeData((prevState) => ({
                ...prevState,
                count: 0,
            }))
        }else {
            clearInterval(this.timer)
            setIsPlaying(startStop)
        }

    }

    
    return (
        <Card title="Metronome" style={{width: "280px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Space style={{flexDirection: "column"}}>
                    <Typography.Title>{`${bpm} bpm`}</Typography.Title>
                    <Slider min={0} max={300} defaultValue={90} style={{width: "200px"}} onChange={(val) => {setMetronomeData((prevState) => ({...prevState, bpm: val}))}}/>
                    {!isPlaying &&
                        <Button label="start" onClick={() => handleStartStopClick(true)}>Start</Button>
                    }
                    {isPlaying &&
                        <Button label="stop" style={{color: "red"}} onClick={() => handleStartStopClick(false)}>Stop</Button>
                    }
                </Space>
        </Card>
    )
}

export default Metronome;