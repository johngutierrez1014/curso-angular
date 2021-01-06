import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.models';
import { DestinosApiClient } from '../models/destinos-api-client.models';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
})
export class ListaDestinosComponent implements OnInit {
    @Output() onItemAdded: EventEmitter<DestinoViaje>;
    updates: string[];

  constructor(private destinosApiClient: DestinosApiClient) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinosApiClient.subcribeOnChange((d: DestinoViaje) => {
      if (d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
  }

  ngOnInit() {
  }

  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(d: DestinoViaje) {
    this.destinosApiClient.elegir(d);
  }
}
