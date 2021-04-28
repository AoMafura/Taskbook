const express = require('express')
const router = express.Router()
const userController = require('../controller/accountController')


router.get("/", (req, res) => {
    res.render('index')
})

router.post("/signup", userController.createAccount)
router.post("/signin", userController.signinAccount)

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.render('index')
})

module.exports = router