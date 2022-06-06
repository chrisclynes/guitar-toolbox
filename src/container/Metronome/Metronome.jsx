import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Select, Slider} from 'antd';



const Metronome = () => {
    const [metronomeData, setMetronomeData] = useState({
        bpm: 90,
        count: "",
        measure: 4
    });
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        console.log(isPlaying)
    }, [isPlaying])

    const { bpm, count, measure } = metronomeData;
    return (
        <Card title="Metronome" style={{width: "280px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Space style={{flexDirection: "column"}}>
                    <Typography.Title>{`${bpm} bpm`}</Typography.Title>
                    <Slider min={0} max={300} defaultValue={90} style={{width: "200px"}} onChange={(val) => {setMetronomeData((prevState) => ({...prevState, bpm: val}))}}/>
                    {!isPlaying &&
                        <Button label="start" onClick={() => setIsPlaying(true)}>Start</Button>
                    }
                    {isPlaying &&
                        <Button label="stop" style={{color: "red"}} onClick={() => setIsPlaying(false)}>Stop</Button>
                    }
                </Space>
        </Card>
    )
}

export default Metronome;