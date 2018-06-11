import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnwatchedMoviesComponent } from './unwatched-movies.component';

describe('UnwatchedMoviesComponent', () => {
  let component: UnwatchedMoviesComponent;
  let fixture: ComponentFixture<UnwatchedMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnwatchedMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnwatchedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
