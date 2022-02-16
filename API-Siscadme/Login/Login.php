<?php
ob_start();
include("../jwt.php");
include("../coneccion.php");
$dbConn =  connect($db);
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
   
    try {
        //$input = $_POST;
            
            $decri= decrypt($_GET['txt']);
            
            
            //$obj= json_decode($decri, false);
            $obj= json_decode($decri, false);
            echo $obj->password;
            /*
            $archivo = __DIR__ . "/sgp.ini";
            $contenido = parse_ini_file($archivo, false);
            $hash= $contenido['HASH_SGP'];
            
            
            $clave = md5( $hash. $obj->password );
            $sql = $dbConn->prepare("SELECT
            du.usuario_id,
            du.usuario_nombre,
            du.password as usuario_password,
            du.usuario_nc,
            du.usuario_nombre as usuario_identificacion,
            du.usuario_intentos,
            map.idZona,
            map.secciones
        FROM
            data_usuarios du,
            maeporteador map
        WHERE
            du.usuario_bloqueado = 1 
            AND du.usuario_estado = 'desconectado' 
            AND du.usuario_nombre = :nombre 
            AND du.password=:passwor
            and du.usuario_nombre=map.idPorteador
            ");

            // map.idPorteador as usuario_id,
            $sql->bindValue(':nombre', $obj->nombre);
            $sql->bindValue(':passwor',$clave );
            $sql->execute();
	    	$sql->setFetchMode(PDO::FETCH_ASSOC);
            $arr = $sql->fetchAll(PDO::FETCH_ASSOC);
            $user='';
            $jwt='';
            $estado=false;
            if(count($arr)>0){
                $estado=true;
                $time = time();
                $dat= date("Y-m-d H:i:s", $time);
               $user=$arr[0];
               $jwt=jwtCreate($user['usuario_identificacion'],$dat);
               $arr[0]['token']=$jwt;
               actualizarDB($dbConn,$obj->intentos,$user['usuario_identificacion'],$dat);
            }
            //$jwt=jwtCreate($input['usuario'],$input['contraseña']);
            //$hed=apache_request_headers();

            $res= array( 'estado' => $estado,'user'=>encrypt($arr,false));

            header("HTTP/1.1 200 OK");
           // echo json_encode($arr[0]); 
            //echo json_encode($sql->fetchAll());     
            echo json_encode($res); 
        
       */
        
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    try {
            $input = (array) json_decode(file_get_contents('php://input'), TRUE);
            $user= $input['user'];
            $pass = md5( $input['pass'] );
            $sql = $dbConn->prepare(
        "SELECT * FROM usuarios WHERE email=:email and password=:passwor
             
           
            ");
           
         
        $sql->bindValue(':email', $user);
            $sql->bindValue(':passwor',$pass );
            $sql->execute();
	    	$sql->setFetchMode(PDO::FETCH_ASSOC);
            $arr = $sql->fetchAll(PDO::FETCH_ASSOC);
            $user='';
            $jwt='';
            $mensaje='OK';
            $estado=false;
            if(count($arr)>0){
                $user=$arr[0];
               /* if($user['usuario_bloqueado']!='1'){                    
                    $mensaje='Usuario bloqueado';
                }else if($user['usuario_estado']!='desconectado'){                    
                    $mensaje='Usuario ya a iniciado una sesion';
                }else{*/
                    $estado=true;
                    $time = time();
                    $dat= date("Y-m-d H:i:s", $time);
                    $jwt=jwtCreate($user['email'],$dat);
                    $arr[0]['token']=$jwt;
                    //actualizarDB($dbConn,$obj->intentos,$user['usuario_identificacion'],$dat);
               // }
            }else{
                $mensaje='Usuario o contraseña incorrectos';
            }
            $res= array( 'estado' => $estado,'mensaje'=>$mensaje,'user'=>$arr);
            header("HTTP/1.1 200 OK");
            echo json_encode($res); 
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }

}
function actualizarDB($dbConn,$intentos,$IdUsuario,$time){
    try {
        
   $sql = "UPDATE
        data_usuarios
    SET
        usuario_ultimoingreso=STR_TO_DATE(:ti ,GET_FORMAT(DATETIME,'ISO')),
        usuario_intentos=:intentos,
        usuario_estado='activo'
    WHERE
    usuario_nombre=:usrId";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':ti', $time);
        $statement->bindValue(':intentos', $intentos);
        $statement->bindValue(':usrId', $IdUsuario);
              
        // bindAllValues($statement, $input,-1);
        $statement->execute();
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    
    try {
        $token='';
        $hed=apache_request_headers();
        $auth=false;
        $info='';
        if(array_key_exists('token', $hed)){
            $token=$hed['token'];
            $info= (array) json_decode(getInfo($token), TRUE);
            $auth=jwtVali($token);
            if($auth){
               $auth= validacionTokenFecha($dbConn,$info['usuario'],$info['date']);
            } 
            
        }
        if($auth){
          
           //$input = $_POST;
            $sql = "UPDATE
                data_usuarios
                SET
                  usuario_estado='desconectado'
                WHERE
                  usuario_nombre=:usrId";
                $statement = $dbConn->prepare($sql);
                $statement->bindValue(':usrId', $info['usuario']);
              
            // bindAllValues($statement, $input,-1);
            $statement->execute();
            header("HTTP/1.1 200 OK");
            $res= array( 'estado' => true, 'mensaje' =>'Sesion Terminada');
        }else{
            header("HTTP/1.1 200 OK");
            $res= array( 'estado' => false, 'mensaje' =>'No autorizado');
        }
        
        
        echo json_encode($res);
        
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }

}
function validacionTokenFecha($dbConn,$usrId,$fecha){
    $sql = $dbConn->prepare("SELECT
            usuario_ultimoingreso
            
        FROM
            data_usuarios 
        WHERE
            
            usuario_nombre = :id 
            
            ");

            // map.idPorteador as usuario_id,
            $sql->bindValue(':id', $usrId);
            
            $sql->execute();
	    	$sql->setFetchMode(PDO::FETCH_ASSOC);
            $arr = $sql->fetchAll(PDO::FETCH_ASSOC);
            if(count($arr)>0){
               
               //echo  json_encode($arr); ;
               if($arr[0]['usuario_ultimoingreso']==$fecha){
                return true;
               }else{
                   return false;
               }
              
            }else{
                return false;
            }
}
include("../Template/rules.php");

?>