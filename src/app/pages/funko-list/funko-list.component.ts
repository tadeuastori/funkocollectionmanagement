import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { first, lastValueFrom, Observable, Subject, takeUntil } from 'rxjs';
import { IFunko } from '../../modules/funko.module';
import { FunkoState } from '../../states/funko.state';
import { FilterPipe } from '../../core/pipes/filter.pipe';
import { PaginationPipe } from '../../core/pipes/pagination.pipe';
import _ from 'lodash';
import { BaseComponent } from '../base.component';
import { TablePaginationComponent } from '../../components/table-pagination/table-pagination.component';
import { TableItemsPerPageComponent } from '../../components/table-items-per-page/table-items-per-page.component';
import { Router } from '@angular/router';
import { TableFilterComponent } from '../../components/table-filter/table-filter.component';
import { SetSelectedFunko } from '../../states/funko.actions';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FilterPipe,
    PaginationPipe,
    TablePaginationComponent,
    TableItemsPerPageComponent,
    TableFilterComponent,
  ],
  templateUrl: './funko-list.component.html',
  styleUrl: './funko-list.component.less',
})
export class FunkoListComponent extends BaseComponent implements OnInit {
  funkoList$: Observable<IFunko[]>;
  filterList$: Observable<string>;
  isFunkoListEdited$: Observable<boolean>;
  funkosList: IFunko[] = [];
  searchText: string = '';
  filteredCount = { count: 0 };
  showAlert: boolean = false;

  constructor(private _store: Store, private _router: Router) {
    super();
    this.funkoList$ = _store.select(FunkoState.getFunkosList);
    this.filterList$ = _store.select(FunkoState.getFilter);
    this.isFunkoListEdited$ = _store.select(FunkoState.getIsFunkoListEdited);
  }

  ngOnInit(): void {
    lastValueFrom(this.funkoList$.pipe(first())).then((funkoList) => {
      this.funkosList = _.sortBy(funkoList, ['collection', 'name']);
    });

    this.filterList$.pipe(takeUntil(this.destroy$)).subscribe((filter) => {
      this.searchText = filter;
    });

    this.isFunkoListEdited$
      .pipe(takeUntil(this.destroy$))
      .subscribe((edited) => {
        this.showAlert = edited;
      });
  }

  goToViewPage(itemId: string) {
    this._store.dispatch(new SetSelectedFunko(itemId));

    this._router.navigate(['/view-funko']);
  }
}
