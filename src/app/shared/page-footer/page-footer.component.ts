import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-page-footer',
  standalone: true,
  imports: [],
  templateUrl: './page-footer.component.html',
  styleUrl: './page-footer.component.less',
})
export class PageFooterComponent {
  appVersion = environment.appVersion;
}
