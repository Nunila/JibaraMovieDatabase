import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../services/movies-service/movies.service'
import {Movie} from '../services/movies-service/movies'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private top5Movies: Array<Movie> = new Array(5);

  private initialized = 0;
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.httpGetAllMovies();
  }

  setSelectedMovie(ss:string){
    this.moviesService.setSelectedMovie(ss);
  }

  getTop5Movies() {
    if (this.initialized ==0) {
      this.top5Movies = this.moviesService.getTop5Movies();
      this.initialized = 1
      return this.top5Movies;
    }
    if (this.initialized == 1){
      this.initialized = 2;
      var images = document.getElementsByClassName('wo');
      for(var i=0;i<images.length;i++){
        images[i].firstElementChild.setAttribute('src', "../../assets/movie-posters/" + this.top5Movies[i].images[1]);
      }
    }
    return this.top5Movies
  }

}
