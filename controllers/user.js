const bcryptjs = require('bcryptjs')

const { UserModel } = require('../models/user')
const SALT_ROUND = 10

exports.registerUser = async (req, res) => {
    try {
        const { email, password, username} = req.body

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
        const userExists = await UserModel.findOne({email: email})   //человеческая ошибка, до регистрации
        
        if(userExists) {
            return res.status(400).json({
                message: 'Пользователь с такой почтой уже зарегистрирован'
            })
        }
        
        const hashedPassword = await bcryptjs.hash(password, SALT_ROUND) //второй параметр - число проходов шифрования
        // console.log(hashedPassword)
        // const compared = await bcryptjs.compare('123456789', hashedPassword) //расшифровка
        // console.log(compared)

         await UserModel.create({
            email: email,
            password: hashedPassword,
            username: username
        })

        res.status(201).json('Регистрация прошла успешно')
    } catch(e){
        res.status(500).json(e.message)
    }
}

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

