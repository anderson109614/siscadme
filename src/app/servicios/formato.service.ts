import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { con } from '../modelos/Coneccion';
import {Solicitud} from '../modelos/solicitud';
@Injectable({
  providedIn: 'root'
})
export class FormatoService {
  ip=con.ipser;
  constructor(private http:HttpClient) { }
  getFormatos(){
    return this.http.get<any>(this.ip+'Formato/Formatos.php');

  }
  
  getPreguntasPorFormato(id:string){
    return this.http.get<any>(this.ip+'Formato/Preguntas.php?id='+id);

  }
  getFotosPorFormato(id:string){
    return this.http.get<any>(this.ip+'Formato/Fotos.php?id='+id);

  }
  getTecnicos(){
    return this.http.get<any>(this.ip+'Formato/Tecnicos.php');

  }
  guardarSolicitud(sol:Solicitud){
    return this.http.post<any>(this.ip+'Solicitudes/Solicitudes.php',sol);
  }
  getSolicitudes(){
    return this.http.get<any>(this.ip+'Solicitudes/Solicitudes.php');

  }
  getSolicitudesById(Id:string){
    return this.http.get<any>(this.ip+'Solicitudes/Solicitudes.php?id='+Id);

  }
  getSolicitudesByIdTerminadas(Id:string){
    return this.http.get<any>(this.ip+'Descargas/Solicitudes.php?id='+Id);

  }
  ActulizarSolicitud(sol:any){
    return this.http.put<any>(this.ip+'Solicitudes/Solicitudes.php',sol);

  }
  GuardarRespuestas(res:any){
    return this.http.post<any>(this.ip+'Respuestas/Respuestas.php',{lis:res});
  }
  GuardarFotosRespuestas(res:any){
    return this.http.post<any>(this.ip+'Respuestas/Fotos.php',{lis:res});
  }
  ActulizarSolicitudFotmatoTerminado(id:string){
    return this.http.put<any>(this.ip+'Respuestas/Formato.php',{Id:id});

  }
  getRespuestas(Id:string){
    return this.http.get<any>(this.ip+'Descargas/Respuestas.php?id='+Id);

  }
  getFotosRespuestas(Id:string){
    return this.http.get<any>(this.ip+'Descargas/Fotos.php?id='+Id);

  }
  //Descargas/RespuestasF.php?id=1&idSol=1
  getRespuestasFormato(Id:string,IdSol:string){
    return this.http.get<any>(this.ip+'Descargas/RespuestasF.php?id='+Id+'&idSol='+IdSol);

  }
  getFormatosCRUC(){
    return this.http.get<any>(this.ip+'FormatoCRUD/Formatos.php');

  }
  updateFormatosCRUC(formato:any){
    return this.http.put<any>(this.ip+'FormatoCRUD/Formatos.php',formato);

  }
 newFormatosCRUC(formato:any){
    return this.http.post<any>(this.ip+'FormatoCRUD/Formatos.php',formato);

  }
  getSeccionesFormatos(idFor:string){
    return this.http.get<any>(this.ip+'FormatoCRUD/Secciones.php?id='+idFor);
  }
  updateSeccionesFormatos(Sec:any){
    return this.http.put<any>(this.ip+'FormatoCRUD/Secciones.php',Sec);
  }
  newSeccionesFormatos(Sec:any){
    return this.http.post<any>(this.ip+'FormatoCRUD/Secciones.php',Sec);
  }
  getPreguntasSeccion(idFor:string){
    return this.http.get<any>(this.ip+'FormatoCRUD/Preguntas.php?id='+idFor);
  }
  getRespuestasCRUD(){
    return this.http.get<any>(this.ip+'FormatoCRUD/Respuestas.php');
  }
  prueba(){
   // return this.http.post<any>('https://sgp.esfloserv.com/API-Esfloserv/Usuarios/UsuariosC.php',{ nombre:'1204554958',password:'6583'});
  // return this.http.get<any>('http://sgp.esfloserv.com/API-Esfloserv/Paquetes/Paquetes.php?idPorteador='+'25'+'&est='+'PQ');
  var obj={
    id: 'data[i].id',
    codigo: '1801846583',
    status10: 'data[i].status10',
    obsercte01: 'data[i].obsercte01',
    imagencte01: 'asdfsdfa',
    imagencte02: 'sdfasdf',
    imagencte03: 'sadffaf',
    longitud01: 'data[i].longitud01',
    latitud01: 'data[i].latitud01',
    codigoPaquete: '2642604801',
    campania: 'data[i].campania',
    idUsr: '25',
    paqentrega_usuariocedula: '1801846583',
    fecha:' data[i].fecha'

  };
  return this.http.post<any>('http://sgp.esfloserv.com/API-Esfloserv/Paquetes/Detalles.php',obj);
  }
}
