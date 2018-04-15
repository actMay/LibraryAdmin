import React,{ Component } from 'react';
import axios from 'axios';
import { Modal, Input, Button, Table, Select, notification, Popconfirm, message } from 'antd';
const Option = Select.Option;

export default class UserInfo extends Component{
  constructor() {
    super();
    this.state={
      'data': [],
      'visible': false,
      'loading': false,
      'modalType': '',
      'Editvisible': false,
      'EditUserId': ''
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
  }
  getData() {
    axios.get('/api/lostBook',{

    }).then((response)=>{
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
    var oldId = this.state.EditUserId
    var userId = this.refs.EditUserId.input.value
    var userName = this.refs.EditUserName.input.value
    var userPass = this.refs.EditUserPass.input.value
    var userType = this.refs.EditUserType.input.value
    var userSex = this.refs.EditUserSex.input.value
    if(userId&&userName&&userPass&&userType&&userSex) {
        axios.post('/api/lostBook/EditLostBook',{
          'oldId': oldId,
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
    var userId = this.refs.userId.input.value
    var userName = this.refs.userName.input.value
    var userPass = this.refs.userPass.input.value
    var userType = this.refs.userType.input.value
    var userSex = this.refs.userSex.input.value
    if(userId&&userName&&userPass&&userType&&userSex) {
        axios.post('/api/lostBook/addLostBook',{
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
      modalType: '增加记录'
    })
  }
  userSearch() {
    var that = this;
    if(!!that.refs.searchUserId.input.value||!!that.refs.searchUserName.input.value||!!that.refs.searchBookName.input.value) {

      axios.get('/api/lostBook/searchLostBook',{
        params: {
          'lostId': that.refs.searchUserId.input.value,
          'bookId': that.refs.searchUserName.input.value,
          'bookName': that.refs.searchBookName.input.value
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
    }else{
      that.getData();
    }
  }
  UserEdit(value) {
    this.setState({
      Editvisible: true,
      EditUserId: value
    })
    console.log(value)
    axios.get('/api/lostBook/EditCurrentLostBook',{
      params: {
        'userId': value
      }
    }).then((response) =>{
      this.refs.EditUserId.input.value = response.data[0].lostId
      this.refs.EditUserName.input.value = response.data[0].bookId
      this.refs.EditUserPass.input.value = response.data[0].bookName
      this.refs.EditUserType.input.value = response.data[0].lostTime
      this.refs.EditUserSex.input.value = response.data[0].lostReason
    }).catch((error)=>{
      console.log(error)
    })
  }
  confirm(value) {
    console.log(value)
    message.success('Click on Yes');
    axios.post('/api/lostBook/delLostBook', {
      'userId': value
    }).then((response) => {
      if(response.data.resultCode=='000000') {
        this.getData()
      }
    }).catch((error) => {
      console.log(error)
    })
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
      title: '记录ID',
      dataIndex: 'lostId',
      key: 'lostId',
    }, {
      title: '书籍ID',
      key: 'bookId',
      dataIndex: 'bookId'
    }, {
      title: '书籍名称',
      dataIndex: 'bookName',
      key: 'bookName',
    },{
      title: '丢失时间',
      dataIndex: 'lostTime',
      key: 'lostTime',
    }, {
      title: "丢失原因",
      dataIndex: 'lostReason',
      key: 'lostReason',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
        <div>
          <div className="editBtn">
            <Button type="dashed" onClick={this.UserEdit.bind(this, record.lostId)}>编辑</Button>
          </div>
          <div className="delBtn">
            <Button type="danger">
              <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm.bind(this, record.lostId)} onCancel={this.cancel} okText="Yes" cancelText="No">
                <a href="#">删除</a>
              </Popconfirm>
            </Button>
          </div>
        </div>
      )},
    }];
    return (
      <div>
        <div className="Breadcrumb">书籍信息/丢失书籍管理</div>
        <div>
          <div className="bookAdminSearch">
            <span className="bookAdminTitle">记录ID:</span>
            <div className="bookInput">
              <Input placeholder="请输入读者ID" type="text" ref="searchUserId"/>
            </div>
          </div>
          <div className="bookAdminSearch">
            <span className="bookAdminTitle">书籍ID:</span>
            <div className="bookInput">
              <Input placeholder="请输入读者姓名" type="text" ref="searchUserName"/>
            </div>
          </div>
          <div className="bookAdminSearch">
            <span className="bookAdminTitle">书籍名称:</span>
            <div className="bookInput">
              <Input placeholder="请输入读者姓名" type="text" ref="searchBookName"/>
            </div>
          </div>
          <Button type="primary" icon="search" className="bookAdminSearchBtn" onClick={this.userSearch}>搜索</Button>
          <Button type="primary" icon="plus" className="bookAdminAddBtn" onClick={this.addUser}>增加</Button>
          <Table columns={columns} dataSource={this.state.data} bordered pagination={{pageSize: 5}}/>
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
            <div className="bookUserId">记录ID:</div>
            <div className="bookInput">
              <Input ref="userId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍ID:</div>
            <div className="bookInput">
              <Input ref="userName"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍名称:</div>
            <div className="bookInput">
              <Input ref="userPass"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">丢失时间:</div>
            <div className="bookInput">
              <Input ref="userType"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">丢失原因:</div>
            <div className="bookInput">
              <Input ref="userSex"/>
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
            <div className="bookUserId">记录ID:</div>
            <div className="bookInput">
              <Input ref="EditUserId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍ID:</div>
            <div className="bookInput">
              <Input ref="EditUserName"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍名称:</div>
            <div className="bookInput">
              <Input ref="EditUserPass"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">丢失时间:</div>
            <div className="bookInput">
              <Input ref="EditUserType"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">丢失原因:</div>
            <div className="bookInput">
              <Input ref="EditUserSex"/>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
