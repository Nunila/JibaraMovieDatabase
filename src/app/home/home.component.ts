import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../services/movies-service/movies.service'
import {Movie, movieSchema} from '../services/movies-service/movies'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Array<any>;
  private allMovsPics: Array<movieSchema> = new Array();

  private initializedTop = 0;
  private initializedAll = 0;
  private shuffle = 0;

  private groceryList = new Array;


  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    //if (this.moviesService.getAllMovies().length < 1)    this.moviesService.httpGetAllMovies();
    if (this.moviesService.getAllMovies().length <1) this.moviesService.httpNewGetAllMovies();    
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
        images[i].firstElementChild.setAttribute('src', this.allMovsPics[i].images[0]);
      }
    }
    if (this.shuffle <2) {
      this.shuffle++; 
      return this.moviesService.shuffle(this.allMovsPics);
    }
    else {
      return this.allMovsPics;
    }
  }
}
