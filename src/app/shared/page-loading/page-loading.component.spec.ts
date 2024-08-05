import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoadingPageComponent } from './page-loading.component';

describe('PageLoadingPageComponent', () => {
  let component: PageLoadingPageComponent;
  let fixture: ComponentFixture<PageLoadingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLoadingPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageLoadingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
