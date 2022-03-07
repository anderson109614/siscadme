<?php
include("../Template/head.php");


//&& $auth
if ($_SERVER['REQUEST_METHOD'] == 'GET' ) {
    try {
        if (isset($_GET['id']))
        {
            $sql = $dbConn->prepare("
           SELECT *,'' as preguntas FROM `seccion_formato` WHERE `id_formato`=".$_GET['id']);
           
            $sql->execute();
	        $sql->setFetchMode(PDO::FETCH_OBJ);
            header("HTTP/1.1 200 OK");

            $secciones=$sql->fetchAll();

            for($i=0;$i<count($secciones);$i++){
                
                //$secciones[$i]['preguntas']=getPreguntas($secciones[$i]['Id'],$dbConn);
                $preguntas=getPreguntas($secciones[$i]->Id,$dbConn,$_GET['idSol']);
                $secciones[$i]->preguntas=$preguntas;
            }
            $res['estado']=true;
            $res['res']=$secciones ;
            
        }else{
            $res['estado']=false;
            $res['mensaje']='No id';
        }
           
     		
 		
	
				
        
    } catch (Exception $e) {
        $res['estado']=false;
        $res['mensaje']=$e->getMessage();
        
    }
    echo json_encode($res);
}else{
    echo json_encode($res);
}


function getPreguntas($idSeccion,$db,$idSol){
    

    //obtengo todos los pedidos del porteador requerido
    $strSql="SELECT * FROM preguntas where Id_seccion=".$idSeccion;
    //echo $strSql ORDER BY M.codigo;
    $stmt = $db->prepare($strSql);
    //$sql->bindValue(':est', 'PQ');//codpaquete
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_OBJ);
    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
    for($i=0;$i<count($arr);$i++){
                
        //$secciones[$i]['preguntas']=getPreguntas($secciones[$i]['Id'],$dbConn);
        $respuestas=getRespuestas($arr[$i]['Id'],$db,$idSol);
       // echo json_encode($respuestas);
        if($respuestas!=false){
            $arr[$i]['repuesta']=$respuestas['Respuesta'];
            $arr[$i]['estado']=$respuestas['Estado'];
        }else{
            $arr[$i]['repuesta']='N/A';
            $arr[$i]['estado']='N/A';
        }
        
    }
    return $arr;
}
function getRespuestas($idPregunta,$db,$IdSolFor){
    

    //obtengo todos los pedidos del porteador requerido
    $strSql="SELECT * from respuestas WHERE `IdPregunta`=".$idPregunta." and `IdSolFor`=".$IdSolFor;
    //echo $strSql ORDER BY M.codigo;
    $stmt = $db->prepare($strSql);
    //$sql->bindValue(':est', 'PQ');//codpaquete
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_OBJ);
    $arr = $stmt->fetch(PDO::FETCH_ASSOC);

    return $arr;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  

    try {
         //$input = $_POST;
         $input = (array) json_decode(file_get_contents('php://input'), TRUE);
         
         $sql = "INSERT INTO solicitud(
            `Cedula`,
            `Nombres`,
            `Compania`,
            `Disco`,
            `Provincia`,
            `MarcaChasis`,
            `MarcaCarroceria`,
            `ModeloChasis`,
            `ModeloCarroceria`,
            `VIN_chasis`,
            `PlazasTotale`,
            `NumeroMotor`,
            `UbicacionPuertas`,
            `AnioChasis`,
            `AnioFabroicacin`,
            `AireAcondicionado`,
            `ServicioTransporte`,
            `CompartimientosEspeciales`,
            `PuertaConductor`,
            `IDTecnico`
        )
        VALUES(
            '".$input['CEDULA']."',
            '".$input['PROPIETARIO']."',
            '".$input['OPERADORA']."',
            '".$input['DISCO']."',
            '".$input['PROVINCIA_DE_MATRICULACION']."',
            '".$input['Marca']."',
            '".$input['MARCA']."',
            '".$input['Modelo_Version']."',
            '".$input['MODELO']."',
            '".$input['VIN_CHASIS']."',
            '".$input['NUMERO_DE_ASIENTOS']."',
            '".$input['SERIE_MOTOR']."',
            '".$input['TIPO_DE_SERVICIO']."',
            '".$input['ANIO_MOTOR']."',
            '".$input['ANIO_CARROCERIA']."',
            '".$input['Aire_Acondicionado']."',
            '".$input['Servicio_Transporte']."',
            '".$input['Compartimientos_especiales']."',
            '".$input['Puerta_conductor']."',
            ".$input['IDTecnico']."
            
            
        )";

         $statement = $dbConn->prepare($sql);
         //bindAllValues($statement, $input,-1);,   :IDTecnicop
       /*
         $statement->bindValue(':Cedulap', $input['CEDULA'] );
         
         $statement->bindValue(':Nombresp', $input['PROPIETARIO'] );
         $statement->bindValue(':Companiap', $input['OPERADORA'] );
         $statement->bindValue(':Discop', $input['DISCO'] );
         $statement->bindValue(':Provinciap', $input['PROVINCIA_DE_MATRICULACION'] );
         $statement->bindValue(':MarcaChasisp', $input['Marca'] );
         $statement->bindValue(':MarcaCarroceriap', $input['MARCA'] );
         $statement->bindValue(':ModeloChasisp', $input['Modelo_Version'] );
         $statement->bindValue(':ModeloCarroceriap', $input['MODELO'] );
         $statement->bindValue(':VIN_chasisp', $input['VIN_CHASIS'] );
         $statement->bindValue(':PlazasTotalep', $input['NUMERO_DE_ASIENTOS'] );
         $statement->bindValue(':NumeroMotorp', $input['SERIE_MOTOR'] );
         $statement->bindValue(':UbicacionPuertasp', $input['TIPO_DE_SERVICIO'] );
         $statement->bindValue(':AñoChasisp', $input['ANIO_MOTOR'] );
         $statement->bindValue(':AñoFabroicacinp', $input['ANIO_CARROCERIA'] );
         $statement->bindValue(':AireAcondicionadop', $input['Aire_Acondicionado'] );
         $statement->bindValue(':ServicioTransportep', $input['Servicio_Transporte'] );
         $statement->bindValue(':CompartimientosEspecialesp', $input['Compartimientos_especiales'] );
         $statement->bindValue(':PuertaConductorp', $input['Puerta_conductor'] );
         $statement->bindValue(':IDTecnicop', $input['IDTecnico'] );
         */
         $res['res']=$statement;
         $res['res']=$statement->execute();
         
         $postId = $dbConn->lastInsertId();
     
         if($postId)
         {
         $input['Id'] = $postId;
         guardarFormatos($postId,$input['Formatos'],$dbConn);
         header("HTTP/1.1 200 OK");
         $res['estado']=true;
         $res['res']=$input ;
         echo json_encode($res);
         }
    } catch (Exception $e) {
        $res['estado']=false;
        $res['mensaje']=$e->getMessage();
        echo json_encode($res);
    }
    
}
function guardarFormatos($id,$Formatos,$db){
    

   
    
    for($i=0;$i<count($Formatos);$i++){
                
         
        $strSql="INSERT INTO `solicitud_formatos`(
   
            IdSolicitud,
            IdFormato,
            Estado
        )
        VALUES(
            :IdSolicitud,
            :IdFormato,
            '0'
        )";
        
        $stmt = $db->prepare($strSql);
        $stmt->bindValue(':IdSolicitud', $id );
        $stmt->bindValue(':IdFormato',  $Formatos[$i]);
        $stmt->execute();
    }
    
}
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
  

    try {
         //$input = $_POST;
         $input = (array) json_decode(file_get_contents('php://input'), TRUE);
         
         $sql = "UPDATE
         `solicitud`
     SET
          `Cedula` = '".$input['Cedula']."',
         `Nombres` ='".$input['Nombres']."',
         `Compania` ='".$input['Compania']."',
         `Disco` ='".$input['Disco']."',
         `Provincia` = '".$input['Provincia']."',
         `MarcaChasis` = '".$input['MarcaChasis']."',
         `MarcaCarroceria` ='".$input['MarcaCarroceria']."' ,
         `ModeloChasis` ='".$input['ModeloChasis']."' ,
         `ModeloCarroceria` = '".$input['ModeloCarroceria']."',
         `VIN_chasis` ='".$input['VIN_chasis']."',
         `PlazasTotale` ='".$input['PlazasTotale']."' ,
         `NumeroMotor` = '".$input['NumeroMotor']."',
         `UbicacionPuertas` ='".$input['UbicacionPuertas']."' ,
         `AnioChasis` = '".$input['AnioChasis']."',
         `AnioFabroicacin` = '".$input['AnioFabroicacin']."',
         `AireAcondicionado` = '".$input['AireAcondicionado']."',
         `ServicioTransporte` = '".$input['ServicioTransporte']."',
         `CompartimientosEspeciales` = '".$input['CompartimientosEspeciales']."',
         `PuertaConductor` = '".$input['PuertaConductor']."' 
      WHERE
         `Id`='".$input['Id']."'
            ";

         $statement = $dbConn->prepare($sql);
         //bindAllValues($statement, $input,-1);,   :IDTecnicop
       /*
         $statement->bindValue(':Cedulap', $input['CEDULA'] );
         
         $statement->bindValue(':Nombresp', $input['PROPIETARIO'] );
         $statement->bindValue(':Companiap', $input['OPERADORA'] );
         $statement->bindValue(':Discop', $input['DISCO'] );
         $statement->bindValue(':Provinciap', $input['PROVINCIA_DE_MATRICULACION'] );
         $statement->bindValue(':MarcaChasisp', $input['Marca'] );
         $statement->bindValue(':MarcaCarroceriap', $input['MARCA'] );
         $statement->bindValue(':ModeloChasisp', $input['Modelo_Version'] );
         $statement->bindValue(':ModeloCarroceriap', $input['MODELO'] );
         $statement->bindValue(':VIN_chasisp', $input['VIN_CHASIS'] );
         $statement->bindValue(':PlazasTotalep', $input['NUMERO_DE_ASIENTOS'] );
         $statement->bindValue(':NumeroMotorp', $input['SERIE_MOTOR'] );
         $statement->bindValue(':UbicacionPuertasp', $input['TIPO_DE_SERVICIO'] );
         $statement->bindValue(':AñoChasisp', $input['ANIO_MOTOR'] );
         $statement->bindValue(':AñoFabroicacinp', $input['ANIO_CARROCERIA'] );
         $statement->bindValue(':AireAcondicionadop', $input['Aire_Acondicionado'] );
         $statement->bindValue(':ServicioTransportep', $input['Servicio_Transporte'] );
         $statement->bindValue(':CompartimientosEspecialesp', $input['Compartimientos_especiales'] );
         $statement->bindValue(':PuertaConductorp', $input['Puerta_conductor'] );
         $statement->bindValue(':IDTecnicop', $input['IDTecnico'] );
         */
         $res['res']=$statement;
         $res['res']=$statement->execute();
         
        // $postId = $dbConn->lastInsertId();
     
         
         header("HTTP/1.1 200 OK");
         $res['estado']=true;
         $res['res']=$input ;
         echo json_encode($res);
         
    } catch (Exception $e) {
        $res['estado']=false;
        $res['mensaje']=$e->getMessage();
        echo json_encode($res);
    }
    
}
include("../Template/rules.php");

?>