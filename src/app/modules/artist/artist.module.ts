import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Rutas
import { ArtistRoutingModule } from './artist-routing.module'
//Componentes
import {
  ArtistComponent,
  ListComponent,
  CreateComponent,
  ModifyComponent,
  DeleteComponent,
  ShowComponent
} from './';

@NgModule({
  declarations: [
    ArtistComponent,
    ListComponent,
    CreateComponent,
    ModifyComponent,
    DeleteComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})

export class ArtistModule { }
