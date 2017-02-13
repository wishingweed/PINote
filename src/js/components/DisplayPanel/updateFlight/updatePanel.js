import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";
import {RemoveCard,AddCardToDisplay,UPDATE_PILOT_FLIGHT} from "../../../Actions/pilotAction"
import {Card,Row,Col,Icon,Button,Select,Upload,message,Table,Input} from "antd";

const Dragger=Upload.Dragger;
const Option = Select.Option;


@connect((store)=>{    
    return {
        pilot:store.pilotinfo
    };
    
})
export default class updatePanel extends React.Component {
        Reload(){
          this.setState({showresult:false,type:"updateFlight"})
        }
        constructor(props)
        {
          super(props)
          this.state={showresult:false}
        }
        RemoveCard(){
              var targetcard = {
              cardid : this.props.cardid
            }
            this.props.dispatch(RemoveCard(targetcard));

        }
        UploadToMongo(){
          const {data} = this.state.targetFile;

          data.map((record)=>{
            const target={target:{cert_id:record.cert_id},updatepart:{flightTime:record.flightTime}}
            this.props.dispatch(UPDATE_PILOT_FLIGHT(target))

          });


        }
        handleChange(){

        }

        componentDidMount() {
         setCardDragable(ReactDOM.findDOMNode(this));
              handleFocus(ReactDOM.findDOMNode(this));   
          }


       onChange(info) {
                      const status = info.file.status;
                      let fileList = info.fileList;
                      if (status !== 'uploading') {
                              console.log(info.file, info.fileList);
                            }
                            if (status === 'done') {
                              const {response} = info.file
                              this.setState({targetFile:response,showresult:true});
                              message.success(`${info.file.name} file uploaded successfully.`);
                            } else if (status === 'error') {
                              message.error(`${info.file.name} file upload failed.`);
                            }
                            console.log(info)
        }


render() {


            //settings for upload

              const uploadprops = {
                          name: 'file',
                          multiple: true,
                          action: 'http://localhost:8083/api/upload_flight',
                          onChange:this.onChange.bind(this),
                          showUploadList:false  ,
                  };
            //end of setting


          let displayTable = <div></div>
           if(this.state.showresult)
          {

            let columns=[]
            const {data} = this.state.targetFile;
            for( var key in data[0])
            {
             const columnone={
              title:key,
              dataIndex:key,
              key:key
             }

             columns.push(columnone);
            }
            displayTable= <Table columns={columns} dataSource={data}  />
          }
          else{
       displayTable=(<div style={{ marginTop: 16, height: 180 }}>
          <Dragger {...uploadprops} name="flightinfo" id='upFlight' >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
          </Dragger>
        </div>)

      }
              return (
              <div className="detail-panel">  
              <Card title="更新飞行员信息" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
              <h1></h1>
              <Row>
              <Col span={21}>
              <Select
                style={{ width: 400 }}
                  placeholder="请选择一个模板"
                  onChange={this.handleChange.bind(this)}  
                  >
                  <Option value="updateflights">更新飞行信息</Option>
                  <Option value="test">空白</Option>
              </Select>

              </Col>
              <Col span={2}><Button type="ghost"  shape="circle" icon= "reload" onClick={this.Reload.bind(this)}/> </Col>
              <Col span={1}><Button type="primary"  shape="circle" icon= "caret-right" onClick={this.UploadToMongo.bind(this)}/></Col>
              </Row>
                  {displayTable}
              </Card>
              </div>
            );
        }

}