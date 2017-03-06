import axios from "axios"
//pilot actions for information


export function DeletePilot(cert_id)
{


return dispatch=>{

    axios.delete("http://localhost:8083/api/pilots",{
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
    axios.get("http://localhost:8083/api/courses"+data,{
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
              axios.post("http://localhost:8083/api/courses1",{
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
              axios.post("http://localhost:8083/api/courses2",{
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