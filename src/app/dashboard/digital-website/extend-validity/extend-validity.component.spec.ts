import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendValidityComponent } from './extend-validity.component';

describe('ExtendValidityComponent', () => {
  let component: ExtendValidityComponent;
  let fixture: ComponentFixture<ExtendValidityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendValidityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendValidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
