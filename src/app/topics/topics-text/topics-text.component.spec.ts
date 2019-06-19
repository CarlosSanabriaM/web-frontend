import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsTextComponent } from './topics-text.component';

describe('TopicsTextComponent', () => {
  let component: TopicsTextComponent;
  let fixture: ComponentFixture<TopicsTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsTextComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
