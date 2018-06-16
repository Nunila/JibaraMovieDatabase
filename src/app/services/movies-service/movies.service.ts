import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Movie} from './movies'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private existentMovies: Array<Movie> = new Array();
  
  public selectedMovie: Movie;
  private top5: Array<Movie> = new Array();

  public loadedListCompleted = false;

  constructor(private http: HttpClient) { }

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
      }
    )
  }

  parseCSVToObject(csv :string) {

    var rows:string[] = csv.split('\n')
    rows.splice(0,1);

    this.existentMovies = rows.map((val,i) => {
      var properties = val.split(',');
      var genres;
      if (properties[3])  genres = properties[3].split(' ');
      else genres = properties[3];
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
        posterFileName: properties[13]
      }       
    });
  }

  getAllMovies(){
    return this.existentMovies
  }

  getMovieById(lookupId){    
    var r =  this.existentMovies.find(function(movie){
      return movie.id == lookupId;
    });
    return r;
  }

  setSelectedMovie(newId:string){
    this.selectedMovie = this.getMovieById(newId);
  }

  getDeterminedPicture(movId: string, allignment:string){
    var src = "../../assets/movie-posters/"
    var movie = this.getMovieById(movId);
    var usefulName = movie.title.toLowerCase()
    console.log(usefulName);

    src += usefulName + ".jpg"

    return src;

  }

  //---------------Custom lists---------------------//

  getTop5Movies(){
    var top1 = this.getMovieById('1008'), //Shutter Island
    top2 = this.getMovieById('1029'), //The one i live
    top3 = this.getMovieById('1050'), //django
    top4 =this.getMovieById('1009'), //Balck Swan
    top5 =this.getMovieById('1006'); //Gone Girl

    this.top5 = [top1, top2, top3, top4, top5];
    return this.top5;
  }

}
