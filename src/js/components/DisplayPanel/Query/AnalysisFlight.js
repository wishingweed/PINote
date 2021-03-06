import React from "react";
import { Table, Input, Popconfirm } from 'antd';
import  ReactHighCharts  from "react-highcharts";
import _ from "underscore";
import * as d3 from "d3";




export default class EditableCell extends React.Component {
	constructor(props)
	{
		super(props)
    const leveldata = this.props.data.map((one)=>{return {
      Level:one.level.current_level,
      flightInfo:one.flightinfo}
    })
    let averagedata =d3.nest()
    .key(function(d){return d.Level})
    .rollup(function(v){
      return {
        count:v.length,
        AvgFlightTime:d3.mean(v,function(d){return d.flightInfo.flightTime}),
        AvgRealFlightTime:d3.mean(v,function(d){return d.flightInfo.flightRealTime}),       
        AvgFlightRoute:d3.mean(v,function(d){return d.flightInfo.flightRoute}),
        AvgRealFlightRoute:d3.mean(v,function(d){return d.flightInfo.flightRealRoute}),
      }
    })
    .entries(leveldata);
    console.log(averagedata);


    let categories=[];
    let seriescount=[];
    let seriesavg=[]
    averagedata.map(one=>{
      categories.push(one.key),
      seriescount.push(one.value.count);
      seriesavg.push(one.value.AvgFlightTime);
    });



 //columns setup 
      const columns = [{
              title: '等级',
              dataIndex: 'key',
              key: 'key'
            }, {
              title: '飞行员数目',
              dataIndex: 'value.count',
              key: 'value.count',
            }, {
              title: '平均飞行时间(小时)',
              dataIndex: 'value.AvgFlightTime',
              key: 'value.AvgFlightTime',
              render: function(text) {
                return (
                  parseFloat(text).toFixed(2)
                );
              }
            },{
              title: '平均航段数(次)',
              dataIndex: 'value.AvgFlightRoute',
              key: 'value.AvgFlightRoute',
              render: function(text) {
                return (
                    parseFloat(text).toFixed(2)
                );
              }
            },{
              title: '平均真实飞行时间(小时)',
              dataIndex: 'value.AvgFlightRealTime',
              key: 'value.AvgFlightRealTime',
                    render: function(text) {
                return (
                    parseFloat(text).toFixed(2)
                );
              }
              },{
              title: '平均起落数(次)',
              dataIndex: 'value.AvgFlightRealRoute',
              key: 'value.AvgFlightRealRoute',
              render: function(text) {
                return (
                    parseFloat(text).toFixed(2)
                );
              }
              }
              ];


    this.state={
                columns:columns,
                showdata:averagedata,
                categories:categories,
                seriescount:seriescount,
                seriesavg:seriesavg}
	}

  render() {



var config = {
	chart: {
        type: 'bar'
    },
    title:{
    	text:'平均飞行时间/等级'
    },
  xAxis: {
    categories: this.state.categories
  },
  series: 
  [{
    name:"飞行员数目",
    data:this.state.seriescount
  },{
    name:"平均飞行时间[小时]",
    data:this.state.seriesavg
  }]
};

    return (
    	<div>

				<ReactHighCharts config={config}/>

        <Table dataSource={this.state.showdata}  columns={this.state.columns}/>

    	</div>
    	);
  }
}