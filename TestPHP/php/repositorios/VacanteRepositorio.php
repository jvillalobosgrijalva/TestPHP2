<?php

use php\clases\Api;
use php\clases\Resultado;

error_reporting(E_ALL);
ini_set('display_errors', 1);


//include '../clases/JsonMapper.php';
include '../clases/Utilidades.php';
include '../clases/Resultado.php';
include '../clases/Api.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Content-Type: text/html;charset=utf-8');

$resultado = new Resultado();

try {
    
    $accion = REQUEST('accion');
    $api = new Api();
    switch ($accion)
    {
        
        case 'consultar':
            
            $resultado = $api->getValoresApiXml();
            break;
            default:
                $resultado->valor = "Acción no implementada";
            break;
    }
    
}catch (Exception $e){
    echo $e->getMessage(), '\n';
}
finally {
    if($resultado!=null){
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
//         echo $resultado;
    }
}
