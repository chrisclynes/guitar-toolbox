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

    useEffect(() => {
        let counter = count;//uses vals from state but state not updated each time. run within this effect only
            const time = setInterval(() => {
                if(isPlaying) {
                    if(counter == 0) {
                        beat.play();
                    }else {
                        click.play();
                    }
                   counter = (counter + 1) % measure
                   console.log(counter)
                }
            }, (60000 / bpm));
            return () => clearInterval(time);//clears interval if isPlaying changes back to false
    }, [isPlaying, metronomeData])

    const handleStartStopClick = () => {
        if(isPlaying) {
            setIsPlaying(false)      
        }else {
            setMetronomeData((prevState) => ({
                ...prevState,
                count: 0,
            }))
            setIsPlaying(true);
        }
    }
    
    return (
        <Card title="Metronome" style={{width: "280px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Space style={{flexDirection: "column"}}>
                    <Typography.Title>{`${bpm} bpm`}</Typography.Title>
                    <Slider min={0} max={300} defaultValue={90} style={{width: "200px"}} onChange={(val) => {setMetronomeData((prevState) => ({...prevState, bpm: val}))}}/>
                    {!isPlaying &&
                        <Button label="start" onClick={() => handleStartStopClick()}>Start</Button>
                    }
                    {isPlaying &&
                        <Button label="stop" style={{color: "red"}} onClick={() => handleStartStopClick()}>Stop</Button>
                    }
                </Space>
        </Card>
    )
}

export default Metronome;