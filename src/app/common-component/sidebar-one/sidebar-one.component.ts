import { Component } from '@angular/core';
import { SidebarService, routes } from 'src/app/core/core.index';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  Event as RouterEvent,
} from '@angular/router';
import { url } from 'src/app/shared/model/sidebar.model';

@Component({
  selector: 'app-sidebar-one',
  templateUrl: './sidebar-one.component.html',
  styleUrls: ['./sidebar-one.component.scss'],
})
export class SidebarOneComponent {
  public routes = routes;
  base = '';
  page = '';
  currentUrl = '';
  
  public side_bar_data: Array<any> = [];

  constructor(
    private Router: Router,
    private sidebar: SidebarService,
    private router: Router,
  ) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);
    this.side_bar_data = this.sidebar.sidebarData1;
  }

  private getRoutes(route: url): void {
    const splitVal = route.url.split('/');
    this.currentUrl = route.url;
    this.base = splitVal[1];
    this.page = splitVal[2];
  }

  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sidebar.expandSideBar.next(true);
    } else {
      this.sidebar.expandSideBar.next(false);
    }
  }

  
  public expandSubMenus(menu: any): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.map((mainMenus: any) => {
      mainMenus.menu.map((resMenu: any) => {
        if (resMenu.menuValue == menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }

  openMenuItem: any = null;
  openSubmenuOneItem: any = null;
  multiLevel1 = false;
  multiLevel2 = false;
  multiLevel3 = false;


  openMenu(menu: any): void {
    if (this.openMenuItem === menu) {
      this.openMenuItem = null; 
    } else {
      this.openMenuItem = menu; 
    }
  }
  openSubmenuOne(subMenus: any): void {
    if (this.openSubmenuOneItem === subMenus) {
      this.openSubmenuOneItem = null; 
    } else {
      this.openSubmenuOneItem = subMenus; 
    }
  }

  multiLevelOne(){
    this.multiLevel1 = !this.multiLevel1
  }
  multiLevelTwo(){
    this.multiLevel2 = !this.multiLevel2
  }
  multiLevelThree(){
    this.multiLevel3 = !this.multiLevel3
  }
}
