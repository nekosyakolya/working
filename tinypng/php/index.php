<?php
    require_once("../tinify-php-master/vendor/autoload.php");
    \Tinify\setKey(API_KEY);
    
    $fileElementName = "fileToUpload";
    

    if (isset($_FILES[$fileElementName]))
    {
        $originFileName = $_FILES[$fileElementName]['name'];
        $tmpFileName = $_FILES[$fileElementName]['tmp_name'];
        $name = FILE_PATH_UNOPTIMIZED . $originFileName;
        move_uploaded_file($tmpFileName, $name);
        $sizeImg = filesize($name);
        $oldSize = round($sizeImg / 1024, 1);
        $source = \Tinify\fromFile($name);
        $source->toFile(FILE_PATH_OPTIMIZED . "optimized.jpg");
        $newSize = round(filesize(FILE_PATH_OPTIMIZED . "optimized.jpg") / 1024, 1);
    }
    echo '{"oldImg" : "'. $originFileName .'", "oldSize" : "'. $oldSize .'", "newImg" : "optimized.jpg", "newSize" : "'. $newSize .'"}';
 