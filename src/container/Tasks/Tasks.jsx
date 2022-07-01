import React from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';

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
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = [
      {
        key: '1',
        title: 'Practice',
        dataIndex: 'task',
        width: '70%'
      },
      {
        key: '2',
        title: 'Time (min)',
        dataIndex: 'time',
        width: '10%',
        align: 'center'
        
      },
      {
        key: '3',
        title: '',
        width: '20%',
        align: 'center',
        render:(record) => {
          return (
          <>
            <CheckOutlined style={
                this.props.isMobile ? 
                {color: "green", margin: "1rem"} :
                {color: "green", margin: "0 1rem"}
              } 
              onClick={() => this.props.handleComplete(record)}
            />
            <DeleteOutlined style={
                this.props.isMobile ? 
                {color: "tomato", margin: "1rem"} :
                {color: "tomato", margin: "0 1rem"}
              } 
              onClick={() => this.props.handleDelete(record)}
            />
          </>
          )
        }
      },
    ];
    return (
      <div>
        <div style={{ margin: "1rem" }}>
          <Button type="default" disabled ={this.props.practiceData?.length > 20} onClick={this.props.handleAddPractice}>
            Add Practice
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table  columns={columns} dataSource={this.props.practiceData} />
      </div>
    );
  }
}


export default Tasks;