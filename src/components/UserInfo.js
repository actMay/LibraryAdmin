import React,{ Component } from 'react';
import axios from 'axios';
import { Modal, Input, Button, Table, Select, notification, Popconfirm, message, Upload, Icon } from 'antd';
const Option = Select.Option;

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
      'EditUserId': ''
    }
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.addUser = this.addUser.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.userSearch = this.userSearch.bind(this)
    this.UserEdit = this.UserEdit.bind(this)
    this.confirm = this.confirm.bind(this)
    this.cancel = this.cancel.bind(this)
    this.getData = this.getData.bind(this)
    this.EdithandleOk = this.EdithandleOk.bind(this)
    this.EdithandleCancel = this.EdithandleCancel.bind(this)
  }
  getData() {
    axios.get('/api/userInfo',{

    }).then((response)=>{
      axios.get('/api/system/getData').then((res)=>{
        var sysData = res.data[0];
        var data = response.data
        data.map((value, index) => {
          if(!value.borBook) {
            value.borBook = 0
          }
          if(value.isTeacher=='学生'&&value.borBook>=sysData.stuMaxNum) {

            value.borBook = value.borBook + '本(不可再借)'
          }else if(value.isTeacher=='老师'&&value.borBook>=sysData.teacherMaxNum) {
            value.borBook = value.borBook + '本(不可再借)'
          }else{
            value.borBook = value.borBook + '本'
          }
          return value.no = index+1
        })
        this.setState({
          'data': data
        })
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
    var userCollege = this.refs.EditUserCollege.input.value
    var userDepart = this.refs.EditUserDepart.input.value
    if(userId&&userName&&userPass&&userType&&userSex&&userCollege&&userDepart) {
        var file = document.getElementById("uploadUserPic").files[0];
        console.log(file)
        var formData=new FormData();
        formData.append('img',file);
        formData.append('oldId',oldId);
        formData.append('userId',userId);
        formData.append('userName',userName);
        formData.append('userPass',userPass);
        formData.append('userType',userType);
        formData.append('userSex',userSex);
        formData.append('userCollege',userCollege);
        formData.append('userDepart',userDepart);
        axios.post('/api/userInfo/EditUser',
        formData,
        'headers':{
            'Content-type': 'application/x-www-form-urlencoded'
        },
      ).then((response) => {
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
    var userCollege = this.refs.userCollege.input.value
    var userDepart = this.refs.userDepart.input.value
    if(userId&&userName&&userPass&&userType&&userSex&&userCollege&&userDepart) {
        axios.post('/api/userInfo/addUser',{
          'userId': userId,
          'userName': userName,
          'userPass': userPass,
          'userType': userType,
          'userSex': userSex,
          'userCollege': userCollege,
          'userDepart': userDepart
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
          this.refs.userId.input.value = '';
          this.refs.userName.input.value = '';
          this.refs.userPass.input.value = '';
          this.refs.userType.input.value = '';
          this.refs.userSex.input.value = '';
          this.refs.userCollege.input.value = '';
          this.refs.userDepart.input.value = '';
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
  handleChange(value) {
    if(value === '全部') {
      this.setState({
        'sort': ''
      })
    }else{

      this.setState({
        'sort': value
      })
    }
  }
  userSearch() {
    var that = this;
    axios.get('/api/userInfo/searchUser',{
      params: {
        'userId': that.refs.searchUserId.input.value,
        'userName': that.refs.searchUserName.input.value,
        'userSort': that.state.sort
      }
    }).then((response) =>{
      var data = response.data
      console.log(data)
      data.map((value, index) => {
        if(!value.borBook) {
          value.borBook = 0
        }
        value.borBook = value.borBook + '本'
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
    axios.get('/api/userInfo/EditCurrentUserInfo',{
      params: {
        'userId': value
      }
    }).then((response) =>{
      var img = document.getElementById("uploadImg");
      this.refs.EditUserId.input.value = response.data[0].userId
      this.refs.EditUserName.input.value = response.data[0].userName
      this.refs.EditUserPass.input.value = response.data[0].password
      this.refs.EditUserType.input.value = response.data[0].isTeacher
      this.refs.EditUserSex.input.value = response.data[0].sex
      this.refs.EditUserCollege.input.value = response.data[0].college
      this.refs.EditUserDepart.input.value = response.data[0].department
      img.src = "http://localhost:4000/upload/"+response.data[0].pic
    }).catch((error)=>{
      console.log(error)
    })
  }
  confirm(value) {
    console.log(value)
    message.success('Click on Yes');
    axios.post('/api/userInfo/delUser', {
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
      title: '读者ID',
      dataIndex: 'userId',
      key: 'userId',
    }, {
      title: '姓名',
      key: 'userName',
      dataIndex: 'userName'
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },{
      title: '读者类别',
      dataIndex: 'isTeacher',
      key: 'sort',
    }, {
      title: "借书本书",
      dataIndex: 'borBook',
      key: 'borBook',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
        <div>
          <div className="editBtn">
            <Button type="dashed" onClick={this.UserEdit.bind(this, record.userId)}>编辑</Button>
          </div>
          <div className="delBtn">
            <Button type="danger">
              <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm.bind(this, record.userId)} onCancel={this.cancel} okText="Yes" cancelText="No">
                <a href="#">删除</a>
              </Popconfirm>
            </Button>
          </div>
        </div>
      )},
    }];
    return (
      <div>
        <div className="Breadcrumb">用户信息/读者信息管理</div>
        <div>
          <div className="bookAdminSearch">
            <span className="bookAdminTitle">读者ID:</span>
            <div className="bookInput">
              <Input placeholder="请输入读者ID" type="text" ref="searchUserId"/>
            </div>
          </div>
          <div className="bookAdminSearch">
            <span className="bookAdminTitle">读者姓名:</span>
            <div className="bookInput">
              <Input placeholder="请输入读者姓名" type="text" ref="searchUserName"/>
            </div>
          </div>
          <div className="bookAdminSearch">
            <span className="bookAdminTitle">读者类别:</span>
            <div className="bookInput">
            <Select defaultValue="全部" onChange={this.handleChange}>
              <Option value="全部">全部</Option>
              <Option value="学生">学生</Option>
              <Option value="老师">老师</Option>
            </Select>
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
            <div className="bookUserId">用户ID:</div>
            <div className="bookInput">
              <Input ref="userId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">用户姓名:</div>
            <div className="bookInput">
              <Input ref="userName"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">用户密码:</div>
            <div className="bookInput">
              <Input ref="userPass"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">用户类型:</div>
            <div className="bookInput">
              <Input ref="userType"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">用户性别:</div>
            <div className="bookInput">
              <Input ref="userSex"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">学院:</div>
            <div className="bookInput">
              <Input ref="userCollege"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">专业:</div>
            <div className="bookInput">
              <Input ref="userDepart"/>
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
            <div className="bookUserId">用户ID:</div>
            <div className="bookInput">
              <Input ref="EditUserId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">用户姓名:</div>
            <div className="bookInput">
              <Input ref="EditUserName"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">用户密码:</div>
            <div className="bookInput">
              <Input ref="EditUserPass"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">用户类型:</div>
            <div className="bookInput">
              <Input ref="EditUserType"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">用户性别:</div>
            <div className="bookInput">
              <Input ref="EditUserSex"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">学院:</div>
            <div className="bookInput">
              <Input ref="EditUserCollege"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">专业:</div>
            <div className="bookInput">
              <Input ref="EditUserDepart"/>
            </div>
          </div>
          <img src="" alt="请上传图片" id="uploadImg" className="picImgClass"/>
          <input type="file" id="uploadUserPic" name="img"/>
        </Modal>
      </div>
    )
  }
}
