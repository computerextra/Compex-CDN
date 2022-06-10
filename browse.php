<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Computer Extra CDN</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
<?php
    require_once("./inc/cats.inc.php");
    include_once("./inc/menu.inc.php");
?>
<?php
    $cats = GetCats();
    echo "<ul>";
    foreach($cats as $cat){
        echo "<li>".$cat."</li>";
    }
    echo "</ul>";
?>
<?php
include_once("./inc/footer.inc.php");
?>
</body>
</html>

