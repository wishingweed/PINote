import { Form, Row, Col, Input, Button, Icon ,Select,Cascader} from 'antd';
const Search = Input.Search;
import React from "react";
import ReactDOM from "react-dom";
import {getQueryCourses} from "../../../Actions/QueryAction"



const FormItem = Form.Item;
const Option = Select.Option;
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    value : [],
    search:""
  };

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }


  onChange=(value)=> {
  this.setState({value:value});
}

onSearch=(value)=>{
  this.setState({search:value});
  this.props.handleSearch1(value);
}

SearchCourses=()=>{
  console.log("this.state is",this.state);
  var query = {} 
  if(this.state.value[0]=="Usage")
  query   = {
      category:this.state.value[1],
      catelog:this.state.value[2],
      catelog2:this.state.value[3]
    }
  if(this.state.value[0]=="product")
    query = {
      product:this.state.value[1],
      version:this.state.value[2]
    }

  console.log("query is",query);
  this.props.handleSearch(query);
}

  render() {

      console.log("----------",this.state);

    const options = [{
  value: 'Usage',
  label: 'Usage',
  children: [{
    value: 'Report_Recommendation',
    label: 'Report_Recommendation',
    children: [{
      value: 'Setting',
      label: 'Setting',
      children:[
      {
        value:'Java_parameter',
        label:'Java_parameter'
      },
      {
        value:'ABAP_parameter',
        label:'ABAP_parameter'
      }]
    },
    {
      value:'Code_Check',
      label:'Code_Check',
      children:[
      {
        value:'proxy',
        label:'proxy'
      },
      {
        value:'RFC',
        label:'RFC'
      },{
        value:'Idoc',
        label:'Idoc'
      }
      ]
    },
    {
      value:'Methodolgy',
      label:'Methodolgy',
      children:[
      {
        value:'Cut_OVer_Plan',
        label:'Cut_OVer_Plan'
      },{
        value:'Upgrade_plan',
        label:'Upgrade_plan'
      },{
        value:'Data_Volume_Management',
        label:'Data_Volume_Management'
      },{
        value:'Lifecycle_Management',
        label:'Lifecycle_Management'
      }
      ]
    }

    ],


  },{
    value:'Issue_Handling',
    label:'Issue_Handling',
    children:[
    {
      value:'Performance',
      label:'Performance',
      children:[
      {
        value:'hardware',
        label:'hardware'
      },{
        value:'ABAP_message_queue',
        label:'ABAP_message_queue'
      },{
        value:'JAVA_adapter_queue',
        label:'JAVA_adapter_queue'
      }]
    },
    {
      value:'Configuration',
      label:'Configuration',
      children:[{
        value:'adapter',
        label:'adapter'
      },{
        value:'communication_channel',
        label:'communication_channel'
      },{
        value:'mapping',
        label:'mapping'
      },{
        value:'SLD',
        label:'SLD'
      },{
        value:'routing',
        label:'routing'
      },{
        value:'system_parameter',
        label:'system_parameter'
      }]
    },{
      value:'Administration',
      label:'Administration',
      children:[{
        value:'system_down',
        label:'system_down'
      },{
        value:'transport',
        label:'transport'
      },
      {
        value:'Monitoring_tool',
        label:'Monitoring_tool'
      },
      {
        value:'Re-organization',
        label:'Re-organization'
      }
      ]
    }
    ]

  }
  ],
}, {
  value: 'product',
  label: 'product',
  children: [{
    value: 'PI',
    label: 'PI',
    children: [{
      value: '7.1X',
      label: '7.1X',
    },{
      value:'7.3',
      label:'7.3'
    },{
      value:'7.31',
      label:'7.31'
    },{
      value:'7.4',
      label:'7.4'
    },{
      value:'7.5',
      label:'7.5'
    },{
      value:'all',
      label:'all'
    }],
  },{
    value:'PO',
    label:'PO',
    children:[{
      value:'7.3',
      label:'7.3'
    },
    {
      value:'7.31',
      label:'7.31'
    },{
      value:'7.4',
      label:'7.4'
    },
    {
      value:'7.5',
      label:'7.5'
    },
    {
      value:'ALL',
      label:'ALL'
    }]
  },{
    value:'AEX',
    label:'AEX'
  },{
    value:'ALL',
    label:'ALL'
  }],
}];



  	const Searchoptions=
  	[	
  		{key:"title",value:"title",description:"Note名称"},
  		{key:"category",value:"category",description:"Re"},
  		{key:"cert_id",value:"cert_id",description:"身份证号"},
  		{key:"personnal_type",value:"personnal_type",description:"生源类型"},
  		{key:"level",value:"level.current_level",description:"登记"},
  		{key:"name",value:"name",description:"名字"},
  		{key:"flightRoute",value:"flightRoute",description:"航段"},
  		{key:"flightTime",value:"flightTime",description:"飞行时间"},
  	];
  	const SelectOption = Searchoptions.map(
  		(option)=>{

  			return (<Option value={option.value}>{option.description}</Option>)
  		}
  		)

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    // To generate mock Form.Item
    const children = <Cascader options={options} onChange={this.onChange.bind(this)} placeholder="Please select" />
    const children1 = <Search
    placeholder="input search text"
    style={{ width: 200 }}
    onSearch={this.onSearch.bind(this)}
  />

    const expand = this.state.expand;
    const shownCount = expand ? children.length : 2;
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.props.handleSearch}
      >
        <Row>
          {children}
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.SearchCourses.bind(this)}>搜索</Button>
          
          </Col>
        </Row>
        <Row>
          {children1}
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm;