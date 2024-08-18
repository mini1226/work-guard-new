import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCompetitionComponent } from './start-competition.component';

describe('StartCompetitionComponent', () => {
  let component: StartCompetitionComponent;
  let fixture: ComponentFixture<StartCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartCompetitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
