import React from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';


const handleDelete = (record) => {
console.log(record.id)
}
const columns = [
  {
    key: '1',
    title: 'Practice',
    dataIndex: 'task',
  },
  {
    key: '2',
    title: 'Time (min)',
    dataIndex: 'time',
  },
  {
    key: '3',
    title: 'Description',
    dataIndex: 'description',
  },
  {
    key: '4',
    title: '',
    render:(record) => {
      return (
      <>
         <DeleteOutlined style={{color: "red"}} onClick={() => handleDelete(record)}/>
      </>
      )
    }
  },
];


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
          <Button type="default" onClick={this.props.handleAddPractice}>
            Add Practice
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table  columns={columns} dataSource={this.props.routineData} />
      </div>
    );
  }
}


export default Tasks;