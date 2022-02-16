import { Component, Inject, OnInit } from '@angular/core';

import * as xlsx from 'xlsx';
import {Solicitud} from '../../modelos/solicitud';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { FormatoService} from '../../servicios/formato.service'

declare var $: any;
@Component({
  selector: 'app-new-solicitud',
  templateUrl: './new-solicitud.component.html',
  styleUrls: ['./new-solicitud.component.css']
})
export class NewSolicitudComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,public router: Router,private frmSer:FormatoService) { }
  dataSolicitud:Solicitud=new Solicitud(null);
  listaFormatos:any=[];
  listaTecnicos:any=[];
  idTecnicoSelec:string='';
  listaFormatosSelecionados:any=[];
  ngOnInit(): void {
    this.cargarWizard();
    this.cargarTecnicosFormatos();
    this.btnAtras=<HTMLButtonElement>document.getElementById('btnAtras');
    this.btnSiguiente=<HTMLButtonElement>document.getElementById('btnSiguiente');
    this.btnFinalizar=<HTMLButtonElement>document.getElementById('btnFinalizar');
    this.DIVsus=<HTMLDivElement>document.getElementById('alertSus');
    this.DIVDan=<HTMLDivElement>document.getElementById('alertDan');
    
  }
  cargarTecnicosFormatos(){
    this.frmSer.getFormatos().subscribe(res=>{
      if(res.estado){
        this.listaFormatos=res.res;
      }else{
        console.log(res.mensaje);
      }
      
    },
    err=>{
      console.log(err);
    });
    this.frmSer.getTecnicos().subscribe(res=>{
      if(res.estado){
        this.listaTecnicos=res.res;
      }else{
        console.log(res.mensaje);
      }
      
    },
    err=>{
      console.log(err);
    });
  }
  cklRedio(id:string){
    
    this.idTecnicoSelec=id;
    console.log(this.idTecnicoSelec);
  }
  cklChek(id:string){
    var check= (<HTMLInputElement>document.getElementById('check-'+id)).checked;
    if(check){
      this.listaFormatosSelecionados.push(id);
    }else{
      this.listaFormatosSelecionados=this.listaFormatosSelecionados.filter((f: string)=>f!=id);
    }
    console.log(this.listaFormatosSelecionados);
    
  }
  cargarWizard() {
    console.log('carga');
    var form = $("#example-form");
    form.validate({
      errorPlacement: function errorPlacement(error: any, element: any) { element.before(error); },
      rules: {
        confirm: {
          equalTo: "#password"
        }
      }
    });
    form.children("div").steps({
      headerTag: "h3",
      bodyTag: "section",
      transitionEffect: "slideLeft",
      onStepChanging: function (event: any, currentIndex: any, newIndex: any) {
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
      },
      onFinishing: function (event: any, currentIndex: any) {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
      },
      onFinished: function (event: any, currentIndex: any) {
        alert("Submitted!");
      }
    });


  }
  arrayBuffer:any;
  file:File | undefined;
  datos:any;
  informacionCargada:boolean=true;
  numPaso=1;
  btnAtras=<HTMLButtonElement>document.getElementById('btnAtras');
  btnSiguiente=<HTMLButtonElement>document.getElementById('btnSiguiente');
  btnFinalizar=<HTMLButtonElement>document.getElementById('btnFinalizar');
   DIVsus=<HTMLDivElement>document.getElementById('alertSus');
   DIVDan=<HTMLDivElement>document.getElementById('alertDan');
  uploadFile(event: Event) {
    this.btnSiguiente.disabled=false;

    
    console.log('change');
    const element = event.currentTarget as HTMLInputElement;

    let fileList: FileList | null = element.files;
    
    if (fileList) {
      console.log("FileUpload -> files", fileList[0]);
      
      this.file=fileList[0];
      let type=this.file.name.split('.')[1];
      if(type==='xlsm'){
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = xlsx.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            //console.log(xlsx.utils.sheet_to_json(worksheet,{raw:true}));
            this.datos=xlsx.utils.sheet_to_json(worksheet,{raw:true,blankrows:true,rawNumbers:true,defval:''})[2];
            console.log(this.datos);
            this.DIVDan.style.display='none';
            this.DIVsus.style.display='block';
            this.DIVsus.innerHTML="Informacion Cargada:"+this.file?.name;
            this.informacionCargada=true;
            this.btnSiguiente.disabled=false;
        }
        fileReader.readAsArrayBuffer(this.file);
      }else{
        this.DIVsus.style.display='none';
        this.DIVDan.style.display='block';
        this.DIVDan.innerHTML="Archivo no compatible";
         this.informacionCargada=false;
         this.btnSiguiente.disabled=true;
      }
      

    }else{
      this.DIVsus.style.display='none';
      this.DIVDan.style.display='block';
      this.DIVDan.innerHTML="Ningun Archivo Selecionado";
         this.informacionCargada=false;
         this.btnSiguiente.disabled=true;
    }
  }
  
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
    console.log(this.dataSolicitud);
    if(this.informacionCargada){

      if(this.numPaso===1){
        //steps-uid-0-p-0
        (<HTMLDivElement>document.getElementById('steps-uid-0-p-0')).style.display='none';
        (<HTMLDivElement>document.getElementById('steps-uid-0-p-1')).style.display='block';
        (<HTMLButtonElement>document.getElementById('step2')).classList.remove('btn-outline-info');
        (<HTMLButtonElement>document.getElementById('step2')).classList.add('btn-info');
        this.btnAtras.disabled=false;
        this.numPaso++;
        this.cargarDatosOBJ();
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



    }else{
      this.DIVsus.style.display='none';
      this.DIVDan.style.display='block';
      this.DIVDan.innerHTML="Ningun Archivo Selecionado";
    }
  }
  cklFinalizar(){
    /*
    this.storage.clear();
    this.storage.set('datos',this.dataSolicitud);
          
    this.router.navigateByUrl('/home/solicitudes');*/
    if(this.listaFormatosSelecionados.length>0){
      if(this.idTecnicoSelec.length!=0){
        this.dataSolicitud.IDTecnico=this.idTecnicoSelec;
        this.dataSolicitud.Formatos=this.listaFormatosSelecionados;
        this.frmSer.guardarSolicitud(this.dataSolicitud).subscribe(res=>{
          if(res.estado){
            this.router.navigateByUrl('/home/solicitudes');
          }else{
            alert('Error al guardar');
            console.log(res);
          }
        },
        err=>{
          alert('Error al guardar');
          console.log(err);
        });
      }else{
        alert('Seleccione un tecnico');
      }
    }else{
      alert('Selecciones minimo un formato');
    }
  }
  cargarDatosOBJ(){
    this.dataSolicitud= new Solicitud(this.datos);
    
    
  }
  

}
