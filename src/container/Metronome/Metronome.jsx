import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Select, Slider} from 'antd';
import { SoundOutlined } from '@ant-design/icons';

// const Metronome = () => {
//     const [metronomeData, setMetronomeData] = useState({
//         bpm: 90,
//         count: 0,
//         measure: 3
//     });
//     const [isPlaying, setIsPlaying] = useState(false); 
//     const { bpm, count, measure } = metronomeData;//destructure state

    
//     // const playClick = () => {
//     //     // console.log('here')
//     //     // if(count == 0){
//     //         beat.play()
//     //     // }else {
//     //     //     click.play()
//     //     // }
//     //     // setMetronomeData((prevState) => ({
//     //     //     ...prevState,
//     //     //     count: (count + 1) % measure
//     //     // }))
//     // }

//     // const clickTime = new AccurateTime((60000 / bpm))

//     const handleStartStopClick = () => {
//         if(!isPlaying){
           
//             setIsPlaying(true)
            
//         }else {
            
//             setIsPlaying(false)
//         } 
//     }
    
//     return (
//         <Card title="Metronome" style={{width: "280px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
//                 <Space style={{flexDirection: "column"}}>
//                     <Typography.Title>{`${bpm} bpm`}</Typography.Title>
//                     <Slider min={30} max={300} defaultValue={90} style={{width: "200px"}} onChange={(val) => {setMetronomeData((prevState) => ({...prevState, bpm: val}))}}/>
                    // {!isPlaying &&
                    //     <Button label="start" onClick={() => handleStartStopClick()}>Start</Button>
                    // }
                    // {isPlaying &&
                    //     <Button label="stop" style={{color: "red"}} onClick={() => handleStartStopClick()}>Stop</Button>
                    // }
//                 </Space>
//         </Card>
//     )
// }
const { Option } = Select;
const { Meta } = Card;

function noteDurationToMs (bpm, duration, type) {
    return 60000 * 4 * duration * type / bpm
}
const aContext = new AudioContext();
let interval, lastNote = 0;

function scheduleClick(audio, time, duration) {
    let click = audio.createOscillator();
    click.connect( audio.destination );
    click.frequency.setValueAtTime(1800, 0)
    
    click.start(time);
    click.stop(time + duration);
}

const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(1 / 4);  
  const [type, setType] = useState(1);
  const [bpm, setBpm] = useState(100);
  const [volume, setVolume] = useState(50);   
  
  const step = noteDurationToMs(bpm, duration, type) / 1000;
    const lookAhead = step / 2;
  
  const timer = () => {
    const diff = aContext.currentTime - lastNote;
    if (diff >= lookAhead) {
     const nextNote = lastNote + step;
     scheduleClick(aContext, nextNote, 0.0050)
     lastNote = nextNote;
    }
  }
  
  const startPlaying = () => {
    aContext.resume()
    setIsPlaying(true);
  }
  
  const stopPlaying = () => {
    clearInterval(interval);
    setIsPlaying(false);
  }
  
  const handleStartStopClick = () => {
    if(isPlaying){
        stopPlaying();
    }else {
        startPlaying();
        }
    }

    //clears interval based on state change, have to use a use Effect for this, otherwise it will continue playing
    useEffect(() => {
    if (isPlaying) {
        clearInterval(interval);
      interval = setInterval(timer, step / 4);
    }
  });
  
  return (
    <Card title="Metronome" style={{width: "280px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
            <Space style={{flexDirection: "column"}}>
                <Typography.Title>{`${bpm} bpm`}</Typography.Title>
                <Slider min={30} max={300} defaultValue={90} style={{width: "200px"}} onChange={(val) => setBpm(val)}/>
                {!isPlaying &&
                        <Button type="primary" label="start" size="large" onClick={() => handleStartStopClick()}>Start</Button>
                    }
                    {isPlaying &&
                        <Button type="danger" label="stop" size="large" onClick={() => handleStartStopClick()}>Stop</Button>
                    }
                <div className="metronome-options-constainer" style={{marginTop: "2rem"}}>
                    <Space>
                      <Select id="duration" onChange={(val) => setDuration(val)} value={duration}>
                        <Option value={1}>Whole</Option>
                        <Option value={1 / 2}>Half</Option>
                        <Option value={1 / 4}>Quarter</Option>
                        <Option value={1 / 8}>Eigth </Option>
                        <Option value={1 / 16}>Sixteenth</Option>
                        <Option value={1 / 32}>Thirtysecond</Option>
                      </Select> 
                      <Select id="typ" onChange={(val) => setType(val)} value={type}>
                        <Option value={1}>Regular</Option>
                        <Option value={3 / 2}>Dotted</Option>
                        <Option value={2 / 3}>Triplet</Option>
                      </Select>
                    </Space>
                </div>
                <div className="metronome-volume center-items" style={{flexDirection: "row"}}>
                    <SoundOutlined />
                    <Slider min={0} max={100} defaultValue={50} style={{width: "100px"}} onChange={(val) => setVolume(val)}/>
                </div>
            </Space>
    </Card>
)
    // return (
    // <Card>
    // <div>
    
    // <label for="bpm">BPM:</label>

    
    //   <input id="bpm" type="number" onChange={handleChangeBPM} value={bpm} />
    
    // <label for="duration">Duration:</label>
    
    // <select id="duration" onChange={handleChangeDur} value={duration}>
    //   <Option value={1}>Whole</Option>
    //   <Option value={1 / 2}>Half</Option>
    //   <Option value={1 / 4}>Quarter</Option>
    //   <Option value={1 / 8}>Eigth </Option>
    //   <Option value={1 / 16}>Sixteenth</Option>
    //   <Option value={1 / 32}>Thirtysecond</Option>
    // </select> 
    
    // <label for="typ">Type:</label>
    // <select id="typ" onChange={handleChangeType} value={type}>
    //   <Option value={1}>Regular</Option>
    //   <Option value={3 / 2}>Dotted</Option>
    //   <Option value={2 / 3}>Triplet</Option>
}

export default Metronome;