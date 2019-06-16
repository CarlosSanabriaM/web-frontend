import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextOptionRelatedDocumentsComponent } from './text-option-related-documents.component';

describe('TextOptionRelatedDocumentsComponent', () => {
  let component: TextOptionRelatedDocumentsComponent;
  let fixture: ComponentFixture<TextOptionRelatedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextOptionRelatedDocumentsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextOptionRelatedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
