import React from "react";
import { Typography,  Select } from 'antd';

const { Option } = Select;
const numberOfFrets = 25;

const VoicingOption = ({string, stringIndex, voicingData, setVoicingData, isMobile }) => {

    const handleOptionData = (val) => {
        
        setVoicingData(prevState => ({ 
            strings: prevState.strings.map((element, i) => i === stringIndex ? element = val : element)//sets the index of state array to option input value
         }))   
    }

    return (
        <div>
            <Typography.Paragraph>{string}</Typography.Paragraph>
            <Select 
                getPopupContainer={trigger => trigger.parentNode}
                value={voicingData.strings[stringIndex]}
                label="voicing"
                style={isMobile ? {width: "60px"}: {width: "70px"}} 
                name="chord-voicing-selector" 
                onChange={(value) => handleOptionData(value)}>
                    <Option value="X">X</Option>
                    {
                        [...Array(numberOfFrets)].map((space, i) => {
                            return <Option key={i} value={i}>{i}</Option>
                        })
                    }
            </Select>
        </div>
        
    )
}

export default VoicingOption