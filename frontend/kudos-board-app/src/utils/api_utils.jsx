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

// Fetches all boards if no search term
export const fetchBoardsBySearch = async (searchQuery) => {
    try {
        const response = await fetch(`http://localhost:3000/api/boards/?searchQuery=${searchQuery}`, {
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