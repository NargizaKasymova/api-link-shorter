const mongoose = require('mongoose')
// const shortid = require('shortid')

const { LinkModel } = require('../models/link')

exports.getAllLinksByOwnerId = async (userId) => {
    try {
        const allLinksByOwnerId = await LinkModel.find({ownerId: userId})
        console.log(allLinksByOwnerId)
        return {
            message: "Ссылки пользователя " + userId,
            code: 200,
            links: allLinksByOwnerId
        }
                       
    } catch(e){
        return {
            message: "Ошибка сервера" + e.message,
            code: 500,
            success: false
        }
    }
}

exports.deleteLinkById = async (linkId) => {
    try {
        const linkToDelete = await LinkModel.findByIdAndDelete({_id: linkId})
        console.log(linkToDelete)
        return {
            message:`Ссылка с ID ${linkId} удалена успешно`,
            code: 200,
            success: true
        }
    
    } catch(e){
        return {
            message: 'ошибка при удалении ссылки по ID',
            code: 500,
            success: false
        }
    }
}