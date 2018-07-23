import { Component, OnInit } from '@angular/core';
import {MoviesService} from './../services/movies-service/movies.service'
import { movieSchema } from '../services/movies-service/movies';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.css']
})
export class SearchMoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  private searchForm = {
    keyword: '',
    whichKey: 'title',
    min: '',
    max: '',
    whichRange: 'year'
  }
  private results: Array<movieSchema> = new Array();

  ngOnInit() {
    if (this.moviesService.getAllMovies().length <1) this.moviesService.httpNewGetAllMovies();    
  }

  getAllMovies(){
    return this.moviesService.getAllMovies()
  }

  getResults(){
    return [this.getAllMovies()[0]]
  }

  checkKey(e){
    if (e.key == "Enter")  this.moviesService.search(this.searchForm);
  }

}
