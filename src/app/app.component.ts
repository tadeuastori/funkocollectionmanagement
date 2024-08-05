import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FunkoListComponent } from './pages/funko-list/funko-list.component';
import { Store } from '@ngxs/store';
import { LoadFunkoList, ResetState } from './states/funko.actions';
import { PageLoadingPageComponent } from './shared/page-loading/page-loading.component';
import { PageBannerComponent } from './shared/page-banner/page-banner.component';
import { PageHeaderComponent } from './shared/page-header/page-header.component';
import { PageNavigationComponent } from './shared/page-navigation/page-navigation.component';
import { PageFooterComponent } from './shared/page-footer/page-footer.component';
import { NgIf } from '@angular/common';
import { Subject } from 'rxjs';
import { ToastMessageComponent } from './shared/toast-message/toast-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FunkoListComponent,
    PageLoadingPageComponent,
    PageBannerComponent,
    PageHeaderComponent,
    PageNavigationComponent,
    PageFooterComponent,
    NgIf,
    ToastMessageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  destroy$ = new Subject<void>();

  constructor(private _store: Store, private _router: Router) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this._store.dispatch(ResetState);
  }

  ngOnInit(): void {
    this._store.dispatch(LoadFunkoList);
  }
}
