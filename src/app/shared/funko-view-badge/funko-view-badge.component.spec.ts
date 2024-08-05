import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunkoViewBadgeComponent } from './funko-view-badge.component';

describe('FunkoViewBadgeComponent', () => {
  let component: FunkoViewBadgeComponent;
  let fixture: ComponentFixture<FunkoViewBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunkoViewBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunkoViewBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
