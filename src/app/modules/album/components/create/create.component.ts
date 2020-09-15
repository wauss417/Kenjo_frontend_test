import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '@app/services/back-end.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from "rxjs";
import { Artist } from '../../../artist/interfaces/artist.interface'

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
  maxAlbum: number = 3;
  albums = [];
  artists: Artist[];

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
    this.loadArtist();
    this.albums.push({
      title: "",
      artistId: null,
      coverUrl: "",
      year: null,
      genre: "",
    });
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
   * @name addAlbum
   * @description Crear un nuevo formulario para enviar varios artistas a la vez
   */

  addAlbum() {
    if (this.albums.length < this.maxAlbum) {
      this.albums.push({
        title: "",
        artistId: null,
        coverUrl: "",
        year: null,
        genre: "",
      });
    }
  }

  /**
   * @name confirm
   * @description Preparar los datos para ser enviados a la API.
   */

  confirm() {

    //Parsear fechas a un formato que mongo entenderá
    // this.albums.forEach(item => {
    //   item.birthdate = this.date.format(item.birthdate);
    //   item.deathDate = this.date.format(item.deathDate);
    // });

    //Obtener la funcion servicio del banck-end
    let createPromise;
    if (this.albums.length === 1) {
      createPromise = this._backendService.createAlbum(this.albums[0]);
    } else {
      createPromise = this._backendService.createAlbums(this.albums);
    }

    //REalizar petición.
    this._subscriptions.add(
      createPromise.subscribe(
        res => {
          this.error = false;
          this.created = true;
          this._router.navigate(['/album'], { state: { modified: false, created: true } });
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

