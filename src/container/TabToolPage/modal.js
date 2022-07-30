import { Divider, Modal } from 'antd';

const info = () => {
    Modal.info({
      title: 'How to use Tab Tool',
      content: (
        <div>
          <Divider />
          <div>
                Select fretted notes based on the fretboard number for each string.
            </div>
            <br/>
            <div>
                "0" is an open string.
            </div>
            <br/>
            <div>
                "X" is for a string not played, or muted.
            </div>
            <br/>
            <div>
                To determine a single note anywhere on the fretboard, set all strings to "X"
                except the intended note's string.
            </div>
            <br/>
            <div>
                A fret number may be displayed in the upper right corner for the current fret position.
            </div>
            <br/>
            <div>
                All tones will be display below the fretboard.
            </div>
        </div>
      ),
      onOk() {},
    });
  };

  export default info;