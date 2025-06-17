import './GiphyDisplay.css'

const GiphyDisplay = ({ gifs, updateGIFURL}) => {
    return(
        <div className='giphydisplay'>
            {gifs && gifs.map( (gif) => {
                return <img key={gif.slug} className='giphydisplay-gif' src={gif.images.original.url} alt={gif.alt_text} onClick={() => updateGIFURL(gif.images.original.url)}></img>
            })}
        </div>
    )
}

export default GiphyDisplay