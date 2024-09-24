import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceCalculatorComponent } from './performance-calculator.component';

describe('PerformanceCalculatorComponent', () => {
  let component: PerformanceCalculatorComponent;
  let fixture: ComponentFixture<PerformanceCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
