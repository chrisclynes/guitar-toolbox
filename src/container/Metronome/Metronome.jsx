import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Button, Select, Slider} from 'antd';
import { SoundOutlined } from '@ant-design/icons';

const { Option } = Select;

//------------------Metronome Engine WebAudioAPI-----------------------
function convertToMs (bpm, duration, type) {
    return 60000 * 4 * duration * type / bpm
}

const aContext = new AudioContext();
const clickVolume = aContext.createGain();
var interval = null;
let lastClick = 0;

function metronomeEngine(audio, time, duration, volume) {
    let click = audio.createOscillator();
    click.connect( audio.destination );
    click.frequency.setValueAtTime(1700, 0)
    //volume gain set from -1 to 1 range, convert value 0-100 to correct gain range
    clickVolume.gain.linearRampToValueAtTime((volume / 50) - 1, 0);
    click.connect(clickVolume);
    clickVolume.connect(audio.destination);
    
    click.start(time);
    click.stop(time + duration);
}

//------------------Metronome Component-----------------------
const Metronome = ({metronomeInterval, isPlaying, setIsPlaying}) => {
  
  const [duration, setDuration] = useState(1 / 4);  
  const [type, setType] = useState(1);
  const [bpm, setBpm] = useState(90);
  const [volume, setVolume] = useState(30);   
  
  const step = convertToMs(bpm, duration, type) / 1000;
    const lookAhead = step / 2;
  
  const timer = () => {
    const diff = aContext.currentTime - lastClick;
    if (diff >= lookAhead) {
     const nextClick = lastClick + step;
     metronomeEngine(aContext, nextClick, 0.0050, volume)
     lastClick = nextClick;
    }
  }
  
  const startPlaying = () => {
    aContext.resume()
    setIsPlaying(true);
  }
  
  const stopPlaying = () => {
    clearInterval(metronomeInterval.current);
    setIsPlaying(false);
  }
  
  const handleStartStopClick = () => {
    if(isPlaying){
        stopPlaying();
    }else {
        startPlaying();
        }
    }

    //clears metronomeInterval based on state change, have to use a use Effect for this, otherwise it will continue playing
    useEffect(() => {
    if (isPlaying) {
        clearInterval(metronomeInterval.current);
      metronomeInterval.current = setInterval(timer, step / 4);
    }
  });

  useEffect(() => {
      clearInterval(metronomeInterval.current)
      setIsPlaying(false)
  }, []);

  
  return (
    <Card title="Metronome" style={{width: "280px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Space style={{flexDirection: "column"}}>
                <Typography.Title>{`${bpm} bpm`}</Typography.Title>
                <Slider min={30} max={240} defaultValue={bpm} style={{width: "200px"}} onChange={(val) => setBpm(val)}/>
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
                        <Option value={1 / 8}>8th </Option>
                        <Option value={1 / 16}>16th</Option>
                      </Select> 
                      <Select id="typ" onChange={(val) => setType(val)} value={type}>
                        <Option value={1}>None</Option>
                        <Option value={3 / 2}>Dotted</Option>
                        <Option value={2 / 3}>Triplet</Option>
                      </Select>
                    </Space>
                </div>
                <div className="metronome-volume center-items" style={{flexDirection: "row"}}>
                    <SoundOutlined />
                    <Slider min={0} max={100} defaultValue={volume} style={{width: "100px"}} onChange={(val) => setVolume(val)}/>
                </div>
            </Space>
    </Card>
  )
}

export default Metronome;