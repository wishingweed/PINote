import React from "react";
import ReactDOM from "react-dom";
import {Checkbox,Button,Table,Card,Icon,Form,Modal,Input,Select,Upload, message} from "antd";
const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const Option=Select.Option;

const CollectionCreateForm = Form.create()(
  React.createClass({

getInitialState(){

    const { initdata } =this.props;
    if(initdata)
    { 
      if(initdata.attachments)
      {
        let data = initdata.attachments.map((one,index)=>{
          one.key = index;
          return one });
        initdata.attachments = data;
      }
    }

  let list = initdata?initdata.attachments:[];
  return {
    attachments:list,
    fileList:list,
    usage:"Report_Recommendation",
    catelog1:"Setting"
  }
},

  componentWillReceiveProps(nextProps){
    const usage = this.props.form.getFieldValue("category");
    if(usage != "")
      this.setState({usage:usage}); 

    const catelog1 = this.props.form.getFieldValue("catelog");
    if(catelog1 != "")
      this.setState({catelog1:catelog1});


    console.log("++++++++++++this.state1 is",this.state);
    console.log("nextProps = ",nextProps);

     if(nextProps.initdata)
      {  
        const{initdata}=nextProps;
        if(initdata.attachments)
      {
        let data = initdata.attachments.map((one,index)=>{
          one.key = index;
          return one });
        initdata.attachments = data;
      }
      else{
        this.setState({attachments:[]})
      }
        console.log("initdata.attachments = ",initdata.attachments);
        this.setState({attachments:initdata.attachments})
      }
     },

    deleteRow(filename){
      console.log(filename)
      let newattachments = this.state.attachments.filter((attachment)=>{if(attachment.filename!=filename) return attachment})
      this.setState({attachments:newattachments})
    },


onChange(info) {
              const status = info.file.status;
              let fileList = info.fileList
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                  let data = {
                      name:info.file.name,
                       filename:info.file.response.filename,
                       url:"/uploads/"+info.file.response.filename};
                this.state.attachments.push(data);
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
              console.log(info)
              this.setState({fileList});
            },
onNewCreate(){
   const {form,onCreate} = this.props;
   console.log("this.state is +++",this.state);
   form.setFieldsValue({attachments:this.state.attachments});
    this.props.form.setFieldsValue({attachmentsvalue:this.state.attachments})
   let data = form.getFieldValue("attachments");
   console.log(data)
   onCreate();
},




render(){
  var usage;
  if(this.state.usage == "Report_Recommendation")
                usage = 
                <Select style={{width:200}}>
                <Option key = "01" value="Setting">Setting</Option>
                <Option key = "02" value="Code_Check">Code_Check</Option>
                <Option key = "03" value="Methodolgy">Methodolgy</Option>
                </Select>
  if(this.state.usage == "Issue_Handling")
                usage = 
                  <Select style={{width:200}}>
                <Option value="Performance">Performance </Option>
                <Option value="Configuration">Configuration </Option>
                <Option value="Administration">Administration </Option>
              </Select>
              

  var catelog2;
  if(this.state.catelog1 == "Setting")
      catelog2 =
                <Select style={{width:200}}>
                <Option key = "01" value="Java_parameter">Java_parameter</Option>
                <Option key = "02" value="ABAP_parameter">ABAP_parameter</Option>
                </Select>
  if(this.state.catelog1 == "Code_Check")
      {
        catelog2 =
                 <Select style={{width:200}}>
                <Option key = "01" value="proxy ">proxy </Option>
                <Option key = "02" value="RFC  ">RFC </Option>
                <Option key = "03" value="Idoc ">Idoc </Option>
              </Select>
            console.log("hello world 002")

            }
  if(this.state.catelog1 == "Methodolgy")
      catelog2 =
                 <Select style={{width:200}}>
                <Option key = "01" value="Cut_Over_Plan ">Cut_Over_Plan </Option>
                <Option key = "02" value="Upgrade_Plan  ">Upgrade_Plan </Option>
                <Option key = "03" value="Data_Volume_Management">Data_Volume_Management </Option>
                <Option key = "04" value="Lifecycle_Management">Lifecycle_Management </Option>

              </Select>

    if(this.state.catelog1 == "Performance")
    {
      catelog2 =
                 <Select style={{width:200}}>
                <Option key = "01" value="hardware ">hardware </Option>
                <Option key = "02" value="ABAP_message_queue">ABAP_message_queue </Option>
                <Option key = "03" value="Java_adapter_queue">Java_adapter_queue </Option>
              </Select>
              console.log("hello world 001")
    }
    if(this.state.catelog1 == "Configuration")
      catelog2 =
                 <Select style={{width:200}}>
                <Option key = "01" value="adapter ">adapter </Option>
                <Option key = "02" value="communication_channel">communication_channel </Option>
                <Option key = "03" value="mapping">mapping </Option>
                <Option key = "04" value="SLD ">SLD </Option>
                <Option key = "05" value="routing">routing </Option>
                <Option key = "06" value="system_parameter">system_parameter </Option>
              </Select>
    if(this.state.catelog1 == "Administration")
      catelog2 =
                 <Select style={{width:200}}>
                <Option key = "01" value="system_down ">system_down </Option>
                <Option key = "02" value="transport">transport </Option>
                <Option key = "03" value="Monitoring_tool">Monitoring_tool </Option>
                <Option key = "04" value="Re-orgnization">Re-orgnization </Option>
              </Select>



   const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = this.props.form;
  const {initdata} =this.props;
  
    const uploadprops = {
            name: 'file',
            multiple: true,
            action: '/api/upload_course',
            onChange:this.onChange,
            showUploadList:false  ,
            fileList:this.state.fileList
    };


    this.state.fileList=this.state.attachments;
    let uploadedfile = <div></div>
    if(this.state.attachments)
    {   
      console.log(this.state.attachments)
         uploadedfile = this.state.attachments.map((one)=>{
          return (<div key={one.url}><a href={one.url}>{one.name}|</a><Icon type='delete' /><a onClick={this.deleteRow.bind(this,one.filename)}>Delete</a></div>)
          });    
    }

    const courseId = this.props.courseId;
    return (
      <Modal
        visible={visible}
        title={initdata?"修改Note":"创建新Note"}
        okText="保存"
        onCancel={onCancel}
        onOk={this.onNewCreate.bind(this)}
      >
        <Form vertical>
          <FormItem label="Note编号">
            {getFieldDecorator('course_id', {
              rules: [{ required: true, message: '自定义Note编号' }],
              initialValue: initdata?initdata.course_id:courseId

            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="联系人">
            {getFieldDecorator('contact_person', {
              rules: [{ required: true, message: '联系人' }],
              // initialValue: initdata?initdata.contact_person:contact_person

            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Note标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入Note标题' }],
              initialValue: initdata?initdata.title:""

            })(
              <Input />
            )}
          </FormItem>
            <FormItem label="Usage" >
            {getFieldDecorator('category', {
              rules: [{ required: true, message: '' }],
              initialValue: initdata?initdata.category:""

            })(
                <Select style={{width:200}}>
                <Option value="Report_Recommendation">Report_Recommendation</Option>
                <Option value="Issue_Handling">Issue_Handling</Option>
              </Select>
            )}
          </FormItem>


          <FormItem label={this.state.usage}>
            {getFieldDecorator('catelog', {
              rules: [{ required: true, message: '' }],
              initialValue: initdata?initdata.catelog:""

            })(
            usage
          )}
          </FormItem>
          <FormItem label={this.state.catelog1}>
            {getFieldDecorator('catelog2', {
              rules: [{ required: true, message: '' }],
              initialValue: initdata?initdata.catelog2:""

            })(
            catelog2
          )}
          </FormItem>

          <FormItem label="Product" >
            {getFieldDecorator('product', {
              rules: [{ required: true, message: '' }],
              initialValue: initdata?initdata.product:""

            })(
                <Select style={{width:200}}>
                <Option value="PI">PI</Option>
                <Option value="PO">PO</Option>
                <Option value="AEX">AEX</Option>
                <Option value="ALL">ALL</Option>
              </Select>
            )}
          </FormItem>

          <FormItem label="version" >
            {getFieldDecorator('version', {
              rules: [{ required: true, message: '' }],
              initialValue: initdata?initdata.version:""

            })(
                <Select style={{width:200}}>
                <Option value="7.1x">7.1x</Option>
                <Option value="7.3">7.3</Option>
                <Option value="7.31">7.31</Option>
                <Option value="7.4">7.4</Option>
                <Option value="7.5">7.5</Option>
                <Option value="all">all</Option>

              </Select>
            )}
          </FormItem>



          <FormItem label="描述">
            {getFieldDecorator('description',
            {
              rules:[{required: true, message:''}],
              initialValue:initdata?initdata.description:""}
            )(<Input type="textarea" rows={15}/>)}
          </FormItem>         
<FormItem label="已经上传文档">
  {uploadedfile}
</FormItem>
           <FormItem label="模板文档">
            {getFieldDecorator('attachments')(
            <div style={{ marginTop: 16, height: 180 }}>
        <Dragger {...uploadprops} name="attachments" id='upfile' >
          <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
              </Dragger>
            </div>
              )}
          </FormItem>


        </Form>
      </Modal>
    );
  },
})
);

export default CollectionCreateForm;