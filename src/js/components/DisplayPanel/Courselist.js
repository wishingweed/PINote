import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay,CreateNewCourse,EditCourse,DeleteCourse} from "../../Actions/pilotAction"
import {Button,Table,Card,Icon,Form,Modal,Popconfirm} from "antd";



import NewCourseForm from "./NewCourseForm";



@connect((store)=>{    
    return {
        pilot:store.pilotinfo
    };
    
})
export default class Courselist extends React.Component { 
  constructor(props)
  {
      super(props)


    console.log(this.props.pilot);
    const {Courses} = this.props.pilot;
      this.state={ 
        visible:false,
        editdata:null,
        list:Courses
      }



  }

  showModal()
{
  this.setState({visible:true})
}


    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

      }

OpenCourseDetail(e)
{

  let course_id = e.target.rel;
  let data = {
    type:"coursedetail",
    course_id : course_id
  }
  this.props.dispatch(AddCardToDisplay(data));
}

  RemoveCard()
  {
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }


///
saveFormRef(form){this.form = form;}


    RemoveRow(e){
                  const deletedata = e;
                  let ddata={"target":{"course_id":deletedata}};
                  this.props.dispatch(DeleteCourse(ddata))
                  let newCourses = this.state.list.filter((course)=>{ if(course.course_id!=deletedata) return course });
                  this.setState({
                    list:newCourses
                  })  
    }


    EditRow(e){
       let data1 = JSON.parse(e.target.rel);
if(data1)
    {
      if(data1.attachments)
      {
        let data = data1.attachments.map((one,index)=>{
          one.uid = 0-index;
          return one });
        data1.attachments = data;
        console.log(data1.attachments);
      }
    }
      this.setState({
        visible:true,
        editdata:data1}
        )
    }

    // close course
    onCancel(){

      const form=this.form;
      form.resetFields();
      this.setState({
        editdata:null,
        visible:false})}

    //create course
    onCreate(){
  const form = this.form;
//edit null? create : save
          
   const {list} = this.state;
 form.validateFields((err, values) => {
    let list1 = form.getFieldValue("attachments")
    let attachments=[];
    console.log(list1);
    if(list1)
   {
                   attachments = list1.map((one)=>{
                    if(one.response)
                    {let data = {
                      name:one.name,
                       filename:one.response.filename,
                       url:"http://localhost:8083/uploads/"+one.response.filename
                    }
                         return data;
                    } 
                    else 
                    {
                      return one;
                    }

                  });
    }
        values.attachments=attachments;
      if (err) {
        return;
      }
      if(this.state.editdata==null )
      {
        //add attachments
        this.props.dispatch(CreateNewCourse(values));

      }
      else
      {
        //find target 
          let updatedata = {target:{"course_id": values.course_id},
                      updatepart:values
                    };
          this.props.dispatch(EditCourse(updatedata));
      }
    })


   form.resetFields();
      this.setState({ 
        visible: false ,
        editdata:null });
    }

////



  render() {

//table colume config 
const columns = [{
  title: '课程编号',
  dataIndex: 'course_id',
  key: 'course_id',
  render: (text,record) => <a href="#" onClick={this.OpenCourseDetail.bind(this)} rel={record.course_id}>{text}</a>,
}, {
  title: '课程名字',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '课程类型',
  dataIndex: 'category',
  key: 'category',
}, {
  title: '描述',
  key: 'description',
  dataIndex:'description'
},
      { 
        title: '操作', dataIndex: '', key: 'x', render: (key,record) =>( 
        <span>
        <Popconfirm title="确定要删除吗?"  onConfirm={this.RemoveRow.bind(this,record.course_id)}>
        <a>删除</a>
        </Popconfirm>
        |
        <a onClick={this.EditRow.bind(this)} rel={JSON.stringify(record)}>修改</a>
        </span>
       )}

  
];

        return (
        <div className="detail-panel">  
        <Card title="课程列表" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
        <h1>课程列表</h1>
        <Button type="primary" onClick={this.showModal.bind(this)}>新建课程</Button>
         <Table columns={columns} dataSource={this.state.list}  />
        </Card>


        <NewCourseForm
          visible={this.state.visible}
          initdata={this.state.editdata}
          ref={this.saveFormRef.bind(this)}
            onCancel={this.onCancel.bind(this)}
            onCreate={this.onCreate.bind(this)}
        />
        </div>
      );
  }

}