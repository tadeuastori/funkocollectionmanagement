import { NgClass } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.less',
})
export class TablePaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() listLength!: number;
  @Input() itemsPerPage!: number;

  destroy$ = new Subject<void>();

  activePage: number = 0;
  pages: any;
  qtdBaseArray: number = 5;
  totalPages: number = 0;
  lastPage: number = 1;
  firstPage: number = 0;

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.loadPagination();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    await this.loadPagination();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async loadPagination(page?: number) {
    this.totalPages = Math.ceil(this.listLength / this.itemsPerPage);
    this.totalPages = this.totalPages == 0 ? 1 : this.totalPages;
    this.lastPage = this.totalPages - 1;
    this.activePage = page ? page : 0;
    let qtdArray = this.qtdBaseArray;
    let numbPag = 0;

    if (page && this.totalPages > this.qtdBaseArray && page > 2) {
      const totalArray = this.totalPages - page;
      numbPag = totalArray > 2 ? page - 2 : this.totalPages - this.qtdBaseArray;
      qtdArray = this.qtdBaseArray;
    } else {
      qtdArray =
        this.totalPages < this.qtdBaseArray
          ? this.totalPages
          : this.qtdBaseArray;
    }

    this.pages = Array(qtdArray + 1)
      .fill(0)
      .map((_x, i) => i + numbPag);
    this.pages.pop();
  }

  get currentPage() {
    return this.activePage;
  }
}
