import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Select, Slider} from 'antd';
import { SoundOutlined } from '@ant-design/icons';

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
}

export default Metronome;