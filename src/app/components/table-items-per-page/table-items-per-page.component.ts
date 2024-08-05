import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-items-per-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './table-items-per-page.component.html',
  styleUrl: './table-items-per-page.component.less',
})
export class TableItemsPerPageComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() totalItems!: number;
  itemsPerPage = 10;
  itemsArray = [10, 15, 25, 50];

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}

  get perPage() {
    return this.itemsPerPage;
  }
}
