<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');


function scanDirectory($dir, &$id = 1, $basePath = '')
{
    $result = array();
    $cdir = scandir($dir);
    $currentPath = $basePath . ($basePath ? DIRECTORY_SEPARATOR : '') . basename($dir);

    foreach ($cdir as $key => $value) {
        if (!in_array($value, array('.', '..'))) {
            $fullPath = $currentPath . DIRECTORY_SEPARATOR . $value;
            if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) {
                $result[] = array(
                    'id' => strval($id++),
                    'name' => $value,
                    'children' => scanDirectory($dir . DIRECTORY_SEPARATOR . $value, $id, $currentPath)
                );
            } else {
                $result[] = array(
                    'id' => strval($id++),
                    'name' => $value,
                    'fullPath' => $fullPath
                );
            }
        }
    }

    return $result;
}

$directoryPath = 'content/';
$directoryArray = scanDirectory($directoryPath);
echo json_encode($directoryArray, JSON_PRETTY_PRINT);
