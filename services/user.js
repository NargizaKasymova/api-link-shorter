const bcryptjs = require('bcryptjs')

const { UserModel } = require('../models/user.js')
const SALT_ROUND = 10

exports.registerUser = async function(email, password) {
    try {
        const userExists = await UserModel.findOne({email: email})   //человеческая ошибка, до регистрации
        
        if(userExists) {
            return {
                message: 'Пользователь с такой почтой уже зарегистрирован',
                code: 400,
                success: false
            }
        }
        
        const hashedPassword = await bcryptjs.hash(password, SALT_ROUND) //второй параметр - число проходов шифрования
          
         await UserModel.create({
            email: email,
            password: hashedPassword,
            
        })
            return {
                success: true,
                message: 'Вы авторизировались успешно',
                code: 201
            }
    } catch (e) {
        console.log("Ошибка при регистрации пользователя: ", e.message)
        return {
            success: false,
            message: e.message,
            code: 500
        }
    }
    
}