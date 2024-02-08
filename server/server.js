const express = require('express')
const chirpsRouter = require('./routes/chirps')


const app = express()
app.use(express.json())
app.use("/api/chirps", chirpsRouter)

app.listen(3000, () => console.log(`Server started at ${new Date().toLocaleTimeString()}`))