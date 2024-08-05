import { Component } from '@angular/core';
import { linkItemList } from '../../core/util/constants-list';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.less',
})
export class PageHeaderComponent {
  public linkItems = linkItemList;
}
