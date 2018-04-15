import React,{ Component } from 'react';
import axios from 'axios';
import { Modal, Input, Button, Table, Select, notification, Popconfirm, message } from 'antd';
const Option = Select.Option;

export default class BookAdmin extends Component{
  constructor() {
    super()
    this.state={
      'data': [],
      'visible': false,
      'loading': false,
      'modalType': '',
      'sort': '',
      'Editvisible': false,
      'EditBookId': ''
    }
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.addBook = this.addBook.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.userSearch = this.userSearch.bind(this)
    this.BookEdit = this.BookEdit.bind(this)
    this.confirm = this.confirm.bind(this)
    this.cancel = this.cancel.bind(this)
    this.getData = this.getData.bind(this)
    this.EdithandleOk = this.EdithandleOk.bind(this)
    this.EdithandleCancel = this.EdithandleCancel.bind(this)
  }
  componentDidMount() {

  }
  getData() {
    axios.get('/api/bookInfo',{

    }).then((response)=>{
      var data = response.data
      data.map((value, index) => {
        if(value.isLend==1) {
          value.isLend = '可借'
        }else{
          value.isLend = '不可借'
        }
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
    var oldId = this.state.EditBookId
    var bookId = this.refs.EditUserId.input.value
    var bookName = this.refs.EditUserName.input.value
    var sort = this.refs.EditUserPass.input.value
    var author = this.refs.EditUserType.input.value
    var isLend = this.refs.EditUserSex.input.value == '可借' ? 1 : 0
    var location = this.refs.EditUserCollege.input.value
    if(oldId, bookId) {
        axios.post('/api/bookInfo/EditBook',{
          'oldId': oldId,
          'bookId': bookId,
          'bookName': bookName,
          'sort': sort,
          'author': author,
          'isLend': isLend,
          'location': location,
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
    var bookId = this.refs.bookId.input.value
    var bookName = this.refs.bookName.input.value
    var bookSort = this.refs.bookSort.input.value
    var author = this.refs.author.input.value
    var isLend = this.refs.isLend.input.value == "可借" ? 1 : 0
    var location = this.refs.location.input.value
    if(bookId&&bookName&&bookSort&&author&&location) {
        axios.post('/api/bookInfo/addBook',{
          'bookId': bookId,
          'bookName': bookName,
          'bookSort': bookSort,
          'author': author,
          'isLend': isLend,
          'location': location
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
  addBook() {
    this.setState({
      visible: true,
      modalType: '增加书籍'
    })
  }
  handleChange(value) {
    this.setState({
      'sort': value
    })
  }
  userSearch() {
    var that = this;
    axios.get('/api/bookInfo/searchBook',{
      params: {
        'bookId': that.refs.searchBookId.input.value,
        'bookName': that.refs.searchBookName.input.value,
        'sort': that.refs.searchBookSort.input.value,
        'author': that.refs.searchAuthor.input.value
      }
    }).then((response) =>{
      var data = response.data
      data.map((value, index) => {
        if(value.isLend==1) {
          value.isLend = '可借'
        }else{
          value.isLend = '不可借'
        }
        return value.no = index+1
      })
      this.setState({
        'data': data
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  BookEdit(value) {
    this.setState({
      Editvisible: true,
      EditBookId: value
    })
    axios.get('/api/bookInfo/EditCurrentBookInfo',{
      params: {
        'bookId': value
      }
    }).then((response) =>{
      this.refs.EditUserId.input.value = response.data[0].bookId
      this.refs.EditUserName.input.value = response.data[0].bookName
      this.refs.EditUserPass.input.value = response.data[0].sort
      this.refs.EditUserType.input.value = response.data[0].author
      this.refs.EditUserSex.input.value = response.data[0].isLend == 1 ? '可借' : '不可借'
      this.refs.EditUserCollege.input.value = response.data[0].location
    }).catch((error)=>{
      console.log(error)
    })
  }
  confirm(value) {
    message.success('Click on Yes');
    axios.post('/api/bookInfo/delBook', {
      'bookId': value
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
      title: '书籍ID',
      dataIndex: 'bookId',
      key: 'bookId',
    }, {
      title: '书籍名称',
      dataIndex: 'bookName',
      key: 'bookName',
    }, {
      title: '书籍类别',
      dataIndex: 'sort',
      key: 'sort',
    }, {
      title: '书籍作者',
      dataIndex: 'author',
      key: 'author',
    }, {
      title: '是否可借',
      dataIndex: 'isLend',
      key: 'isLend',
    }, {
      title: '书籍位置',
      dataIndex: 'location',
      key: 'location',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
        <div className="editBtn">
          <Button type="dashed" onClick={this.BookEdit.bind(this, record.bookId)}>编辑</Button>
        </div>
          <div className="delBtn">
            <Button type="danger">
              <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm.bind(this, record.bookId)} onCancel={this.cancel} okText="Yes" cancelText="No">
                <a href="#">删除</a>
              </Popconfirm>
            </Button>
          </div>
        </div>
      ),
    }];
    return (
      <div>
        <div className="Breadcrumb">书籍信息/书籍信息管理</div>
        <div className="bookAdminSearch">
          <span className="bookAdminTitle">书籍ID:</span>
          <div className="bookInput">
            <Input placeholder="请输入书籍ID" type="text" ref="searchBookId"/>
          </div>
        </div>
        <div className="bookAdminSearch">
          <span className="bookAdminTitle">书籍名称:</span>
          <div className="bookInput">
            <Input placeholder="请输入书籍名称" type="text" ref="searchBookName"/>
          </div>
        </div>
        <div className="bookAdminSearch">
          <span className="bookAdminTitle">作者名称:</span>
          <div className="bookInput">
            <Input placeholder="请输入作者名称" type="text" ref="searchAuthor"/>
          </div>
        </div>
        <div className="bookAdminSearch">
          <span className="bookAdminTitle">书籍类型:</span>
          <div className="bookInput">
            <Input placeholder="请输入书籍类型" type="text" ref="searchBookSort"/>
          </div>
        </div>
        <Button type="primary" icon="search" className="bookAdminSearchBtn" onClick={this.userSearch}>搜索</Button>
        <Button type="primary" icon="plus" className="bookAdminAddBtn" onClick={this.addBook}>增加</Button>
        <Table columns={columns} dataSource={this.state.data} bordered pagination={{pageSize: 5}}/>
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
            <div className="bookUserId">书籍ID:</div>
            <div className="bookInput">
              <Input ref="bookId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍名称:</div>
            <div className="bookInput">
              <Input ref="bookName"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍类别:</div>
            <div className="bookInput">
              <Input ref="bookSort"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍作者:</div>
            <div className="bookInput">
              <Input ref="author"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">是否可借:</div>
            <div className="bookInput">
              <Input ref="isLend"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍位置:</div>
            <div className="bookInput">
              <Input ref="location"/>
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
            <div className="bookUserId">书籍ID:</div>
            <div className="bookInput">
              <Input ref="EditUserId"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍名称:</div>
            <div className="bookInput">
              <Input ref="EditUserName"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍类别:</div>
            <div className="bookInput">
              <Input ref="EditUserPass"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍作者:</div>
            <div className="bookInput">
              <Input ref="EditUserType"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">是否可借:</div>
            <div className="bookInput">
              <Input ref="EditUserSex"/>
            </div>
          </div>
          <div className="bookAdminForm">
            <div className="bookUserId">书籍位置:</div>
            <div className="bookInput">
              <Input ref="EditUserCollege"/>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
