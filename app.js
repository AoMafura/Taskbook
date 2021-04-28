const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const accountRoutes = require('./routes/accountRoutes')
const taskRoutes = require('./routes/taskRoutes')

const app = express()

app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use(session({
    secret: "esto-es-un-secreto",
    resave: false,
    saveUninitialized: false    
}));

app.use('/', accountRoutes)
app.use('/home', taskRoutes)


app.listen(3000, () => console.log("Server is Running: PORT 3000"))