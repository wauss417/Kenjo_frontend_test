import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoadingScreenService } from "@app/services/loader.service";
import { finalize } from "rxjs/operators";

@Injectable()

export class LoadingScreenInterceptor implements HttpInterceptor {

  activeRequests: number = 0;

  /**
   * URLs el cual el loader no se debe mostrar
   */
  skippUrls = [
  ];

  constructor(private loadingScreenService: LoadingScreenService) {
  }

  /**
   * @name intercept
   * @description interceptor de peticiones para el loader layout
   * @param request peticion procesandose
   * @param next
   */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let displayLoadingScreen = true;

    //Comprobar que la petición está en la lista de rutas ignoradas
    for (const skippUrl of this.skippUrls) {
      if (new RegExp(skippUrl).test(request.url)) {
        displayLoadingScreen = false;
        break;
      }
    }

    //Si no están en la rutas ignorada preparar el layout
    if (displayLoadingScreen) {

      //Si no hay peticiones pendientes entonces mostrar el cargador
      if (this.activeRequests === 0) {
        this.loadingScreenService.startLoading();
      }
      this.activeRequests++;

      //Esperamos que la petición termine
      return next.handle(request).pipe(
        finalize(() => {
          //Descontamos la petición y si ya no hay ninguna en espera quitarmos el cargador
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this.loadingScreenService.stopLoading();
          }
        })
      )

    } else {
      return next.handle(request);
    }

  };
}
