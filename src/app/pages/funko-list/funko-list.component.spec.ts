import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunkoListComponent } from './funko-list.component';

describe('FunkoListComponent', () => {
  let component: FunkoListComponent;
  let fixture: ComponentFixture<FunkoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunkoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FunkoListComponent);
    component = fixture.componentInstance;
    FunkoListComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
