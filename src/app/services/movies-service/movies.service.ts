import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Movie} from './movies'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private existentMovies: Array<Movie> = new Array();

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
    )
  }

  parseCSVToObject(csv :string) {

    var rows:string[] = csv.split('\n')
    rows.splice(0,1);

    this.existentMovies = rows.map(val => {
      var properties = val.split(',');
      return {title: properties[0],
        year: properties[1],
        genres: properties[2],
        originalLanguage: properties[3],
        director: properties[4],
        mainCast: properties[5],
        rating: properties[6],
        nuniReview: properties[7],
        funFact: properties[8],
        Seen: properties[9]}
    });
  }

  getAllMovies(){
    return this.existentMovies
  }

}
