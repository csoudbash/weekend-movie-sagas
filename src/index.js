import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


function* rootSaga() { // saga functions
    yield takeEvery('FETCH_MOVIES', fetchAllMovies); // saga for grabbing the list of movies from the database run on page load of the MoviesList component
    yield takeEvery('FETCH_GENRES', fetchGenre); // saga for grabbing the list lf genres asscociated with the selected movie from the Deatils component
}

function* fetchAllMovies() { // get all movies from the database
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
}

function* fetchGenre(action) {
    // get all genres for the movie on the detail page from the DB
    console.log('this should be displaying a thing');
    try {
        const response = yield axios.get(`/api/genre/${action.payload}`);
        yield put({ type: 'SET_GENRES', payload: response.data });
    } catch {
        console.log('rut ro scoob');
    }
        
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
const details = (state = {}, action) => {
    switch (action.type) {
        case 'SAVE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}
// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies, // storing the movies grabbed for the database on page load of the home or MovieList component
        genres, // storing the genres grabbed from the database so that we can refer to them in the Details component
        details, // storing the details of the selected movie from the movieList component and allowing us to use that data on the Details component
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
