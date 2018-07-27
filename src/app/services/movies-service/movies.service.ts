import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";

import {Movie, movieSchema, MovieOption} from './movies'
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

  private newAllMovies: Array<movieSchema> = new Array();

  private allMoviesWithImg: Array<movieSchema> = new Array();
  private top5: Array<Movie> = new Array();

  private movieOptions: Array<MovieOption> = new Array();
  public selectedMovie: movieSchema;
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
  firebasePOST(newMov:movieSchema){
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
          this.newAllMovies.push(newMov);
          this.fillOtherMovieArr();   
        }
      });
  }

  firebasePut(movie:movieSchema) {
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

  ONETIME(){
    this.newAllMovies.forEach(mov => {
      this.firebaseDB.ref('/movies/' + mov.id).set(mov)
    })
  }

  firebaseGet(){
    var userId = firebase.auth().currentUser;
    var a = this;
    this.firebaseDB.ref('/movies/').once('value').then(function(snapshot) {
      a.newAllMovies = Object.values(snapshot.val());
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
        this.newAllMovies = res['data'].map(movie => {
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

  httpPostMovie(newmov:movieSchema) {   
    this.http.post("/api/postMovie", newmov).subscribe(res => {
      var json = res.json()
      console.log(json);
      if (json.status == 200) {
        this.newAllMovies.push(newmov);
      }
      else alert(res.json());
    });
  }

  httpPutMovie(modMovie:movieSchema) {
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
    this.newAllMovies.forEach(movie => {
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

  //---------------Custom lists---------------------//

  getAllMovies(){
    return this.newAllMovies
  }

  getMovieById(lookupId){    
    var r =  this.newAllMovies.find(function(movie){
      return movie.id == lookupId;
    });
    return r;
    // var r =  this.allMovies.find(function(movie){
    //   return movie.id == lookupId;
    // });
    // return r;
  }

  getAllMoviesWithImg() {
    return this.allMoviesWithImg;
  }

  getMovieOptions(){
    return this.movieOptions;
  }

//---------------SEARCH-------------------------------//

  recRemove(arr, min, max, prop){
    arr.forEach((mov,i,a) => {
      if (!(mov[prop] >= min && mov[prop] <= max))  {
        a.splice(i,1);
        this.recRemove(a, min, max, prop)
      }
    })

    return arr;
  }
  search(filters){
    var results: Array<movieSchema> = new Array();

    if (filters.keyword && filters.min || filters.keyword && filters.max || filters.keyword && filters.max && filters.min){
      var  filtered: Array<movieSchema> = JSON.parse(JSON.stringify(this.searchKey(filters, results)));

      switch(filters.whichRange) {
        case 'year':
        filtered.forEach((mov, i, arr) => {
          var min = filters.min ? filters.min : 1888
          var max = filters.max ? filters.max : 2030
          var a = this.recRemove(filtered, min, max, 'year');
          console.log(a);
        });
        break;
        case 'runtime':
        filtered.forEach((mov, i, arr) => {
          var min = filters.min ? filters.min : 2
          var max = filters.max ? filters.max : 480
          if (!(mov.runtime >= min && mov.runtime <= max))   arr.splice(i,1);
        });
        break;
        case 'rating':
        filtered.forEach((mov, i, arr) => {
          var min = filters.min ? filters.min : 0
          var max = filters.max ? filters.max : 100
          if (!(mov.rating >= min && mov.rating <= max))  arr.splice(i,1);
        });
        break;
      }
      results = filtered;
    }

    else if (filters.keyword) {
      results = this.searchKey(filters, results);
    }
    else {
      switch(filters.whichRange) {
        case 'year':
        this.newAllMovies.forEach(mov => {
          var min = filters.min ? filters.min : 1888
          var max = filters.max ? filters.max : 2030
          if (mov.year > min && mov.year < max)  results.push(mov);
        });
        break;
        case 'runtime':
        this.newAllMovies.forEach(mov => {
          var min = filters.min ? filters.min : 2
          var max = filters.max ? filters.max : 480
          if (mov.runtime > min && mov.runtime < max)  results.push(mov);
        });
        break;
        case 'rating':
        this.newAllMovies.forEach(mov => {
          var min = filters.min ? filters.min : 0
          var max = filters.max ? filters.max : 100
          if (mov.rating > min && mov.rating < max) results.push(mov);
        });
        break;
      }
    }
    return results;

  }
  searchKey(filters, arr) {
    switch (filters.whichKey) {

      case 'title':
      this.newAllMovies.forEach(mov => {
        if (mov.title.toLowerCase().search(filters.keyword.toLowerCase()) != -1) arr.push(mov);
      });
      break;
      case 'director':
      this.newAllMovies.forEach(mov => {
        if (mov.director.toLowerCase().search(filters.keyword.toLowerCase()) != -1) arr.push(mov);
      });
      break;
      case 'plot':
      this.newAllMovies.forEach(mov => {
        if (mov.plot.toLowerCase().search(filters.keyword.toLowerCase()) != -1) arr.push(mov);
      }) ;
      break;
      case 'cast':
      this.newAllMovies.forEach(mov => {

        mov.mainCast.forEach(cast => {
          if (cast.toLowerCase().search(filters.keyword.toLowerCase()) != -1) arr.push(mov);
        });
      });
      break;
    }
    return arr;
  }
}
