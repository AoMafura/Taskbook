const task = require('../models/task')

exports.readTasks = async (req, res) => {
    let data = await task.model.findAll({
        where: {
            code: req.session.code
        },
        raw:true,
    })

    res.render('task', {tasks: data})

    console.log(data)
}

exports.createTask = async (req, res) => {
    req.body.status = "Pending"
    req.body.code = req.session.code

    let data = await task.model.create(
        req.body
    )
       
    res.redirect('/home')
    console.log(data)
}

exports.updateTask = async (req, res) => {
    let data = await task.model.update(
        {status: 'Completed'},
        {
            where: {
                id: req.body.id
            }
        }
    )

    res.redirect('/home')
    console.log(data)
}

exports.deleteTask = async (req, res) => {
    let data = await task.model.destroy({
        where: {
            id: req.body.id
        }
    })

    res.redirect('/home')
    console.log(data)
}