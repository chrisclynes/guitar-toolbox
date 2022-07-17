import React from 'react';
import { Card, Image } from 'antd';


import './ScaleCard.css';

const ScaleCard = ({ title, image}) => {
    return (
        <Card title={title} style={{ margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Image
                width={250}
                src={image}
                alt="scale img"
            />
        </Card>
    )
}

export default ScaleCard;