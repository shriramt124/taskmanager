const express = require("express")
const Task = require("../models/task")
const User = require("../models/user");
 const isAuthenticated  = require("../middlewares/auth");

const taskRouter = express.Router();


//create task
taskRouter.post("/create-task",isAuthenticated, async (req, res) => {
    const { title, desc } = req.body;
    try {
       const {id} = req.user
       console.log(id);
   
        if (!title || !desc) {
            res.status(401).json({
                success: false,
                message: "all fields are required"
            })
        }
        const newTask = new Task({
            title,
            desc
        })
        const savedTask = await newTask.save();
       const userFound = await User.findById(id);
       userFound.tasks.push(savedTask);
       await userFound.save();
       console.log(userFound);
         
        res.status(200).json({
            success: true,
            message: "task added successfully",
            data: savedTask
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
})

taskRouter.get("/all-tasks",isAuthenticated,async(req,res)=>{
    const {id} = req.user
    try {
        const userFound = await User.findById(id).populate(
            {
                path:"tasks",
                optoins:{createdAt:-1}
            }
        );
        res.status(201).json({
            success:true,
            data:userFound
        })
        
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message,
            stack:error.stack
        })
    }
})


taskRouter.delete("/delete-task/:id",isAuthenticated,async(req,res)=>{
     
        try {
          const {id:userId} = req.user;
          const taskId = req.params.id;
          await Task.findByIdAndDelete(taskId)
          await User.findByIdAndUpdate(userId,{$pull:{tasks:taskId}});
          res.status(201).json({
            success:false,
            message:"task deleted successfully",
          })
            
        } catch (error) {
            res.status(404).json({
                success:false,
                message:error.message,
                stack:error.stack
            })
        }
})

taskRouter.put("/update-task/:id",isAuthenticated,async(req,res)=>{
    try {
        const {id} = req.params;
        const {title,desc} = req.body;
     const updatedTask =    await Task.findByIdAndUpdate(id,{title,desc});
     res.status(201).json({
        status:true,
        message:"task updated successfully",
        data:updatedTask
     })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            stack:error.stack
        })
    }
})

taskRouter.put("/update-imp-task/:id",async(req,res,next)=>{
    try {
        const {id} = req.params;
       
       const task = await Task.findById(id);
       const imp = task.important
       const updatedTask = await Task.findByIdAndUpdate(id,{important:!imp})
     res.status(201).json({
        status:true,
        message:"task updated successfully",
        data:updatedTask
     })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            stack:error.stack
        })
    }
})
taskRouter.put("/update-complete-task/:id",async(req,res,next)=>{
    try {
        const {id} = req.params;
       
       const task = await Task.findById(id);
       const comp = task.important
       const updatedTask = await Task.findByIdAndUpdate(id,{complete:!comp})
     res.status(201).json({
        status:true,
        message:"task updated successfully",
        data:updatedTask
     })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            stack:error.stack
        })
    }
})

taskRouter.get("/imp-tasks",isAuthenticated,async(req,res)=>{
    const {id} = req.user
    try {
        const data = await User.findById(id).populate(
            {
                path:"tasks",
                match:{important:true},
                optoins:{createdAt:-1}
            }
        );
        const impdata = data.tasks;
        res.status(201).json({
            success:true,
            data:impdata
        })

    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message,
            stack:error.stack
        })
    }
})
taskRouter.get("/get-completed-tasks",isAuthenticated,async(req,res)=>{
    const {id} = req.user
    try {
        const data = await User.findById(id).populate(
            {
                path:"tasks",
                match:{complete:true},
                optoins:{createdAt:-1}
            }
        );
        const impdata = data.tasks;
        res.status(201).json({
            success:true,
            data:impdata
        })

    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message,
            stack:error.stack
        })
    }
})
taskRouter.get("/get-incompleted-tasks",isAuthenticated,async(req,res)=>{
    const {id} = req.user
    try {
        const data = await User.findById(id).populate(
            {
                path:"tasks",
                match:{complete:false},
                optoins:{createdAt:-1}
            }
        );
        const impdata = data.tasks;
        res.status(201).json({
            success:true,
            data:impdata
        })

    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message,
            stack:error.stack
        })
    }
})


module.exports  = taskRouter;