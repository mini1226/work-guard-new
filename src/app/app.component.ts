import { Component } from '@angular/core';
import {
  Router,

} from '@angular/router';
import { SpinnerService } from './core/core.index';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Database, onValue, ref} from "@angular/fire/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'template';
  public page = '';

  constructor(private router: Router, private spinner: SpinnerService) {
    //


    /* this.router.events.subscribe((event: RouterEvent) => {
       if (event instanceof NavigationStart) {
         const URL = event.url.split('/');
         this.page = URL[1];
         this.spinner.show();
       }
       if (event instanceof NavigationEnd) {
         this.spinner.hide();
       }
     });

     this.router.events.subscribe((event: RouterEvent) => {
       if (event instanceof NavigationStart) {
         this.spinner.show();
       }
       if (event instanceof NavigationEnd) {
         this.spinner.hide();
       }
     });*/
  }
}
