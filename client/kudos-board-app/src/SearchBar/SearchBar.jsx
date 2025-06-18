import { useState } from 'react'
import './SearchBar.css'

const SearchBar = ({searchQuery, updateSearchQuery, handleSearch, handleClearSearch}) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }
    return(
        <div className='searchbar'>
            <input className='searchbar-searchbar' 
            value={searchQuery} 
            onChange={(e) => updateSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Search for boards...'></input>
            <button className='searchbar-submit' onClick={() => handleSearch()}>Search</button>
            <button className='searchbar-clear' onClick={() => handleClearSearch()}>Clear</button>
        </div>
    )
}

export default SearchBar