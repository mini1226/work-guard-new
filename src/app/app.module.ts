import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoaderComponent } from './common-component/loader/loader.component';
import { sharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';



@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [BrowserModule, AppRoutingModule, sharedModule, BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  exports: [],
  bootstrap: [AppComponent],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"sports-project-ce7f5","appId":"1:728066424411:web:d49359d4adbc174410897e","databaseURL":"https://sports-project-ce7f5-default-rtdb.firebaseio.com","storageBucket":"sports-project-ce7f5.firebasestorage.app","apiKey":"AIzaSyA1VOLpuanVp7Qes7m7i9fSOYlLxLG-Tr0","authDomain":"sports-project-ce7f5.firebaseapp.com","messagingSenderId":"728066424411","measurementId":"G-DKH18DXLTB"})),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
})
export class AppModule {}
