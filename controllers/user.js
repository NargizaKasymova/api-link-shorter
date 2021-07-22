const bcryptjs = require('bcryptjs')

const { UserModel } = require('../models/user')
const userService = require('../services/user')
const loginService = require('../services/login')

exports.registerUser = async (req, res) => {
    try {
        const { email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({
                message:'Нужно указать необходимые поля для регистрации'
            })
        }
        if(password.length < 8){
            return res.status(400).json({
                message:'Нужно указать пароль больше 8'
            })
        }
        const results = await userService.registerUser(email, password)
        /**
         {
             success: false,
             message: "Не правильный логин ",
             code: 400
         } 
         
         */
      res.status(results.code).json(results)

        
    } catch(e){
        res.status(500).json(e.message)
    }
}


