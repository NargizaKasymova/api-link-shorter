const { Schema, model, Types} = require('mongoose')

// mongoose.createConnection()

const LinkSchema = new Schema({
    ownerId:{
        type: Types.ObjectId,
        required: true,
        ref: 'user'
    },
    redirectedId:{     //id ссылки, который выдал Postman, по нему найдем ссылку и перенаправим
        type: String,
        required: true
    },
    clickcount: {
        type: Number,
        default: 0
    },
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    }
}, {timestamps: true})

exports.LinkModel = model('link', LinkSchema)