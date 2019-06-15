import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedDocumentsCardComponent } from './related-documents-card.component';

describe('RelatedDocumentsCardComponent', () => {
  let component: RelatedDocumentsCardComponent;
  let fixture: ComponentFixture<RelatedDocumentsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedDocumentsCardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedDocumentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
