import React from 'react';
import { Progress, Typography } from 'antd';

const ProgressBar = ({title, item}) => (
  <>
    <Typography.Title level={2} style={{padding: "1.5rem 0.5rem 0rem 0.5rem"}} >{title}</Typography.Title>
    <Progress type="circle" percent={100} status="active" style={{padding: "2rem"}} format={() => item} />
  </>
);

export default ProgressBar;