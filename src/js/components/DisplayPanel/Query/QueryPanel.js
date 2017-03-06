import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";
import {RemoveCard,AddCardToDisplay} from "../../../Actions/pilotAction";
import {GetQueryResults,DeletePilot,getQueryCourses,getSearchResults} from "../../../Actions/QueryAction";
import {Button,Table,Card,Icon,Form,Modal} from "antd";
import AnalysisFlight from "./AnalysisFlight"
import QuerySearchForm from "./QuerySearchForm";
import fillPersonalInfo from "../fillpersonalInfo";
import json2csv  from "json2csv";

@connect((store)=>{    
    return {
        query:store.query
    };
    
})
export default class QueryPanel extends React.Component { 
  constructor(props)
  {
      super(props)
      //columns setup 
      const columns = [{
              title: 'Note编号',
              dataIndex: 'course_id',
              key: 'course_id',
              render: (text,record) => <a href="#" onClick={this.OpenCourseDetail.bind(this,record)} >{text}</a>,
            }, {
              title: 'Note名称',
              dataIndex: 'title',
              key: 'title',
            }, {
              title: 'Usage',
              dataIndex: 'category',
              key: 'category',
            },{
              title: '描述',
              dataIndex: 'description',
              key: 'description',
            }];

//end of columns
      this.state={
        selectedRowKeys:[],
        columns:columns,
        pilotsquerydata:[],
        deleteModal:false,
        FlightAnalysis:false
      }
  }


BackToQuery(){
  this.setState({FlightAnalysis:false})
}

      DeleteConfirm(record)
      {
        this.setState({deleteModal:true,
                       deleteTarget:record.cert_id
                      })
      }
  getPersonDetail(data)
  {

       var cardinfo ={
                      type:"fillpersonalinfo",
                      person:data
                    }
                  this.props.dispatch(AddCardToDisplay(cardinfo))
  }


  OpenCourseDetail(record)
{
  console.log("record ....",record);
  let course_id = record.course_id;
  let data = {
    type:"coursedetail",
    course_id : course_id,
    title:record.title,
    category:record.category,
    catelog:record.catelog,
    catelog2:record.catelog2,
    creationdate:record.creationdate,
    description:record.description,
    product:record.product,
    version:record.version
  }
  console.log("data is",data);
  this.props.dispatch(AddCardToDisplay(data));
}

  componentWillReceiveProps(nextProps)
  {

    console.log(nextProps);
    if(nextProps.query)
    {
      const {pilots} = nextProps.query;
      this.setState({pilotsquerydata:pilots});
    }
  }

  //model ok and cancel 
  handleCancel(){this.setState({deleteModal:false,deleteTarget:null})}

  handleDelete()
  {
    if(this.state.deleteTarget)
    this.props.dispatch(DeletePilot(this.state.deleteTarget))
    this.handleCancel();
  }



  //mondel ok and cancel

  handleSearch(query){
    this.props.dispatch(getQueryCourses(query));
  }

  handleSearch1(query){
    this.props.dispatch(getSearchResults(query));
  }

saveFormRef(form){
  this.form =form;
}
  RemoveCard()
  {
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }

 convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

  ExportToCsv(args)
  {

    var fields = [ "cert_idd","flightinfo.flightTime","name"]

    var newdata= this.state.pilotsquerydata.map((one)=>{
      one.cert_idd="I"+one.cert_id
      return one;
    })
    var result = json2csv({data:this.state.pilotsquerydata,fields:fields})
    console.log(result);

    var args={ filename: "flight-data.csv" };
        var data, filename, link;

        var csv = result;
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,\uFEFF' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();

  }

    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

      }
FlightAnalysis(){
    this.setState({
      FlightAnalysis:true
    })

}
  render() {


let displayQueryPart =          
          (<div>
          <QuerySearchForm
               ref={this.saveFormRef.bind(this)}
               handleSearch={this.handleSearch.bind(this)}
               handleSearch1={this.handleSearch1.bind(this)}
             />
             <Table class="margin-top10" columns={this.state.columns} dataSource={ this.state.pilotsquerydata} footer={()=>{
                if(this.state.pilotsquerydata.length>0)
                      {
                        // return (
                        //   <div>
                        //   <Button style={{ marginLeft: 8 }} onClick={this.FlightAnalysis.bind(this)}>
                        //         飞行分析
                        //       </Button>
                        // <Button style={{ marginLeft: 8 }} onClick={this.ExportToCsv.bind(this)}>
                        //         导出
                        //       </Button>
                        //       </div>)
                      }
                      else return ""
                   }} />
            </div>);
          if(this.state.FlightAnalysis)
          {

              displayQueryPart = (
                <div>

                <AnalysisFlight data={this.state.pilotsquerydata}/>
            <Button style={{ marginLeft: 8 }} onClick={this.BackToQuery.bind(this)}>
                                返回
                              </Button>               
                     </div>
                )


          }


      return (
        <div className="detail-panel">  
        <Card title="搜索note" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>

        {displayQueryPart}
        </Card>

          <Modal title="确认框" visible={this.state.deleteModal}
                onOk={this.handleDelete.bind(this)} onCancel={this.handleCancel.bind(this)}
            >
              <p>确定要删除{this.state.deleteTarget}吗？</p>
            </Modal>
        </div>
      );
  }

}