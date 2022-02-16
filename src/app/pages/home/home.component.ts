import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {StorageLocalService} from '../../servicios/storage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private storage:StorageLocalService) { }
  user:any=undefined;
  ngOnInit(): void {
    this.verificar();
  }
  verificar() {
    this.user= this.storage.traerValor('user');
    console.log(this.user);
    if(this.user==undefined){
      this.router.navigate(['login']);
    }

  }
  exitsRuta(ruta:string){
    if(this.user.rol=="Tecnico"){
      if(ruta=='Solicitudes'){
        return true
      }
      if(ruta=='descargas'){
        return true
      }



    }
    if(this.user.rol=="Secretaria"){
      if(ruta=='Solicitudes'){
        return true
      }
      if(ruta=='New-Solicitudes'){
        return true
      }



    }

    return false;
  }
  CerrarSecion(){
    this.storage.guardarValor("user",undefined);
    this.router.navigate(['login']);
  }


}
