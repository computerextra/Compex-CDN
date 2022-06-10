<?php
function GetCats(){
    $verzeichnis = "./content/";
    $categorien = [];
    if($handle = opendir($verzeichnis)){
        while (($dir = readdir($handle)) !== false){
            array_push($categorien, $dir);
        }
    }
    return $categorien;
}
?>