import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHeartRateComponent } from './view-heart-rate.component';

describe('ViewHeartRateComponent', () => {
  let component: ViewHeartRateComponent;
  let fixture: ComponentFixture<ViewHeartRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHeartRateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewHeartRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
