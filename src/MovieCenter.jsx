import Singleton from 'react-singleton'
// var Singleton = require('react-singleton').default

class MovieCenter {
    constructor() {
        // this.token = "";
    }

    setMovieGen(movieGen) {
        this.movieGen = movieGen;
    }

    getMovieGen(movieGen) {
        return this.movieGen;
    }
}

export default new Singleton(MovieCenter)