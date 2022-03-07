import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {SolicitudesComponent} from '../../componentes/solicitudes/solicitudes.component';
import {NewSolicitudComponent} from '../../componentes/new-solicitud/new-solicitud.component';
import {EstrComponent} from '../../componentes/estr/estr.component';
import {DescagasComponent} from '../../componentes/descagas/descagas.component';
import {FormatosComponent} from '../../componentes/formatos/formatos.component';
const routes: Routes = [{ path: 'home', component: HomeComponent,children: [
  { path: 'solicitudes', component: SolicitudesComponent},
  { path: 'new-solicitud', component: NewSolicitudComponent},
  { path: 'estr', component: EstrComponent},
  { path: 'estr/:id', component: EstrComponent},
  { path: 'descargas', component: DescagasComponent},
  { path: 'formatos', component: FormatosComponent},
 ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
