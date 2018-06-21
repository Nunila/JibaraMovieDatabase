import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Movie} from './movies'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private existentMovies: Array<Movie> = new Array();
  private allMoviesWithImg: Array<Movie> = new Array();
  
  public selectedMovie: Movie;
  private top5: Array<Movie> = new Array();

  public loadedListCompleted = false;
  public arraysFilled = false;

  constructor(private http: HttpClient) { }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex; 
    while (0 !== currentIndex) { 
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1; 
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }  
    return array;
  }

  httpGetAllMovies(){
    this.http.get('assets/MovieDBcsv.csv', {responseType: 'text'})
    .subscribe(
        data => {
          this.parseCSVToObject(data);
        },
        error => {
          console.log(error);
        },
      () => {
        this.loadedListCompleted = true;
        this.arraysFilled = true;
      }
    )
  }

  parseCSVToObject(csv :string) {

    var rows:string[] = csv.split('\n')
    rows.splice(0,1);

    this.existentMovies = rows.map((val,i) => {
      var properties = val.split(',');
      var genres, files;
      if (properties[3])  genres = properties[3].split(' ');
      else genres = properties[3];
      if (properties[13]) files = properties[13].split('/'); 
      else files = properties[13];
      return {
        id: properties[0].toString(),
        title: properties[1],
        year: properties[2],
        genres: genres,
        plot: properties[4],
        originalLanguage: properties[5],
        director: properties[6],
        writer: properties[7],
        mainCast: properties[8],
        rating: properties[9],
        nuniReview: properties[10],
        funFact: properties[11],
        seen: properties[12],
        images: files
      }       
    });

    this.fillMovWithImgArr();
  }

  fillMovWithImgArr(){
    this.existentMovies.forEach(movie => {
      if (movie.images[0]) {
        if (movie.images[0].length >1)
        this.allMoviesWithImg.push(movie);
      }
    });
  }

  

  setSelectedMovie(newId:string){
    this.selectedMovie = this.getMovieById(newId);
  }

  getDeterminedPicture(movId: string, allignment:string){

  }

  //---------------Custom lists---------------------//

  getAllMovies(){
    return this.existentMovies
  }

  getMovieById(lookupId){    
    var r =  this.existentMovies.find(function(movie){
      return movie.id == lookupId;
    });
    return r;
  }
  
  getTop5Movies(){
    if (this.existentMovies) {
      var top1 = this.getMovieById('1000'), //Get out
    top2 = this.getMovieById('1029'), //The one i love
    top3 = this.getMovieById('1050'), //django
    top4 =this.getMovieById('1009') //Balck Swan
    //top5 =this.getMovieById('1006'); //Gone Girl

    this.top5 = [top1, top2, top3,  top4];
    return this.top5;
    }
    else return;  
  }

  getAllMoviesWithImg() {
    return this.allMoviesWithImg
  }


}
