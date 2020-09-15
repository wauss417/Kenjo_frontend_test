
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

//Injectar como singleton en la app

@Injectable({
  providedIn: 'root'
})


/**
 * @name LoadingScreenService
 * @description servicio para el layout de carga
 */
export class LoadingScreenService {

  private _loading: boolean = false;
  loadingStatus: Subject<boolean> = new Subject();

  /**
   * Getter del cargador
   */
  get loading(): boolean {
    return this._loading;
  }

  /**
   * Setter del cargador
   */
  set loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  /**
   * @name startLoading
   * @description activar el cargador
   */
  startLoading() {
    this.loading = true;
  }

  /**
   * @name stopLoading
   * @description desactivar el cargador
   */
  stopLoading() {
    this.loading = false;
  }
}
