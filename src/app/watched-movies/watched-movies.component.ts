import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies-service/movies.service';

@Component({
  selector: 'app-watched-movies',
  templateUrl: './watched-movies.component.html',
  styleUrls: ['./watched-movies.component.css']
})
export class WatchedMoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
  }

  test(){
    this.moviesService.testing();
  }
}
