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
}
