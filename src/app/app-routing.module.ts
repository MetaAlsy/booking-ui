import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {OwnerHomeComponent} from "./owner-home/owner-home.component";
import {authGuard} from "./services/guard/auth.guard";
import {roleGuard} from "./services/guard/role.guard";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'admin',component:OwnerHomeComponent,canActivate:[authGuard,roleGuard],data:{role:'owner'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
