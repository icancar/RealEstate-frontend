import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEstateComponent } from './insert-estate.component';

describe('InsertEstateComponent', () => {
  let component: InsertEstateComponent;
  let fixture: ComponentFixture<InsertEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
