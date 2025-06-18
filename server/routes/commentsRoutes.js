const express = require('express')

const prisma = require('./prisma.js')

const router = express.Router()

const cors = require('cors')
// Enable CORS for all routes
router.use(cors())

// Create comment
router.post('/', async (req, res) => {
    try {
        const { cardID, message, author } = req.body
        const card = await prisma.card.findUnique({
                where: {
                    id: Number(cardID)
                }
            })
            if (!card) {
                res.status(404).json(`CardID: ${cardID} not found`)
                return
            }
        const newComment = await prisma.comment.create({
            data: {
                card_id: Number(cardID),
                message,
                author,
            }
        })
        res.status(201).json(newComment)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router