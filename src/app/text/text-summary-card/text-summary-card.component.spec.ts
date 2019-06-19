import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSummaryCardComponent } from './text-summary-card.component';

describe('TextSummaryCardComponent', () => {
  let component: TextSummaryCardComponent;
  let fixture: ComponentFixture<TextSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSummaryCardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
