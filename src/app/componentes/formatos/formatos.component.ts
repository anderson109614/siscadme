import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormatoService } from 'src/app/servicios/formato.service';
import { StorageLocalService } from 'src/app/servicios/storage.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-formatos',
  templateUrl: './formatos.component.html',
  styleUrls: ['./formatos.component.css']
})
export class FormatosComponent implements OnInit {

  constructor(private storageLocal: StorageLocalService,
    private frmSer: FormatoService) { }
  guardar = false;
  listaFormatos: any = [];
  listaFormatosAux: any = [];
  listaSecciones: any = [];
  listaSeccionesAux: any = [];
  listaPreguntas: any = [];
  listaPreguntasAux: any = [];
  ngOnInit(): void {
    this.CargarFFormatos();
  }
  CargarFFormatos() {
    this.frmSer.getFormatosCRUC().subscribe(res => {
      if (res.estado) {
        console.log(res);
        this.listaFormatos = res.res;
        this.listaFormatosAux = res.res;
      } else {
        console.log(res);
      }
    },
      err => {
        console.log(err);
      });
  }
  mostrarTablaSecciones(IdFor: string) {
    this.formatoSelec.Id = IdFor;
    this.frmSer.getSeccionesFormatos(IdFor).subscribe(res => {
      if (res.estado) {
        this.listaSecciones = res.res;
        this.listaSeccionesAux = res.res;
        (<HTMLDivElement>document.getElementById('tablaSecciones')).style.display = "block";
        (<HTMLDivElement>document.getElementById('tablaFormatos')).style.display = "none";
      } else {
        console.log(res);
      }
    },
      err => {
        console.log(err);
      });
  }
  mostrarTablaPreguntas(Sec: string) {
    this.seccionSelec = Sec;
    console.log("baa");
    this.frmSer.getPreguntasSeccion(this.seccionSelec.Id).subscribe(res => {
      if (res.estado) {
        this.listaPreguntas = res.res;
        this.listaPreguntasAux = res.res;
        (<HTMLDivElement>document.getElementById('tablaPreguntas')).style.display = "block";
        (<HTMLDivElement>document.getElementById('tablaSecciones')).style.display = "none";
      } else {
        console.log(res);
      }
    },
      err => {
        console.log(err);
      });
  }
  mostrarTablaPreguntasId(id: string) {

    console.log("baa");
    this.frmSer.getPreguntasSeccion(id).subscribe(res => {
      if (res.estado) {
        this.listaPreguntas = res.res;
        this.listaPreguntasAux = res.res;
        (<HTMLDivElement>document.getElementById('tablaPreguntas')).style.display = "block";
        (<HTMLDivElement>document.getElementById('tablaSecciones')).style.display = "none";
      } else {
        console.log(res);
      }
    },
      err => {
        console.log(err);
      });
  }
  regresar(name: string) {
    (<HTMLDivElement>document.getElementById('tablaFormatos')).style.display = "none";
    (<HTMLDivElement>document.getElementById('tablaSecciones')).style.display = "none";
    (<HTMLDivElement>document.getElementById('tablaPreguntas')).style.display = "none";

    (<HTMLDivElement>document.getElementById(name)).style.display = "block";
  }
  preguntaSelect: {
    Id: string,
    nombre: string,
    descripcion: string,
    tipo: string,
    Id_seccion: string,
    NORMA: string,
    repuestas: any
  } = {
      Id: "",
      nombre: "",
      descripcion: "",
      tipo: "",
      Id_seccion: "",
      NORMA: "",
      repuestas: []
    };
  /*
{
      id_pregunta: "",
      id_respuesta: "",
      valor: "",
      Id: "",
      nombre: ""
    }
  */
  nuevaPregunta = true;
  selectPregunta(pregunta: any) {
    this.preguntaSelect = pregunta;
    this.guardar = false;
    console.log("pre selecc",this.preguntaSelect);
    this.nuevasRespuestas=[];
    this.nuevaPregunta = false;


    var selected: string = pregunta.tipo;

    console.log(selected);
    this.cargarREspuestas();
    //btnAñadirRespuesta
    var btnMas = (<HTMLSelectElement>document.getElementById('btnAñadirRespuesta'));
    if (selected == 'MULTIPLE') {
      btnMas.disabled = false;
    }
    if (selected == 'MAXMIN') {
      btnMas.disabled = false;
    }
    if (selected == 'TEXTO') {
      btnMas.disabled = true;

    }
    if (selected == 'NUMERO') {
      btnMas.disabled = true;
    }


  }
  formatoSelec: any = { Id: '', nombre: '', docx: '' };
  selectFormato(formato: any) {
    this.formatoSelec = formato;
    this.guardar = false;
    console.log(this.formatoSelec);
  }
  seccionSelec: any = { Id: '', nombre: '', descripcion: '', id_formato: '' };
  selectSecccion(seccion: any) {
    this.seccionSelec = seccion;
    this.guardar = false;
    console.log("sec selec", this.seccionSelec);
  }
  alertBN(txt: string) {
    Swal.fire(
      'Buen Trabajo',
      txt,
      'success'
    )
  }

