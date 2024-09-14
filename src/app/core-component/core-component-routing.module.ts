import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponentComponent } from './core-component.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponentComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./main/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreComponentRoutingModule {}
