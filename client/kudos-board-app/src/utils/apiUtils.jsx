const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL

// Creates a board
export const createBoard = async (board) => {
    try {
        const response = await fetch(`${API_BASE_URL}/boards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(board),
        });
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

// Creates a card
export const createCard = async (card) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card),
        });
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

// Creates a comment
export const createComment = async (comment) => {
    try {
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

// Fetches all boards
export const fetchAllBoards = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/boards/`, {
            method: 'GET',
        });
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

// Fetches board by ID
export const fetchBoardByID = async (boardID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/boards/${boardID}`, {
            method: 'GET',
        });
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

// Fetches cards by board ID
export const fetchCardsByBoardID = async (boardID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/boards/${boardID}/cards`, {
            method: 'GET',
        });
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

// Fetches comments by card ID
export const fetchCommentsByCardID = async (cardID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cards/${cardID}/comments`, {
            method: 'GET',
        });
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

// Fetches all boards if no search term
export const fetchBoardsBySearchAndFilter = async (searchQuery, filter) => {
    const boardsURLBuilder = () => {
        let URL = `${API_BASE_URL}/boards/`
        let hasSearchQuery = false
        if (searchQuery) {
            hasSearchQuery = true
            URL += `?searchQuery=${searchQuery}`
        }
        if (!(filter === "all")) {
            if (!hasSearchQuery) {
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
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

// Deletes board by ID
export const deleteBoardByID = async (boardID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/boards/${boardID}`, {
            method: 'DELETE',
        });
        return response
    } catch (error) {
        console.error(error)
    }
}

// Deletes card by ID
export const deleteCardByID = async (cardID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cards/${cardID}`, {
            method: 'DELETE',
        });
        return response
    } catch (error) {
        console.error(error)
    }
}

// Upvotes card by ID
export const upvoteCardByID = async (cardID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cards/${cardID}`, {
            method: 'PATCH',
        });
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

// Pins card by ID
export const pinCardIDByBoardID = async ({cardID, boardID}) => {
    try {
        const response = await fetch(`${API_BASE_URL}/boards/${boardID}/pin/${cardID}`, {
            method: 'PATCH',
        });
        return await response.json()
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
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}