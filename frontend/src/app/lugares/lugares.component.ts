import { Component, OnInit } from '@angular/core';
import { LugarService } from '../lugar.service';
import { Lugar } from '../lugar.model';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {
  lugares: Lugar[] = [];

  constructor(private lugarService: LugarService) {}

  ngOnInit(): void {
    this.lugarService.getLugares().subscribe(
      (data: Lugar[]) => {
        this.lugares = data;
      },
      (err) => console.error(err),
      () => console.log('lugares carregados')
    );
  }
}
