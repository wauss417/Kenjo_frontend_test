import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '@app/services/back-end.service';
import { Subscription } from "rxjs";
import { Artist } from '../../interfaces/artist.interface';
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
  artistId: String;
  birthdate: NgbDateStruct;
  deathDate: NgbDateStruct;
  artist: Artist;

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _backendService: BackendService,
    private _date: NgbDateParserFormatter
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
    this.loading = true;
    this._subscriptions.add(
      this._backendService.getArtist(this.artistId).subscribe(
        res => {
          this.error = false;
          this.artist = res;
          //Necesario para que le date picker de Ngb funcione
          this.birthdate = this._date.parse(this.artist.birthdate);
          this.deathDate = this._date.parse(this.artist.deathDate);
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
   * @name confirm
   * @description Preparar datos a modificar para enviarlos.
   */

  confirm() {

    let data = {
      name: this.artist.name,
      photoUrl: this.artist.photoUrl,
      //Obtener las fechas en formato que Mongo lo interprete
      birthdate: this._date.format(this.birthdate),
      deathDate: this._date.format(this.deathDate)
    }

    this._subscriptions.add(
      this._backendService.putArtist(this.artist._id, data).subscribe(
        res => {
          this.error = false;
          this._router.navigateByUrl('/artist', { state: { modified: true, created: false } });
        },
        err => {
          this.error = true;
          console.log('Ha ocurrido un error', err);
          if (err.status === 400) {
            this.errorMessage = "couldn't update the artist";
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
