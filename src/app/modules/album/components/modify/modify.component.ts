import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '@app/services/back-end.service';
import { Subscription } from "rxjs";
import { Album } from '../../interfaces/album.interface';
import { Artist } from '../../../artist/interfaces/artist.interface'

import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})

export class ModifyComponent implements OnInit, OnDestroy {

  //Component control values
  loading: boolean;
  error: boolean;
  errorMessage: String;

  //Subscriptions
  private _subscriptions: Subscription = new Subscription();

  //Form values
  albumId: String;
  album: Album;
  artists: Artist[];

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _backendService: BackendService,
  ) {
    //Obtener valor del ID por query param
    this._activeRoute.queryParams.subscribe(params => {
      this.albumId = params['id'];
    });
  }

  /**
   * @name ngOnInit
   * @description Inicialización de la página de modificación de artistas.
   */

  ngOnInit(): void {
    this.loadArtist();
    this.loading = true;
    this._subscriptions.add(
      this._backendService.getAlbum(this.albumId).subscribe(
        res => {
          this.error = false;
          this.album = res;
        },
        err => {
          this.error = true;
          console.log('Ha ocurrido un error', err)
        },
        () => {
          this.loading = false;
        }
      )
    )
  }

  /**
   * @name loadArtist
   * @description Funcion para obtener los artistas desde la API.
   */

  loadArtist() {
    this.loading = true;

    this._subscriptions.add(
      this._backendService.getListArtists().subscribe(
        res => {
          this.error = false;
          this.artists = res;
        },
        err => {
          this.error = true;
          this.errorMessage = 'Couldn\'t get artist list'
          console.log('Ha ocurrido un error', err)
        },
        () => {
          this.loading = false;
        }
      )
    )

  }

  /**
   * @name confirm
   * @description Preparar datos a modificar para enviarlos.
   */

  confirm() {

    let data = this.album;

    this._subscriptions.add(
      this._backendService.putAlbum(this.album._id, data).subscribe(
        res => {
          this.error = false;
          this._router.navigate(['/album/show'], { state: { modified: true }, queryParams: { id: this.albumId } });
        },
        err => {
          this.error = true;
          console.log('Ha ocurrido un error', err);
          if (err.status === 400) {
            this.errorMessage = "couldn't update the album";
          } else {
            this.errorMessage = err.message;
          }
        },
        () => {
          this.loading = false;
        }

      )
    );

  }

  /**
   * @name OnDestroy
   * @description eliminar subscripciones del componente.
   */
  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
