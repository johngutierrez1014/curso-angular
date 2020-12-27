import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre:[''],
      url:['']
    });
  }

  ngOnInit(): void {
  }

  guardar(nombre: string, url:string):boolean{
    const d = new DestinoViaje(nombre,url);
    this.onItemAdded.emit(d);
    return false;
  }

}
