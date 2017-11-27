import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Image,Container, Field, Label, Control, Input, Button, View, Select } from 'bloomer';
import "bulma/css/bulma.css";
import MovieList from "./MovieList";
import Lightbox from 'react-images';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies : [],
      arrImageUrls : [],
      searchMovies : [],
      isLoading : true,
      page : 1,
      isLightBoxMode : false,
      currentItemInLightBox : 0,
    }

    this.baseImageUrl = "http://image.tmdb.org/t/p/";

    setTimeout(function() {
      this.setState({
        isLoading : false
      })
    }.bind(this), 2000)
  }

  async componentDidMount() {
    this.fetchMovieGens()
    this.fetchMovie(this.state.page)
  }

  async fetchMovieGens() {
    let result = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&language=en-US");
    const data = await result.json();
    window.movieGens = data.genres;
  }

  async fetchMovie(page) {
    let movieUrl = this.getMovieUrl(page);
    const result = await fetch(movieUrl);
    const data = await result.json();
    this.setState({
      movies : this.state.movies.concat(data.results),
      
    })
  }

  getMovieUrl(page) {
    return "https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&language=en-US&page=" + page;
  }

  loadMore () {
      let page = this.state.page + 1;
      this.setState({
        page : page
      })
      this.fetchMovie(page);
  }

  onChange(obj) {
    this.searchString = obj.target.value;
    if(this.searchString.length == 0) {
      this.setState({
        searchMovies : []
      })
    }
  }

  onSearch() {
    let self = this;
    let movies = this.state.movies;
    let searchMovies = [];
    movies.forEach(function(movie) {
      if(movie.title.toLowerCase().includes(self.searchString.toLowerCase())) {
        searchMovies.push(movie);
      }
    })

    this.setState({
      searchMovies : searchMovies
    })
  }

  onSortSelect(obj) {
    // console.log(obj.target.value);/
    let movies = this.state.movies;
    
    if(obj.target.value == 'popularity'){
      movies = movies.sort(function(a,b) {
        return b.popularity - a.popularity;
      });
    } else if (obj.target.value == 'rating') {
      movies = movies.sort(function(a,b) {
        return b.vote_average > b.vote_average;
      });
    } else if (obj.target.value ==  'release date') {
      console.log("compare release day");
      movies = movies.sort(function(a,b) {
        return new Date(b.release_date) - new Date(a.release_date);
      });
    }
    console.log("compare done")
    console.log(movies);
    this.setState({
      movies : movies
    })
  }

  onLightBoxMode(e, movieID) {
    // console.log("enter light box mode");
    // console.log(obj.target.value);
    

    let movies = this.state.movies;
    let arrImageUrls = [];
    let currentIndex = 0;
    movies.forEach(function(movie, index){
      arrImageUrls.push({
        src : this.baseImageUrl + 'original' + movie.poster_path
      })
      if(movie.id == movieID){
        currentIndex = index
      }
    }.bind(this))

    this.setState({
      isLightBoxMode : true,
      arrImageUrls : arrImageUrls,
      currentItemInLightBox : currentIndex
    })
  }

  onCloseLightBoxMode() {
    this.setState({
      isLightBoxMode : false,
    })
  }

  // gotoPreviousItemInLightBox() {
  //   // let nextImage = this.state.currentItemInLightBox + 1;
  //   this.setState({
  //     currentItemInLightBox : this.state.currentItemInLightBox + 1
  //   })
  // }

  // gotoNextItemInLightBox() {
  //   // let nextImage = this.state.currentItemInLightBox - 1;
  //   this.setState({
  //     currentItemInLightBox : this.state.currentItemInLightBox - 1
  //   })
  // }


  render() {
    let content = null;
    if(this.state.searchMovies.length > 0) {
      let cardList = <MovieList movies= {this.state.searchMovies} handleClick = {this.loadMore.bind(this)}/>
      content = 
      <Container>
        <Field>
          <Control>
            <Input type="text" placeholder='Text Input' onChange = {this.onChange.bind(this)}/>
          </Control>
        </Field>
          <Button isColor='success' isOutlined onClick = {this.onSearch.bind(this)}>Search</Button>
          {cardList}
      </Container> 
    } else if(this.state.isLoading) {
      content = <img src={"/loading_spinner.png"} className="Loading-logo" alt="logo" />
    } else {
      let cardList = <MovieList movies= {this.state.movies} handleClick = {this.loadMore.bind(this)} onLightBoxMode = {this.onLightBoxMode.bind(this)}/> 
      content = 
      <Container>
        <Lightbox
          currentImage={this.state.currentItemInLightBox}
          images={this.state.arrImageUrls}
          isOpen={this.state.isLightBoxMode}
          onClose={(e,id) => this.onCloseLightBoxMode(e,id)}
          // onClickPrev={this.gotoPreviousItemInLightBox.bind(this)}
          // onClickNext={this.gotoNextItemInLightBox.bind(this)}
        />
        <Field>
          <Control>
            <Input type="text" placeholder='Text Input' onChange = {this.onChange.bind(this)}/>
          </Control>
        </Field>
        <Button isColor='success' isOutlined onClick = {this.onSearch.bind(this)}>Search</Button>
        
        <Field>
          <Label>Sort By:</Label>
            <Control>
              <Select onChange={this.onSortSelect.bind(this)}>
                <option>none</option>
                <option>rating</option>
                <option>popularity</option>
                <option>release date</option>
              </Select>
            </Control>
        </Field>
        {cardList}
        
      </Container>
    }
    return (
      <Container>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Fliexie</h1>
        </header>
        {content}
      </div>
      </Container>
    );
  }
}

export default App;
