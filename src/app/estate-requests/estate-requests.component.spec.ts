import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateRequestsComponent } from './estate-requests.component';

describe('EstateRequestsComponent', () => {
  let component: EstateRequestsComponent;
  let fixture: ComponentFixture<EstateRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
