import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinoComponent } from './lista-destino/lista-destino.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';

/**Barra de navegacion */
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinoComponent},
  { path: 'destino', component: DestinoDetalleComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinoComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
