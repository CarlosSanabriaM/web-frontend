import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextOptionsComponent } from './text-options.component';

describe('TextOptionsComponent', () => {
  let component: TextOptionsComponent;
  let fixture: ComponentFixture<TextOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextOptionsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
