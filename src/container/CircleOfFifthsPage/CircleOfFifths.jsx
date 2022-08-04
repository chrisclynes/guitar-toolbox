import React from 'react';
import { Layout, Typography, Divider } from 'antd';

const { Title } = Typography;

const CircleOfFifthsPage = () => {
 
    return (
        <Layout>
            <div className="page-container">
                <div className="CircleOfFifthsPage-title header-margin">
                        <Title>Circle Of Fifths</Title>
                        <h2>Use the Circle to discover new musical paths</h2>
                        <Divider />
                    </div>
                <div className="Circle-main-container">
                    {/*render circle here*/}
                </div>
            </div>
        </Layout>  
    )
}

export default CircleOfFifthsPage;