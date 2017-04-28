<?php 
$url = "http://129.228.170.50/oriondata.xml";
$xml = simplexml_load_file($url);
echo $xml->asXML();