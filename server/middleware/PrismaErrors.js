const { Prisma } = require('@prisma/client')

app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({ error: err.message })
    }
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle common Prisma errors (e.g., unique constraint violation)
        if (err.code === 'P2002') {
            return res.status(400).json({ error: "A unique constraint violation occurred." })
        }
    }
    res.status(500).json({ error: "Internal Server Error" })
})