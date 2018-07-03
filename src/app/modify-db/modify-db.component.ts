import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies-service/movies.service'
import { Movie } from '../services/movies-service/movies'

import * as $ from 'jquery';
import swal from 'sweetalert2';


@Component({
  selector: 'app-modify-db',
  templateUrl: './modify-db.component.html',
  styleUrls: ['./modify-db.component.css']
})
export class ModifyDBComponent implements OnInit {

  private selectedMovieId: string;
  private selectedMovie: Movie;
  private newMovie: Movie =   {
    id: '',
    title: '',
    year: '',
    genres: [],
    runtime: '',
    plot: '',
    originalLanguage: '',
    director: '',
    writer: '',
    mainCast: '',
    rating: '',
    nuniReview: '',
    funFact: '',
    seen: '',
    images: [],
  } ;
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    if(this.moviesService.getAllMovies().length < 1)  this.moviesService.httpNewGetAllMovies();

    this.selectedMovie = this.moviesService.getMovieById(this.selectedMovieId);
    this.setValidate();
  }

  getMovOpt(){
    return this.moviesService.getMovieOptions();
  }

  setSelectedMovie(){
    this.selectedMovie = this.moviesService.getMovieById(this.selectedMovieId);
    this.setValidate();
  }

  setValidate(){
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          this.validPut = false;
          event.preventDefault();
          event.stopPropagation();
        }
        else {
          this.validPut = true;
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  validateForm(obj: Movie){
    var mess:string = "";

    Object.entries(obj).forEach((entry, i) => {
      if (i<11) {
        if (entry[1].length < 1){
          mess+= "Please enter a value for "+ entry[0] + " .";
        }
      }
    })
    return mess;
  }
  //------------------------------//

  putMovie(){
    this.moviesService.httpPutMovie(this.selectedMovie);
  }

  postNewMovie(){
    //$('#wo').show();
    //this.validateForm(this.newMovie);
    this.moviesService.httpPostMovie(this.newMovie);
  }

}
