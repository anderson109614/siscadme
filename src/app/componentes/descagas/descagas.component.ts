
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FormatoService } from 'src/app/servicios/formato.service';
import { StorageLocalService } from 'src/app/servicios/storage.service';
import { Solicitud } from '../../modelos/solicitud';
import { con } from '../../modelos/Coneccion';
//import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
//import PizZipUtils from "pizzip/utils/index.js";
//const ImageModule = require("docxtemplater-image-module");
const Docxtemplater = require("docxtemplater");
const PizZipUtils = require('pizzip/utils/index.js');

//const ImageModule = require("docxtemplater-image-module");
//docxtemplater-image-module-free open-docxtemplater-image-module
var ImageModule = require('docxtemplater-image-module-free');
//import * as JSZip from 'jszip';
//import * as JSZipUtils from 'jszip-utils';
import saveAs from "file-saver";
function loadFile(url: any, callback: any) {
  PizZipUtils.getBinaryContent(url, callback);

}

declare var $: any;

const base64Regex =
    /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
function base64Parser(dataURL:any) {
    if (
        typeof dataURL !== "string" ||
        !base64Regex.test(dataURL)
    ) {
        return false;
    }
    const stringBase64 = dataURL.replace(base64Regex, "");

    // For nodejs
    if (typeof Buffer !== "undefined" && Buffer.from) {
        return Buffer.from(stringBase64, "base64");
    }

    // For browsers :
    const binaryString = window.atob(stringBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes.buffer;
}
const imageOpts = {
    getImage(tag:any) {
        return tag;
    },
    getSize() {
        return [100, 100];
    },
};
@Component({
  selector: 'app-descagas',
  templateUrl: './descagas.component.html',
  styleUrls: ['./descagas.component.css']
})

export class DescagasComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, public router: Router,
    private storageLocal: StorageLocalService,
    private frmSer: FormatoService) { }
  date:Date=new Date();
  dia:string="";
  mes:string="";
  año:string="";
  Fecha:string="";

  generate() {

    console.log(con.ipser + "Formato/docs/" + this.dataSolicitud.docx);
    loadFile(
      con.ipser + "Formato/docs/" + this.dataSolicitud.docx,
      (error: any, content: any) => {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip,
          {
            paragraphLoop: true,
            linebreaks: true,
            modules: [new ImageModule(imageOpts)]

          }
        );

        /**
         *  {
              paragraphLoop: true,
              linebreaks: true,
          }
         */
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)

        doc.render({
          fecha:this.Fecha,
          ...this.dataSolicitud
          , Respuestas: [...this.listaRespuestasFormato]

        });
        //nodebuffer blob
        const out = doc.getZip().generate({
          type: "blob",
          compression: "DEFLATE"
        });
        // Output the document using Data-URI

        saveAs(out, "output.docx");

      }
    );

    console.log({
      ...this.dataSolicitud
      , Respuestas: [...this.listaRespuestasFormato]
      , Fotos: [this.listaFotosRespuestas]
    });
  }
  generateTerminado() {


    loadFile(
      con.ipser + "Formato/docs/Terminado.docx",
      (error: any, content: any) => {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip,
          {
            paragraphLoop: true,
            linebreaks: true,
            modules: [new ImageModule(imageOpts)]

          }
        );

        /**
         *  {
              paragraphLoop: true,
              linebreaks: true,
          }
         */
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)

        doc.render({
          fecha:this.Fecha,
          ...this.dataSolicitud

        });
        //nodebuffer blob
        const out = doc.getZip().generate({
          type: "blob",
          compression: "DEFLATE"
        });
        // Output the document using Data-URI

        saveAs(out, "output.docx");

      }
    );

    console.log({
      ...this.dataSolicitud
      , Respuestas: [...this.listaRespuestas]
      , Fotos: [this.listaFotosRespuestas]
    });
  }
  generateCertificado() {


    loadFile(
      con.ipser + "Formato/docs/Certificado.docx" ,
      (error: any, content: any) => {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip,
          {
            paragraphLoop: true,
            linebreaks: true,
            modules: [new ImageModule(imageOpts)]

          }
        );

        /**
         *  {
              paragraphLoop: true,
              linebreaks: true,
          }
         */
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)

        doc.render({
          fecha:this.Fecha,
          ...this.dataSolicitud
          

        });
        //nodebuffer blob
        const out = doc.getZip().generate({
          type: "blob",
          compression: "DEFLATE"
        });
        // Output the document using Data-URI

        saveAs(out, "output.docx");

      }
    );

    console.log({
      ...this.dataSolicitud
      , Respuestas: [...this.listaRespuestas]
      , Fotos: [this.listaFotosRespuestas]
    });
  }
  generate2() {
    console.log(this.Fecha);

  }


  dataSolicitud: any = {
    Id: "",
    Cedula: "",
    Nombres: "",
    Compania: "",
    Disco: "",
    Provincia: "",
    MarcaChasis: "",
    MarcaCarroceria: "",
    ModeloChasis: "",
    ModeloCarroceria: "",
    VIN_chasis: "",
    PlazasTotale: "",
    NumeroMotor: "",
    UbicacionPuertas: "",
    AnioChasis: "",
    AnioFabroicacin: "",
    AireAcondicionado: "",
    ServicioTransporte: "",
    CompartimientosEspeciales: "",
    PuertaConductor: "",
    IDTecnico: "",
    docx: ""
  };
  user: any = undefined;
  listaFotosRespuestas: any = [];
  listaRespuestas: any = [];
  listaRespuestasFormato: any = [];
  listaSolicitudes: any = [];
  listaSolicitudesAux: any = [];
  ngOnInit(): void {
    this.año=this.date.getFullYear().toString();
    this.mes=this.date.getMonth().toString();
    this.dia=this.date.getDate().toString();
    if(this.dia.length==1){
      this.dia="0"+this.dia;
    }
    if(this.mes.length==1){
      this.mes="0"+this.mes;
    }
    this.Fecha=this.año+"-"+this.mes+"-"+this.dia;
    console.log(this.Fecha);
    this.cargarUsuario();
    this.cargarlistaSolicitudes();




  }
  cargarUsuario() {
    this.user = this.storageLocal.traerValor('user');


  }
  checkSolicitudes($event: KeyboardEvent) {
    this.listaSolicitudes = this.listaSolicitudesAux;
    let value = (<HTMLInputElement>document.getElementById('txtSearchSol')).value;
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
  cargarRespuestas() {
    this.frmSer.getRespuestas(this.dataSolicitud.IdSolFor).subscribe(res => {
      if (res.estado) {
        this.listaRespuestas = res.res;

        console.log(this.listaRespuestas);
      } else {
        console.log(res);
      }
    },
      arr => {
        console.log(arr);
      });
  }
  cargarRespuestasFormato() {
    console.log("ids",this.dataSolicitud.IdFormato,this.dataSolicitud.IdSolFor);
    this.frmSer.getRespuestasFormato(this.dataSolicitud.IdFormato,this.dataSolicitud.IdSolFor).subscribe(res => {
      if (res.estado) {
        this.listaRespuestasFormato = res.res;

        console.log(this.listaRespuestasFormato);
      } else {
        console.log(res);
      }
    },
      arr => {
        console.log(arr);
      });
  }
  
  cargarFotosRespuestas() {
    this.frmSer.getFotosRespuestas(this.dataSolicitud.IdSolFor).subscribe(res => {
      if (res.estado) {
        this.listaFotosRespuestas = res.res;

        console.log(this.listaFotosRespuestas);
      } else {
        console.log(res);
      }
    },
      arr => {
        console.log(arr);
      });
  }
  async cargarlistaSolicitudes() {
    if (this.user.rol == 'Tecnico') {
      await this.frmSer.getSolicitudesByIdTerminadas(this.user.id).subscribe(res => {
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
    }

    // $('#zero_config').DataTable();
  }
  selecSolicitudEdit(solicitud: any) {
    this.dataSolicitud = solicitud;
    this.cargarRespuestas();
    this.cargarFotosRespuestas();
    this.cargarRespuestasFormato();
  }
  ActualizarSolicitud() {
    this.frmSer.ActulizarSolicitud(this.dataSolicitud).subscribe(res => {
      if (res.estado) {

        this.cargarlistaSolicitudes();


      } else {
        console.log(res);
      }
    }, err => {
      console.log(err);
    });
  }
  irLLenadoFormato(sol: any) {
    this.storageLocal.guardarValor('sol', sol);
    this.router.navigate(['home/estr']);
  }
}


