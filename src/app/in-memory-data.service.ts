import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Heroe } from './hero';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes = [
      { id: 11, nombre: 'Dr Nice' },
      { id: 12, nombre: 'Narco' },
      { id: 13, nombre: 'Bombasto' },
      { id: 14, nombre: 'Celeritas' },
      { id: 15, nombre: 'Magneta' },
      { id: 16, nombre: 'RubberMan' },
      { id: 17, nombre: 'Dynama' },
      { id: 18, nombre: 'Dr IQ' },
      { id: 19, nombre: 'Magma' },
      { id: 20, nombre: 'Tornado' }
    ];
    return { heroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty, the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest hero id + 1.
  genId(heroes: Heroe[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(heroe => heroe.id)) + 1 : 11;
  }
}
