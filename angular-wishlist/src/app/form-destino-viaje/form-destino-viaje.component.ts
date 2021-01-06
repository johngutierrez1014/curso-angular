import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { DestinoViaje } from '../models/destino-viaje.models';
import { map, filter, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/Operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud = 3;
  searchResult: String[];

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();

    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidador,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['']
    });

    this.fg.valueChanges.subscribe(
      (form: any) => {
        console.log('form cambió:', form);
      }
    );

    this.fg.controls['nombre'].valueChanges.subscribe(
      (value: string) => {
        console.log('nombre cambió:', value);
      }
    );
  }

  ngOnInit(): void {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
    .pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => ajax('/assets/datos.json'))
    ).subscribe(AjaxResponse => {
      console.log(AjaxResponse.response);
      this.searchResult = AjaxResponse.response;
    });
  }

  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidador(control: FormControl): { [s: string]: boolean } {
    const l = control.value.toString().trim().length;
    if (l > 0 && l < 5) {
      return { invalidNombre: true };
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
    const l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
            return { 'minLongNombre': true };
        }
        return null;
    };
}

}
