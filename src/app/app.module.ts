import { SharedModules } from "./Shared-Modules";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IndexComponent } from "./components/index/index.component";
import { HomeComponent } from "./components/home/home.component";
import { AllComponent } from "./components/home/all/all.component";
import { LocationComponent } from "./components/home/location/location.component";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    AllComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCONB0piLBtDWrd0X6EQM3X4j5GfhUD5Vc",
      authDomain: "myapp-c233c.firebaseapp.com",
      databaseURL: "https://myapp-c233c.firebaseio.com",
      projectId: "myapp-c233c",
      storageBucket: "myapp-c233c.appspot.com",
      messagingSenderId: "718102188961",
      appId: "1:718102188961:web:9f9d7084e872ad3da6b1e0"
    }),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    BrowserAnimationsModule,
    SharedModules
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule {}
