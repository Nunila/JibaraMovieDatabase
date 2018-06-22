import { Component, OnInit } from '@angular/core';
import {MoviesService} from './../services/movies-service/movies.service'

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.css']
})
export class SearchMoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
  }

  getAllMovies(){
    return this.moviesService.getAllMovies()
  }

}
