import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private error$ = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  setError(mensaje: string): void{
    this.error$.next(mensaje);
  }
  getError(): Observable<string>{
      return this.error$.asObservable();
  }

  enviarTerminoBusqueda(termino: string){
    this.terminoBusqueda$.next(termino);
  }

  getTerminoBusqueda(): Observable<string>{
    return this.terminoBusqueda$.asObservable();
  }

  getImages(termino: string , imagenPorPagina: number, paginaActual: number): Observable<any>{
    const KEY= '25341091-44f6f690dc0136a651e8d2cba';
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${termino}&per_page=${imagenPorPagina}&page=${paginaActual}`;
    return this.http.get(URL);
  }
}
