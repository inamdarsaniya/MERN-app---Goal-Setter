import { useEffect } from "react";
import { useGoalsContext } from "../hooks/useGoalsContext";

//components
import GoalDeatils from "../components/GoalDetails"
import GoalForm from "../components/GoalForm"


const Home=()=>{

    const {goals,dispatch}=useGoalsContext()
    
    useEffect(()=>{
        
        const fetchGoals=async()=>{
            const response=await fetch("/api/goals")
            const json=await response.json()
            
            if(response.ok){
                dispatch({type:"SET_GOALS",payload:json})
                console.log(goals)
            }
        }
        fetchGoals()
    },[dispatch])

    return(
        <div className="home">
            <div className="goals">
                {goals && goals.map((goal)=>(
                    <GoalDeatils key={goal._id} goal={goal}/>
                ))}
            </div>
            <GoalForm/>
        </div>
    )
}
export default Home;