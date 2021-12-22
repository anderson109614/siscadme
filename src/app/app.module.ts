import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {HomeModule} from './pages/home/home.module';
import { SolicitudesComponent } from './componentes/solicitudes/solicitudes.component';
import { NewSolicitudComponent } from './componentes/new-solicitud/new-solicitud.component';
import { EstrComponent } from './componentes/estr/estr.component';
@NgModule({
  declarations: [
    AppComponent,
    SolicitudesComponent,
    NewSolicitudComponent,
    EstrComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
