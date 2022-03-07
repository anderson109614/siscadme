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
            
            $sql = $dbConn->prepare("
            SELECT
            sec.*,
            '0' as num
        FROM
            seccion_formato sec
        WHERE
            sec.Estado='1'
            and sec.id_formato=".$_GET['id']);
           
            $sql->execute();
	        $sql->setFetchMode(PDO::FETCH_OBJ);
            $secciones=$sql->fetchAll(PDO::FETCH_ASSOC);
            $cantidades=getConut($dbConn,$_GET['id']);
            for($i=0;$i<count($secciones);$i++){
                for($j=0;$j<count($cantidades);$j++){
                    if($secciones[$i]['Id']==$cantidades[$j]['Id']){
                        $secciones[$i]['num']=$cantidades[$j]['num'];
                    }
                  
                     
                }
               
            }
            header("HTTP/1.1 200 OK");

            

            
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
}


function getConut($db,$id){
    

    //obtengo todos los pedidos del porteador requerido
    $strSql=" SELECT
    sec.*,
    COUNT(sec.Id) as num
FROM
    seccion_formato sec,
    preguntas pre
WHERE
    sec.Id = pre.Id_seccion AND id_formato = ".$id."
    and sec.Estado='1'
GROUP BY sec.Id";
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
        $sql = "INSERT INTO `seccion_formato`(
            `nombre`,
           `descripcion`,
           `id_formato`,
           `Estado`
       )
       VALUES(
        :nombre,
        :descripcion,
        :id_formato,
        '1')";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':nombre', $input['nombre']);
        $statement->bindValue(':descripcion', $input['descripcion']);
        $statement->bindValue(':id_formato', $input['id_formato']);
              
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
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    
    try {
        //$input = $_POST;
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $sql = "UPDATE
        `seccion_formato`
    SET
        
        `nombre` =:nombre ,
        `descripcion` =:descripcion ,
        `id_formato` =:id_formato 
    WHERE
        `Id`=:Id";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':nombre', $input['nombre']);
        $statement->bindValue(':descripcion', $input['descripcion']);
        $statement->bindValue(':id_formato', $input['id_formato']);
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
    }
   
}
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
ob_end_flush();
?>