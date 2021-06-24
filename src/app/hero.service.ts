import { Injectable } from '@angular/core';
import { Heroe } from './hero';
import { HEROES } from './mock-heroes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService, private http: HttpClient,) { }

  private heroesUrl = 'api/heroes';  // URL to web api

  obtenerHeroes(): Observable<Heroe[]> {
    this.messageService.agregar("Servicio de Heroes: Fueron cargados los heroes iniciales!");
    return this.http.get<Heroe[]>(this.heroesUrl).pipe(tap(_ => this.loggear('Los heroes fueron cargados'), catchError(this.manejarError<Heroe[]>('obtenerHeroes', [])))); //Observar: en realidad devuelvo esto: this.http.get<Heroe[]>(this.heroesUrl), el pipeo es para manejar errores en caso de que sucendan
  }

  obtenerHeroe(id: number): Observable<Heroe> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Heroe>(url).pipe(tap(_ => this.loggear(`Se obtuvo el heroe de id =${id}`)), catchError(this.manejarError<Heroe>(`Error en obtenerHeroe(id=${id})`)));
  }

  private loggear(mensaje: string) {
    this.messageService.agregar(`Servicio de Heroes: ${mensaje}`);
  }

  /**
 * Maneja un pedido al HTTP que haya fallado y permite que la app continue su funcionamiento
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private manejarError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.loggear(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Actualiza el heroe en el servidor con el metodo PUT de http*/
  actualizarHeroe(heroe: Heroe): Observable<any> {
    return this.http.put(this.heroesUrl, heroe, this.httpOptions).pipe(
      tap(_ => this.loggear(`El heroe de id=${heroe.id} fue actualizado`)),
      catchError(this.manejarError<any>('updateHero'))
    );
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(this.heroesUrl, heroe, this.httpOptions).pipe(
      tap((nuevoHeroe: Heroe) => this.loggear(`Se añadio un heroe con id=${nuevoHeroe.id}`)),
      catchError(this.manejarError<Heroe>('addHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

}
