import { useState } from "react"
import { useGoalsContext } from "../hooks/useGoalsContext";


const GoalForm=()=>{
    const {dispatch}=useGoalsContext()

    const[title,setTitle]=useState("")
    const[plan,setPlan]=useState("")
    const[duration,setDuration]=useState("")
    const[deadline,setDeadline]=useState("")
    const[error,setError]=useState(null)
    const [emptyFeilds,setEmptyFeilds]=useState([])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const goal={title,plan,duration,deadline}

        const response=await fetch("/api/goals",{
            method:"POST",
            body:JSON.stringify(goal),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const json=await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFeilds(json.emptyFeilds)
        }
        if (response.ok){
            setTitle("")
            setPlan("")
            setDuration("")
            setDeadline("")
            setError(null)
            setEmptyFeilds([])
            console.log("new goal added")
            dispatch({type:"CREATE_GOAL",payload:json})
            console.log(dispatch.type)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new goal</h3>

            <label>Goal Title:</label>
            <input
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            className={emptyFeilds.includes("title")?"error":""}
            />

            <label>Plan:</label>
            <input
            type="text"
            onChange={(e)=>setPlan(e.target.value)}
            value={plan}
            className={emptyFeilds.includes("plan")?"error":""}

            />

            <label>Duration :</label>
            <input
            type="number"
            onChange={(e)=>setDuration(e.target.value)}
            value={duration}
            className={emptyFeilds.includes("duration")?"error":""}

            />

            <label>Deadline:</label>
            <input
            type="date"
            onChange={(e)=>setDeadline(e.target.value)}
            value={deadline}
            className={emptyFeilds.includes("deadline")?"error":""}

            />

            <button>Add Goal</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default GoalForm;