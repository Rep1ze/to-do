import path from "node:path"
import db from "../data_base/db.mjs"

const __dirname = import.meta.dirname

export const Tasks = (req,res)=>{
    try{
        res.sendFile(path.join(__dirname + "..","..", "/public/to-do.html"))
    }catch(e){
        console.log(e)
    }
}
export const CreateTasksPost = (req,res)=>{
    try{

        const text = req.body.text
        if(!text){
            res.status(400).json("400")
            return
        }
        const task_id = db.prepare(`INSERT INTO tasks(text) VALUES ($task)`,{
            task: text
        }).run().lastInsertRowid
        if(!task_id){
            res.status(500)
            return
        }
        res.json(task_id)
    }catch(e){
        console.log(e)
    }
}
export const TasksPut = (req,res)=>{
    try{
        
    }catch(e){
        console.log(e)
    }
}
export const TasksGet = (req,res)=>{
    try{
        db.prepare(`SELECT * FROM tasks`,(err,row)=>{
            if(err){
                res.status(500).json({err: 'Ошибка при получении задач'})
                return
            }
            res.status(200).json(row)
        }).all()
    }catch(e){
        console.log(e)
    }
}