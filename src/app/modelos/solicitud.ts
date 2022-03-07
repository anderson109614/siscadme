export class Solicitud{
    CODIGO:string|''='';
    EMPRESA:string|''='';
    REPRESENTANTE:string|''='';
    RUC:string|''='';
    CIUDAD:string|''='';
    DIRECCION:string|''='';
    TELEFONO:string|''='';
    Marca:string|''='';
    Modelo_Version:string|''='';
    ANIO_MOTOR:string|''='';
    VIN_CHASIS:string|''='';
    SERIE_MOTOR:string|''='';
    MARCA:string|''='';
    MODELO:string|''='';
    ANIO_CARROCERIA:string|''='';
    OP:string|''='';
    NUMERO_DE_ASIENTOS:string|''='';
    ESTADO_DE_REVISION:string|''='';
    TIPO_DE_SERVICIO:string|''='';
    PROPIETARIO:string|''='';
    CEDULA:string|''='';
    OPERADORA:string|''='';
    DISCO:string|''='';
    PROVINCIA_DE_MATRICULACION:string|''='';
    FECHA_DE_REVISION_ESTRUCTURA:string|''='';
    Fecha_envio_estructura:string|''='';
    RESPONSABLE_ENVIO:string|''='';
    FECHA_DE_REVISION_TERMINADO:string|''='';
    Fecha_envio_terminado:string|''='';
    RESPONSABLE_REVICION:string|''='';
    ORDEN_DE_PAGO_ESTRUCTURA:string|''='';
    VALOR_A_PAGAR:string|''='';
    FACTURA_ESTRUCTURA:string|''='';
    PAGADO_ESTRUCTURA:string|''='';
    MES_DE_FACTURACION_ESTRUCTURA:string|''='';
    FORMA_DE_PAGO_ESTRUCTURA:string|''='';
    ORDEN_DE_PAGO:string|''='';
    VALOR_A_PAGAR_ESTRUCTURA:string|''='';
    FACTURA:string|''='';
    PAGADO_TERMINADO:string|''='';
    FORMA_DE_PAGO:string|''='';
    MES_DE_FACTURACION:string|''='';
    VALOR_PAGADO:string|''='';
    OBSERVACIONES:string|''='';
    DEBE_ENVIARSE_OBSERVACIONES:string|''='';
    ACCION_OBSERVACIONES:string|''='';
    DIAS_PASADOS_OBSERVACIONES:string|''='';
    DEBE_ENVIARSE:string|''='';
    ACCION:string|''='';
    DIAS_PASADOS:string|''='';
    FECHA:string|''='';
    Aire_Acondicionado:string|''='';
    Compartimientos_especiales:string|''='';
    Puerta_conductor:string|''='';
    Servicio_Transporte:string|''='';
    IDTecnico:string|''='';
    responsable_acuerdo:string|''='';
    Formatos:any=[];
    constructor(datos:any){
        if(datos===null){
            
        }else{
            this.CODIGO=datos.__EMPTY;
            this.EMPRESA=datos.__EMPTY_1;
            this.REPRESENTANTE=datos.__EMPTY_2;
            this.RUC=datos.__EMPTY_3;
            this.CIUDAD=datos.__EMPTY_4;
            this.DIRECCION=datos.__EMPTY_5;
            this.TELEFONO=datos.__EMPTY_6;
            
            this.Marca=datos.__EMPTY_7;
            this.Modelo_Version=datos.__EMPTY_8;
            this.ANIO_MOTOR=datos.__EMPTY_9;
            this.VIN_CHASIS=datos.__EMPTY_10;
            this.SERIE_MOTOR=datos.__EMPTY_11;
            this.MARCA=datos.__EMPTY_12;
            this.MODELO=datos.__EMPTY_13;
            this.ANIO_CARROCERIA=datos.__EMPTY_14;
            this.OP=datos.__EMPTY_15;
            this.NUMERO_DE_ASIENTOS=datos.__EMPTY_16;
            this.ESTADO_DE_REVISION=datos.__EMPTY_17;
            this.TIPO_DE_SERVICIO=datos.__EMPTY_18;
            this.PROPIETARIO=datos.__EMPTY_19;
            this.CEDULA=datos.__EMPTY_20;

            this.OPERADORA=datos.__EMPTY_21;
            this.DISCO=datos.__EMPTY_22;
            this.PROVINCIA_DE_MATRICULACION=datos.__EMPTY_23;
            this.FECHA_DE_REVISION_ESTRUCTURA=datos.__EMPTY_24;
            this.Fecha_envio_estructura=datos.__EMPTY_25;
            this.RESPONSABLE_ENVIO=datos.__EMPTY_26;
            this.FECHA_DE_REVISION_TERMINADO=datos.__EMPTY_27;
            this.Fecha_envio_terminado=datos.__EMPTY_28;
            this.RESPONSABLE_REVICION=datos.__EMPTY_29;
            this.ORDEN_DE_PAGO_ESTRUCTURA=datos.__EMPTY_30;

            this.VALOR_A_PAGAR=datos.__EMPTY_31;
            this.FACTURA_ESTRUCTURA=datos.__EMPTY_32;
            this.PAGADO_ESTRUCTURA=datos.__EMPTY_33;
            this.MES_DE_FACTURACION_ESTRUCTURA=datos.__EMPTY_34;

            this.FORMA_DE_PAGO_ESTRUCTURA=datos.__EMPTY_35;
            this.ORDEN_DE_PAGO=datos.__EMPTY_36;
            this.VALOR_A_PAGAR_ESTRUCTURA=datos.__EMPTY_37;
            this.FACTURA=datos.__EMPTY_38;
            this.PAGADO_TERMINADO=datos.__EMPTY_39;
            this.FORMA_DE_PAGO=datos.__EMPTY_40;
            this.MES_DE_FACTURACION=datos.__EMPTY_41;

            this.VALOR_PAGADO=datos.__EMPTY_42;
            this.OBSERVACIONES=datos.__EMPTY_43;
            this.DEBE_ENVIARSE_OBSERVACIONES=datos.__EMPTY_44;
            this.ACCION_OBSERVACIONES=datos.__EMPTY_45;
            this.DIAS_PASADOS_OBSERVACIONES=datos.__EMPTY_46;
            this.DEBE_ENVIARSE=datos.__EMPTY_47;
            this.ACCION=datos.__EMPTY_48;
            
            this.DIAS_PASADOS=datos.__EMPTY_49;
            this.FECHA=datos.__EMPTY_50;
        }
        
    }
   
    

}