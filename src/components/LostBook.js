import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Table } from 'antd';

const columns = [{
  title: '序号',
  dataIndex: 'key',
  key: 'no'
}, {
  title: '书籍ID',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '书籍名称',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '丢失时间',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '丢失原因',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <div>
      <Button type="dashed">编辑</Button>
      <Button type="danger">删除</Button>
    </div>
  ),
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

class LostBookUI extends Component{
  constructor() {
    super();
    this.state={

    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <div className="bookAdminSearch">
          <span className="bookAdminTitle">书籍ID:</span>
          <div className="bookInput">
            <Input placeholder="请输入书籍ID" type="text"/>
          </div>
        </div>
        <div className="bookAdminSearch">
          <span className="bookAdminTitle">书籍名称:</span>
          <div className="bookInput">
            <Input placeholder="请输入书籍名称" type="text"/>
          </div>
        </div>
        <div className="bookAdminSearch">
          <span className="bookAdminTitle">丢失时间:</span>
          <div className="bookInput">
            <Input placeholder="请输入丢失时间" type="text"/>
          </div>
        </div>
        <Button type="primary" icon="search" className="bookAdminSearchBtn">搜索</Button>
        <Button type="primary" icon="plus" className="bookAdminAddBtn">增加</Button>
        <Table columns={columns} dataSource={data} bordered="true"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    active: state
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    create: () => {
      dispatch({
        type: 'create',
        payload: '123'
      })
    }
  }
}

const LostBook = connect(
  mapStateToProps,
  mapDispatchToProps
)(LostBookUI);

export default LostBook;
