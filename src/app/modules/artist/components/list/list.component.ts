import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '@app/services/back-end.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';
import { Subscription } from "rxjs";
import { Artist } from '../../interfaces/artist.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {

  //Component control values
  loading: boolean;
  modifySuccess: boolean;
  error: boolean;
  errorMessage: String;
  deleted: boolean;
  modified: boolean;
  created: boolean;

  //Subscriptions
  private _subscriptions: Subscription = new Subscription();

  //template values
  artists: Artist[];


  constructor(
    private _backendService: BackendService,
    private modalService: NgbModal) { }

  /**
   * @name ngOnInit
   * @description Inicialización de la página de lista de artistas.
   */

  ngOnInit(): void {
    //Obtener datos de navegación si se han dado
    this.modified = history.state.modified;
    this.created = history.state.created;
    //Obtener artistas
    this.loadArtist();
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
          this.errorMessage = 'Couldn\'t get artisti list'
          console.log('Ha ocurrido un error', err)
        },
        () => {
          this.loading = false;
        }
      )
    )

  }

  /**
   * @name open
   * @description Método para abrir modal de confirmación para eliminar artista.
   * @param id Id a eliminar.
   */

  open(id) {

    const modalRef = this.modalService.open(DeleteComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.idArtist = id;

    //Comprobar el resultado del modal para eliminar el artista
    modalRef.result.then(
      (result) => {
        if (result) {
          this._subscriptions.add(
            this._backendService.deleteArtist(result).subscribe(
              res => {
                this.deleted = true;
                this.error = false;
                this.loadArtist();
              },
              err => {
                this.deleted = false;
                this.error = true;
                console.log('Ha ocurrido un error', err);
                if (err.status === 400) {
                  this.errorMessage = "couldn't delete the artist";
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
      }
    );

  }

  /**
   * @name OnDestroy
   * @description eliminar subscripciones del componente.
   */
  ngOnDestroy():void {
    this._subscriptions.unsubscribe();
  }

}
