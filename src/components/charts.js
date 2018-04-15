import React, {Component} from 'react';
import axios from 'axios';
import echarts from 'echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class Chart extends Component {
  constructor() {
    super()
    this.state={
      'data': [],
      'bookData': []
    }
  }
  componentDidMount() {
    var bookKeyValue = {
      '计算机': 0,
      '语言': 1,
      '历史': 2
    }
    var bookValueKey = ['计算机', '语言', '历史']
    axios.get('/api/bookInfo',{

    }).then((response)=>{
      var data = response.data
      data.map((value, index) => {
        if(!this.state.bookData[bookKeyValue[value.sort]]) {
          this.state.bookData[bookKeyValue[value.sort]] = 1
        }else{
          this.state.bookData[bookKeyValue[value.sort]]++;
        }
      })
      this.setState({
        'data': data
      })
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart'));
      // 绘制图表
      myChart.setOption({
        title: { text: '不同类别书籍数量' },
        tooltip: {},
        xAxis: {
          data: ["计算机", "语言", "历史"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: that.state.bookData
        }]
      });

      var myChartPie = echarts.init(document.getElementById('chartPie'));
      var pieData=[];
      for(var i=0; i<this.state.bookData.length; i++) {
        var a = {};
        a['name'] = bookValueKey[i]
        a['value'] = this.state.bookData[i]
        pieData.push(a)
      }
      console.log(pieData)
      myChartPie.setOption({
        series : [
            {
                name: '各类书籍比例',
                type: 'pie',
                radius: '55%',
                data:pieData
            }
        ]
    })
    }).catch((err)=>{
      console.log(err);
    })
  }
  render(){
    return (
      <div>
        <div className="Breadcrumb">数据分析表</div>
        <div id="chart" style={{ width: 500, height: 500 }} className="chartStyle"></div>

        <div id="chartPie" style={{ width: 500, height: 500 }} className="chartStyle"></div>
      </div>
    )
  }
}
