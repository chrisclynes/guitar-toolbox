import { Divider, Modal, Image, Typography, } from 'antd';
import images from '../../constants/images';

const { example_search } = images;

//----------------------Modal--------------------------------------------------
const info = () => {
    Modal.info({
      title: 'How to Serach for Chords',
      content: (
        <div>
          <Divider />
          <div>
                Select your basic options first, 
                then add additional chord information in the input box.
            </div>
            <br/>
            <div>
                You can chain additional chord infomation together.
            </div>
        <br/>
          <Typography.Title level={5}>
            Examples:
          </Typography.Title>
          <div style={{paddingLeft: "2rem"}}>
            <ul>
                <li>7</li>
                <li>dim</li>
                <li>aug</li>
                <li>7b5</li>
                <li>713</li>
                <li>maj79(add11)</li>
            </ul>
          </div>
          <Image src={example_search} alt="search example" />
          <br/>
          <div>
            If a match is not found, 
            A similar chord may be displayed.
          </div>
          <br/>
          <div>Chords tones will be displayed beneath the chord</div>
        </div>
      ),
      onOk() {},
    });
  };

  export default info