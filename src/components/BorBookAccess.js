import React,{ Component } from 'react';
import axios from 'axios';
import { Input,Button } from 'antd';

export default class BorBookAccess extends Component{
  constructor() {
    super();
    this.state = {
      "teacherMaxTime": '',
      "teacherMaxNum": '',
      "teacherFine": '',
      "stuMaxTime": '',
      "stuMaxNum": '',
      "stuFine": ''
    }
    this.saveTeacher = this.saveTeacher.bind(this);
    this.resetTeacher = this.resetTeacher.bind(this);
    this.saveStu = this.saveStu.bind(this);
    this.resetStu = this.resetStu.bind(this);
  }
  getData() {
    axios.get('/api/system/getData').then((response) => {
      this.refs.teacherMaxTime.input.value = response.data[0].teacherMaxTime;
      this.refs.teacherMaxNum.input.value = response.data[0].teacherMaxNum;
      this.refs.teacherFine.input.value = response.data[0].teacherFine;
      this.refs.stuMaxTime.input.value = response.data[0].stuMaxTime;
      this.refs.stuMaxNum.input.value = response.data[0].stuMaxNum;
      this.refs.stuFine.input.value = response.data[0].stuFine;
      this.setState({
        "teacherMaxTime": response.data[0].teacherMaxTime,
        "teacherMaxNum": response.data[0].teacherMaxNum,
        "teacherFine": response.data[0].teacherFine,
        "stuMaxTime": response.data[0].stuMaxTime,
        "stuMaxNum": response.data[0].stuMaxNum,
        "stuFine": response.data[0].stuFine
      })
    }).catch((err) => {
      console.log(err)
    })
  }
  componentDidMount() {
    this.getData();
  }
  saveTeacher() {
    axios.post('/api/system/setTeacher', {
      "teacherMaxTime": this.refs.teacherMaxTime.input.value,
      "teacherMaxNum": this.refs.teacherMaxNum.input.value,
      "teacherFine": this.refs.teacherFine.input.value
    }).then((response) => {
      this.getData();
    })
  }
  resetTeacher() {
    this.refs.teacherMaxTime.input.value = this.state.teacherMaxTime;
    this.refs.teacherMaxNum.input.value = this.state.teacherMaxNum;
    this.refs.teacherFine.input.value = this.state.teacherFine;
  }
  saveStu() {
    axios.post('/api/system/setStu', {
      "stuMaxTime": this.refs.stuMaxTime.input.value,
      "stuMaxNum": this.refs.stuMaxNum.input.value,
      "stuFine": this.refs.stuFine.input.value
    }).then((response) => {
      this.getData();
    })
  }
  resetStu() {
    console.log(this.state.stuMaxTime, this.state.stuMaxNum, this.state.stuFine)
    this.refs.stuMaxTime.input.value = this.state.stuMaxTime;
    this.refs.stuMaxNum.input.value = this.state.stuMaxNum;
    this.refs.stuFine.input.value = this.state.stuFine;
  }
  render() {
    return (
      <div>
        <div className="Breadcrumb">系统信息设置</div>
        <div className="borBookAccessBox">
          <div className="title">教师用户</div>
          <div className="inputLine">教师用户借书时长：<div className="bookInput"><Input type="text" ref="teacherMaxTime"/></div></div>
          <div className="inputLine">教师用书借书最大数量：<div className="bookInput"><Input type="text" ref="teacherMaxNum"/></div></div>
          <div className="inputLine">超期罚款：<div className="bookInput"><Input type="text" ref="teacherFine"/></div></div>
          <Button type="primary" className="BorBookAccSave" onClick={this.saveTeacher}>保存</Button>
          <Button type="danger" className="BorBookAccReset" onClick={this.resetTeacher}>重置</Button>
        </div>
        <div className="borBookAccessBox">
          <div className="title">学生用户</div>
          <div className="inputLine">学生用户借书时长：<div className="bookInput"><Input type="text" ref="stuMaxTime"/></div></div>
          <div className="inputLine">学生用书借书最大数量：<div className="bookInput"><Input type="text" ref="stuMaxNum"/></div></div>
          <div className="inputLine">超期罚款：<div className="bookInput"><Input type="text" ref="stuFine"/></div></div>
          <Button type="primary" className="BorBookAccSave" onClick={this.saveStu}>保存</Button>
          <Button type="danger" className="BorBookAccReset" onClick={this.resetStu}>重置</Button>
        </div>
      </div>
    )
  }
}
