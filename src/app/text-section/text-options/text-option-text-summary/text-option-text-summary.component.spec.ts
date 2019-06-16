import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextOptionTextSummaryComponent } from './text-option-text-summary.component';

describe('TextOptionTextSummaryComponent', () => {
  let component: TextOptionTextSummaryComponent;
  let fixture: ComponentFixture<TextOptionTextSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextOptionTextSummaryComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextOptionTextSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
