import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSlideComponent } from './image-slide.component';

describe('ImageSlideComponent', () => {
  let component: ImageSlideComponent;
  let fixture: ComponentFixture<ImageSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
