import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDocumentsCardComponent } from './topic-documents-card.component';

describe('TopicDocumentsCardComponent', () => {
  let component: TopicDocumentsCardComponent;
  let fixture: ComponentFixture<TopicDocumentsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDocumentsCardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDocumentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
