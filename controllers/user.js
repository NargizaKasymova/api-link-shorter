
const userService = require('../services/user')


function validate(email, password, res) {
    if (!email || !password) {
        return res.status(400).json({
            message: 'Нужно указать необходимые поля для регистрации'
        })
    }
    if (password.length < 8) {
        return res.status(400).json({
            message: 'Нужно указать пароль больше 8'
        })
    }
    return {
        success: true
    }
}

exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const validationResults = validate(email, password, res);

        if (validationResults.success) {
            const results = await userService.registerUser(email, password)
            /**
             {
                 success: false,
                 message: "Не правильный логин ",
                 code: 400
             } 
             
             */
            res.status(results.code).json(results)
        }
    } catch (e) {
        res.status(500).json(e.message)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const validationResults = validate(email, password, res)
        
        if(validationResults.success) {
            const results = await userService.loginUser(email, password)
            res.status(results.code).json(results)
        }
        
    } catch (e) {
        res.status(500).json(e.message)
    }

}

