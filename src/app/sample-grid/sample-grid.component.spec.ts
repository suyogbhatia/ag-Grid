import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleGridComponent } from './sample-grid.component';

describe('SampleGridComponent', () => {
  let component: SampleGridComponent;
  let fixture: ComponentFixture<SampleGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
