<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

$elements = [];
$id = 1;

function getDirectories($path, $elememts, $id)
{

    foreach (new DirectoryIterator($path) as $file) {
        if ($file->isDir() && !$file->isDot()) {
            $foldername = $file->getFilename();
            array_push($elements, ["id" => $id, "name" => $foldername, "children" => []]);
            $elememts = getDirectories($path . "/" . $file->getFilename(), $elememts, $id);
        }
        if ($file->isFile()) {
            $filename = $file->getFilename();
            array_push($elements[$id]["children"], ["id" => $id++, "name" => $filename]);
        }
        $id = $id + 1;
    }

    return $elememts;
}

$elements = getDirectories("content/", $elements, $id);

echo (json_decode($elements));
