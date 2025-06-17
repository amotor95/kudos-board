// node index.js

const express = require('express')

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const cors = require('cors')
// Enable CORS for all routes
app.use(cors())

// const prisma = require('./prisma.js')



const boardsRoutes = require('./boardsRoutes.js')
app.use('/api/boards', boardsRoutes)

const cardsRoutes = require('./cardsRoutes.js')
app.use('/api/cards', cardsRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', cors(), (req, res) => {
    res.send('Welcome to my app!')
})