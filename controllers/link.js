const linkService = require('../services/link')

const mongoose = require('mongoose')
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
        const allLinks = await LinkModel.find({})
        console.log(allLinks)
        const { shortId } = req.params
        const existingLink = await LinkModel.findOne({redirectedId: shortId})
       

        if(!existingLink) {
            return res.status(400).json({
                message: "ссылка не найдена"

            })
        }
        
       
        existingLink.clickcount = Number(existingLink.clickcount) + 1;
        await existingLink.save();
        return res.redirect(existingLink.to)
        // console.log(allLinks)
    } catch(e) {
        console.log('Ошибка при запросе id короткой ссылки')
        res.status(500).json({     //пока это - ошибка бэка, но должно быть в сервисе
            message: message
        })
    }
}


exports.getAllLinksByOwnerId = async (req, res) => {
    try {
        console.log(req.params)
        const { userId } = req.params
        console.log(userId)

        if (!userId) {
            res.status(400).json({
                message: 'Некорректные параметры'
            })
        }
        const data = await this.getAllLinksByOwnerId(userId);

        res.status(200).json(data);
        
    } catch(e){
        res.status(400).json({
        message: "Нет такого пользователя"
        })
    }
               
}

exports.deleteLinkById = async (req, res) => {
    try {
        const { linkId } = req.params
        console.log(linkId)
        const data = await this.deleteLinkById(linkId)

        res.status(200).json(data)

    } catch(e){
        res.status(500).json({
            message: 'ошибка при удалении ссылки по ID'
        })
    }
}

