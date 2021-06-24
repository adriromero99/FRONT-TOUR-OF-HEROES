import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Heroe } from "../hero"

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerHeroes();
  }

  agregarHeroe(nombre: string): void {
    nombre = nombre.trim();

    if (!nombre) { return; }

    var heroeNuevo = <Heroe>{};
    heroeNuevo.nombre = nombre;

    this.heroService.agregarHeroe(heroeNuevo).subscribe(heroe => { this.heroes.push(heroe);});
    
    //this.heroService.agregarHeroe({ nombre } as Heroe).subscribe(heroe => { this.heroes.push(heroe);});
  }

  obtenerHeroes(): void {
    this.heroService.obtenerHeroes().subscribe(heroes => this.heroes = heroes);
  }
 
  heroes?: Heroe[];

}
