import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  testing(){

    this.http.get('assets/example.csv', {responseType: 'text'})
    .subscribe(
        data => {
            console.log(data);
        },
        error => {
            console.log(error);
        }
    );
  }

}
