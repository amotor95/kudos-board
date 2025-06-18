// Creates a board
export const createBoard = async (board) => {
    try {
        const response = await fetch('http://localhost:3000/api/boards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(board),
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Creates a card
export const createCard = async (card) => {
    try {
        const response = await fetch('http://localhost:3000/api/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card),
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Creates a comment
export const createComment = async (comment) => {
    try {
        const response = await fetch('http://localhost:3000/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Fetches all boards
export const fetchAllBoards = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/boards/`, {
            method: 'GET',
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Fetches board by ID
export const fetchBoardByID = async (boardID) => {
    try {
        const response = await fetch(`http://localhost:3000/api/boards/${boardID}`, {
            method: 'GET',
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Fetches cards by board ID
export const fetchCardsByBoardID = async (boardID) => {
    try {
        const response = await fetch(`http://localhost:3000/api/boards/${boardID}/cards`, {
            method: 'GET',
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Fetches comments by card ID
export const fetchCommentsByCardID = async (cardID) => {
    try {
        const response = await fetch(`http://localhost:3000/api/cards/${cardID}/comments`, {
            method: 'GET',
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Fetches all boards if no search term
export const fetchBoardsBySearchAndFilter = async (searchQuery, filter) => {
    const boardsURLBuilder = () => {
        let URL = `http://localhost:3000/api/boards/`
        let hasParams = false
        if (searchQuery) {
            hasParams = true
            URL += `?searchQuery=${searchQuery}`
        }
        if (!(filter === "all")) {
            if (!hasParams) {
                URL += `?filter=${filter}`
            } else {
                URL += `&filter=${filter}`
            }
        }
        return URL
    }
    try {
        let URL = boardsURLBuilder()
        const response = await fetch(URL, {
            method: 'GET',
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Deletes board by ID
export const deleteBoardByID = async (boardID) => {
    try {
        const response = await fetch(`http://localhost:3000/api/boards/${boardID}`, {
            method: 'DELETE',
        });
        const data = response
        return data
    } catch (error) {
        console.error(error)
    }
}

// Deletes card by ID
export const deleteCardByID = async (cardID) => {
    try {
        const response = await fetch(`http://localhost:3000/api/cards/${cardID}`, {
            method: 'DELETE',
        });
        const data = response
        return data
    } catch (error) {
        console.error(error)
    }
}

// Upvotes card by ID
export const upvoteCardByID = async (cardID) => {
    try {
        const response = await fetch(`http://localhost:3000/api/cards/${cardID}`, {
            method: 'PATCH',
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Pins card by ID
export const pinCardIDByBoardID = async ({cardID, boardID}) => {
    try {
        const response = await fetch(`http://localhost:3000/api/boards/${boardID}/pin/${cardID}`, {
            method: 'PATCH',
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// Fetches 6 giphys using the search query
export const fetchGIPHYBySearch = async (searchQuery) => {
    try {
        const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${searchQuery}&limit=6`, {
            method: 'GET',
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}