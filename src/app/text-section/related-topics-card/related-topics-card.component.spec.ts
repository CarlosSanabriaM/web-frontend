import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedTopicsCardComponent } from './related-topics-card.component';

describe('RelatedTopicsCardComponent', () => {
  let component: RelatedTopicsCardComponent;
  let fixture: ComponentFixture<RelatedTopicsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedTopicsCardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedTopicsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
