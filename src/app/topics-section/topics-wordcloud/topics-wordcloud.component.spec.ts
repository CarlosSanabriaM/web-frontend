import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsWordcloudComponent } from './topics-wordcloud.component';

describe('TopicsWordcloudComponent', () => {
  let component: TopicsWordcloudComponent;
  let fixture: ComponentFixture<TopicsWordcloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsWordcloudComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsWordcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
