import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../servicios/login.service';
import { Router } from '@angular/router';
import {StorageLocalService} from '../../servicios/storage.service'
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private logSer:LoginService,private router: Router,private storage:StorageLocalService) { }

  ngOnInit(): void {
    this.verificar();
    $('[data-toggle="tooltip"]').tooltip();
    $(".preloader").fadeOut();
    // ============================================================== 
    // Login and Recover Password 
    // ============================================================== 
    $('#to-recover').on("click", function() {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });
    $('#to-login').click(function(){
        
        $("#recoverform").hide();
        $("#loginform").fadeIn();
    });
  }
  verificar() {
    var user= this.storage.traerValor('user');
    
    if(user!=undefined){
      this.router.navigate(['home']);
    }

  }
  cklIngresar(){
    var user= (<HTMLInputElement>document.getElementById('txtUsuario')).value;
    var pass= (<HTMLInputElement>document.getElementById('txtPassword')).value;
    if(user.length>0 && pass.length>0){
      this.logSer.login(user,pass).subscribe(res=>{
        console.log(res.user);
        if(res.estado){
          this.storage.guardarValor("user",res.user[0]);
          this.storage.guardarValor("token",res.user[0].token);
          this.router.navigate(['home']);
        }else{
          alert(res.mensaje);
        } 

      },
      err=>{
        console.log(err);
      });
    }else{
      alert('Ingrese usuario y contraseña');
    }
  }

}
