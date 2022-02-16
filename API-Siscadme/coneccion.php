<?php

$db = [
    'host' => 'localhost',
    'username' => 'root',
    'password' => '',
    'db' => 'db_siscadme' 
];
  //Abrir conexion a la base de datos
  function connect($db)
  {
      try {
          $conn = new PDO("mysql:host={$db['host']};dbname={$db['db']};charset=UTF8", $db['username'], $db['password']);
          // set the PDO error mode to exception
          $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          return $conn;
      } catch (PDOException $exception) {
          exit($exception->getMessage());
      }
  }
 //Obtener parametros para updates
 function getParams($input)
 {
    $filterParams = [];
    foreach($input as $param => $value)
    {
            $filterParams[] = "$param=:$param";
    }
    return implode(", ", $filterParams);
  }
  //Asociar todos los parametros a un sql
  function bindAllValues($statement, $params,$total)
  {
    $con=0;
    foreach($params as $param => $value)
    {
        if($con!=$total){
            if($value=='null'){
                $statement->bindValue(':'.$param, null);
            }else{
                $statement->bindValue(':'.$param, $value);
            }
        }
        $con=$con+1;
        
    }
    return $statement;
   }
   function bindAllValues2($statement, $params,$total,$total2)
  {
    $con=0;
    foreach($params as $param => $value)
    {
        if($con!=$total && $con != $total2){
            if($value=='null'){
                $statement->bindValue(':'.$param, null);
            }else{
                $statement->bindValue(':'.$param, $value);
            }
        }
        $con=$con+1;
        
    }
    return $statement;
   }
?>