const express = require('express')

const prisma = require('./prisma.js')

const router = express.Router()

router.get('/', async (req, res) => {
    const searchQuery = req.query["searchQuery"]
    const filter = req.query["filter"]
    let results = null
    if (searchQuery) {
        results = await prisma.board.findMany({
            where: {
                title: {
                    contains: searchQuery,
                },
            },
        })
    } else {
        results = await prisma.board.findMany()
    }

    let filteredResults = []
    switch (filter) {
        case "recent":
            filteredResults = results.
            break;
    }

    res.status(200).json(results)
})

router.post('/', async (req, res) => {
    const { title, category, image, author } = req.body
    const num_upvotes = 0
    const newBoard = await prisma.board.create({
        data: {
            title,
            category,
            image,
            author,
            num_upvotes,
        }
    })
    res.status(201).json(newBoard)
})

router.delete('/:boardID', async (req, res) => {
    const { boardID } = req.params
    const intial_num_boards = await prisma.board.count()
    await prisma.board.delete({
        where: {
            id: parseInt(boardID),
        }
    })
    const new_num_boards = await prisma.board.count()
    if (new_num_boards < intial_num_boards) {
        res.status(204).send()
    } else {
        res.status(404).send(`BoardID: ${boardID} not found`)
    }
})

module.exports = router