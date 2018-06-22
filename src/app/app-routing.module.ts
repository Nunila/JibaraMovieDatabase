import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { ModifyDBComponent } from './modify-db/modify-db.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movie_preview/:id', component: MoviePreviewComponent},
  { path: 'search_movies', component: SearchMoviesComponent},
  { path: 'modify_DB', component: ModifyDBComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule { 
  

}
