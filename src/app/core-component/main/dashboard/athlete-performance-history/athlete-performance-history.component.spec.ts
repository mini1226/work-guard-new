import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletePerformanceHistoryComponent } from './athlete-performance-history.component';

describe('AthletePerformanceHistoryComponent', () => {
  let component: AthletePerformanceHistoryComponent;
  let fixture: ComponentFixture<AthletePerformanceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthletePerformanceHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AthletePerformanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
