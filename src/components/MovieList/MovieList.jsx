import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory}  from 'react-router-dom';
function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies); //referencing store that has the list of the movies grabbed from the database and stored in a reducer
    const history = useHistory(); // tying invoked useHistory to a variable we can then push to in order to change between views

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' }); // om page load, run the fetch movies saga which runs an axios GET to grab the array of movie objects from the database
    }, []);

    const handleDetails = (movie) => {
        console.log(movie);
        dispatch({ type: 'SAVE_DETAILS', payload: movie}) // dipatch for saving the details of the selected movie in a reducer 
        dispatch({type: 'FETCH_GENRES', payload: movie.id}) // dispatch sent to a saga to run an axios GET to grab the genres for the movie selected from the database
        history.push('/details') // swichting to the deatails component to render on the DOM
    }
    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} onClick={() => {handleDetails(movie)}}>
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;