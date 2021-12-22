import { Component, Inject, OnInit } from '@angular/core';
import {Solicitud} from '../../modelos/solicitud';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-estr',
  templateUrl: './estr.component.html',
  styleUrls: ['./estr.component.css']
})
export class EstrComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,public router: Router) { }
  dataSolicitud:Solicitud=new Solicitud(null);

  ngOnInit(): void {
    this.dataSolicitud=this.storage.get('datos');
    this.btnAtras=<HTMLButtonElement>document.getElementById('btnAtras');
    this.btnSiguiente=<HTMLButtonElement>document.getElementById('btnSiguiente');
    this.btnFinalizar=<HTMLButtonElement>document.getElementById('btnFinalizar');
    this.DIVsus=<HTMLDivElement>document.getElementById('alertSus');
    this.DIVDan=<HTMLDivElement>document.getElementById('alertDan');
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
    this.router.navigateByUrl('/home/solicitudes');
  }
  selectChange(event:any,num:Number){
    const value = event.target.value;
   var selected = value;
   console.log(value,num);
   if(selected==='POSEE'){
    (<HTMLDivElement>document.getElementById(num.toString())).innerHTML='<span class="badge badge-success">Cumple</span>';
   }
   if(selected==='N/A'){
    (<HTMLDivElement>document.getElementById(num.toString())).innerHTML='<span class="badge badge-secondary">N/A</span>';
   }
   if(selected==='NO POSEE'){
    (<HTMLDivElement>document.getElementById(num.toString())).innerHTML='<span class="badge badge-danger">No Cumple</span>';
   }

  }
  changeNumber(event:any,max:number,min:number,name:string){
    const value = event.target.value;
    var selected = value;
    console.log(value,max,min,name);
    if(selected.length>0){
      if(Number.parseFloat(selected)>max){
        (<HTMLDivElement>document.getElementById(name)).innerHTML='<span class="badge badge-danger">No Cumple</span>';
      }
      if(Number.parseFloat(selected)<=max && Number.parseFloat(selected)>=min ){
        (<HTMLDivElement>document.getElementById(name)).innerHTML='<span class="badge badge-success">Cumple</span>';
      }
      if(Number.parseFloat(selected)<min){
        (<HTMLDivElement>document.getElementById(name)).innerHTML='<span class="badge badge-danger">No Cumple</span>';
      }

    }else{
      (<HTMLDivElement>document.getElementById(name)).innerHTML='<span class="badge badge-secondary">N/A</span>';
    }
  }

}
