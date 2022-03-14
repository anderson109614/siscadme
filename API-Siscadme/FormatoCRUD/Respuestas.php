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
        
            $sql = $dbConn->prepare("
            SELECT * FROM `posibles_respuestas`			
           ");
           
            $sql->execute();
	        $sql->setFetchMode(PDO::FETCH_OBJ);
            header("HTTP/1.1 200 OK");

            $secciones=$sql->fetchAll();

            
            $res['estado']=true;
            $res['res']=$secciones ;
            
        
           
     		
 		
	
				
        
    } catch (Exception $e) {
        $res['estado']=false;
        $res['mensaje']=$e->getMessage();
        
    }
    echo json_encode($res);
}


function getPreguntas($idSeccion,$db){
    

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
        $respuestas=getRespuestas($arr[$i]['Id'],$db);
        $arr[$i]['repuestas']=$respuestas;
    }
    return $arr;
}
function getRespuestas($idPregunta,$db){
    

    //obtengo todos los pedidos del porteador requerido
    $strSql="SELECT * from preguta_resp pr,posibles_respuestas por WHERE pr.id_respuesta=por.id and pr.id_pregunta=".$idPregunta;
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
        $sql = "INSERT INTO `preguta_resp`(
            `id_pregunta`,
            `id_respuesta`,
            `valor`,
            `Estado`
        )
        VALUES(
            :id_pregunta,
            :id_respuesta,
            :valor,
            '1'
        )";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':id_pregunta', $input['id_pregunta']);
        $statement->bindValue(':id_respuesta', $input['id_respuesta']);
        $statement->bindValue(':valor', $input['valor']);
              
        // bindAllValues($statement, $input,-1);
        $statement->execute();
        /*
        $postId = $dbConn->lastInsertId();
        if ($postId) {
            $input['Id'] = $postId;
            
        }*/
        header("HTTP/1.1 200 OK");
       
        $res['estado']=true;
       // $res['res']=$input ;
        echo json_encode($res);
        
    } catch (Exception $e) {
        $res['estado']=false;
        $res['mensaje']=$e->getMessage();
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