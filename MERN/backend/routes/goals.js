const express=require("express")
const router=express.Router()
const{ updateGoal,createGoal, getGoals, getGoal,deleteGoal }=require("../controllers/goalController")

//get all goals
router.get('/',getGoals)

//get a single goal
router.get("/:id",getGoal)

//post a new goal
router.post("/",createGoal)

//delete a goal
router.delete("/:id",deleteGoal)

//update a goal
router.patch("/:id",updateGoal)


module.exports=router