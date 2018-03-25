import React,{ Component } from 'react';
import axios from 'axios';
import { Modal, Input, Button, Table, Select, notification, Popconfirm, message,DatePicker } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;

export default class UserInfo extends Component{
  constructor() {
    super();
    this.state={
      'data': [],
      'visible': false,
      'loading': false,
      'modalType': '',
      'sort': '',
      'Editvisible': false,
      'EditUserId': '',
      "time": ''
    }
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.addUser = this.addUser.bind(this)
    this.userSearch = this.userSearch.bind(this)
    this.UserEdit = this.UserEdit.bind(this)
    this.confirm = this.confirm.bind(this)
    this.cancel = this.cancel.bind(this)
    this.getData = this.getData.bind(this)
    this.EdithandleOk = this.EdithandleOk.bind(this)
    this.EdithandleCancel = this.EdithandleCancel.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  getData() {
    axios.get('/api/borBook',{

    }).then((response)=>{
      console.log(response)
      var data = response.data
      data.map((value, index) => {

        return value.no = index+1
      })
      this.setState({
        'data': data
      })
    }).catch((err)=>{
      console.log(err);
    })
  }
  componentDidMount() {
    this.getData()
  }
  EdithandleCancel() {
    this.setState({
      Editvisible: !this.state.Editvisible
    })
  }
  EdithandleOk() {
    this.setState({
      Editvisible: !this.state.Editvisible,
      Editloading: true
    })
    var EditBorId = this.refs.EditBorId.input.value
    var EditBorBookId = this.refs.EditBorBookId.input.value
    var EditBorTime = this.refs.EditBorTime.input.value
    var EditBorPerId = this.refs.EditBorPerId.input.value
    var EditBorDetail = this.refs.EditBorDetail.textAreaRef.value
    if(EditBorId&&EditBorBookId&&EditBorTime&&EditBorPerId&&EditBorDetail) {
        axios.post('/api/borBook/EditBor',{
          'oldId': this.state.EditUserId,
          'EditBorId': EditBorId,
          'EditBorBookId': EditBorBookId,
          'EditBorTime': EditBorTime,
          'EditBorPerId': EditBorPerId,
          'EditBorDetail': EditBorDetail,
        }).then((response) => {
          if(!(response.data.resultCode=='000000')) {
            notification.open({
              message: '操作失败',
              description: '您的操作失败，请检查且重新操作！',
            });
          }
          this.setState({
            'Editloading': false
          })
          this.getData()
        }).catch((err) => {
          console.log(err)
        })
    }
  }
  handleCancel() {
    this.setState({
      visible: !this.state.visible
    })
  }
  handleOk() {
    this.setState({
      visible: !this.state.visible,
      loading: true
    })
    var userId = this.refs.BorId.input.value
    var userName = this.refs.BorBookId.input.value
    var userPass = this.refs.BorTime.input.value
    var userType = this.refs.BorPerId.input.value
    var userSex = this.refs.BorDetail.textAreaRef.value
    if(userId&&userName&&userPass&&userType&&userSex) {
        axios.post('/api/borBook/addBor',{
          'userId': userId,
          'userName': userName,
          'userPass': userPass,
          'userType': userType,
          'userSex': userSex,
        }).then((response) => {
          if(!(response.data.resultCode=='000000')) {
            notification.open({
              message: '操作失败',
              description: '您的操作失败，请检查且重新操作！',
            });
          }
          this.setState({
            'loading': false
          })
          this.getData()
        }).catch((err) => {
          console.log(err)
        })
    }
  }
  addUser() {
    this.setState({
      visible: true,
      modalType: '增加用户'
    })
  }
  userSearch() {
    var that = this;
    axios.get('/api/borBook/searchBor',{
      params: {
        'userId': that.refs.searchUserId.input.value,
        'userName': that.refs.searchUserName.input.value,
        'userSort': that.state.time
      }
    }).then((response) =>{
      var data = response.data
      console.log(data)
      data.map((value, index) => {
        return value.no = index+1
      })
      this.setState({
        'data': data
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  UserEdit(value) {
    this.setState({
      Editvisible: true,
      EditUserId: value
    })
    console.log(value)
    axios.get('/api/borBook/EditCurrentBorInfo',{
      params: {
        'borId': value
      }
    }).then((response) =>{
      this.refs.EditBorId.input.value = response.data[0].borId
      this.refs.EditBorBookId.input.value = response.data[0].bookId
      this.refs.EditBorTime.input.value = response.data[0].time
      this.refs.EditBorPerId.input.value = response.data[0].personId
      this.refs.EditBorDetail.textAreaRef.value = response.data[0].detail
    }).catch((error)=>{
      console.log(error)
    })
  }
  confirm(value) {
    console.log(value)
    message.success('Click on Yes');
    axios.post('/api/borBook/delBor', {
      'userId': value
    }).then((response) => {
      if(response.data.resultCode=='000000') {
        this.getData()
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  onChange(date, dateString) {
    this.state.time = dateString
    console.log(date, dateString);
  }
  cancel(e) {
    message.error('Click on No');
  }
  render() {
    const columns = [{
      title: '序号',
      dataIndex: 'no',
      key: 'no'
    }, {
      title: '借书ID',
      dataIndex: 'borId',
      key: 'borId',
    }, {
      title: '书籍ID',
      key: 'bookId',
      dataIndex: 'bookId'
    }, {
      title: '借书人ID',
      dataIndex: 'personId',
      key: 'personId',
    }, {
      title: '借书时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '备注',
      dataIndex: 'detail',
      key: 'detail',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
        <div>
          <div className="editBtn">
            <Button type="dashed" onClick={this.UserEdit.bind(this, record.borId)}>编辑</Button>
          </div>
          <div className="delBtn">
            <Button type="danger">
              <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm.bind(this, record.borId)} onCancel={this.cancel} okText="Yes" cancelText="No">
                <a href="#">删除</a>
              </Popconfirm>
            </Button>
          </div>
        </div>
      )},
    }];
    return (
      <div>
        <div>
          <div className="bookAdminSearch">
            <span className="bookAdminTitle">书籍ID:</span>
            <div className="bookInput">
              <Input placeholder="请输入读者ID" type="text" ref="searchUserId"/>
            </div>
          </div>
          <div className="bookAdminSearch">
            <span className="bookAdminTitle">借书人ID:</span>
            <div className="bookInput">
              <Input placeholder="请输入读者姓名" type="text" ref="searchUserName"/>
            </div>
          </div>
          <div className="bookAdminSearch">
            <span className="bookAdminTitle">借书时间:</span>
            <div className="bookInput">
              <div>
                <DatePicker onChange={this.onChange} />
              </div>
            </div>
          </div>
          <Button type="primary" icon="search" className="bookAdminSearchBtn" onClick={this.userSearch}>搜索</Button>
          <Button type="primary" icon="plus" className="bookAdminAddBtn" onClick={this.addUser}>增加</Button>
          <Table columns={columns} dataSource={this.state.data} bordered/>
        </div>
        <Modal
          title={this.state.modalType}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button type="primary" key="submit" loading={this.state.loading} onClick={this.handleOk}>
              保存
            </Button>,
          ]}
        >
          <div className="bookAdminForm">
            <div className="bookUserId">借书记录ID:</div>
            <div className="bookInput">
              <Input ref="BorId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍ID:</div>
            <div className="bookInput">
              <Input ref="BorBookId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">借出时间:</div>
            <div className="bookInput">
              <Input ref="BorTime"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">借书人ID:</div>
            <div className="bookInput">
              <Input ref="BorPerId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">备注:</div>
            <div className="bookInput">
              <TextArea rows={4} ref="BorDetail"/>
            </div>
          </div>
        </Modal>
        <Modal
          title="编辑信息"
          visible={this.state.Editvisible}
          onOk={this.EdithandleOk}
          onCancel={this.EdithandleCancel}
          footer={[
            <Button key="back" onClick={this.EdithandleCancel}>取消</Button>,
            <Button type="primary" key="submit" loading={this.state.Editloading} onClick={this.EdithandleOk}>
              保存
            </Button>,
          ]}
        >
          <div className="bookAdminForm">
            <div className="bookUserId">借书记录ID:</div>
            <div className="bookInput">
              <Input ref="EditBorId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍ID:</div>
            <div className="bookInput">
              <Input ref="EditBorBookId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">借出时间:</div>
            <div className="bookInput">
              <Input ref="EditBorTime"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">借书人ID:</div>
            <div className="bookInput">
              <Input ref="EditBorPerId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">备注:</div>
            <div className="bookInput">
              <TextArea rows={4} ref="EditBorDetail"/>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
