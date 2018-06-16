import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../services/movies-service/movies.service'
import {Movie} from '../services/movies-service/movies'

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  private selectedMovie: Movie;

  ngOnInit() {
    this.selectedMovie = this.moviesService.selectedMovie;
    console.log(this.selectedMovie)
  }

}
