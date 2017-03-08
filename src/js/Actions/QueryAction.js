import axios from "axios"
//pilot actions for information


export function DeletePilot(cert_id)
{


return dispatch=>{

    axios.delete("/api/pilots",{
                      data:{target:{cert_id:cert_id}},
                      headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
    })
    .then(function(){
    dispatch({type:"DELETE_PILOT",payload:cert_id})  
    })
  }


}


export function GetQueryResults(data)
{

   console.log("query is",data);
	 return dispatch=>{
    axios.get("/api/courses"+data,{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {

    	console.log(response.data) 
        const pilots= response.data;
        dispatch({type:"GET_RESULTS_PILOTS",payload:pilots})    
 		 })
  
    }
}


export function getQueryCourses(data) {
        console.log("data is",data)
        return dispatch=>{
              axios.post("/api/courses1",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
                const pilots = response.data;
                console.log("response is",pilots);
                dispatch({type:"GET_RESULTS_PILOTS",payload:pilots}) 

              })

}
}

export function getSearchResults(data){
  console.log("data is",data);
          return dispatch=>{
              axios.post("/api/courses2",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
                const pilots = response.data;
                console.log("response is",response);
                dispatch({type:"GET_RESULTS_PILOTS",payload:pilots}) 

              })

}
}