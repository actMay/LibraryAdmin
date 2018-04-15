import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Menu, Icon, Button  } from 'antd';
import LostBook from './../components/LostBook.js';
import BookAdmin from './../components/BookAdmin.js';
import UserInfo from './../components/UserInfo.js';
import BorBookInfo from './../components/BorBookInfo.js';
import ReturnBookInfo from './../components/ReturnBookInfo.js';
import BorBookAccess from './../components/BorBookAccess.js';
import Chart from './../components/charts.js';
const SubMenu = Menu.SubMenu;

export default class Routers extends Component{
  constructor() {
    super();
    this.state={
      'path': ''
    }
  }
  componentWillMount() {
    let matchPath = {
      '': '书籍信息管理',
      'lostBook': '丢失书籍管理',
      'userInfo': '读者信息管理',
      'borBookInfo': '借书信息管理',
      'returnBookInfo': '还书信息管理',
      'borBookAccess': '系统信息设置',
    };
    let matchSub = {
      '': '书籍信息',
      'lostBook': '书籍信息',
      'userInfo': '用户信息',
      'borBookInfo': '借阅信息',
      'returnBookInfo': '借阅信息',
      'borBookAccess': '书籍信息',
      'chart': '书籍信息'
    }
    let nowPath = window.location.href.split("//")[1].split('/')[1];
    this.setState({
      'path': matchPath[nowPath],
      'sub': matchSub[nowPath]
    })
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
                      defaultSelectedKeys={[this.state.path]}
                      defaultOpenKeys={[this.state.sub]}
                      mode="inline"
                      theme="dark"
                    >
                      <SubMenu key="书籍信息" title={<span><Icon type="mail" /><span>书籍信息</span></span>}>
                        <Menu.Item key="书籍信息管理"><Link to="/">书籍信息管理</Link></Menu.Item>
                        <Menu.Item key="丢失书籍管理"><Link to="/lostBook">丢失书籍管理</Link></Menu.Item>
                      </SubMenu>
                      <SubMenu key="用户信息" title={<span><Icon type="appstore" /><span>用户信息</span></span>}>
                        <Menu.Item key="读者信息管理"><Link to="/userInfo">读者信息管理</Link></Menu.Item>
                      </SubMenu>
                      <SubMenu key="借阅信息" title={<span><Icon type="pie-chart" /><span>借阅信息</span></span>}>
                        <Menu.Item key="借书信息管理"><Link to="/borBookInfo">借书信息管理</Link></Menu.Item>
                        <Menu.Item key="还书信息管理"><Link to="/returnBookInfo">还书信息管理</Link></Menu.Item>
                      </SubMenu>
                      <Menu.Item key="系统信息设置"><Link to="/borBookAccess">系统信息设置</Link></Menu.Item>
                      <Menu.Item key="图标"><Link to="/chart">数据分析表</Link></Menu.Item>
                    </Menu>
                  </div>
                  <div className="rootBody">

                    <Switch>

                      <Route exact path="/" component={BookAdmin}/>
                      <Route path="/lostBook" component={LostBook}/>
                      <Route path="/userInfo" component={UserInfo}/>
                      <Route path="/borBookInfo" component={BorBookInfo}/>
                      <Route path="/returnBookInfo" component={ReturnBookInfo}/>
                      <Route path="/borBookAccess" component={BorBookAccess}/>
                      <Route path="/chart" component={Chart}/>
                    </Switch>
                  </div>
                </div>
              </div>
            </Router>
      );
  }
}
