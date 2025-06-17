const express = require('express')

const prisma = require('./prisma.js')

const router = express.Router()

router.post('/', async (req, res) => {
    const { board_id, message, image, author } = req.body
    const num_upvotes = 0
    const newCard = await prisma.board.create({
        data: {
            board_id,
            message,
            image,
            author,
            num_upvotes,
        }
    })
    res.status(201).json(newCard)
})

module.exports = router