import React from 'react';
import { Progress, Typography } from 'antd';

const ProgressBar = ({theme}) => (
  <>
    <Typography.Title theme={theme} level={2} style={{padding: "1.5rem 0.5rem 0rem 0.5rem"}} >Tasks Completion</Typography.Title>
    <Progress percent={77} status="active" style={{padding: "2rem"}} />
  </>
);

export default ProgressBar;