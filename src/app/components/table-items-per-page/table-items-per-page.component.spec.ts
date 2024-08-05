import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableItemsPerPageComponent } from './table-items-per-page.component';

describe('TableItemsPerPageComponent', () => {
  let component: TableItemsPerPageComponent;
  let fixture: ComponentFixture<TableItemsPerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableItemsPerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableItemsPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
