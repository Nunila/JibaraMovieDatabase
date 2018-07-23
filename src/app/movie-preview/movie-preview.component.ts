import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../services/movies-service/movies.service'
import {Movie, movieSchema} from '../services/movies-service/movies'

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  private selectedMovie: movieSchema;

  ngOnInit() {
    this.selectedMovie = this.moviesService.selectedMovie;
    document.getElementsByClassName('movie-poster')[0].firstElementChild.setAttribute('src',this.selectedMovie.images[0])

    const movieMedia = document.getElementsByClassName('movie-media')[0];
    this.selectedMovie.images.forEach((image, i)=> {
      if(i> 0 && i<3){
        var im = document.createElement("img");
        im.src = this.selectedMovie.images[i];
        im.style.maxWidth = '100%';
        im.style.margin = '5px'
        movieMedia.appendChild(im);
      }
    });
  }



}
