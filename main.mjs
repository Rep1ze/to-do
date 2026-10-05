import express from "express"
import dotenv from "dotenv"
import router from "./routes/routes.mjs"
import db from "./data_base/db.mjs"
dotenv.config()


const app = express()
const port = process.env.PORT
const __dirname = import.meta.dirname

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api",router,express.static(__dirname + "/public"))
app.all('/{*splat}',(req,res)=>{
    res.status(404).send("404 not found")
})

app.listen(port,()=>{
    console.log(`listen on http://localhost:${port}`)
})