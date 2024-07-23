import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { Store } from '@ngxs/store';
import { LoadFunkoList } from './states/funko.actions';
import { LoadingPageComponent } from './shared/loading-page/loading-page.component';
import { BannerComponent } from './shared/banner/banner.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideNavigationComponent } from './shared/side-navigation/side-navigation.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ListComponent,
    LoadingPageComponent,
    BannerComponent,
    HeaderComponent,
    SideNavigationComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
  constructor(private _store: Store) {}
  ngOnInit(): void {
    this._store.dispatch(LoadFunkoList);
  }
}
