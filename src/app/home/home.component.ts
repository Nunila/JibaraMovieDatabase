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
  private allMovsPics: Array<Movie> = new Array();

  private initializedTop = 0;
  private initializedAll = 0;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    if (this.moviesService.getAllMovies().length < 1)    this.moviesService.httpGetAllMovies();
  }

  setSelectedMovie(ss:string){
    this.moviesService.setSelectedMovie(ss);
  }



  getAllMovWithImg(){
    if (this.initializedAll ==0) {
      this.allMovsPics = this.moviesService.getAllMoviesWithImg();
      this.initializedAll = 1
      return this.allMovsPics;
    }
    if (this.initializedAll == 1){
      this.initializedAll = 2;
      var images = document.getElementsByClassName('all-movs');
      for(var i=0;i<images.length;i++){
        images[i].firstElementChild.setAttribute('src', "../../assets/movie-posters/" + this.allMovsPics[i].images[0]);
      }
    }
    return this.moviesService.shuffle(this.allMovsPics);
  }
  

  getTop5Movies() {
    if (this.initializedTop ==0) {
      this.top5Movies = this.moviesService.getTop5Movies();
      this.initializedTop = 1
      return this.top5Movies;
    }
    if (this.initializedTop == 1){
      this.initializedTop = 2;
      var images = document.getElementsByClassName('top-mov');
      for(var i=0;i<images.length;i++){
        images[i].firstElementChild.setAttribute('src', "../../assets/movie-posters/" + this.top5Movies[i].images[1]);
      }
    }
    return this.top5Movies
  }

}
