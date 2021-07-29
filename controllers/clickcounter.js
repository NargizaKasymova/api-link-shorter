const { LinkModel } = require('../models/link')
const { getLinkId } = require('../controllers/link')
const shortid = require('shortid')


exports.clickCounter = async (req, res) => {
    try {
        const data = await this.clickCounter()

        res.status(200).json(data) 
                
    } catch(e) {
        console.log('Ошибка при запросе id короткой ссылки')
        res.status(500).json({     
            message: message
        })
    }
}