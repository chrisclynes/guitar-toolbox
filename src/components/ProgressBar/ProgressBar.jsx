import React from 'react';
import { Progress, Typography} from 'antd';

const ProgressBar = ({title, item, isMobile}) => (
  <>
  <div className='center-items' style={{textAlign: "center"}}>
    <Typography.Title 
      level={isMobile ? 5 : 4} 
      style={isMobile ? {padding: "0", margin: "0"}: {padding: "0rem 0.5rem 0rem 0.5rem"}} >
        {title}
    </Typography.Title>
    <Progress 
      type="circle" 
      width={isMobile? 60 : 110} 
      percent={100} status="active" 
      style={isMobile ? {padding: "0 1rem"} : {padding: "1rem"}} format={() => item} 
    />
    </div>
  </>
);

export default ProgressBar;