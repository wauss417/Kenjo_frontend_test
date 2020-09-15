import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import {
  ArtistComponent,
  ListComponent,
  CreateComponent,
  ModifyComponent,
  ShowComponent
} from './';

const artistRoutes: Routes = [
  {
    path: '',
    component: ArtistComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {'created': false}
      },
      {
        path: 'show',
        component: ShowComponent,
        data: {'modified': false}
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'modify',
        component: ModifyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(artistRoutes)],
  exports: [RouterModule]
})

export class ArtistRoutingModule { }
