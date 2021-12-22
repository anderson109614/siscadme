import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import {Solicitud} from '../../modelos/solicitud';
declare var $: any;
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,public router: Router) { }
  dataSolicitud:Solicitud=new Solicitud(null);

  ngOnInit(): void {
    
        $('#zero_config').DataTable();
      this.dataSolicitud=this.storage.get('datos');
    
  }

}
