import React,{ Component } from 'react';
import { Input,Button } from 'antd';

export default class BorBookAccess extends Component{
  render() {
    return (
      <div>
        <div className="borBookAccessBox">
          <div className="title">教师用户</div>
          <div className="inputLine">教师用户借书时长：<div className="bookInput"><Input type="text" /></div></div>
          <div className="inputLine">教师用书借书最大数量：<div className="bookInput"><Input type="text" /></div></div>
          <div className="inputLine">超期罚款：<div className="bookInput"><Input type="text" /></div></div>
          <Button type="primary" className="BorBookAccSave">保存</Button>
          <Button type="danger" className="BorBookAccReset">重置</Button>
        </div>
        <div className="borBookAccessBox">
          <div className="title">学生用户</div>
          <div className="inputLine">学生用户借书时长：<div className="bookInput"><Input type="text" /></div></div>
          <div className="inputLine">学生用书借书最大数量：<div className="bookInput"><Input type="text" /></div></div>
          <div className="inputLine">超期罚款：<div className="bookInput"><Input type="text" /></div></div>
          <Button type="primary" className="BorBookAccSave">保存</Button>
          <Button type="danger" className="BorBookAccReset">重置</Button>
        </div>
      </div>
    )
  }
}
