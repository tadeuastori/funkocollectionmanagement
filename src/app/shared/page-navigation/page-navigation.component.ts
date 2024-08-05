import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { linkItemList, menuItemList } from '../../core/util/constants-list';

@Component({
  selector: 'app-page-navigation',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.less',
})
export class PageNavigationComponent {
  constructor(private _router: Router) {}

  public menuItems = menuItemList;
  public linkItems = linkItemList;

  public isActive(routerLink: string): boolean {
    return this._router.url.includes(routerLink.slice(2));
  }

  public activeRoute(route: string): string {
    return route === this._router.url.replace('/', '')
      ? 'nav-link active'
      : 'nav-link';
  }

  navigate(itemId: string) {
    this._router.navigate([itemId]);
  }
}
