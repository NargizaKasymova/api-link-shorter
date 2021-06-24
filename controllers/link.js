const shortid = require('shortid')

const { LinkModel } = require('../models/link')

exports.createShortLink = async (req, res) => {
    try {
        const { link, ownerId} = req.body
        const shortLinkId = shortid.generate()
        // const shortedLink = `http://localhost:5050/shortlink/${linkId}`  // первый вариант
        const shortedLink = `http://${req.hostname}:5050/shortlink/${shortLinkId}`   // второй вариант
       
        await LinkModel.create({
            ownerId: ownerId,        //отправит программа, поэтому автоматически
            redirectedId: shortLinkId,      //тоже отправляет программа
            from: shortedLink,   //в 
            to: link
       
        })


        res.status(200).json({
            link: shortedLink,      //изменили, было просто link
            message: 'Link is created'
        })       
        
        
    } catch(e){
        console.log('Controller Error', e)
        res.status(500).json({
            message: message
        })
    }
}

exports.getLinkId = async (req, res) => {
    try {
        const { shortId } = req.params
        const existingLink = await LinkModel.findOne({redirectedId: shortId})
        if(!existingLink) {
            return res.status(400).json({
                message: "ссылка не найдена"

            })
        }
        return res.redirect(existingLink.to)
        // console.log(ownerId)


    } catch(e) {
        console.log('Ошибка при запросе id короткой ссылки')
        res.status(500).json({     //пока это - ошибка бэка, но должно быть в сервисе
            message: message
        })
    }
}