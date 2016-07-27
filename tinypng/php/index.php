<?php
    require_once("../tinify-php-master/vendor/autoload.php");
    \Tinify\setKey(API_KEY);
    
    $fileElementName = "fileToUpload";
    

    if (isset($_FILES[$fileElementName]))
    {
        $tmpFileName = $_FILES[$fileElementName]['tmp_name'];
        $sizeImg = filesize($tmpFileName);
        $oldSize = round($sizeImg / 1024, 1);
        $newImg = DIR_ . FILE_PATH_OPTIMIZED . $_FILES[$fileElementName]['name'];
        $source = \Tinify\fromFile($tmpFileName);
        $source->toFile($newImg);
        $newSize = round(filesize($newImg) / 1024, 1);
        $newPuth = FILE_PATH_OPTIMIZED . $_FILES[$fileElementName]['name'];
        list($imgWidth, $imgHeight) = getimagesize($newImg);
    }
    echo '{"oldSize" : "'. $oldSize .'", "newPuth" : "'. $newPuth .'", "newSize" : "'. $newSize .'", "imgWidth" : "'. $imgWidth .'"}';
 