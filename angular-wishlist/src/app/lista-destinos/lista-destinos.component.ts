import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.models';
import { DestinosApiClient } from '../models/destinos-api-client.models';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [ DestinosApiClient ]
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates:string[];

  constructor(
      private destinosApiClient:DestinosApiClient,
    ) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
  }

  ngOnInit() {
  }

  agregado(d:DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(d:DestinoViaje) {
    this.destinosApiClient.elegir(d);
  }
}
