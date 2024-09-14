import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartRateGraphComponent } from './heart-rate-graph.component';

describe('HeartRateGraphComponent', () => {
  let component: HeartRateGraphComponent;
  let fixture: ComponentFixture<HeartRateGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeartRateGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeartRateGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
