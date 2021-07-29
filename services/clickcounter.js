const { LinkModel } = require('../models/link')
const linkService = require('../services/link')

exports.clickCounter = async () => {
    try {
        const allLinks = await LinkModel.find({})
        
        for(let link of allLinks){
            console.log(link.clickcount)
            return {
                code: 200,
                success: true,
                redirectedId: getLinkId.shortId,
                clickcount: link.clickcount
            }
        }
    } catch(e) {
        return {
            message: 'Ошибка при запросе id короткой ссылки',
            code: 500,
            success: false
        }
    }
}