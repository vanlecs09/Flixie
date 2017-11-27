import React, { Component } from 'react';
import { Card, CardHeader, CardHeaderTitle, CardImage, CardContent, Media, 
    MediaLeft, MediaRight, Title, Subtitle, MediaContent, Content,CardHeaderIcon } from 'bloomer';
import "./MovieCard.css";
import './App.css';
// import MovieCenter from './MovieCenter.jsx';

export default class MovieCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
        }

        this.baseImageUrl = "http://image.tmdb.org/t/p/";
    }


    render() {  
        let genNames = "";
        this.props.movie.genre_ids.forEach(function(genID, index) {
            let genElement = window.movieGens.find(function(ele){
                return ele.id == genID
            })
            genNames += genElement.name;
            genNames += this.props.movie.genre_ids.length - 1 == index ? "." : ", "
        }.bind(this));
        return (
            <div>
                <Card>
                    <CardImage>
                        <img className = "Card-image" src={this.baseImageUrl + "w342" + this.props.movie.poster_path } 
                            onClick = {(e) => this.props.onLightBoxMode(e,this.props.movie.id)}/>
                    </CardImage>
                    <CardContent>
                        <Media>
                            <MediaLeft>
                                <Subtitle isSize={6}>{this.props.movie.vote_average}</Subtitle>
                            </MediaLeft>
                            <MediaContent>
                                <Title isSize={4}>{this.props.movie.title}</Title>
                                <Subtitle isSize={6}>@{genNames}</Subtitle>
                            </MediaContent>
                            <MediaRight>
                                <Subtitle isSize={6}>{this.props.movie.release_date}</Subtitle>
                            </MediaRight>
                        </Media>
                        <Content>{this.props.movie.overview}</Content>
                    </CardContent>
                </Card>
            </div>
        )
    }
}