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
