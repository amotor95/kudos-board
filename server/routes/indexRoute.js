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
        const crypto = require('crypto')
        console.log("Ebay get endpoint: ")
        console.log(req.query)
        const { challenge_code } = req.query
        const challengeCode = challenge_code
        const verificationToken = "879878121345134523452345234523452354"
        const endpoint = "https://kudos-board-backend-8gm7.onrender.com/ebay"
        const hash = crypto.createHash('sha256');
        hash.update(challengeCode);
        hash.update(verificationToken);
        hash.update(endpoint);
        const responseHash = hash.digest('hex');
        console.log(new Buffer.from(responseHash).toString());
        res.status(200).json({
            'challengedResponse': responseHash,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})