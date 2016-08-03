<?php
    require_once("../tinify-php-master/vendor/autoload.php");
    \Tinify\setKey(API_KEY);
    
    clear();
    
    $fileElementName = "files";
    $i = 0;
    $oldSize = "";
    $newPuth = "";
    $newSize = "";
    $status = ERROR_NO_FILE;
    $archive = "";
    $type = "";
    $array = array();
    $array[$i] = array("oldSize" => $oldSize, "newPuth" => $newPuth, "newSize" => $newSize, "archive" => ZIP_ARCHIVE, "status" => $status);
    
    $filesCount = sizeof($_FILES[$fileElementName]["name"]);
    $zip = new ZipArchive();
    $zip->open(DIR_ . ZIP_ARCHIVE, ZIPARCHIVE::CREATE);
    for ($i; $i < $filesCount; $i++) 
    {
        $type = $_FILES[$fileElementName]['type'][$i];
        if (!empty($_FILES[$fileElementName]["error"][$i]))
        {
            switch($_FILES[$fileElementName]["error"][$i])
            {
                case "3":
                    $status = ERROR_PART_OF_THE_FILE_LOADED;
                    break;
                case "4":
                    $status = ERROR_WRONG_PATH;
                    break;
                case "6":
                    $status = ERROR_WRONG_DIR;
                    break;
                case "7":
                    $status = ERROR_RECORD_FILE;
                    break;
                case "8":
                    $status = ERROR_DOWNLOAD;
                    break;
                default:
                    $status = ERROR_CODE_IS_NOT_AVAILABLE;
            }
        }
        elseif (empty($_FILES[$fileElementName]["tmp_name"][$i]) || $_FILES[$fileElementName]["tmp_name"][$i] == "none")
        {
            $status = ERROR_NO_FILE;
        }
        else
        {
            $status = ERROR_WRONG_TYPE;
            if ($type == "image/jpeg" || $type == "image/png")
            {
                $status = SUCCESS;
                $tmpFileName = $_FILES[$fileElementName]['tmp_name'][$i];
                $sizeImg = filesize($tmpFileName);
                $oldSize = round($sizeImg / THOUSAND_TWENTY_FOUR, 1);
                $tmpFileName = compression($sizeImg, $tmpFileName, $i);
                $newImg = DIR_ . FILE_PATH_OPTIMIZED . $_FILES[$fileElementName]['name'][$i];
                $source = \Tinify\fromFile($tmpFileName);
                
                $source->toFile($newImg);
                $zip->addFile($newImg);
                $newSize = round(filesize($newImg) / THOUSAND_TWENTY_FOUR, 1);
                $newPuth = FILE_PATH_OPTIMIZED . $_FILES[$fileElementName]['name'][$i];
            }
            $array[$i] = array("oldSize" => $oldSize, "newPuth" => $newPuth, "newSize" => $newSize, "archive" => ZIP_ARCHIVE, "status" => $status);
        }
    }
    $zip->close();
   
    echo json_encode($array);