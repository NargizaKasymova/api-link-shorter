const bcryptjs = require('bcryptjs')

const { UserModel } = require('../models/user.js')
const SALT_ROUND = 10

exports.loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        const existingUser = await UserModel.findOne({email: email})
        if(!existingUser) {
            return res.status(400).json({
                message:'Пользователь не зарегистрирован'
            })
        }
        const passwordCompared = await bcryptjs.compare(password, existingUser.password)
        if(!passwordCompared) {
            return res.status(400).json({
                message:'Введен неверный пароль'
            })
        }
        res.status(201).json({
            message: "Вход выполнен успешно",
            user: existingUser
        })
    } catch(e) {
        res.status(500).json(e.message)
    }

}
