import { Component, OnDestroy, OnInit } from '@angular/core';
import { SetFilter } from '../../states/funko.actions';
import { Store } from '@ngxs/store';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FunkoState } from '../../states/funko.state';

@Component({
  selector: 'app-table-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './table-filter.component.html',
  styleUrl: './table-filter.component.less',
})
export class TableFilterComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  searchInput$: Observable<string>;

  formSearch: FormGroup = new FormGroup({});

  constructor(private _store: Store) {
    this.searchInput$ = _store.select(FunkoState.getFilter);
  }
  ngOnInit(): void {
    this.formSearch = new FormGroup({
      inlineSearch: new FormControl(''),
    });

    this.formSearch
      .get('inlineSearch')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.setFilter(value);
      });

    this.searchInput$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filter: string) => {
        this.formSearch.patchValue({ inlineSearch: filter });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setFilter(filter: string) {
    this._store.dispatch(new SetFilter(filter));
  }
}
