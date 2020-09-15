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
} from './';

@NgModule({
  declarations: [
    ArtistComponent,
    ListComponent,
    CreateComponent,
    ModifyComponent,
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

export class ArtistModule { }
