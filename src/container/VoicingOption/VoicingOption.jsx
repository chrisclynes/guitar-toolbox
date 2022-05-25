import React from "react";
import { Typography,  Select } from 'antd';

const { Option } = Select;



const VoicingOption = ({string, stringKey, setVoicingData}) => {

    const handleOptionData = (val) => {
        
        setVoicingData(prevState => ({ 
            strings: prevState.strings.map((el, i) => i == stringKey? el = val: el)//sets the index of state array to option input value
         }))   
    }

    return (
        <div>
            <Typography.Paragraph>{string}</Typography.Paragraph>
            <Select defaultValue="X" style={{width: "70px"}} name="chord-voicing-selector" onChange={(value) => handleOptionData(value)}>
                <Option value="X" >X</Option>
                <Option value="0" >0</Option>
                <Option value="1" >1</Option>
                <Option value="2" >2</Option>
                <Option value="3" >3</Option>
                <Option value="4" >4</Option>
                <Option value="5" >5</Option>
                <Option value="6" >6</Option>
                <Option value="7" >7</Option>
                <Option value="8" >8</Option>
                <Option value="9" >9</Option>
                <Option value="10" >10</Option>
                <Option value="11" >11</Option>
                <Option value="12" >12</Option>
                <Option value="13" >13</Option>
                <Option value="14" >14</Option>
                <Option value="15" >15</Option>
                <Option value="16" >16</Option>
                <Option value="17" >17</Option>
                <Option value="18" >18</Option>
                <Option value="19" >19</Option>
                <Option value="20" >20</Option>
                <Option value="21" >21</Option>
                <Option value="22" >22</Option>
                <Option value="23" >23</Option>
                <Option value="24" >24</Option>
            </Select>
        </div>
        
    )
}

export default VoicingOption