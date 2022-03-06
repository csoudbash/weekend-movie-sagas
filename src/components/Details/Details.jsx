import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Details() {


    const movie = useSelector(store => store.details)// referencing store that has the details of the movie we clicked on in the movielist view
    const genres = useSelector(store => store.genres)// referencing store that has the details of the movie genres grabbed from the database and stored in a reducer
    const history = useHistory(); // tying invoked useHistory to a variable we can then push to in order to change between views
   

    const handleBack = () => {// when back button is clicked, run handleBack function
        history.push('/') // switching to the movielist component to render on the DOM
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
