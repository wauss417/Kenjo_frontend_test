import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '@app/services/back-end.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit, OnDestroy {

  //Component control values
  loading: boolean;
  error: boolean;
  errorMessage: String;
  created: boolean;

  //Subscriptions
  private _subscriptions: Subscription = new Subscription();

  //Template values
  maxArtist: number = 3;
  artists = [];

  constructor(
    private _router: Router,
    private _backendService: BackendService,
    private date: NgbDateParserFormatter,
  ) { }


  /**
   * @name ngOnInit
   * @description Inicialización de la página de create de artistas.
   */

  ngOnInit(): void {
    this.artists.push({
      name: "",
      photoUrl: "",
      birthdate: "",
      deathDate: "",
    });
  }

  /**
   * @name addArtist
   * @description Crear un nuevo formulario para enviar varios artistas a la vez
   */

  addArtist() {
    if (this.artists.length < this.maxArtist) {
      this.artists.push({
        name: "",
        photoUrl: "",
        birthdate: "",
        deathDate: "",
      });
    }
  }

  /**
   * @name confirm
   * @description Preparar los datos para ser enviados a la API.
   */

  confirm() {

    //Parsear fechas a un formato que mongo entenderá
    this.artists.forEach(item => {
      item.birthdate = this.date.format(item.birthdate);
      item.deathDate = this.date.format(item.deathDate);
    });

    //Obtener la funcion servicio del banck-end
    let createPromise;
    if (this.artists.length === 1) {
      createPromise = this._backendService.createArtist(this.artists[0]);
    } else {
      createPromise = this._backendService.createArtists(this.artists);
    }

    //REalizar petición.
    this._subscriptions.add(
      createPromise.subscribe(
        res => {
          this.error = false;
          this.created = true;
          this._router.navigate(['/artist'], { state: { modified: false, created: true } });
        },
        err => {
          this.error = true;
          this.created = false;
          console.log('Ha ocurrido un error', err);
          if (err.status === 400) {
            this.errorMessage = "couldn't create the artist(s)";
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
