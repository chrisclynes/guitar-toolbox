import React from 'react';
import { Table, Button } from 'antd';
import { db } from '../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

// const docRef = doc(db, "UserData")
// const data = await getDoc(docRef)

const columns = [
  {
    title: 'Practice',
    dataIndex: 'task',
  },
  {
    title: 'Time (min)',
    dataIndex: 'time',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
];

const data = [];
for (let i = 0; i < 16; i++) {
  data.push({
    key: i,
    task: `Strumming ${i}`,
    time: 10,
    description: `Learn a 2/4 strumming pattern  and do some other stuff${i}`,
  });
}

class Tasks extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ margin: "1rem" }}>
          <Button type="default" onClick={() => {}}>
            Add Practice
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table  columns={columns} dataSource={data} />
      </div>
    );
  }
}


export default Tasks;