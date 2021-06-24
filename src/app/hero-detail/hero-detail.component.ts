import { Component, OnInit, Input } from '@angular/core';
import { Heroe } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  @Input() heroe?: Heroe;

  ngOnInit(): void {
    this.obtenerHeroe();
  }

  irAtras(): void {
    this.location.back();
  }

  obtenerHeroe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.obtenerHeroe(id).subscribe(heroe => this.heroe = heroe);
  }

  guardarCambios(): void {
    this.heroService.actualizarHeroe(this.heroe).subscribe(() => this.irAtras());
  }


}
