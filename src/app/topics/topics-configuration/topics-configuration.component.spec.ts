import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsConfigurationComponent } from './topics-configuration.component';

describe('TopicsConfigurationComponent', () => {
  let component: TopicsConfigurationComponent;
  let fixture: ComponentFixture<TopicsConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsConfigurationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
