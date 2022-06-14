import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Select, Slider} from 'antd';



// var clickSound = new Tone.Player('../../Sounds/clickSound.wav').toDestination()
// var beatSound = new Tone.Player('../../Sounds/beatSound.wav').toDestination()



const Metronome = () => {
    const [metronomeData, setMetronomeData] = useState({
        bpm: 90,
        count: 0,
        measure: 3
    });
    const [isPlaying, setIsPlaying] = useState(false); 
    const { bpm, count, measure } = metronomeData;//destructure state

    
    // const playClick = () => {
    //     // console.log('here')
    //     // if(count == 0){
    //         beat.play()
    //     // }else {
    //     //     click.play()
    //     // }
    //     // setMetronomeData((prevState) => ({
    //     //     ...prevState,
    //     //     count: (count + 1) % measure
    //     // }))
    // }

    // const clickTime = new AccurateTime((60000 / bpm))

    const handleStartStopClick = () => {
        if(!isPlaying){
           
            setIsPlaying(true)
            
        }else {
            
            setIsPlaying(false)
        } 
    }
    
    return (
        <Card title="Metronome" style={{width: "280px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Space style={{flexDirection: "column"}}>
                    <Typography.Title>{`${bpm} bpm`}</Typography.Title>
                    <Slider min={30} max={300} defaultValue={90} style={{width: "200px"}} onChange={(val) => {setMetronomeData((prevState) => ({...prevState, bpm: val}))}}/>
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