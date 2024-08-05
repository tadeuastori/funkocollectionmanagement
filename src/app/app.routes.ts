import { Routes } from '@angular/router';
import { FunkoListComponent } from './pages/funko-list/funko-list.component';
import { FunkoFormComponent } from './pages/funko-form/funko-form.component';
import { GenerateJsonComponent } from './pages/generate-json/generate-json.component';
import { FunkoViewComponent } from './pages/funko-view/funko-view.component';
import { CanDeactivateFormGuard } from './guards/can-deactivate-form.guard';

export const routes: Routes = [
  {
    path: '',
    component: FunkoListComponent,
  },
  {
    path: 'add-funko',
    component: FunkoFormComponent,
    canDeactivate: [CanDeactivateFormGuard],
  },
  {
    path: 'edit-funko',
    component: FunkoFormComponent,
    canDeactivate: [CanDeactivateFormGuard],
  },
  { path: 'view-funko', component: FunkoViewComponent },
  { path: 'generate-json', component: GenerateJsonComponent },
];
