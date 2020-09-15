import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import {
  ArtistComponent,
  ListComponent,
  CreateComponent,
  ModifyComponent
} from './';

const artistRoutes: Routes = [
  {
    path: '',
    component: ArtistComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {'modified': false, 'created': false}
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
