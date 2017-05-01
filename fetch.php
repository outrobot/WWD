<?php 
// Development server IP
//$url = "http://129.228.170.50/oriondata.xml";

// Production micro server IP
$url = "http://10.113.41.248/latestsampledata.xml";
$xml = simplexml_load_file($url);
echo $xml->asXML();
