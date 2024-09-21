import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveHeartRateComponent } from './live-heart-rate.component';

describe('LiveHeartRateComponent', () => {
  let component: LiveHeartRateComponent;
  let fixture: ComponentFixture<LiveHeartRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveHeartRateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveHeartRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
