import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextOptionRelatedTopicsComponent } from './text-option-related-topics.component';

describe('TextOptionRelatedTopicsComponent', () => {
  let component: TextOptionRelatedTopicsComponent;
  let fixture: ComponentFixture<TextOptionRelatedTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextOptionRelatedTopicsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextOptionRelatedTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
