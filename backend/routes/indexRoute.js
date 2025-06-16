// node index.js

const express = require('express')

const app = express()
app.use(express.json())
const PORT = 3000

const cors = require('cors')
// Enable CORS for all routes
app.use(cors())

// const prisma = require('./prisma.js')

const boardsRoutes = require('./boardsRoutes.js')
app.use('/api/boards', boardsRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Welcome to my app!')
})