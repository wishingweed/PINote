import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,Timeline} from "antd";
import {connect} from "react-redux"
import { setCardDragable,handleFocus,setAreaDropable} from "../../interactScript";

import {RemoveCard,ChangeStyle,ChangeToModify,AddCardToDisplay} from "../../Actions/pilotAction"

@connect((store)=>{    
    return {
    	status:status,
      pilotinfo:store.pilotinfo
    };
    
})
export default class WorkFlowDetail extends React.Component {


	componentDidMount(){

      const props = this.props;
      const that = this;	
      const {status} = this.props;
      var workflowid = this.props.workflowid;

      if(status.status == "init")
      setCardDragable(ReactDOM.findDOMNode(this));  

      handleFocus(ReactDOM.findDOMNode(this));   
       this.interactable = setAreaDropable({

          element: ReactDOM.findDOMNode(this),
          accept: '.function-button',
          ondrop: function(event) {
 		      var content = document.getElementById('content');
    	    content.classList.add('content-' + Math.floor(Math.random() * 3));		
      		//change status 
      	 	props.dispatch(ChangeToModify(workflowid));
      		//add change card

              
          }
      });
	}
	RemoveCard()
	{
		var data={

			cardid:this.props.cardid
		}
		this.props.dispatch(RemoveCard(data))
	}
  
     
     
  OpenCourseDetail(course)
  {
    console.log("course is",course);
    var courses = this.props.pilotinfo.Courses;
    var courseID = course.course_id;

    var targetcourses = courses.filter((co,i)=>{
      if(co.course_id == courseID)
        return co;
    })
    var targetcourse = targetcourses[0];
    console.log("targetcourse is",targetcourse);
    let data = {
    type:"coursedetail",
    course_id : targetcourse.course_id,
    title:targetcourse.title,
    category:targetcourse.category,
    catelog:targetcourse.catelog,
    catelog2:targetcourse.catelog2,
    creationdate:targetcourse.creationdate,
    description:targetcourse.description,
    product:targetcourse.product,
    version:targetcourse.version
  }
  console.log("data is",data);
  this.props.dispatch(AddCardToDisplay(data));

  }   
    render() {
        var workflowid = this.props.workflowid;
        // console.log("this.props",this.props);
        const {Workflows} =this.props.pilotinfo; 
        const targetdata = Workflows.filter((workflow)=>{
          if(workflow.workflow_id == workflowid)
          {
            return workflow;
          }
        })
        var steps = targetdata[0].steps;
        var title = targetdata[0].title;
        console.log("targetdata is ",targetdata[0])
        // console.log(" let us see what is in steps",setps);
        console.log("this.props",this.props);
        return (
        <div  class="workFlowDetailPanel">  
          <Card  title={title} extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
          <Timeline>
           {
            steps.map((one,i)=>{
            return <Timeline.Item key={i}>
            { one.name }
            {one.courses.map((course,j)=><p><a href="#" key={j} onClick={this.OpenCourseDetail.bind(this,course)}>{course.title}</a></p>)}
            </Timeline.Item>
            })
           }
				  </Timeline>

		      </Card>
        </div>
      );
  }
}

