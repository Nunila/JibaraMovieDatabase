import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies-service/movies.service'
import { Movie } from '../services/movies-service/movies'

@Component({
  selector: 'app-modify-db',
  templateUrl: './modify-db.component.html',
  styleUrls: ['./modify-db.component.css']
})
export class ModifyDBComponent implements OnInit {

  private selectedMovieId: string;
  private selectedMovie: Movie;
  private newMovie: Movie = {} as Movie;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    if(this.moviesService.getAllMovies().length < 1)  this.moviesService.httpGetAllMovies();

    this.selectedMovieId = "1083";
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
    console.log(forms)
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  submitPUT(){

  }

  submitPOST(){

  }

}
