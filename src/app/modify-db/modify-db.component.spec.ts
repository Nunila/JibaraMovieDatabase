import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDBComponent } from './modify-db.component';

describe('ModifyDBComponent', () => {
  let component: ModifyDBComponent;
  let fixture: ComponentFixture<ModifyDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
