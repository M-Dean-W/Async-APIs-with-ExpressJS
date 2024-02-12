const express = require('express')
const cors = require('cors')
const apiRouter = require('./routes')


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api', apiRouter)

app.listen(3000, () => console.log(`Server started at ${new Date().toLocaleTimeString()}`))