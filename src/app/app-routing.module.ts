import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {OwnerHomeComponent} from "./owner-home/owner-home.component";
import {authGuard} from "./services/guard/auth.guard";
import {roleGuard} from "./services/guard/role.guard";
import {RoomListComponent} from "./pages/room-list/room-list.component";
import {RoomDetailsComponent} from "./room-details/room-details.component";

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authGuard]},
  {path:'admin',component:OwnerHomeComponent,canActivate:[authGuard,roleGuard],data:{role:'owner'}
  },
  {path:'rooms/:hotelId',component:RoomListComponent,//canActivate:[authGuard]
  },
  {path:'roomDates/:roomId',component:RoomDetailsComponent,canActivate:[authGuard,roleGuard],data:{role:'owner'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
