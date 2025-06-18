const express = require('express')

const prisma = require('./prisma.js')

const router = express.Router()

const cors = require('cors')
// Enable CORS for all routes
router.use(cors())

// Create card
router.post('/', cors(), async (req, res) => {
    const { board_id, title, message, gif, author, num_upvotes } = req.body
    const newCard = await prisma.card.create({
        data: {
            board_id: parseInt(board_id),
            title,
            message,
            gif,
            author,
            num_upvotes,
        }
    })
    res.status(201).json(newCard)
})

// Delete card by ID
router.delete('/:cardID', cors(), async (req, res) => {
    const { cardID } = req.params
    const intial_num_cards = await prisma.card.count()
    await prisma.card.delete({
        where: {
            id: parseInt(cardID),
        }
    })
    const new_num_cards = await prisma.card.count()
    if (new_num_cards < intial_num_cards) {
        res.status(204).send()
    } else {
        res.status(404).send(`CardID: ${cardID} not found`)
    }
})

// Upvote card by ID
router.patch('/:cardID', cors(), async (req, res) => {
    const { cardID } = req.params
    const updatedCard = await prisma.card.update({
        where: {
            id: parseInt(cardID),
        },
        data: {
            num_upvotes: {
                increment: 1,
            },
        }
    })
    res.status(202).json(updatedCard)
})

module.exports = router