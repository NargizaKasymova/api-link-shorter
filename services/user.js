const bcryptjs = require('bcryptjs')

const { UserModel } = require('../models/user.js')
const SALT_ROUND = 10

exports.registerUser = async function (email, password) {
    try {
        const userExists = await UserModel.findOne({ email: email })   //человеческая ошибка, до регистрации

        if (userExists) {
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
            message: 'Вы успешно зарегистрировались',
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

exports.loginUser = async (email, password) => {
    try {
        const existingUser = await UserModel.findOne({ email: email })
        if (!existingUser) {
            return {
                success: false,
                message: "Пользователь не зарегистрирован",
                code: 400
            }
        }
        const passwordCompared = await bcryptjs.compare(password, existingUser.password)
        if (!passwordCompared) {
            return {
                success: false,
                message: "Введен неверный пароль",
                code: 400
            }
        }
        return {
            code: 201,
            message: "Вход выполнен успешно",
            user: existingUser
        }
    } catch (e) {
        console.log("Ошибка при логине пользователя: ", e.message)
        return {
            success: false,
            message: e.message,
            code: 500
        }
    }

}