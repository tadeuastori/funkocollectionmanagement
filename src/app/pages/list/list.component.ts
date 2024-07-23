import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { first, lastValueFrom, Observable, takeUntil } from 'rxjs';
import { IFunko } from '../../modules/funko.module';
import { FunkoState } from '../../states/funko.state';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.less',
})
export class ListComponent implements OnInit {
  funkoList$: Observable<IFunko[]>;

  constructor(private _store: Store) {
    this.funkoList$ = _store.select(FunkoState.getFunkosList);
  }

  ngOnInit(): void {
    lastValueFrom(this.funkoList$.pipe(first())).then((funkoList) => {
      console.log(funkoList);
    });
  }
}
