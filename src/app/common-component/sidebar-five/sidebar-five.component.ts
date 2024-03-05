import { Component } from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { SidebarService } from 'src/app/core/core.index';

@Component({
  selector: 'app-sidebar-five',
  templateUrl: './sidebar-five.component.html',
  styleUrls: ['./sidebar-five.component.scss'],
})
export class SidebarFiveComponent {
  opendSubMenu: Array<string> = [];
  public activePath = '';
  
  public sidebarData: Array<any> = [];

  constructor(private sidebar: SidebarService, private router: Router) {
    this.activePath = this.router.url.split('/')[1];
    this.router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.activePath = data.url.split('/')[1];
      }
    });
    this.sidebarData = this.sidebar.sidebarData2;
    if (localStorage.getItem('showMenu')) {
      this.opendSubMenu[0] = localStorage.getItem('showMenu') || '';
    } else {
      this.opendSubMenu[0] = this.sidebarData[0].tittle;
    }
  }

  showMenu(val: string): void {
    if (this.opendSubMenu[0] != val) {
      this.opendSubMenu[0] = val;
      localStorage.setItem('showMenu', val);
    } else {
      this.opendSubMenu[0] = '';
    }
  }

  showSubMenu(val: string): void {
    if (this.opendSubMenu[1] != val) {
      this.opendSubMenu[1] = val;
    } else {
      this.opendSubMenu[1] = '';
    }
  }
  // ngOnInit(): void {
  //   localStorage.setItem('showMenu', 'Main Menu');
  // }
}
