import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";

import {Movie, MovieOption} from './movies'
import {LoginService} from '../login-service/login.service'

import swal from 'sweetalert2';
var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");

@Injectable({
  providedIn: 'root'
})


export class MoviesService {
  //private existentMovies: Array<Movie> = new Array();
  private firebaseDB;
  public gotDataLocally = true;

  private allMovies: Array<Movie> = new Array();
  private TESTallMovies: Array<Movie> = new Array();


  private allMoviesWithImg: Array<Movie> = new Array();
  private top5: Array<Movie> = new Array();

  private movieOptions: Array<MovieOption> = new Array();
  public selectedMovie: Movie;
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

  private result;

  constructor(private _http: HttpClient, private http:Http, private loginService:LoginService) {   
    this.firebaseDB = this.loginService.firebaseDB;
   }

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

  //-----------------Firebase HTTP-----------------------------------------//
  firebasePOST(newMov:Movie){
    var newPostKey = this.firebaseDB.ref().child('movies').push().key;
    newMov.id = newPostKey;
    var updates = {};
    updates['/movies/' + newPostKey] = newMov;

    this.firebaseDB.ref().update(updates,
      error => {
        if (error){
          swal({
            type: 'error',
            title: 'Sorry, you do not have permission to edit the database.',
          })
        }
        else {
          this.firebaseDB.ref('/movies/'+ newMov.id).once('value').then(function(snapshot) {
            swal({
              type: 'success',
              title: 'The movie has been added!',
              text: 'Resulting Object:',
              input: 'textarea',
              inputValue: JSON.stringify(snapshot.val(),null, "\t"),
              inputClass: 'small-text'
            })
          })
          this.allMovies.push(newMov);
        }
      });

  }

  firebasePut(movie:Movie) {
    this.firebaseDB.ref('/movies/' + movie.id).set(movie, 
      error => {
        if (error){
          swal({
            type: 'error',
            title: 'You do not have permission to edit the database.',
          })
        }
        else {
          this.firebaseDB.ref('/movies/'+ movie.id).once('value').then(function(snapshot) {
          swal({
            type: 'success',
            title: 'The movie has been updated!',
            text: 'Resulting Object:',
            input: 'textarea',
            inputValue: JSON.stringify(snapshot.val(),null, "\t"),
            inputClass: 'small-text'
          })
        })
      }
    });
    
    this.fillOtherMovieArr();
    
  }

  firebaseGet(){
    var userId = firebase.auth().currentUser;
    var a = this;
    this.firebaseDB.ref('/movies/').once('value').then(function(snapshot) {
      a.allMovies = Object.values(snapshot.val());
      a.fillOtherMovieArr();
      a.loadedListCompleted = true;
      a.arraysFilled = true;
    });    
  }


  //---------------GET-------------------------------//

  // httpGetAllMovies(){
  //   this._http.get('assets/MovieDBcsv.csv', {responseType: 'text'})
  //   .subscribe(
  //       data => {
  //         this.parseCSVToObject(data);
  //       },
  //       error => {
  //         console.log(error);
  //       },
  //     () => {
  //       //console.log(JSON.stringify(this.existentMovies,null,'\t'));
  //       this.loadedListCompleted = true;
  //       this.arraysFilled = true;
  //     }
  //   )
  // }

  // parseCSVToObject(csv :string) {
  //   var rows:string[] = csv.split('\n')
  //   rows.splice(0,1);

  //   var a = rows.map((val,i) => {
  //     var properties = val.split(',');
  //     var genres, files;
  //     if (properties[3])  genres = properties[3].split(' ').join('/');
  //     else genres = properties[3];
  //     if (properties[14]) files = properties[14].split('/'); 
  //     else files = properties[14];
  //     return {
  //       id: properties[0].toString(),
  //       _id: 'wo',
  //       title: properties[1],
  //       year: properties[2],
  //       genres: genres,
  //       runtime: properties[4],
  //       plot: properties[5],
  //       originalLanguage: properties[6],
  //       director: properties[7],
  //       writer: properties[8],
  //       mainCast: properties[9],
  //       rating: properties[10],
  //       nuniReview: properties[11],
  //       funFact: properties[12],
  //       seen: properties[13],
  //       images: files
  //     }       
  //   });
  //   this.fillOtherMovieArr();
  // }

  //-------------------MongoDB GET---------------------------------//

  // return this.http.get("/api/allMovies")
  //     .pipe(map(result => this.allMovies = result.json().data
  //     ))
  httpNewGetAllMovies() {   
    this._http.get("/api/allMovies")
      .subscribe(res => {
        this.allMovies = res['data'].map(movie => {
          return {
            id: movie._id,
            title: movie.title,
            year: movie.year,
            genres: movie.genres,
            runtime: movie.runtime,
            plot: movie.plot,
            originalLanguage: movie.originalLanguage,
            director: movie.director,
            writer: movie.writer,
            mainCast: movie.mainCast,
            rating: movie.rating,
            nuniReview: movie.nuniReview,
            funFact: movie.funFact,
            seen: movie.seen,
            images: movie.images, 
          }
        });
        this.fillOtherMovieArr();

      }, 
      (error) => {
        this.gotDataLocally = false;
        this.firebaseGet();
        return error
      }, 
      ()=> {
        this.loadedListCompleted = true;
        this.arraysFilled = true;
      })
  }

  //------------------- POST and PUT ----------------------------------//

  httpPostMovie(newmov:Movie) {   
    this.http.post("/api/postMovie", newmov).subscribe(res => {
      var json = res.json()
      console.log(json);
      if (json.status == 200) {
        this.allMovies.push(newmov);
      }
      else alert(res.json());
    });
  }

  httpPutMovie(modMovie:Movie) {
    this.http.put("/api/modifyExistentMovie/:id", modMovie).subscribe(res => {
      var json = res.json()
      console.log(json);
      if (json.status == 200) {
         
        swal({
          type: 'success',
          title: 'The movie has been updated!',
          text: 'Resulting Object:',
          input: 'textarea',
          inputValue: JSON.stringify(json.data.value,null, "\t"),
          inputClass: 'small-text'
        })
      }
      else alert(res.json());
    });
  }
  //---------------------------------------//
  fillOtherMovieArr(){
    this.allMoviesWithImg= new Array();
    this.movieOptions = new Array();
    this.allMovies.forEach(movie => {
      //Movies with image
      if (movie.images[0]) {
        if (movie.images[0].length >3)
        this.allMoviesWithImg.push(movie);
      }
      //movie options
      this.movieOptions.push({value: movie.id, text: movie.title});
    });
    var sorted = this.movieOptions.sort((a,b) => {
      if (a.text > b.text)  return 1;
      if (a.text < b.text)  return -1;
      return 0;
    })
    this.movieOptions = sorted;
  }

  setSelectedMovie(newId:string){
    this.selectedMovie = this.getMovieById(newId);
  }

  getDeterminedPicture(movId: string, allignment:string){

  }

  //---------------Custom lists---------------------//

  getAllMovies(){
    return this.allMovies
  }

  getMovieById(lookupId){    
    var r =  this.allMovies.find(function(movie){
      return movie.id == lookupId;
    });
    return r;
  }
  
  getTop5Movies(){
    if (this.allMovies) {
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
