import './FilterBar.css'

const FilterBar = ({updateFilter}) => {
    return(
        <div className='filterbar'>
            <button className='filterbar-button' onClick={() => updateFilter("all")}>Home/All</button>
            <button className='filterbar-button' onClick={() => updateFilter("recent")}>Recent</button>
            <button className='filterbar-button' onClick={() => updateFilter("Celebration")}>Celebration</button>
            <button className='filterbar-button' onClick={() => updateFilter("Thank-You")}>Thank You</button>
            <button className='filterbar-button' onClick={() => updateFilter("Inspiration")}>Inspiration</button>
        </div>
    )
}

export default FilterBar