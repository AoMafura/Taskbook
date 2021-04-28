const express = require('express')
const router = express.Router()
const taskController = require('../controller/taskController')


router.get("/", taskController.readTasks)
router.post("/createTask", taskController.createTask)
router.post("/updateTask", taskController.updateTask)
router.post("/deleteTask", taskController.deleteTask)

module.exports = router
