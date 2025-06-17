import './FilterBar.css'

const FilterBar = ({updateFilter}) => {
    return(
        <div className='filterbar'>
            <button className='filterbar-button' onClick={() => updateFilter("all")}>Home/All</button>
            <button className='filterbar-button' onClick={() => updateFilter("recent")}>Recent</button>
            <button className='filterbar-button' onClick={() => updateFilter("celebration")}>Celebration</button>
            <button className='filterbar-button' onClick={() => updateFilter("thank-you")}>Thank You</button>
            <button className='filterbar-button' onClick={() => updateFilter("inspiration")}>Inspiration</button>
        </div>
    )
}

export default FilterBar