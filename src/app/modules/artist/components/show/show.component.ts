import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '@app/services/back-end.service';
import { Subscription } from "rxjs";
import { Artist } from '../../interfaces/artist.interface';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, OnDestroy {

  //Component control values
  loading: boolean;
  error: boolean;
  errorMessage: String;
  modified: boolean;

  //Subscriptions
  private _subscriptions: Subscription = new Subscription();

  //Form values
  artistId: String;
  artist: Artist;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _backendService: BackendService,
  ) {
    //Obtener valor del ID por query param
    this._activeRoute.queryParams.subscribe(params => {
      this.artistId = params['id'];
    });
  }

  /**
   * @name ngOnInit
   * @description Inicialización de la página de modificación de artistas.
   */

  ngOnInit(): void {
    this.modified = history.state.modified;
    this.loading = true;
    this._subscriptions.add(
      this._backendService.getArtist(this.artistId).subscribe(
        res => {
          this.error = false;
          this.artist = res;
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
   * @name OnDestroy
   * @description eliminar subscripciones del componente.
   */
  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
