import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Movie, MovieOption} from './movies'
import * as fs from "fs";

// var MongoClient = require('mongodb').MongoClient;

// var uri = "mongodb+srv://nunila:<Alemania18>@mymoviedatabase-xue51.mongodb.net/movies?retryWrites=true";
// MongoClient.connect(uri, function(err, client) {
//    const collection = client.db("movies").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });

@Injectable({
  providedIn: 'root'
})


export class MoviesService {
  private existentMovies: Array<Movie> = new Array();
  private allMoviesWithImg: Array<Movie> = new Array();
  private top5: Array<Movie> = new Array();

  private movieOptions: Array<MovieOption> = new Array();
  public selectedMovie: Movie;
  public movieToPostOrPut: Movie;
  private modelPostPut = {
    id: null,
    title: null,
    year:null ,
    genres: null,
    runtime: null,
    plot: null,
    originalLanguage: null,
    director: null,
    writer: null,
    mainCast: null,
    rating:null,
    nuniReview: null,
    funFact: null,
    seen: null,
    images: null,
  }

  public loadedListCompleted = false;
  public arraysFilled = false;

  constructor(private http: HttpClient) { }



  //--------------------------//

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

  //---------------GET-------------------------------//

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
        //console.log(JSON.stringify(this.existentMovies,null,'\t'));
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
      if (properties[3])  genres = properties[3].split(' ').join('/');
      else genres = properties[3];
      if (properties[14]) files = properties[14].split('/'); 
      else files = properties[14];
      return {
        id: properties[0].toString(),
        title: properties[1],
        year: properties[2],
        genres: genres,
        runtime: properties[4],
        plot: properties[5],
        originalLanguage: properties[6],
        director: properties[7],
        writer: properties[8],
        mainCast: properties[9],
        rating: properties[10],
        nuniReview: properties[11],
        funFact: properties[12],
        seen: properties[13],
        images: files
      }       
    });

    this.existentMovies.pop();
    this.fillOtherMovieArr();
  }

  //------------------- POST and PUT ----------------------------------//

  httpPutMovie(){
    var csvString = this.parseObjectToCSV(this.movieToPostOrPut);
    var newLine = "\r\n";

    
    // fs.stat('MovieDBcsv.csv', function (err, stat) {
    //   if (err == null) {
    //       console.log('File exists'); 
    //       //write the actual data and end with newline
    //       var csv = csvString + newLine;
  
    //       fs.appendFile('MovieDBcsv.csv', csv, function (err) {
    //           if (err) throw err;
    //           console.log('The "data to append" was appended to file!');
    //       });
    //   }
    //   else {
    //     console.log(err);
    //     console.log(stat);
    //   }

    // });
}

  parseObjectToCSV(movie: Movie) {    
    
    Object.entries(movie).forEach(entry => {
      if (entry[0] == "images"){
        this.modelPostPut.images = entry[1].join("/");
      }
      else {
        this.modelPostPut[entry[0]] = entry[1];
      }
    })

    var csv:string = Object.values(this.modelPostPut).join(",");
    return csv;

  }
  
  //---------------------------------------//
  fillOtherMovieArr(){
    this.existentMovies.forEach(movie => {
      //Movies with image
      if (movie.images[0]) {
        if (movie.images[0].length >1)
        this.allMoviesWithImg.push(movie);
      }
      //movie options
      this.movieOptions.push({value: movie.id, text: movie.title});

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
    return this.allMoviesWithImg;
  }

  getMovieOptions(){
    return this.movieOptions;
  }


}
