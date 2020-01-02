import { LocationComponent } from "./components/home/location/location.component";
import { AllComponent } from "./components/home/all/all.component";
import { HomeComponent } from "./components/home/home.component";
import { IndexComponent } from "./components/index/index.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: IndexComponent
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: AllComponent
      },
      {
        path: ":location",
        component: LocationComponent
      }
    ]
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./components/admin/admin.module").then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
