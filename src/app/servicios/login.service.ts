import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { con } from '../modelos/Coneccion';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  ip=con.ipser;
  constructor(private http:HttpClient) { }
  login(User:string,Pass:string){
    return this.http.post<any>(this.ip+'Login/Login.php',{user:User,pass:Pass});
  }
}
