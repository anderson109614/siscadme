import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {Solicitud} from '../../modelos/solicitud';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import {StorageLocalService} from '../../servicios/storage.service';
import {FormatoService} from '../../servicios/formato.service';
import {WebcamImage, WebcamInitError} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import {WebcamUtil } from '../../utils/webcam.util';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-estr',
  templateUrl: './estr.component.html',
  styleUrls: ['./estr.component.css']
})
export class EstrComponent implements OnInit {
  public width: number=0;
  public height: number=0;
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,
  public router: Router,private storageLocal:StorageLocalService
  ,private frmSEr:FormatoService) {this.onResize(); }
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
  listaPreguntas:any=undefined;
  ngOnInit(): void {
    this.dataSolicitud=this.storage.get('datos');
    this.btnAtras=<HTMLButtonElement>document.getElementById('btnAtras');
    this.btnSiguiente=<HTMLButtonElement>document.getElementById('btnSiguiente');
    this.btnFinalizar=<HTMLButtonElement>document.getElementById('btnFinalizar');
    this.DIVsus=<HTMLDivElement>document.getElementById('alertSus');
    this.DIVDan=<HTMLDivElement>document.getElementById('alertDan');
    this.cargarUsuario();
    this.cargarSolicitud();
    this.cargarPreguntas();
    this.cargarFotos();
    
    
  }
  /* web cam */
  showWebcam:boolean=false;
  public multipleWebcamsAvailable = false;
  public webcamImage: WebcamImage | null =null;
  private trigger: Subject<void> = new Subject<void>();
  listaNombresFotos:any=[];
  listaNombresFotosAux:any=[];
  listaImagenes:any=[];
  eliminarFoto(id:string){
    this.listaImagenes=this.listaImagenes.filter((img:any)=>img.Id!=id);
    this.listaNombresFotos.push(this.listaNombresFotosAux.find((e:any)=>e.Id==id));
    if(this.listaNombresFotos.length==0){
      (<HTMLButtonElement>document.getElementById('btnFoto')).disabled=true;
     }else{
      (<HTMLButtonElement>document.getElementById('btnFoto')).disabled=false;
     }
     console.log(this.listaImagenes,this.listaNombresFotos,this.listaNombresFotosAux);
  }

  triggerSnapshot(): void {
   this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
   console.info('Saved webcam image', webcamImage);
   this.webcamImage = webcamImage;
    var idFoto=(<HTMLSelectElement>document.getElementById('selecFotos')).value;
    var NombreFot=this.listaNombresFotos.find((e: any)=>e.Id=idFoto).Nombre;
   
   this.listaImagenes?.push({IdFoto:idFoto,
    Nombre:NombreFot,
    img:webcamImage.imageAsDataUrl,
    IdSolFor:this.dataSolicitud.IdSolFor});

   this.listaNombresFotos=this.listaNombresFotos.filter((e:any)=>e.Id!=idFoto);
   if(this.listaNombresFotos.length==0){
    (<HTMLButtonElement>document.getElementById('btnFoto')).disabled=true;
   }else{
    (<HTMLButtonElement>document.getElementById('btnFoto')).disabled=false;
   }

   console.log(this.listaImagenes);
   $('#Modal3').modal('hide')
  }
   
  public get triggerObservable(): Observable<void> {
   return this.trigger.asObservable();
  }
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>()
  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    const win = !!event ? (event.target as Window) : window;
    this.width = win.innerWidth;
    this.height = win.innerHeight/2;
  }
  activarCanara(){
    console.log('activar camara',this.showWebcam);
    this.showWebcam=true;
  }
  DesactivarCanara(){
    console.log('Desactivar camara',this.showWebcam);
    this.showWebcam=false;
  }
  public messages: any[] = [];
  public handleInitError(error: WebcamInitError): void {
    this.messages.push(error);
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
     // this.addMessage('User denied camera access');
     alert('User denied camera access');
    }
  }
  private readAvailableVideoInputs() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }
 /**
  * 
  */
 cargarUsuario() {
    this.user = this.storageLocal.traerValor('user');


  }
  cargarSolicitud(){
    this.dataSolicitud= this.storageLocal.traerValor('sol');
  }
  cargarPreguntas(){
    this.frmSEr.getPreguntasPorFormato(this.dataSolicitud.IdFormato).subscribe(res=>{
      if(res.estado){
          this.listaPreguntas=res.res;
          console.log(this.listaPreguntas);
      }else{
        console.log(res);
      }
    },
    err=>{
      console.log(err);
    });
  }
  cargarFotos(){
    this.frmSEr.getFotosPorFormato(this.dataSolicitud.IdFormato).subscribe(res=>{
      if(res.estado){
          this.listaNombresFotos=res.res;
          this.listaNombresFotosAux=res.res;
          console.log(this.listaNombresFotos);
      }else{
        console.log(res);
      }
    },
    err=>{
      console.log(err);
    });
  }
  numPaso=1;
  btnAtras=<HTMLButtonElement>document.getElementById('btnAtras');
  btnSiguiente=<HTMLButtonElement>document.getElementById('btnSiguiente');
  btnFinalizar=<HTMLButtonElement>document.getElementById('btnFinalizar');
   DIVsus=<HTMLDivElement>document.getElementById('alertSus');
   DIVDan=<HTMLDivElement>document.getElementById('alertDan');
  cklAtras(){
    if(this.numPaso===2){
        (<HTMLDivElement>document.getElementById('steps-uid-0-p-0')).style.display='block';
        (<HTMLDivElement>document.getElementById('steps-uid-0-p-1')).style.display='none';
        (<HTMLButtonElement>document.getElementById('step2')).classList.remove('btn-info');
        (<HTMLButtonElement>document.getElementById('step2')).classList.add('btn-outline-info');
        this.btnAtras.disabled=true;
        this.numPaso--;
        return;
    }
    if(this.numPaso===3){
      (<HTMLDivElement>document.getElementById('steps-uid-0-p-1')).style.display='block';
      (<HTMLDivElement>document.getElementById('steps-uid-0-p-2')).style.display='none';
      (<HTMLButtonElement>document.getElementById('step3')).classList.remove('btn-info');
      (<HTMLButtonElement>document.getElementById('step3')).classList.add('btn-outline-info');
      this.btnSiguiente.style.display='block';
      this.btnFinalizar.style.display='none';
      this.numPaso--;
      return;
    }
  }
  cklSiguiente(){
    

      if(this.numPaso===1){
        //steps-uid-0-p-0
        (<HTMLDivElement>document.getElementById('steps-uid-0-p-0')).style.display='none';
        (<HTMLDivElement>document.getElementById('steps-uid-0-p-1')).style.display='block';
        (<HTMLButtonElement>document.getElementById('step2')).classList.remove('btn-outline-info');
        (<HTMLButtonElement>document.getElementById('step2')).classList.add('btn-info');
        this.btnAtras.disabled=false;
        this.numPaso++;
       
        return;

      }
      if(this.numPaso===2){
        (<HTMLDivElement>document.getElementById('steps-uid-0-p-1')).style.display='none';
        (<HTMLDivElement>document.getElementById('steps-uid-0-p-2')).style.display='block';
        (<HTMLButtonElement>document.getElementById('step3')).classList.remove('btn-outline-info');
        (<HTMLButtonElement>document.getElementById('step3')).classList.add('btn-info');
        this.btnSiguiente.style.display='none';
        this.btnFinalizar.style.display='block';
        this.btnFinalizar.disabled=false;
        this.numPaso++;
        return;
      }



    
  }
  cklFinalizar(){
    var listaREspuestas:any=[];
    this.listaPreguntas.map((seccion:any)=>{
      seccion.preguntas.map((pregunta:any)=>{
        
        var txt;
        var valor='';
        var estado='';

        if(pregunta.tipo=='MULTIPLE'){
          txt=(<HTMLSelectElement>document.getElementById('txtPregunta-'+pregunta.Id));
          if(txt.value=='0-0'){
            this.alertBAD('Por fabor complete todas las preguntas');
            return;
          }
          var sep = txt?.value.split('-');
          valor=sep[1];
          if(sep[0]=='0'){
            estado='No Cumple';
          }else{
            estado='Cumple';
          }
          
        } 
        if(pregunta.tipo=='MAXMIN'){
          txt=(<HTMLInputElement>document.getElementById('txtPregunta-'+pregunta.Id));
          valor=txt.value;
          if(valor.length==0){
            this.alertBAD('Por fabor complete todas las preguntas');
            return;
          }
          var contenedor=(<HTMLDivElement>document.getElementById('pregunta-'+pregunta.Id)).innerHTML;
          estado=contenedor.split('>')[1].split('<')[0];

        } 
        
        listaREspuestas.push({IdPregunta:pregunta.Id,
                              nombre:pregunta.nombre,
                              respuesta:valor,
                              estado:estado,
                              IdSolFor:this.dataSolicitud.IdSolFor});
        
      });
    });
    
    if(this.listaNombresFotos.length>0){
      this.alertBAD('Por fabor complete todas las fotografias');
       return;
    }
    console.log(listaREspuestas);
    this.frmSEr.GuardarRespuestas(listaREspuestas).subscribe(res=>{
      if(res.estado){
        
        console.log("bn",res);
        this.frmSEr.GuardarFotosRespuestas(this.listaImagenes).subscribe(resf=>{
          if(resf.estado){
            this.alertBN("La informacion a sido guardada exitosamente");
            this.actualizarFormatoSolTerminado();
          }else{
            console.log(resf);
            this.alertBAD("A ocurrido un error al guardar la informacion");
          }
        },errf=>{
          console.log(errf);
          this.alertBAD("A ocurrido un error al guardar la informacion");
        });



      }else{
        console.log(res);
        this.alertBAD("A ocurrido un error al guardar la informacion");
      }
    },
    err=>{
      console.log(err);
      this.alertBAD("A ocurrido un error al guardar la informacion");
    });
    
    
    //this.router.navigateByUrl('/home/solicitudes');
  }
  actualizarFormatoSolTerminado(){
    this.frmSEr.ActulizarSolicitudFotmatoTerminado(this.dataSolicitud.IdSolFor).subscribe(res=>{
      if(res.estado){
        this.router.navigateByUrl('/home/solicitudes');
      }else{
        res
      }
    },err=>{
      console.log(err);
    });;
  }
  selectChange(event:any,num:Number){
    const value = event.target.value;
   var selected:string = value;
   
   console.log(value,num,selected==='0-0');
   if(selected.split('-')[0]==='1'){
    (<HTMLDivElement>document.getElementById('pregunta-'+num.toString())).innerHTML='<span class="badge badge-success">Cumple</span>';
    console.log('cumple');
    return;
   }
   if(selected==='0-0'){
    (<HTMLDivElement>document.getElementById('pregunta-'+num.toString())).innerHTML='<span class="badge badge-secondary">N/A</span>';
    console.log('n/a');
    return;
   }
   if(selected.split('-')[0]==='0'){
    (<HTMLDivElement>document.getElementById('pregunta-'+num.toString())).innerHTML='<span class="badge badge-danger">No Cumple</span>';
    console.log('no cumple');
    return;
   }

  }
  changeNumber(event:any,res:[any],name:string){
    const value = event.target.value;
    var selected = value;
    var max=0;
    var min=0;
    for (let index = 0; index < res.length; index++) {
      if(res[index].nombre=='MIN'){
        min=res[index].valor;
      }
      if(res[index].nombre=='MAX'){
        max=res[index].valor;
      }
      
    }
    
    console.log(value,res,name);
    if(selected.length>0){
      if(Number.parseFloat(selected)>max){
        (<HTMLDivElement>document.getElementById('pregunta-'+name)).innerHTML='<span class="badge badge-danger">No Cumple</span>';
      }
      if(Number.parseFloat(selected)<=max && Number.parseFloat(selected)>=min ){
        (<HTMLDivElement>document.getElementById('pregunta-'+name)).innerHTML='<span class="badge badge-success">Cumple</span>';
      }
      if(Number.parseFloat(selected)<min){
        (<HTMLDivElement>document.getElementById('pregunta-'+name)).innerHTML='<span class="badge badge-danger">No Cumple</span>';
      }

    }else{
      (<HTMLDivElement>document.getElementById('pregunta-'+name)).innerHTML='<span class="badge badge-secondary">N/A</span>';
    }
  }
  alertBN(txt:string){
    Swal.fire(
      'Buen Trabajo',
      txt,
      'success'
    )
  }

  alertBAD(txt:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: txt
    
    })
  }

}
