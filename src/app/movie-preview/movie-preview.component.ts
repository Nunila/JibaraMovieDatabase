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
  private cast: string[] = new Array();

  ngOnInit() {
    this.selectedMovie = this.moviesService.selectedMovie;

    var each = this.selectedMovie.mainCast.split(' ');
    var limit = each.length/2;
    for(var i=0;i<=limit;i+=2){
      this.cast.push(each[i]+ " " + each[i+1]);
    }
    console.log(this.selectedMovie)
  }



}
