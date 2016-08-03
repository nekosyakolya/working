<?php
    require_once("../include/config.inc.php");
    function compression($sizeImg, $tmpFileName, $i)
    {
        $imgName = $tmpFileName;
        while ($sizeImg > 5120 * 1024)
        {
            $percent = 0.7;
            list($width, $height) = getimagesize($imgName);
            $newwidth = $width * $percent;
            $newheight = $height * $percent;
            $thumb = imagecreatetruecolor($newwidth, $newheight);

            $source = imagecreatefromjpeg($imgName);

            imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
            $imgName = DIR_ . FILE_PATH_OPTIMIZED . "resize" . $i . ".jpg";

            imagejpeg($thumb, $imgName);
            
            $sizeImg = filesize($imgName);
        }
        return $imgName;
    }