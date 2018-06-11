import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UnwatchedMoviesComponent } from './unwatched-movies/unwatched-movies.component';
import { WatchedMoviesComponent } from './watched-movies/watched-movies.component';
import { MoviesService } from './services/movies-service/movies.service'
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    UnwatchedMoviesComponent,
    WatchedMoviesComponent
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
