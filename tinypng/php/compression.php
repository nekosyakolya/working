<?php
    function compression($sizeImg, $tmpFileName, $i)
    {
        $imgName = $tmpFileName;
        while ($sizeImg > 5120 * THOUSAND_TWENTY_FOUR)
        {
            $percent = 0.7;
            list($width, $height, $imgType) = getimagesize($imgName);
            $newwidth = $width * $percent;
            $newheight = $height * $percent;
            $thumb = imagecreatetruecolor($newwidth, $newheight);

            if (($imgType == IMAGETYPE_JPEG) ? $source = imagecreatefromjpeg($imgName) : $source = imagecreatefrompng($imgName));

            imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
            
            if ($imgType == IMAGETYPE_JPEG)
            {
                $imgName = DIR_ . FILE_PATH_OPTIMIZED . "RESIZE" . $i . ".jpg";
                imagejpeg($thumb, $imgName);
            }
            else
            {
                $imgName = DIR_ . FILE_PATH_OPTIMIZED . "RESIZE" . $i . ".png";
                imagepng($thumb, $imgName);
            }
            
            
            $sizeImg = filesize($imgName);
        }
        return $imgName;
    }