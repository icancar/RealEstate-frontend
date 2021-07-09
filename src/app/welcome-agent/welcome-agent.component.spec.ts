import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeAgentComponent } from './welcome-agent.component';

describe('WelcomeAgentComponent', () => {
  let component: WelcomeAgentComponent;
  let fixture: ComponentFixture<WelcomeAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
