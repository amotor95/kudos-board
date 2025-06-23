const express = require('express')

const prisma = require('./prisma.js')

const router = express.Router()

const cors = require('cors')
// Enable CORS for all routes
router.use(cors())

// Create comment
router.post('/', async (req, res) => {
    try {
        const { card_id, message, author } = req.body
        const card = await prisma.card.findUnique({
                where: {
                    id: Number(card_id)
                }
            })
            if (!card) {
                console.error(`CardID: ${card_id} not found`)
                res.status(404).json(`CardID: ${card_id} not found`)
                return
            }
        const newComment = await prisma.comment.create({
            data: {
                card_id: Number(card_id),
                message,
                author,
            }
        })
        res.status(201).json(newComment)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

module.exports = router