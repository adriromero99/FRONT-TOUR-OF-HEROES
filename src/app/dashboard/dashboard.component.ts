import { Component, OnInit } from '@angular/core';
import { Heroe } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  heroes: Heroe[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.obtenerHeroes();
  }

  obtenerHeroes(): void {
    this.heroService.obtenerHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
