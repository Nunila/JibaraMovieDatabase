import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../services/movies-service/movies.service'
import {Movie} from '../services/movies-service/movies'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private top5Movies = new Array();
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.httpGetAllMovies();
  }

  setSelectedMovie(ss:string){
    this.moviesService.setSelectedMovie(ss);
  }

  getTop5Movies() {
    if (this.moviesService.getTop5Movies()[0] == undefined){
      return null;
    }
    else {
      if(this.top5Movies.length > 1) return this.top5Movies
      else {
        this.top5Movies = this.moviesService.getTop5Movies()
        return this.top5Movies
      }      
    }
  }

  ss(a,b){
    this.moviesService.getDeterminedPicture(a,b)
  }


}
