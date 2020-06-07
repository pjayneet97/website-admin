import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSlidesComponent } from './carousel-slides.component';

describe('CarouselSlidesComponent', () => {
  let component: CarouselSlidesComponent;
  let fixture: ComponentFixture<CarouselSlidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselSlidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
