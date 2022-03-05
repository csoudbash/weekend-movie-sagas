import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';



function Details() {

useEffect(() => {

})

    const movie = useSelector(store => store.details)
    const genres = useSelector(store => store.genres)
    const history = useHistory();
    console.log(genres);
    const handleBack = () => {

        history.push('/')
    }

    return (
        <>
            <img src={movie.poster} />
            <h2>{movie.title}</h2>
            <h2>{movie.description}</h2>

            {genres.map(genre => (
                <p key={genre.name}>
                    {genre.name}</p>
            
            ))}
            <button onClick={handleBack}>Back</button>
        </>
    )
}

export default Details;
