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
            SELECT
            form.*,
            '0' AS num
        FROM
            formato form
            WHERE   form.Estado=1
        GROUP BY
            form.Id			
           ");
           
            $sql->execute();
	        $sql->setFetchMode(PDO::FETCH_ASSOC);

            $formatos=$sql->fetchAll();
            $cantidades=getConut($dbConn);
            for($i=0;$i<count($formatos);$i++){
                for($j=0;$j<count($cantidades);$j++){
                    if($formatos[$i]['Id']==$cantidades[$j]['Id']){
                        $formatos[$i]['num']=$cantidades[$j]['num'];
                    }
                  
                     
                }
               
            }
            header("HTTP/1.1 200 OK");

            

            
            $res['estado']=true;
            $res['res']=$formatos ;
            
        
           
     		
 		
	
				
        
    } catch (Exception $e) {
        $res['estado']=false;
        $res['mensaje']=$e->getMessage();
        
    }
    echo json_encode($res);
}


function getConut($db){
    

    //obtengo todos los pedidos del porteador requerido
    $strSql="SELECT
    form.*,
    COUNT(sec.Id) as num
     
 FROM
     formato form,
     seccion_formato sec
 WHERE
     form.Id = sec.id_formato
     and form.Estado=1
  GROUP BY form.Id	";
    //echo $strSql ORDER BY M.codigo;
    $stmt = $db->prepare($strSql);
    //$sql->bindValue(':est', 'PQ');//codpaquete
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_OBJ);
    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
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
        $sql = "INSERT INTO `formato`( `nombre`, `docx`, `Estado`)
        VALUES(:nombre,:docx,'1')";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':nombre', $input['nombre']);
        $statement->bindValue(':docx', $input['docx']);
              
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
    }
}
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    
    try {
        //$input = $_POST;
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $sql = "UPDATE
        `formato`
    SET
       
        `nombre` = :nombre,
        `docx` = :docx
    WHERE
        `Id`=:id";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':nombre', $input['nombre']);
        $statement->bindValue(':docx', $input['docx']);
        $statement->bindValue(':id', $input['Id']);
              
        // bindAllValues($statement, $input,-1);
        $statement->execute();
        header("HTTP/1.1 200 OK");
       
        $res['estado']=true;
        $res['res']=$input ;
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
        echo 'Excepci??n capturada: ',  $e->getMessage(), "\n";
    }
    */
}
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
ob_end_flush();
?>