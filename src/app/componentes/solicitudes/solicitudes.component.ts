import { identifierName } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FormatoService } from 'src/app/servicios/formato.service';
import { StorageLocalService } from 'src/app/servicios/storage.service';
import { Solicitud } from '../../modelos/solicitud';
declare var $: any;
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, public router: Router,
    private storageLocal: StorageLocalService,
    private frmSer: FormatoService) { }

  dataSolicitud: any={
    Id:"",
    Cedula:"",
    Nombre:"",
    Compania:"",
    Disco:"",
    Provincia:"",
    MarcaChasis:"",
    MarcaCarroceria:"",
    ModeloChasis:"",
    ModeloCarroceria:"",
    VIN_chasis:"",
    PlazasTotale:"",
    NumeroMotor:"",
    UbicacionPuertas:"",
    AnioChasis:"",
    AnioFabroicacin:"",
    AireAcondicionado:"",
    ServicioTransporte:"",
    CompartimientosEspeciales:"",
    PuertaConductor:"",
    IDTecnico:""
  };
  user: any = undefined;
  listaSolicitudes: any = [];
  listaSolicitudesAux: any = [];
  ngOnInit(): void {


    this.cargarUsuario();
    this.cargarlistaSolicitudes();
    



  }
  cargarUsuario() {
    this.user = this.storageLocal.traerValor('user');


  }
  checkSolicitudes($event: KeyboardEvent){
    this.listaSolicitudes = this.listaSolicitudesAux;
    let value=(<HTMLInputElement>document.getElementById('txtSearchSol')).value;
    console.log(value);
/*
    let value = (<HTMLInputElement>event.target).value;
      */
    if (value != "") {
      const result = this.listaSolicitudes.filter((estudianteB: any) => estudianteB.Cedula.search(value) >= 0
        || estudianteB.Nombres.toUpperCase().search(value.toUpperCase()) >= 0
     //  || estudianteB.APELLIDOS.toUpperCase().search(value.toUpperCase()) >= 0
     //   || estudianteB.GENERO.toUpperCase().search(value.toUpperCase()) >= 0
      //  || estudianteB.CARRERA.toUpperCase().search(value.toUpperCase()) >= 0
      );
      this.listaSolicitudes = result;
    } else {
      this.listaSolicitudes = this.listaSolicitudesAux;
    }
  }
  async cargarlistaSolicitudes() {
    if (this.user.rol == 'Tecnico') {
      await this.frmSer.getSolicitudesById(this.user.id).subscribe(res => {
        if (res.estado) {
          this.listaSolicitudes = res.res;
          this.listaSolicitudesAux = res.res;
          console.log(this.listaSolicitudes);
        } else {
          console.log(res);
        }
      },
        arr => {
          console.log(arr);
        });
    } else {
      await this.frmSer.getSolicitudes().subscribe(res => {
        if (res.estado) {
          this.listaSolicitudes=res.res;
          this.listaSolicitudesAux = res.res;
          console.log(this.listaSolicitudes);
        } else {
          console.log(res);
        }
      },
        arr => {
          console.log(arr);
        });
    }
    
   // $('#zero_config').DataTable();
  }
  selecSolicitudEdit(solicitud:any){
    this.dataSolicitud=solicitud;
    
  }
  ActualizarSolicitud(){
    this.frmSer.ActulizarSolicitud(this.dataSolicitud).subscribe(res=>{
      if(res.estado){
        
        this.cargarlistaSolicitudes();
        
      
      }else{
        console.log(res);
      }
    },err=>{
      console.log(err);
    });
  }
  irLLenadoFormato(sol:any){
    this.storageLocal.guardarValor('sol',sol);
    this.router.navigate(['home/estr']);
  }


}
