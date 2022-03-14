import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {HomeModule} from './pages/home/home.module';
import { SolicitudesComponent } from './componentes/solicitudes/solicitudes.component';
import { NewSolicitudComponent } from './componentes/new-solicitud/new-solicitud.component';
import { EstrComponent } from './componentes/estr/estr.component';
import {FormsModule} from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';
import { DescagasComponent } from './componentes/descagas/descagas.component';
import { FormatosComponent } from './componentes/formatos/formatos.component';
import { PreguntasComponent } from './componentes/preguntas/preguntas.component';

import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es-EC';
registerLocaleData(localeEs,'es');

@NgModule({
  declarations: [
    AppComponent,
    SolicitudesComponent,
    NewSolicitudComponent,
    EstrComponent,
    DescagasComponent,
    FormatosComponent,
    PreguntasComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    WebcamModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
