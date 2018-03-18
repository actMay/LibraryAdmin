import React,{ Component } from 'react';
import { Input, Button, Table } from 'antd';
import axios from 'axios';

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
  title: '书籍类别',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '书籍作者',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '是否可借',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '数量',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <div>
      <Button type="dashed">编辑</Button>
      <Button type="danger">删除</Button>
      <Button type="">详情</Button>
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
export default class BookAdmin extends Component{
  constructor() {
    super()
  }
  componentDidMount() {
    axios.get('/api', {
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error);
    });
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
          <span className="bookAdminTitle">作者名称:</span>
          <div className="bookInput">
            <Input placeholder="请输入作者名称" type="text"/>
          </div>
        </div>
        <div className="bookAdminSearch">
          <span className="bookAdminTitle">书籍类型:</span>
          <div className="bookInput">
            <Input placeholder="请输入书籍类型" type="text"/>
          </div>
        </div>
        <Button type="primary" icon="search" className="bookAdminSearchBtn">搜索</Button>
        <Button type="primary" icon="plus" className="bookAdminAddBtn">增加</Button>
        <Table columns={columns} dataSource={data} bordered="true"/>
      </div>
    )
  }
}
