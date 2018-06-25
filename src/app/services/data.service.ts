import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  result:any;

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get("/api/allMovies")
      .pipe(map(result => this.result = result.json().data));
  }

}
