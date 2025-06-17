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
export const fetchCardsByBoardID = async () => {
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

export const deleteBoardByID = async (boardID) => {
    try {
        const response = await fetch(`http://localhost:3000/api/boards/${boardID}`, {
            method: 'DELETE',
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}