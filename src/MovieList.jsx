import React, {Component} from 'react'
import  MovieCard  from './MovieCard.jsx'
import  {Button}  from 'bloomer';

export default class MovieList extends Component {
    render() {
        const {movies, handleClick} = this.props;
        return (
            <div>
                {movies.map( movie =>  <MovieCard key = {movie.id} movie = {movie} onLightBoxMode = {(e,id) => this.props.onLightBoxMode(e,id)}/>)}
                <Button isColor='info' onClick = { (e) => handleClick(e)}> load more </Button>
            </div>
        )    
    }
}   