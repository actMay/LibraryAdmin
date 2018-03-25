import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Menu, Icon, Button, Breadcrumb  } from 'antd';
import LostBook from './../components/LostBook.js';
import BookAdmin from './../components/BookAdmin.js';
import UserInfo from './../components/UserInfo.js';
import BorBookInfo from './../components/BorBookInfo.js';
import ReturnBookInfo from './../components/ReturnBookInfo.js';
import BorBookAccess from './../components/BorBookAccess.js';
const SubMenu = Menu.SubMenu;

export default class Routers extends Component{
  constructor() {
    super();
    this.state={
      'path': ''
    }
  }
  componentDidMount() {
    let matchPath = {
      '': '书籍信息管理',
      'lostBook': '丢失书籍管理',
      'userInfo': '读者信息管理',
      'borBookLoss': '借书证挂失',
      'borBookInfo': '借书信息管理',
      'returnBookInfo': '还书信息管理',
      'borBookAccess': '系统信息设置',
    };
    let nowPath = window.location.href.split("//")[1].split('/')[1];
    this.setState({
      'path': matchPath[nowPath]
    })
  }
  componentWillUpdate() {
    // let matchPath = {
    //   '': '书籍信息管理',
    //   'lostBook': '丢失书籍管理',
    //   'newBook': '新书推荐',
    //   'userInfo': '读者信息管理',
    //   'borBookLoss': '借书证挂失',
    //   'borBookInfo': '借书信息管理',
    //   'returnBookInfo': '还书信息管理',
    //   'borBookAccess': '借书权限设置',
    //   'overdueFine': '超期罚款'
    // };
    // let nowPath = window.location.href.split("//")[1].split('/')[1];
    // this.setState({
    //   'path': matchPath[nowPath]
    // })
  }
  render() {
      return (
            <Router>
              <div className="body">
                <div className="header">
                  <img src="/assets/logo.jpg" className="logo"/>
                  <h1 className="title">图书馆管理系统</h1>
                </div>
                <div className="container">
                  <div style={{ width: 256 }} className="tab">
                    <Menu
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      mode="inline"
                      theme="dark"
                    >
                      <SubMenu key="sub1" title={<span><Icon type="mail" /><span>书籍信息</span></span>}>
                        <Menu.Item key="1"><Link to="/">书籍信息管理</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/lostBook">丢失书籍管理</Link></Menu.Item>
                      </SubMenu>
                      <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>用户信息</span></span>}>
                        <Menu.Item key="4"><Link to="/userInfo">读者信息管理</Link></Menu.Item>
                      </SubMenu>
                      <SubMenu key="sub3" title={<span><Icon type="pie-chart" /><span>借阅信息</span></span>}>
                        <Menu.Item key="6"><Link to="/borBookInfo">借书信息管理</Link></Menu.Item>
                        <Menu.Item key="7"><Link to="/returnBookInfo">还书信息管理</Link></Menu.Item>
                      </SubMenu>
                      <Menu.Item key="8"><Link to="/borBookAccess">系统信息设置</Link></Menu.Item>

                    </Menu>
                  </div>
                  <div className="rootBody">
                    <Breadcrumb className="Breadcrumb">
                      <Breadcrumb.Item href="/">
                        <Icon type="home" />
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href="">
                        <Icon type="user" />
                        <span>{ this.state.path }</span>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                    <Switch>

                      <Route exact path="/" component={BookAdmin}/>
                      <Route path="/lostBook" component={LostBook}/>
                      <Route path="/userInfo" component={UserInfo}/>
                      <Route path="/borBookInfo" component={BorBookInfo}/>
                      <Route path="/returnBookInfo" component={ReturnBookInfo}/>
                      <Route path="/borBookAccess" component={BorBookAccess}/>
                    </Switch>
                  </div>
                </div>
              </div>
            </Router>
      );
  }
}