  alertBAD(txt: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: txt

    })
  }
  clickNuevoFormato() {
    this.guardar = true;
    this.formatoSelec = { Id: '', nombre: '', docx: '' };
    $('#Modalformatoa').modal('show');
  }
  checkFormatos($event: KeyboardEvent) {
    this.listaFormatos = this.listaFormatosAux;
    let value = (<HTMLInputElement>document.getElementById('txtSearchFormatos')).value;
    console.log(value);
    /*
        let value = (<HTMLInputElement>event.target).value;
          */
    if (value != "") {
      const result = this.listaFormatos.filter((frm: any) => frm.nombre.toUpperCase().search(value.toUpperCase()) >= 0
        //  || estudianteB.APELLIDOS.toUpperCase().search(value.toUpperCase()) >= 0
        //   || estudianteB.GENERO.toUpperCase().search(value.toUpperCase()) >= 0
        //  || estudianteB.CARRERA.toUpperCase().search(value.toUpperCase()) >= 0
      );
      this.listaFormatos = result;
    } else {
      this.listaFormatos = this.listaFormatosAux;
    }
  }
  guardarFormato() {
    if (this.guardar) {
      this.frmSer.newFormatosCRUC(this.formatoSelec).subscribe(
        res => {
          if (res.estado) {
            this.alertBN('Registro guardado con exito');
            this.formatoSelec = res.res;
            $('#Modalformatoa').modal('hide');
          } else {
            this.alertBAD('Error al guardar el registro');
            console.log(res);
          }
        }, err => {
          this.alertBAD('Error al guardar el registro');
          console.log(err);
        }
      );
    } else {
      this.frmSer.updateFormatosCRUC(this.formatoSelec).subscribe(
        res => {
          if (res.estado) {
            this.alertBN('Registro Actualizado con exito');
            $('#Modalformatoa').modal('hide');
          } else {
            this.alertBAD('Error al actualizar el registro');
            console.log(res);
          }
        }, err => {
          this.alertBAD('Error al actualizar el registro');
          console.log(err);
        }
      );
    }
    this.CargarFFormatos();
  }
  clickNuevoSeccion() {
    this.guardar = true;
    this.seccionSelec = { Id: '', nombre: '', descripcion: '', id_formato: '' };
    $('#ModalsECCIONES').modal('show');
  }
  guardarSeccion() {
    this.seccionSelec.id_formato = this.formatoSelec.Id;
    console.log("Formato", this.formatoSelec);
    console.log("Seccion", this.seccionSelec);
    if (this.guardar) {

      this.frmSer.newSeccionesFormatos(this.seccionSelec).subscribe(
        res => {
          console.log(res);
          if (res.estado) {
            this.alertBN('Registro guardado con exito');
            $('#ModalsECCIONES').modal('hide');
            this.mostrarTablaSecciones(this.formatoSelec.Id);
          } else {
            this.alertBAD('Error al guardar el registro');
            console.log(res);
          }
        }, err => {
          this.alertBAD('Error al guardar el registro');
          console.log(err);
        }
      );
    } else {
      this.frmSer.updateSeccionesFormatos(this.seccionSelec).subscribe(
        res => {
          console.log(res);
          if (res.estado) {
            this.alertBN('Registro Actualizado con exito');
            $('#ModalsECCIONES').modal('hide');
            this.mostrarTablaSecciones(this.formatoSelec.Id);
          } else {
            this.alertBAD('Error al actualizar el registro');
            console.log(res);
          }
        }, err => {
          this.alertBAD('Error al actualizar el registro');
          console.log(err);
        }
      );
    }

  }
  checkSeccion($event: KeyboardEvent) {
    this.listaSecciones = this.listaSeccionesAux;
    let value = (<HTMLInputElement>document.getElementById('txtSeccionesSol')).value;
    console.log(value);
    /*
        let value = (<HTMLInputElement>event.target).value;
          */
    if (value != "") {
      const result = this.listaSecciones.filter((frm: any) => frm.nombre.toUpperCase().search(value.toUpperCase()) >= 0
        //  || estudianteB.APELLIDOS.toUpperCase().search(value.toUpperCase()) >= 0
        //   || estudianteB.GENERO.toUpperCase().search(value.toUpperCase()) >= 0
        //  || estudianteB.CARRERA.toUpperCase().search(value.toUpperCase()) >= 0
      );
      this.listaSecciones = result;
    } else {
      this.listaSecciones = this.listaSeccionesAux;
    }
  }
  clickNuevaPregunta() {
    this.guardar = true;
    this.preguntaSelect = {
      Id: "",
      nombre: "",
      descripcion: "",
      tipo: "",
      Id_seccion: "",
      NORMA: "",
      repuestas: []
    };
    this.nuevasRespuestas=[];
    this.nuevaPregunta = false;
    var btnMas = (<HTMLSelectElement>document.getElementById('btnAñadirRespuesta'));
    btnMas.disabled=true;
    $('#ModalPregunta').modal('show');
  }
  selectChange(event: any) {
    const value = event.target.value;
    var selected: string = value;

    console.log(selected);
    this.cargarREspuestas();
    //btnAñadirRespuesta
    var btnMas = (<HTMLSelectElement>document.getElementById('btnAñadirRespuesta'))
    if (selected == 'MULTIPLE') {
      btnMas.disabled = false;
    }
    if (selected == 'MAXMIN') {
      btnMas.disabled = false;
    }
    if (selected == 'TEXTO') {
      btnMas.disabled = true;

    }
    if (selected == 'NUMERO') {
      btnMas.disabled = true;
    }
    this.preguntaSelect.repuestas = [];
    this.preguntaSelect.tipo = selected;


  }
  listaRespuestas: any = [];
  listaRespuestasAux: any = [];
  cargarREspuestas() {
    this.frmSer.getRespuestasCRUD().subscribe(res => {
      if (res.estado) {
        this.listaRespuestas = res.res;
        this.listaRespuestasAux = res.res;
      } else {
        console.log(res);
      }
    },
      err => {
        console.log(err);
      });
  }
  CKLmodalRespuestas() {
    console.log("obj", this.preguntaSelect);
    if (this.preguntaSelect.tipo == 'MULTIPLE') {
      this.listaRespuestas = this.listaRespuestasAux.filter((res: any) => res.nombre != 'MAX' || res.nombre != 'MIN');
      console.log("Modal res mul");
    }
    if (this.preguntaSelect.tipo == 'MAXMIN') {
      this.listaRespuestas = this.listaRespuestasAux.filter((res: any) => res.nombre == 'MAX' || res.nombre == 'MIN');
      console.log("Modal res max");
    }
  }
  checkRespuestas($event: KeyboardEvent) {
    this.listaRespuestas = this.listaRespuestasAux;
    let value = (<HTMLInputElement>document.getElementById('txtSearchRespuestas')).value;
    console.log(value);

    if (value != "") {
      const result = this.listaRespuestas.filter((frm: any) => frm.nombre.toUpperCase().search(value.toUpperCase()) >= 0

      );
      this.listaRespuestas = result;
    } else {
      this.listaRespuestas = this.listaRespuestasAux;
    }
  }
  selecRespuesta(res: any) {
    /*
    {
    Id: "",
    nombre: "",
    descripcion: "",
    tipo: "",
    Id_seccion: "",
    NORMA: "",
    repuestas: [{
      id_pregunta: "",
      id_respuesta: "",
      valor: "",
      Id: "",
      nombre: ""
    }]
  };
    
    */
    if (this.nuevaPregunta) {
      var value = (<HTMLSelectElement>document.getElementById('txtValueRres')).value;
      console.log("res", this.preguntaSelect.repuestas);
      this.preguntaSelect.repuestas.push({
        id_pregunta: this.preguntaSelect.Id,
        id_respuesta: res.Id,
        valor: value,
        Id: "",
        nombre: res.nombre
      });
      var res = this.listaRespuestas.filter((pre: any) => pre.Id != res.Id);
      this.listaRespuestas = res;
      //this.listaRespuestasAux=res;
      console.log("pre", this.preguntaSelect);
      $('#ModalListaRespuestas').modal('hide');
    }else{
      var value = (<HTMLSelectElement>document.getElementById('txtValueRres')).value;
      
      this.nuevasRespuestas.push({
        id_pregunta: this.preguntaSelect.Id,
        id_respuesta: res.Id,
        valor: value,
        Id: "",
        nombre: res.nombre
      });
      var res = this.listaRespuestas.filter((pre: any) => pre.Id != res.Id);
      this.listaRespuestas = res;
      //this.listaRespuestasAux=res;
      console.log("pre", this.preguntaSelect);
      $('#ModalListaRespuestas').modal('hide');
    }

  }
  nuevasRespuestas:any=[];
  respuestasEliminadas:any=[];
  eliminarSeleccionRespuesta(res: any) {
    console.log("del", res);
    this.respuestasEliminadas.push(res);
    this.preguntaSelect.repuestas = this.preguntaSelect.repuestas.filter((re: any) => !(re.id_respuesta == res.id_respuesta && re.id_pregunta == res.id_pregunta));
    this.listaRespuestas.push(this.listaRespuestasAux.search((re: any) => re.Id == res.id_respuesta));
  }
  eliminarSeleccionRespuestaNuevas(res: any){
    this.nuevasRespuestas = this.nuevasRespuestas.filter((re: any) => re.id_respuesta != res.id_respuesta);
    this.listaRespuestas.push(this.listaRespuestasAux.search((re: any) => re.Id == res.id_respuesta));
  }
  guardarNewPosibleRespuesta() {
    var nombre = (<HTMLInputElement>document.getElementById('txtNombreNewPosibleRespuesta')).value;
    this.frmSer.GuardarNewPosibleRespuesta(nombre).subscribe(
      res => {
        console.log(res);
        this.cargarREspuestas();
        (<HTMLInputElement>document.getElementById('txtNombreNewPosibleRespuesta')).value = '';
        $('#ModalPosibleRespuesta').modal('hide');
      },
      err => {
        console.log(err);
      }
    );
  }

  guardarPregunta() {
    if (this.validarPregunta()) {
      this.preguntaSelect.Id_seccion = this.seccionSelec.Id;
      console.log("selll", this.preguntaSelect);
      this.frmSer.GuardarPreguntaCRUD(this.preguntaSelect).subscribe(res => {
        if (res.estado) {
          console.log(res);
          this.guardarRespuestas(res.res.Id);
        } else {
          console.log(res);
        }
      },
        err => {
          console.log(err);
        });
    }
  }
  guardarRespuestas(Id: string) {
    for (let index = 0; index < this.preguntaSelect.repuestas.length; index++) {
      var element = this.preguntaSelect.repuestas[index];
      element.id_pregunta = Id;
      console.log("element", element);
      this.frmSer.GuardarRespuestaCRUD(element).subscribe(res => {
        console.log(res);
      },
        err => {
          console.log(err);
        });
    }
    this.mostrarTablaPreguntasId(this.seccionSelec.Id);
    $('#ModalPregunta').modal('hide');
  }

  validarPregunta() {
    if (this.preguntaSelect.NORMA.length == 0) {
      this.alertBAD('Ingrese numero de Norma');
      return false;
    }
    if (this.preguntaSelect.nombre.length == 0) {
      this.alertBAD('Ingrese numero de Norma');
      return false;
    }

    if (this.preguntaSelect.tipo == 'MULTIPLE') {
      if (this.preguntaSelect.repuestas.length == 0) {
        this.alertBAD('Seleccione minimo una respuesta');
        return false;
      }
    }
    if (this.preguntaSelect.tipo == 'MAXMIN') {
      if (this.preguntaSelect.repuestas.length != 2) {
        this.alertBAD('Seleccione las respuestas max y min con sus respectivos valores');
        return false;
      }
    }




    return true;
  }
  ActualizarPregunta() {
    console.log("pre sel",this.preguntaSelect);
    console.log("nuevas",this.nuevasRespuestas);
    console.log("eliminadas",this.respuestasEliminadas);
    if (this.validarPreguntaAct()) {
      this.preguntaSelect.Id_seccion = this.seccionSelec.Id;
      
      this.frmSer.actualizarPreguntaCRUD(this.preguntaSelect).subscribe(res => {
        console.log(res);
        if (res.estado) {
          
          this.eliminarRespuesas();
          this.guardarRespuestasNew(this.preguntaSelect.Id);
        } else {
          console.log(res);
        }
      },
        err => {
          console.log(err);
        });
    }

  }
  eliminarRespuesas(){
    for (let index = 0; index < this.respuestasEliminadas.length; index++) {
      var element =  this.respuestasEliminadas[index];
      console.log("eliminarrrr",element);
      this.frmSer.eliminarRespuestaCRUD(element).subscribe(res => {
        console.log(res);
      },
        err => {
          console.log(err);
        });
    }
  }
  guardarRespuestasNew(Id:string) {
    for (let index = 0; index < this.nuevasRespuestas.length; index++) {
      var element = this.nuevasRespuestas[index];
      element.id_pregunta = Id;
      console.log("element", element);
      this.frmSer.GuardarRespuestaCRUD(element).subscribe(res => {
        console.log(res);
      },
        err => {
          console.log(err);
        });
    }
    //this.mostrarTablaPreguntasId(this.seccionSelec.Id);
    $('#ModalPregunta').modal('hide');
  }

  validarPreguntaAct() {
    if (this.preguntaSelect.NORMA.length == 0) {
      this.alertBAD('Ingrese numero de Norma');
      return false;
    }
    if (this.preguntaSelect.nombre.length == 0) {
      this.alertBAD('Ingrese numero de Norma');
      return false;
    }

    if (this.preguntaSelect.tipo == 'MULTIPLE') {
      if ((this.preguntaSelect.repuestas.length+this.nuevasRespuestas.length) == 0) {
        this.alertBAD('Seleccione minimo una respuesta');
        return false;
      }
    }
    if (this.preguntaSelect.tipo == 'MAXMIN') {
      if ((this.preguntaSelect.repuestas.length+this.nuevasRespuestas.length) != 2) {
        this.alertBAD('Seleccione las respuestas max y min con sus respectivos valores');
        return false;
      }
    }




    return true;
  }







  pruebaPo() {
    this.frmSer.prueba().subscribe(res => {
      console.log("res,", res);

    }, err => {
      console.log("res,", err)
    });
  }

}
