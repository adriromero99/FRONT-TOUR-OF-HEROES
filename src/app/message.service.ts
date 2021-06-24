import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  mensajes: string[] = [];

  agregar(mensaje: string) {
    this.mensajes.push(mensaje);
  }

  borrar() {
    this.mensajes = [];
  }

  constructor() { }
}
