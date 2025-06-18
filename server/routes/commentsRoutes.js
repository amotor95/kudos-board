const express = require('express')

const prisma = require('./prisma.js')

const router = express.Router()

const cors = require('cors')
// Enable CORS for all routes
router.use(cors())

// Create comment
router.post('/', cors(), async (req, res) => {
    const { card_id, message, author } = req.body
    const newComment = await prisma.comment.create({
        data: {
            card_id: Number(card_id),
            message,
            author,
        }
    })
    res.status(201).json(newComment)
})

module.exports = router