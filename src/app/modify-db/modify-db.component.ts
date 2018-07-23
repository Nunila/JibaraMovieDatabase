import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies-service/movies.service'
import { Movie, movieSchema } from '../services/movies-service/movies'

import * as $ from 'jquery';
import swal from 'sweetalert2';


@Component({
  selector: 'app-modify-db',
  templateUrl: './modify-db.component.html',
  styleUrls: ['./modify-db.component.css']
})
export class ModifyDBComponent implements OnInit {

  private selectedMovieId: string;
  private selectedMovie: movieSchema;
  private newMovie: movieSchema =   {
    id: '',
    title: '',
    year: '',
    genres: [""],
    runtime: '',
    plot: '',
    originalLanguage: '',
    director: '',
    writer: [''],
    mainCast: [''],
    rating: '',
    consensus: '',
    nuniReview: '',
    funFact: '',
    seen: '',
    images: [""],
  } ;

  private newImage = '';
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    if(this.moviesService.getAllMovies().length < 1)  this.moviesService.httpNewGetAllMovies();

    this.selectedMovie = this.moviesService.getMovieById(this.selectedMovieId);
    this.setValidate();
    document.getElementById("new-form").onkeypress = function(e) {
      var key = e.charCode || e.keyCode || 0;     
      if (key == 13) {
        e.preventDefault();
      }
    }
  }

  getMovOpt(){
    return this.moviesService.getMovieOptions();
  }

  setSelectedMovie(){
    this.selectedMovie = this.moviesService.getMovieById(this.selectedMovieId);
    this.setValidate();
    document.getElementById("mod-form").onkeypress = function(e) {
      var key = e.charCode || e.keyCode || 0;     
      if (key == 13) {
        e.preventDefault();
      }
    }
  }

  checkKey(e){
    if (e.key == "Enter")  this.add(e);
  }

  add(e): void {
    if (e) {
      if (e.target.name == 'newimages' || false)     this.newMovie.images.push(this.newImage);
      else this.selectedMovie.images.push(this.newImage);
    }
    this.newImage = '';
  }

  remove(i, which): void {
     if (which == 'new')  this.newMovie.images.splice(i,1);
     else this.selectedMovie.images.splice(i,1);

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
    console.log('wo')
    if (this.moviesService.gotDataLocally)   this.moviesService.httpPutMovie(this.selectedMovie);
    else  this.moviesService.firebasePut(this.selectedMovie);
  }

  postNewMovie(e){

    console.log(e)
    if (this.moviesService.gotDataLocally)  this.moviesService.httpPostMovie(this.newMovie);
    else this.moviesService.firebasePOST(this.newMovie);
  }

}
