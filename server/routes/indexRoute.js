// node index.js

const express = require('express')

const app = express()
app.use(express.json())
const PORT = 3001

const cors = require('cors')
// Enable CORS for all routes
app.use(cors())

// const prisma = require('./prisma.js')



const boardsRoutes = require('./boardsRoutes.js')
app.use('/api/boards', boardsRoutes)

const cardsRoutes = require('./cardsRoutes.js')
app.use('/api/cards', cardsRoutes)

const commentsRoutes = require('./commentsRoutes.js')
app.use('/api/comments', commentsRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    try {
        res.send('Welcome to my app!')
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

app.get('/ebay', (req, res) => {
    try {
        console.log("Ebay get endpoint: ")
        console.log(req)
        res.status(200).send()
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

app.post('/ebay', (req, res) => {
    try {
        console.log("Ebay post endpoint: ")
        console.log(req)
        res.status(200).send()
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})