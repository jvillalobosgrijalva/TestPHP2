<?php
namespace php\clases;
use ErrorException;
use php\modelos\Job;


libxml_use_internal_errors(TRUE);
include "../modelos/Job.php";
class Api
{
        
    public function __construct()
    {
        $this->url = "https://people-pro.com/xml-feed/indeed";
    }
    
       
    public function getValoresApiXml()
    {       
        $resultado = new Resultado();
        $ch = null;
        $trabajos = array();
        try{
            /**********No carga el flujo*************/
//             $ch = curl_init();        
//             curl_setopt($ch, CURLOPT_URL, $this->url);
//             curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//             $res = curl_exec($ch);        
//             $resultado->valor = $res;

//             $data = simplexml_load_file('../fuente/indeed.xml');
//             echo $data;
/******************CARGA PERO NO RECUPERA BIEN LA INFO*****************************/            
            $objXmlDocument = simplexml_load_file("../fuente/indeed.xml");
            
            if ($objXmlDocument === FALSE) {
                echo "There were errors parsing the XML file.\n";
                foreach(libxml_get_errors() as $error) {
                    echo $error->message;
                }
                exit;
            }            
//             $objJsonDocument = json_encode($objXmlDocument);
//             $arrOutput = json_decode($objJsonDocument, true);
//             $resultado->valor = $arrOutput;
//             $mapper = new JsonMapper();
            $index = 0;
            foreach ($objXmlDocument->job as $job)
            {
                $trabajo[$index] = new Job();
                $trabajo[$index]->titulo =(string)$job->title;
                $trabajo[$index]->fecha =(string)$job->date;
                $trabajo[$index]->empresa =(string)$job->company;
                $trabajo[$index]->ciudad =(string)$job->city;
                $trabajo[$index]->pais =(string)$job->country;
                $trabajo[$index]->descripcion =(string)$job->description;
//                 $trabajo = [];
//                 $trabajo2 = (object) [
//                 'titulo'=> $job->title,
//                 'fecha'=> $job->date,
//                 'compania'=> $job->company,
//                 'ciudad'=> $job->city,
//                 'pais'=> $job->country,
//                 'descripcion'=> $job->description
//                 ];
                array_push($trabajos,$trabajo[$index]);
//                 echo "<pre>";
//                 print_r($trabajo[$index]);  
            }
            $resultado->valor = $trabajos;
//                 echo "<pre>";
//                 echo $objXmlDocument->job[0]->title;
//                 echo "<pre>";
//                 echo $objXmlDocument->job[0]->title[0];
//             echo $objXmlDocument->job[0]->date[0];
//             echo $objXmlDocument->job[0]->company[0];
//             echo $objXmlDocument->job[0]->city[0];            
//             echo $objXmlDocument->job[0]->country[0];
//             echo $objXmlDocument->job[0]->description[0];
//             echo "<pre>";
//             print_r($arrOutput);            
            
//             $xml = simplexml_load_file("../fuente/indeed.xml");
            
//             if ($xml === FALSE) {
//                 echo "There were errors parsing the XML file.\n";
//                 foreach(libxml_get_errors() as $error) {
//                     echo $error->message;
//                 }
//                 exit;
//             }
//             $elementos = $xml->xpath('/source/job');
//             print_r( $elementos );
            
        }
        catch(ErrorException $e){
            echo $e->getMessage();
            $resultado->mensajeError = $e->getMessage();
            if($ch!=null)
                curl_close($ch);
        }
        finally{
            if($ch!=null)
                curl_close($ch);
            
        }
        return $resultado;
    }
    
    function json_prepare_xml($xml_object)
    {
        
        foreach($xml_object->childNodes as $xml_val)
        {
            if($xml_val->hasChildNodes())
            {
                json_prepare_xml($xml_val);
            } else
            {
                if($xml_object->hasAttributes() && strlen($xml_object->nodeValue)){
                    $xml_object->setAttribute("nodeValue", $xml_val->textContent);
                    $xml_val->nodeValue = "";
                }
            }
        }
    }
}





    