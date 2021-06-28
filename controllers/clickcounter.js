const { LinkModel } = require('../models/link')
const { getLinkId } = require('../controllers/link')
const shortid = require('shortid')


exports.clickCounter = async (req, res) => {
    try {
        const allLinks = await LinkModel.find({})
        
        for(let link of allLinks){
            console.log(link.clickcount)
            return res.status(200).json({
                redirectedId: getLinkId.shortId,
                clickcount: link.clickcount
            })
        }
        
    } catch(e) {
        console.log('Ошибка при запросе id короткой ссылки')
        res.status(500).json({     
            message: message
        })
    }
}