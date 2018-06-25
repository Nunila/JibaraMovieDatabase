import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';

import { MoviesService } from './services/movies-service/movies.service'
import { SearchMoviesComponent } from './search-movies/search-movies.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DataService } from './services/data.service';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';
import { AppRoutingModule } from './/app-routing.module';
import { ModifyDBComponent } from './modify-db/modify-db.component';
import * as fs from "fs";

declare var require: any;

@NgModule({
  declarations: [
    AppComponent,
    SearchMoviesComponent,
    ToolbarComponent,
    HomeComponent,
    MoviePreviewComponent,
    ModifyDBComponent
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    
    MatButtonModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [MoviesService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
