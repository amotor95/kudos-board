const express = require('express')

const prisma = require('./prisma.js')


const router = express.Router()

const cors = require('cors')
// Enable CORS for all routes
router.use(cors())

// Get boards by search and filter
router.get('/', async (req, res) => {
    try {
        const searchQuery = req.query["searchQuery"]
        const filter = req.query["filter"]

        let results = null
        let prismaQuery = {}
        
        if (searchQuery) {
            prismaQuery["where"] = { "title": {"contains": searchQuery}}
        }

        switch (filter) {
            // If all, no filter
            case "all":
                break;
            // If recent filter, grab 6 most recently created
            case "recent":
                // Create orderBy dict
                prismaQuery["orderBy"] = {}
                prismaQuery["orderBy"]["id"] = 'desc'
                prismaQuery["take"] = 6
                break;
            // Otherwise, filtering by category
            default:
                // If no where dict yet, create one
                prismaQuery["where"] = prismaQuery["where"] || {};
                prismaQuery["where"]["category"] = {"equals": filter}
                break;
            }
        results = await prisma.board.findMany(prismaQuery)

        res.status(200).json(results)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
})

// Get board by ID
router.get('/:boardID', async (req, res) => {
    try {
        const { boardID } = req.params
        const board = await prisma.board.findUnique({
            where: {
                id: Number(boardID),
            }
        })
        if (board) {
            res.status(200).json(board)
        } else {
            console.error(`BoardID: ${boardID} not found`)
            res.status(404).json(`BoardID: ${boardID} not found`)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// Get board's cards by boardID
router.get('/:boardID/cards', async (req, res) => {
    try {
        const { boardID } = req.params
        const board = await prisma.board.findUnique({
            where: {
                id: Number(boardID)
            }
        })
        if (!board) {
            console.error(`BoardID: ${boardID} not found`)
            res.status(404).json(`BoardID: ${boardID} not found`)
            return
        }
        const cards = await prisma.card.findMany({
            where: {
                board_id: Number(boardID),
            }
        })
        res.status(200).json(cards)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// Create board
router.post('/', async (req, res) => {
    try {
        const { title, category, image, author } = req.body
        const num_upvotes = 0
        const newBoard = await prisma.board.create({
            data: {
                title,
                category,
                image,
                author,
            }
        })
        res.status(201).json(newBoard)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// Delete board by ID
router.delete('/:boardID', async (req, res) => {
    try {
        const { boardID } = req.params
        const intial_num_boards = await prisma.board.count()
        await prisma.board.delete({
            where: {
                id: Number(boardID),
            }
        })
        const new_num_boards = await prisma.board.count()
        if (new_num_boards < intial_num_boards) {
            res.status(204).send()
        } else {
            console.error(`BoardID: ${boardID} not found`)
            res.status(404).send(`BoardID: ${boardID} not found`)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// Toggle card pinned status for board
router.patch('/:boardID/pin/:cardID', async (req, res) => {
    try {
        let { boardID, cardID } = req.params
        boardID = Number(boardID)
        cardID = Number(cardID)
        const board = await prisma.board.findUnique({
            where: {
                id: boardID,
            }
        })
        if (!board) {
            console.error(`BoardID: ${boardID} not found`)
            res.status(404).json(`BoardID: ${boardID} not found`)
            return
        }
        let pinnedCardIDs = board.pinnedCardIDs
        if (pinnedCardIDs.includes(cardID)) {
            pinnedCardIDs = pinnedCardIDs.filter((id) => id !== cardID)
        } else {
            if (pinnedCardIDs.length >= 6) {
                console.error(`BoardID: ${boardID} already has the max amount of pinned cards.`)
                res.status(412).send(`BoardID: ${boardID} already has the max amount of pinned cards.`)
                return;
            } else {
                pinnedCardIDs.push(cardID)
            }
        }
        const updatedBoard = await prisma.board.update({
            where: {
                id: boardID
            },
            data: {
                pinnedCardIDs: [...pinnedCardIDs]
            }
        })
        res.status(200).json(updatedBoard)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

module.exports = router