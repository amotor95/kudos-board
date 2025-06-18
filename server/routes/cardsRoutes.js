const express = require('express')

const prisma = require('./prisma.js')

const router = express.Router()

const cors = require('cors')
// Enable CORS for all routes
router.use(cors())

// Create card
router.post('/', async (req, res) => {
    try {
        const { board_id, title, message, gif, author, num_upvotes } = req.body
        console.log(req.body)
        const board = await prisma.board.findUnique({
            where: {
                id: Number(board_id)
            }
        })
        if (!board) {
            console.error(`BoardID: ${board_id} not found`)
            res.status(404).json(`BoardID: ${board_id} not found`)
            return
        }
        const newCard = await prisma.card.create({
            data: {
                board_id: Number(board_id),
                title,
                message,
                gif,
                author,
                num_upvotes,
            }
        })
        res.status(201).json(newCard)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// Get card's comments by cardID
router.get('/:cardID/comments', async (req, res) => {
    try {
        const { cardID } = req.params
        const card = await prisma.card.findUnique({
            where: {
                id: Number(cardID)
            }
        })
        if (!card) {
            console.error(`CardID: ${cardID} not found`)
            res.status(404).json(`CardID: ${cardID} not found`)
            return
        }
        const comments = await prisma.comment.findMany({
            where: {
                card_id: Number(cardID),
            }
        })
        res.status(200).json(comments)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// Delete card by ID
router.delete('/:cardID', async (req, res) => {
    try {
        const { cardID } = req.params
        const intial_num_cards = await prisma.card.count()
        await prisma.card.delete({
            where: {
                id: Number(cardID),
            }
        })
        const new_num_cards = await prisma.card.count()
        if (new_num_cards < intial_num_cards) {
            res.status(204).send()
        } else {
            console.error(`CardID: ${cardID} not found`)
            res.status(404).send(`CardID: ${cardID} not found`)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// Upvote card by ID
router.patch('/:cardID', async (req, res) => {
    try {
        const { cardID } = req.params
        const card = await prisma.card.findUnique({
            where: {
                id: Number(cardID)
            }
        })
        if (!card) {
            console.error(`CardID: ${cardID} not found`)
            res.status(404).json(`CardID: ${cardID} not found`)
            return
        }
        const updatedCard = await prisma.card.update({
            where: {
                id: Number(cardID),
            },
            data: {
                num_upvotes: {
                    increment: 1,
                },
            }
        })
        res.status(202).json(updatedCard)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

module.exports = router