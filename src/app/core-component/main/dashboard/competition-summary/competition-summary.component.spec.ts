import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionSummaryComponent } from './competition-summary.component';

describe('CompetitionSummaryComponent', () => {
  let component: CompetitionSummaryComponent;
  let fixture: ComponentFixture<CompetitionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
