import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Rutas
import { ArtistRoutingModule } from './album-routing.module'
//Componentes
import {
  AlbumComponent,
  ListComponent,
  CreateComponent,
  ModifyComponent,
  DeleteComponent,
} from './';

@NgModule({
  declarations: [
    AlbumComponent,
    ListComponent,
    ModifyComponent,
    CreateComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})

export class AlbumModule { }
