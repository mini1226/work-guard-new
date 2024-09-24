import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponentRoutingModule } from './core-component-routing.module';
import { CoreComponentComponent } from './core-component.component';
import { SidebarOneComponent } from '../common-component/sidebar-one/sidebar-one.component';
import { HeaderComponent } from '../common-component/header/header.component';
import { LayoutComponent } from '../common-component/layout/layout.component';
import { sharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CoreComponentComponent,
    HeaderComponent,
    SidebarOneComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, CoreComponentRoutingModule, sharedModule, RouterModule],
  providers: [],
})
export class CoreComponentModule {}
