import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWebsiteTemplateComponent } from './show-website-template.component';

describe('ShowWebsiteTemplateComponent', () => {
  let component: ShowWebsiteTemplateComponent;
  let fixture: ComponentFixture<ShowWebsiteTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowWebsiteTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWebsiteTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
