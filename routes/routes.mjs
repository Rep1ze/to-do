import express from "express"
import { Tasks,  } from "../controllers/controllers.mjs"

const router = express.Router()

router.get("/tasks",Tasks)

export default router