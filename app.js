
require('dotenv').config()
const mongoUrl = process.env.mongo_url

const cors = require('cors')
const express = require('express')
const app = express()
const { router } = require('./routers/api')

app.use(cors())
app.use(express.json())
app.use(router)


const mongoose = require('mongoose')
const PORT = process.env.PORT || 5050

async function startApp() {
    try{
        await mongoose.connect(process.env.mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        app.listen(PORT, function() {
            console.log('App has been started: ' + PORT)
        })
    } catch (e) {
        console.log('Произошла ошибка при запуске приложения: ', e.message)
        process.exit(1)
    }
}
startApp()