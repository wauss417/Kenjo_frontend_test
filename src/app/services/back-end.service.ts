import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Artist } from '@app/modules/artist/interfaces/artist.interface';
import { Album } from '@app/modules/album/interfaces/album.interface'

//Injectar como singleton en la app
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que prepara las peticiones a la api asignada
 */
export class BackendService {

  endpoint: string;

  constructor(
    private _http: HttpClient
  ) {
    //Debería obtenerse por servicio enviroment
    this.endpoint = 'http://localhost:3000'
  }

  /******************************************
   * Funciones para modulo de Artista
   *******************************************/

  /**
  * @name getListArtists
  * @description Obtiene todo los artitas de la BBDD.
  */

  getListArtists(): Observable<Artist[]> {
    let url = `${this.endpoint}/artists/all`;
    return this._http.get<Artist[]>(url);
  }

  /**
   * @name getArtist
   * @description Obtener datos del artista por ID.
   * @param id Id del artista que se quiere obtener la información.
   */
  getArtist(id): Observable<Artist> {
    let url = `${this.endpoint}/artist/${id}`;
    return this._http.get<Artist>(url);
  }

  /**
   * @name createArtist
   * @description Crear un artista por sus datos.
   * @param payload datos del album a crear.
   */
  createArtist(payload: Artist) {
    let url = `${this.endpoint}/artist`;
    return this._http.post(url, payload);
  }

  /**
   * @name createArtists
   * @description Crear varios artistas por sus datos.
   * @param payload datos de los artistas a crear.
   */
  createArtists(payload: Artist[]) {
    let url = `${this.endpoint}/artists`;
    return this._http.post(url, payload);
  }

  /**
   * @name putArtist
   * @description Actualizar datos del artista por ID.
   * @param id Id del artista que se quiere modificar.
   * @param payload datos a cambiar del artista
   */
  putArtist(id: String, payload) {
    let url = `${this.endpoint}/artist/${id}`;
    return this._http.put(url, payload);
  }

  /**
   * @name deleteArtist
   * @description Eliminar datos del artista por ID.
   * @param id Id del artista que se quiere eleimnar.
   */
  deleteArtist(id: String) {
    let url = `${this.endpoint}/artist/${id}`;
    return this._http.delete(url);
  }

  /******************************************
   * Funciones para modulo de Album
   *******************************************/

  /**
  * @name getListAlbums
  * @description Obtiene todo los albums de la BBDD.
  */

  getListAlbums(): Observable<Album[]> {
    let url = `${this.endpoint}/albums/all`;
    return this._http.get<Album[]>(url);
  }

  /**
   * @name getAlbum
   * @description Obtener datos del album por ID.
   * @param id Id del album que se quiere obtener la información.
   */
  getAlbum(id): Observable<Album> {
    let url = `${this.endpoint}/album/${id}`;
    return this._http.get<Album>(url);
  }

  /**
   * @name createAlbum
   * @description Crear un album por sus datos.
   * @param payload datos del album a crear.
   */
  createAlbum(payload: Album) {
    let url = `${this.endpoint}/album`;
    return this._http.post(url, payload);
  }

  /**
   * @name createAlbums
   * @description Crear varios album por sus datos.
   * @param payload datos de los album a crear.
   */
  createAlbums(payload: Album[]) {
    let url = `${this.endpoint}/albums`;
    return this._http.post(url, payload);
  }

  /**
   * @name putAlbum
   * @description Actualizar datos del album por ID.
   * @param id Id del album que se quiere modificar.
   * @param payload datos a cambiar del album.
   */
  putAlbum(id: String, payload) {
    let url = `${this.endpoint}/album/${id}`;
    return this._http.put(url, payload);
  }

  /**
   * @name deleteAlbum
   * @description Eliminar datos del album por ID.
   * @param id Id del album que se quiere eleimnar.
   */
  deleteAlbum(id: String) {
    let url = `${this.endpoint}/album/${id}`;
    return this._http.delete(url);
  }


}
