<?php
namespace php\clases;

class Configuracion
{
    public $url = "";

    static public function getConfiguracion()
    {
        $fp = fopen("../configuracion.properties", "r");
        while (!feof($fp)){
            $linea = fgets($fp);
            list($Dato, $Valor) = explode("=", $linea);
            switch ($Dato) {
                case "urlApi":
                    $this->url = $Valor;
                break;
            }
        }
        fclose($fp);
    }
    
}

