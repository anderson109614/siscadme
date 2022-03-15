<?php
include("../Template/head.php");
/*
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);
&& $auth
*/

if ($_SERVER['REQUEST_METHOD'] == 'GET' ) {
    try {
        if (isset($_GET['id']))
        {
            /*
            $sql = $dbConn->prepare("
           SELECT *,'' as preguntas FROM `seccion_formato` WHERE `id_formato`=".$_GET['id']);
           
            $sql->execute();
	        $sql->setFetchMode(PDO::FETCH_OBJ);
            header("HTTP/1.1 200 OK");

            $secciones=$sql->fetchAll();

           */
            $preguntas=getPreguntas($_GET['id'],$dbConn);
                
            
            $res['estado']=true;
            $res['res']=$preguntas;
            
        }else{
            $res['estado']=false;
            $res['mensaje']='No id';
        }
           
     		
 		
	
				
        
    } catch (Exception $e) {
        $res['estado']=false;
        $res['mensaje']=$e->getMessage();
        
    }
    echo json_encode($res);
}


function getPreguntas($idSeccion,$db){
    

    //obtengo todos los pedidos del porteador requerido
    $strSql="SELECT * FROM preguntas where Estado='1' and Id_seccion=".$idSeccion;
    //echo $strSql ORDER BY M.codigo;
    $stmt = $db->prepare($strSql);
    //$sql->bindValue(':est', 'PQ');//codpaquete
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_OBJ);
    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
    for($i=0;$i<count($arr);$i++){
                
        //$secciones[$i]['preguntas']=getPreguntas($secciones[$i]['Id'],$dbConn);
        $respuestas=getRespuestas($arr[$i]['Id'],$db);
        $arr[$i]['repuestas']=$respuestas;
    }
    return $arr;
}
function getRespuestas($idPregunta,$db){
    

    //obtengo todos los pedidos del porteador requerido
    $strSql="SELECT * from preguta_resp pr,posibles_respuestas por WHERE pr.id_respuesta=por.id AND pr.Estado='1' and pr.id_pregunta=".$idPregunta;
    //echo $strSql ORDER BY M.codigo;
    $stmt = $db->prepare($strSql);
    //$sql->bindValue(':est', 'PQ');//codpaquete
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_OBJ);
    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $arr;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        //$input = $_POST;
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $sql = "INSERT INTO `preguntas`(    
            `nombre`,
            `descripcion`,
            `tipo`,
            `Id_seccion`,
            `NORMA`,
            `Estado`
        )
        VALUES(
            :nombre,
            :descripcion,
            :tipo,
            :Id_seccion,
            :NORMA,
            '1'
        )";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':nombre', $input['nombre']);
        $statement->bindValue(':descripcion', $input['descripcion']);
        $statement->bindValue(':tipo', $input['tipo']);
        $statement->bindValue(':Id_seccion', $input['Id_seccion']);
        $statement->bindValue(':NORMA', $input['NORMA']);
              
        // bindAllValues($statement, $input,-1);
        $statement->execute();
        
        $postId = $dbConn->lastInsertId();
        if ($postId) {
            $input['Id'] = $postId;
            
        }
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

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    try {
        //$input = $_POST;
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $sql = "UPDATE
        `preguntas`
    SET
        
        `nombre` = :nombre,
        `descripcion` = :descripcion ,
        `tipo` =:tipo,
        `Id_seccion` = :Id_seccion,
        `NORMA` = :NORMA
    WHERE
        `Id`=:Id";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':nombre', $input['nombre']);
        $statement->bindValue(':descripcion', $input['descripcion']);
        $statement->bindValue(':tipo', $input['tipo']);
        $statement->bindValue(':Id_seccion', $input['Id_seccion']);
        $statement->bindValue(':NORMA', $input['NORMA']);
        $statement->bindValue(':Id', $input['Id']);  
        // bindAllValues($statement, $input,-1);
        $statement->execute();
        
        
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

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    /*
    try {
        $idpre = $_GET['idPrestamo'];
        $idhor = $_GET['idHorarios'];
        $statement = $dbConn->prepare("DELETE FROM prestamos_laboratorios_horarios WHERE id_prestamo=:idPrestamo AND id_horario=:idHorario");
        $statement->bindValue(':idPrestamo', $idpre);
        $statement->bindValue(':idHorario', $idhor);
        $statement->execute();
        $object3 = (object) [
            'id' => $idpre,
            'msj' => 'OK'
                        
          ];
        header("HTTP/1.1 200 OK");
        echo json_encode($object3);
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    */
}
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
ob_end_flush();
?>