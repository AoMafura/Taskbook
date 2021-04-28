const user = require('../models/account')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createAccount = async (req, res) => {
    var salt = bcrypt.genSaltSync(saltRounds);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    
    req.body.code = generateCode();
    let data = await user.model.create(
        req.body
    ).catch((err) => {
        res.render('index', {err: "Username is Already Taken."})
    })  
       
    res.render('index', {success: "Successfully Created Account."})
    console.log(data)
}

exports.signinAccount = async (req, res) => {
    let data = await user.model.findOne({
        where: {
            username: req.body.username,
        },
        raw:true,
    });


    if(data != null){
        if(bcrypt.compareSync(req.body.password, data.password) && data.password != ""){
            req.session.code = data.code;
            req.session.loggedIn = true;
            res.redirect('/home');
        }else{
            res.render('index', {err: "Invalid Username or Password."})
        }
    }else{
        res.render('index', {err: "Invalid Username or Password."})
    }

    console.log(data)
}

generateCode = () => {
    let generate = "";
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    for ( var i = 0; i < length; i++ ) {
        generate += char.charAt(Math.floor(Math.random() * char.length));
    }
    return generate;
}