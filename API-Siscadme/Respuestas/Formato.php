<?php
include("../Template/head.php");


//&& $auth
if ($_SERVER['REQUEST_METHOD'] == 'GET' ) {
    try {
       
        
        if (isset($_GET['id']))
        {
            
            $sql = $dbConn->prepare("
                SELECT
                    so.*,
                    fo.Id as IdFormato,
                    fo.nombre
                FROM
                    solicitud so,
                    formato fo,
                    solicitud_formatos sf
                 WHERE
                    so.Id = sf.IdSolicitud 
                    AND sf.IdFormato = fo.Id
                    AND so.IDTecnico=".$_GET['id']." 		
           ");
            
            
            $sql->execute();
              
	        $sql->setFetchMode(PDO::FETCH_OBJ);
            header("HTTP/1.1 200 OK");

            $secciones=$sql->fetchAll();
            
            
            $res['estado']=true;
            $res['res']=$secciones ;
        }else{
            $sql = $dbConn->prepare("
            SELECT * FROM solicitud 		
           ");
           
            $sql->execute();
	        $sql->setFetchMode(PDO::FETCH_OBJ);
            header("HTTP/1.1 200 OK");

            $secciones=$sql->fetchAll();

            
            $res['estado']=true;
            $res['res']=$secciones ;
        }
            
            
        echo json_encode($res);
           
     		
 		
	
				
        
    } catch (Exception $e) {
        $res['estado']=false;
        $res['mensaje']=$e->getMessage();
        echo json_encode($res);
    }
    
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  

    try {
         //$input = $_POST;
         $input = (array) json_decode(file_get_contents('php://input'), TRUE);
         
         $sql = "INSERT INTO `fotos_solicitud`( `IdSolFor`, `img`, `Idfoto`)
         VALUES";

        $arr=$input['lis'];
        for($i=0;$i<count($arr);$i++){
            $opt=$input['lis'][$i];
            $res['opt']=$opt;
            $sql=$sql."(
            
                '".$opt['IdSolFor']."',
                '".$opt['img']."',
                '".$opt['IdFoto']."'
                
            )";
            if($i<(count($input['lis'])-1)){
                $sql=$sql.",";
            }
        }
/*
{IdFoto:idFoto,
    Nombre:NombreFot,
    img:webcamImage.imageAsDataUrl,
    IdSolFor:this.dataSolicitud.IdSolFor}
*/
         $statement = $dbConn->prepare($sql);
         
         $res['res']=$statement;
         $res['res']=$statement->execute();
         
         
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
         `solicitud_formatos`
     SET
         
         `Estado` = '1'
     
      WHERE
         `Id`='".$input['Id']."'
            ";

         $statement = $dbConn->prepare($sql);
        
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