import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';

import { MoviesService } from './services/movies-service/movies.service'
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';
import { AppRoutingModule } from './/app-routing.module';
import { ModifyDBComponent } from './modify-db/modify-db.component';
import { SignInComponent } from './sign-in/sign-in.component';

declare var require: any;

@NgModule({
  declarations: [
    AppComponent,
    SearchMoviesComponent,
    ToolbarComponent,
    HomeComponent,
    MoviePreviewComponent,
    ModifyDBComponent,
    SignInComponent
   
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
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatChipsModule,


    AppRoutingModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
