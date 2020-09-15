import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '@app/services/back-end.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';
import { Subscription } from "rxjs";
import { Album } from '../../interfaces/album.interface';

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
  albums: Album[];


  constructor(
    private _backendService: BackendService,
    private modalService: NgbModal
  ) { }

  /**
   * @name ngOnInit
   * @description Inicialización de la página de lista de albums.
   */

  ngOnInit(): void {
    //Obtener datos de navegación si se han dado
    this.modified = history.state.modified;
    this.created = history.state.created;
    //Obtener albums
    this.loadAlbums();
  }

  /**
   * @name loadAlbums
   * @description Funcion para obtener los albums desde la API.
   */

  loadAlbums() {
    this.loading = true;

    this._subscriptions.add(
      this._backendService.getListAlbums().subscribe(
        res => {
          this.error = false;
          this.albums = res;
        },
        err => {
          this.error = true;
          this.errorMessage = 'Couldn\'t get albums list'
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
   * @description Método para abrir modal de confirmación para eliminar album.
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
            this._backendService.deleteAlbum(result).subscribe(
              res => {
                this.deleted = true;
                this.error = false;
                this.loadAlbums();
              },
              err => {
                this.deleted = false;
                this.error = true;
                console.log('Ha ocurrido un error', err);
                if (err.status === 400) {
                  this.errorMessage = "couldn't delete the album";
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
  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
