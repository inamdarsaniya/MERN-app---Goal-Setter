import { useGoalsContext } from "../hooks/useGoalsContext"
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"



const GoalDeatils=({goal})=>{
    const {dispatch}=useGoalsContext()

    const handleClick=async()=>{
        const response=await fetch("/api/goals/"+goal._id,{
            method:"DELETE"
        })
        const json=await response.json()
        
        if (response.ok){
            dispatch({type:"DELETE_GOAL",payload:json})
        }
    }

    var today = new Date();
    var datetoday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var date = new Date(goal.deadline);  // dateStr you get from mongodb
    var d = date.getDate();
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    var deadlinedate=String(y)+"-"+String(m)+"-"+String(d)
    
    var date1=new Date(deadlinedate)
    var date2=new Date(datetoday)
   
    var due_today=(String(deadlinedate)===String(datetoday))?"Due Today":"";
    

    return(

        <div className="goal-details">
            <h4>{goal.title}</h4>
            <p><strong>Plan :  </strong>{goal.plan}</p>
            <p><strong>Duration :  </strong>{goal.duration}</p>
            <p className={(date1<date2)?"duepast":""||(String(deadlinedate)===String(datetoday))?"duetoday":" "}><strong>Deadline :  </strong>{deadlinedate}&ensp;&ensp; {due_today} </p>
            <p>{formatDistanceToNow(new Date(goal.createdAt),{addSuffix:true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}
export default GoalDeatils;